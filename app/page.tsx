import Link from 'next/link';
import { MetricCard } from '@/components/metric-card';
import { getConditions, getLeaderboards, getOverview } from '@/lib/api';

export default async function HomePage() {
  const [overview, conditions, leaderboard] = await Promise.all([
    getOverview(),
    getConditions(),
    getLeaderboards(),
  ]);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-float backdrop-blur lg:grid-cols-[1.2fr_.8fr] lg:p-10">
        <div className="animate-rise">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">
            Social + tecnica + seguranca
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-white md:text-6xl">
            Uma base unica para log de mergulho, mapa de spots e rotina de equipamento.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            O front ja conversa com a API Nest criada no repositório. Se ela nao estiver de
            pe, a interface continua navegavel com dados de fallback.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { href: '/feed', label: 'Abrir feed tecnico' },
              { href: '/dashboard', label: 'Ver performance' },
              { href: '/spots', label: 'Explorar spots' },
            ].map((item) => (
              <Link
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-200/50 hover:bg-cyan-200/10"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <MetricCard
            hint="Usuarios iniciais e estrutura pronta para auth, perfil e PB."
            label="Mergulhadores"
            value={String(overview.stats.users)}
          />
          <MetricCard
            hint="Feed social com dados tecnicos, curtidas e comentarios em arvore."
            label="Dive logs"
            value={String(overview.stats.diveLogs)}
          />
          <MetricCard
            hint="Spots, gear, especies e seguranca expostos em modulos separados."
            label="Modulos"
            value={String(overview.modules.length)}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Janela do mar</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {conditions.map((condition) => (
              <div
                className="rounded-[28px] border border-white/10 bg-night/40 p-5"
                key={condition.id}
              >
                <h3 className="text-xl font-semibold text-white">{condition.region}</h3>
                <p className="mt-3 text-sm text-white/65">
                  Mare {condition.tideLabel}, agua {condition.waterTemperatureC} C, vento{' '}
                  {condition.windKnots} kn e ondulacao {condition.swellMeters} m.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/45">
                  Lua {condition.moonPhase}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Leaderboard atual</p>
          <div className="mt-5 space-y-3">
            {leaderboard.map((entry) => (
              <div
                className="flex items-center justify-between rounded-[24px] border border-white/10 bg-night/40 px-4 py-4"
                key={entry.id}
              >
                <div>
                  <p className="text-sm text-white/45">#{entry.rank}</p>
                  <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
                  <p className="text-sm text-white/55">{entry.secondaryLabel}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-semibold text-cyan-200">{entry.metric}m</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">Profundidade</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
