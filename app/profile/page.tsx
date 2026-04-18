import { getBuddySafety, getLevelProgress, getNotifications, getProfile } from '@/lib/api';
import { formatDateTime } from '@/lib/format';

export default async function ProfilePage() {
  const [profile, notifications, buddySafety, levelProgress] = await Promise.all([
    getProfile(),
    getNotifications(),
    getBuddySafety(),
    getLevelProgress(),
  ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-float backdrop-blur lg:grid-cols-[1fr_.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Perfil do mergulhador</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">{profile.name}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">{profile.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.specialties.map((specialty) => (
              <span
                className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70"
                key={specialty}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-night/40 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Level progress</p>
          <p className="mt-4 text-4xl font-semibold text-white">Lvl {levelProgress.level}</p>
          <p className="mt-3 text-sm text-white/60">
            {levelProgress.xp} xp · faltam {levelProgress.remainingXp} xp para o proximo nivel.
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-coral"
              style={{ width: `${levelProgress.progressPercentage}%` }}
            />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">PB Depth</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {profile.personalBest.depthMeters} m
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">PB Apneia</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {profile.personalBest.breathHoldSeconds} s
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Notificacoes</p>
          <div className="mt-4 space-y-3">
            {notifications.map((notification) => (
              <div
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={notification.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                    {notification.read ? 'read' : 'new'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">{notification.message}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/45">
                  {formatDateTime(notification.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Buddy safety</p>
          <div className="mt-4 space-y-3">
            {buddySafety.map((plan) => (
              <div
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={plan.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{plan.contactName}</h3>
                  <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
                    {plan.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Retorno previsto: {formatDateTime(plan.expectedReturnAt)}
                </p>
                <p className="mt-2 text-sm text-white/60">Saida: {plan.launchSpot}</p>
                <p className="mt-3 text-sm leading-6 text-white/55">{plan.notes}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
