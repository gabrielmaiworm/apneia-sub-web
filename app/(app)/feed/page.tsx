import { FeedCard } from '@/components/feed-card';
import { LogComposer } from '@/components/log-composer';
import { getFeed, getSpots } from '@/lib/api';

export default async function FeedPage() {
  const [feed, spots] = await Promise.all([getFeed(), getSpots()]);

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-float backdrop-blur">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Dive log social</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">Feed tecnico da comunidade</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
          Relevancia por interacao e recencia, com spot protegido quando o autor optar por
          ocultar coordenadas.
        </p>
      </section>

      <LogComposer spots={spots} />

      <section className="space-y-6">
        {feed.map((item) => (
          <FeedCard item={item} key={item.id} />
        ))}
      </section>
    </div>
  );
}
