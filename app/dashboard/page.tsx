import { LineChart } from '@/components/line-chart';
import { MetricCard } from '@/components/metric-card';
import { getBadges, getConditions, getPerformance } from '@/lib/api';

export default async function DashboardPage() {
  const [performance, conditions, badges] = await Promise.all([
    getPerformance(),
    getConditions(),
    getBadges(),
  ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          hint="Melhor profundidade pessoal registrada no perfil."
          label="PB Depth"
          value={`${performance.summary.bestDepthMeters} m`}
        />
        <MetricCard
          hint="Maior tempo de apneia registrado."
          label="PB Apneia"
          value={`${performance.summary.bestBreathHoldSeconds} s`}
        />
        <MetricCard
          hint="Media dos logs recentes da conta principal."
          label="Media Depth"
          value={`${performance.summary.averageDepthMeters} m`}
        />
        <MetricCard
          hint="Total de logs usados para montar o dashboard."
          label="Logs"
          value={String(performance.summary.totalLogs)}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <LineChart
          points={performance.charts.depthSeries}
          suffix="m"
          title="Profundidade ao longo do tempo"
        />
        <LineChart
          points={performance.charts.apneaSeries}
          suffix="s"
          title="Apneia ao longo do tempo"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Mapa de calor</p>
          <div className="mt-5 grid gap-4">
            {performance.charts.heatmap.map((region) => (
              <div
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={region.region}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{region.region}</h3>
                  <span className="text-sm text-white/55">{region.logs} logs</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-coral"
                    style={{ width: `${Math.min(100, region.logs * 20)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Condicoes</p>
            <div className="mt-4 space-y-3">
              {conditions.map((condition) => (
                <div
                  className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                  key={condition.id}
                >
                  <h3 className="text-lg font-semibold text-white">{condition.region}</h3>
                  <p className="mt-2 text-sm text-white/60">
                    Mare {condition.tideLabel}, {condition.windKnots} kn, ondulacao{' '}
                    {condition.swellMeters} m.
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Badges</p>
            <div className="mt-4 grid gap-3">
              {badges.map((badge) => (
                <div
                  className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                  key={badge.id}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{badge.title}</h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                      {badge.earned ? 'earned' : 'locked'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">{badge.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
