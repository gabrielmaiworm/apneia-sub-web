'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createDiveLog } from '@/lib/api';
import { extractExifSummary } from '@/lib/exif';
import type { CreateDiveLogPayload, SpotSummary } from '@/types/api';

interface LogComposerProps {
  spots: SpotSummary[];
}

interface MediaDraft {
  id: string;
  name: string;
  kind: 'photo' | 'video';
  originalSizeKb: number;
  compressedSizeKb: number;
  exif?: {
    capturedAt?: string;
    latitude?: number;
    longitude?: number;
  } | null;
}

const STORAGE_KEY = 'apneia-offline-log-queue';

export function LogComposer({ spots }: LogComposerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOnline, setIsOnline] = useState(true);
  const [queueCount, setQueueCount] = useState(0);
  const [syncMessage, setSyncMessage] = useState('Tudo sincronizado.');
  const [mediaDrafts, setMediaDrafts] = useState<MediaDraft[]>([]);
  const [form, setForm] = useState({
    caption: '',
    conditionsNote: '',
    spotId: spots[0]?.id ?? '',
    species: '',
    hideCoordinates: true,
    maxDepthMeters: '18',
    breathHoldSeconds: '90',
    waterTemperatureC: '24',
    ballastKg: '4',
    visibilityMeters: '10',
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateConnectionState = () => {
      setIsOnline(window.navigator.onLine);
    };

    setQueueCount(readQueue().length);
    updateConnectionState();
    void flushQueue();

    window.addEventListener('online', updateConnectionState);
    window.addEventListener('offline', updateConnectionState);
    window.addEventListener('online', () => {
      void flushQueue();
    });

    return () => {
      window.removeEventListener('online', updateConnectionState);
      window.removeEventListener('offline', updateConnectionState);
    };
  }, []);

  async function flushQueue() {
    if (typeof window === 'undefined' || !window.navigator.onLine) {
      return;
    }

    const queue = readQueue();

    if (queue.length === 0) {
      setSyncMessage('Tudo sincronizado.');
      return;
    }

    setSyncMessage('Sincronizando logs salvos offline...');

    const remaining: CreateDiveLogPayload[] = [];

    for (const draft of queue) {
      try {
        await createDiveLog(draft);
      } catch {
        remaining.push(draft);
      }
    }

    writeQueue(remaining);
    setQueueCount(remaining.length);
    setSyncMessage(
      remaining.length === 0
        ? 'Fila offline sincronizada.'
        : `${remaining.length} log(s) ainda aguardando sincronizacao.`,
    );

    startTransition(() => {
      router.refresh();
    });
  }

  async function handleFileSelection(files: FileList | null) {
    if (!files) {
      setMediaDrafts([]);
      return;
    }

    const nextDrafts: MediaDraft[] = [];

    for (const file of Array.from(files).slice(0, 3)) {
      const compressedFile = file.type.startsWith('image/')
        ? await compressImage(file)
        : file;
      const exif = await extractExifSummary(file);

      nextDrafts.push({
        id: crypto.randomUUID(),
        name: file.name,
        kind: file.type.startsWith('video/') ? 'video' : 'photo',
        originalSizeKb: Math.round(file.size / 1024),
        compressedSizeKb: Math.round(compressedFile.size / 1024),
        exif,
      });
    }

    setMediaDrafts(nextDrafts);

    const firstExif = nextDrafts.find((draft) => draft.exif)?.exif;

    if (firstExif?.capturedAt && !form.conditionsNote) {
      setForm((current) => ({
        ...current,
        conditionsNote: `Sugestao EXIF: captura em ${firstExif.capturedAt}.`,
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CreateDiveLogPayload = {
      authorId: 'user-1',
      spotId: form.spotId || null,
      caption: form.caption,
      conditionsNote: form.conditionsNote,
      hideCoordinates: form.hideCoordinates,
      speciesHighlights: form.species
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      media: mediaDrafts.map((draft) => ({
        id: draft.id,
        kind: draft.kind,
        title: draft.name,
        url: '',
      })),
      metrics: {
        maxDepthMeters: Number(form.maxDepthMeters),
        breathHoldSeconds: Number(form.breathHoldSeconds),
        waterTemperatureC: Number(form.waterTemperatureC),
        ballastKg: Number(form.ballastKg),
        visibilityMeters: Number(form.visibilityMeters),
      },
    };

    if (!isOnline) {
      enqueueDraft(payload);
      setQueueCount(readQueue().length);
      setSyncMessage('Log salvo offline. Vai sincronizar quando a conexao voltar.');
      resetForm();
      return;
    }

    try {
      await createDiveLog(payload);
      setSyncMessage('Log publicado na API.');
      resetForm();
      startTransition(() => {
        router.refresh();
      });
    } catch {
      enqueueDraft(payload);
      setQueueCount(readQueue().length);
      setSyncMessage('API indisponivel. Log salvo na fila offline.');
      resetForm();
    }
  }

  function resetForm() {
    setForm((current) => ({
      ...current,
      caption: '',
      conditionsNote: '',
      species: '',
    }));
    setMediaDrafts([]);
  }

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Upload inteligente</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Novo dive log</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Se estiver sem sinal, o log entra na fila local e sobe sozinho quando a
            conexao voltar.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-sm text-white/70">
          <strong className="block text-white">{isOnline ? 'Online' : 'Offline'}</strong>
          <span>{queueCount} log(s) na fila</span>
        </div>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <textarea
          className="min-h-32 rounded-[28px] border border-white/10 bg-night/40 px-5 py-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/70"
          name="caption"
          onChange={(event) => setForm((current) => ({ ...current, caption: event.target.value }))}
          placeholder="Resumo do mergulho, leitura de agua e o que vale registrar."
          required
          value={form.caption}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <select
            className="rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white outline-none"
            onChange={(event) => setForm((current) => ({ ...current, spotId: event.target.value }))}
            value={form.spotId}
          >
            {spots.map((spot) => (
              <option className="bg-storm" key={spot.id} value={spot.id}>
                {spot.name} · {spot.region}
              </option>
            ))}
          </select>
          <input
            className="rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white outline-none placeholder:text-white/30"
            onChange={(event) => setForm((current) => ({ ...current, species: event.target.value }))}
            placeholder="Especies vistas, separadas por virgula"
            value={form.species}
          />
        </div>

        <textarea
          className="min-h-24 rounded-[28px] border border-white/10 bg-night/40 px-5 py-4 text-sm text-white outline-none placeholder:text-white/30"
          onChange={(event) =>
            setForm((current) => ({ ...current, conditionsNote: event.target.value }))
          }
          placeholder="Condicoes, vento, termoclina, observacoes de seguranca."
          value={form.conditionsNote}
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ['maxDepthMeters', 'Profundidade m'],
            ['breathHoldSeconds', 'Apneia s'],
            ['waterTemperatureC', 'Agua C'],
            ['ballastKg', 'Lastro kg'],
            ['visibilityMeters', 'Visibilidade m'],
          ].map(([field, label]) => (
            <input
              className="rounded-2xl border border-white/10 bg-night/40 px-4 py-3 text-white outline-none placeholder:text-white/30"
              key={field}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  [field]: event.target.value,
                }))
              }
              placeholder={label}
              required
              type="number"
              value={form[field as keyof typeof form] as string}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-3 text-sm text-white/70">
            <input
              checked={form.hideCoordinates}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  hideCoordinates: event.target.checked,
                }))
              }
              type="checkbox"
            />
            Ocultar coordenadas no feed
          </label>

          <label className="inline-flex cursor-pointer items-center rounded-full border border-dashed border-white/20 px-4 py-2 text-sm text-white/75">
            Midia local / EXIF
            <input
              className="hidden"
              multiple
              onChange={(event) => {
                void handleFileSelection(event.target.files);
              }}
              type="file"
            />
          </label>
        </div>

        {mediaDrafts.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-3">
            {mediaDrafts.map((draft) => (
              <article
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={draft.id}
              >
                <p className="font-medium text-white">{draft.name}</p>
                <p className="mt-2 text-sm text-white/65">
                  {draft.kind === 'video' ? 'Video' : 'Foto'} · {draft.originalSizeKb} KB
                  {' -> '}
                  {draft.compressedSizeKb} KB
                </p>
                {draft.exif?.capturedAt ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cyan-200">
                    EXIF {draft.exif.capturedAt}
                  </p>
                ) : null}
                {draft.exif?.latitude !== undefined && draft.exif.longitude !== undefined ? (
                  <p className="mt-2 text-xs text-white/55">
                    Sugestao GPS: {draft.exif.latitude.toFixed(4)}, {draft.exif.longitude.toFixed(4)}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-white/60">{syncMessage}</p>
          <button
            className="rounded-full bg-gradient-to-r from-cyan-300 to-coral px-6 py-3 text-sm font-semibold text-storm transition hover:opacity-90"
            disabled={isPending}
            type="submit"
          >
            {isPending ? 'Publicando...' : isOnline ? 'Publicar log' : 'Salvar offline'}
          </button>
        </div>
      </form>
    </section>
  );
}

function readQueue() {
  if (typeof window === 'undefined') {
    return [] as CreateDiveLogPayload[];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CreateDiveLogPayload[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: CreateDiveLogPayload[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
}

function enqueueDraft(payload: CreateDiveLogPayload) {
  const currentQueue = readQueue();
  currentQueue.push(payload);
  writeQueue(currentQueue);
}

async function compressImage(file: File) {
  if (typeof window === 'undefined' || !file.type.startsWith('image/')) {
    return file;
  }

  const imageBitmap = await createImageBitmap(file);
  const maxSize = 1600;
  const scale = Math.min(1, maxSize / Math.max(imageBitmap.width, imageBitmap.height));
  const width = Math.round(imageBitmap.width * scale);
  const height = Math.round(imageBitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  if (!context) {
    return file;
  }

  context.drawImage(imageBitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.78);
  });

  if (!blob) {
    return file;
  }

  return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
    type: 'image/jpeg',
    lastModified: file.lastModified,
  });
}
