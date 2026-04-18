import { getGear, getMaintenanceAlerts } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default async function GearPage() {
  const [gear, alerts] = await Promise.all([getGear(), getMaintenanceAlerts()]);

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-float backdrop-blur">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">My gear</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">Inventario e manutencao preventiva</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
          Cadastro tecnico de equipamento com alertas de manutencao e reviews da comunidade.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Alertas</p>
          <div className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <div
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={alert.gearId}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{alert.name}</h3>
                  <span className="text-sm text-coral">{alert.daysRemaining} dias</span>
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Revisao prevista para {formatDate(alert.nextMaintenanceAt)}.
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Inventario</p>
          <div className="mt-5 grid gap-4">
            {gear.map((item) => (
              <div
                className="rounded-[28px] border border-white/10 bg-night/40 p-5"
                key={item.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-white/55">
                      {item.brand} {item.model} · {item.type}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                      item.status === 'OK'
                        ? 'bg-emerald-400/15 text-emerald-200'
                        : item.status === 'ATTENTION'
                          ? 'bg-amber-400/15 text-amber-200'
                          : 'bg-rose-500/15 text-rose-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Review</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.averageRating ? `${item.averageRating}/5` : 'Sem nota'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Proxima manutencao</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {formatDate(item.nextMaintenanceAt)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Cadencia</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.maintenanceCadenceMonths} meses
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/60">{item.notes}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
