import type { FeedItem } from '@/types/api';
import { formatDateTime, getInitials } from '@/lib/format';

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-reef to-kelp text-sm font-semibold text-storm">
            {getInitials(item.author.name)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{item.author.name}</h3>
            <p className="text-sm text-white/55">
              @{item.author.handle} · lvl {item.author.level}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/55">
          {formatDateTime(item.createdAt)}
        </span>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-300/25 via-transparent to-coral/15 p-5">
            <p className="text-lg leading-8 text-white">{item.caption}</p>
            <p className="mt-3 text-sm leading-6 text-white/65">{item.conditionsNote}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.speciesHighlights.map((species) => (
              <span
                className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70"
                key={species}
              >
                {species}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ['Profundidade', `${item.metrics.maxDepthMeters} m`],
              ['Apneia', `${item.metrics.breathHoldSeconds} s`],
              ['Agua', `${item.metrics.waterTemperatureC} C`],
              ['Lastro', `${item.metrics.ballastKg} kg`],
              ['Visibilidade', `${item.metrics.visibilityMeters} m`],
            ].map(([label, value]) => (
              <div className="rounded-2xl border border-white/10 bg-night/40 p-3" key={label}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{label}</p>
                <p className="mt-2 text-base font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-night/40 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Spot</p>
            <h4 className="mt-3 text-xl font-semibold text-white">
              {item.spot?.name ?? 'Sem spot vinculado'}
            </h4>
            <p className="mt-1 text-sm text-white/55">{item.spot?.region ?? 'Regiao livre'}</p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              {item.spot?.description ?? 'Log publicado sem georreferencia.'}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/45">
              {item.spot?.coordinates ? 'Coordenadas abertas' : 'Coordenadas protegidas'}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Social engine</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ['Arpao Up', item.totalArpaoUps],
                ['Comentarios', item.totalComments],
                ['Shares', item.totalShares],
              ].map(([label, value]) => (
                <div className="rounded-2xl border border-white/10 bg-night/30 p-3 text-center" key={label}>
                  <p className="text-sm font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            {item.media.length > 0 ? (
              <div className="mt-4 rounded-[24px] bg-gradient-to-br from-cyan-400/20 via-transparent to-coral/20 p-4">
                <p className="text-sm font-medium text-white">{item.media[0].title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/55">
                  {item.media[0].kind === 'video' ? 'Video' : 'Foto'} anexada
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
