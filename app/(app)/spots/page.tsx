import {
  getExclusionZones,
  getNearbyPartners,
  getNearbySpots,
  getSpecies,
  getSpots,
} from '@/lib/api';

export default async function SpotsPage() {
  const [spots, nearbySpots, nearbyPartners, species, exclusionZones] =
    await Promise.all([
      getSpots(),
      getNearbySpots(),
      getNearbyPartners(),
      getSpecies(),
      getExclusionZones(),
    ]);

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-float backdrop-blur">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Geo intelligence</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">Spots, parceiros e zonas sensiveis</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
          O modulo de spots combina filtros por fundo, busca por proximidade e alertas de
          exclusao para preservar ponto e evitar erro operacional.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Hotspots</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {spots.map((spot) => (
              <div
                className="rounded-[28px] border border-white/10 bg-night/40 p-5"
                key={spot.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{spot.name}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/50">
                    {spot.bottomType}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">
                  {spot.region} · {spot.depthMinMeters} - {spot.depthMaxMeters} m
                </p>
                <p className="mt-4 text-sm leading-6 text-white/65">{spot.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/45">
                  {spot.coordinates ? 'GPS aberto' : 'GPS protegido'}
                </p>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Proximidade</p>
            <div className="mt-4 space-y-3">
              {nearbySpots.map((spot) => (
                <div
                  className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                  key={spot.id}
                >
                  <h3 className="text-lg font-semibold text-white">{spot.name}</h3>
                  <p className="mt-2 text-sm text-white/60">
                    {spot.region} · {spot.distanceKm} km
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Parceiros no raio</p>
            <div className="mt-4 space-y-3">
              {nearbyPartners.map((partner) => (
                <div
                  className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                  key={partner.id}
                >
                  <h3 className="text-lg font-semibold text-white">{partner.name}</h3>
                  <p className="mt-2 text-sm text-white/60">
                    {partner.locationLabel} · {partner.distanceKm} km
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Catalogo de especies</p>
          <div className="mt-4 grid gap-3">
            {species.map((entry) => (
              <div
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={entry.id}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{entry.commonName}</h3>
                    <p className="text-sm italic text-white/45">{entry.scientificName}</p>
                  </div>
                  <span className="text-sm text-cyan-200">min {entry.minimumSizeCm} cm</span>
                </div>
                <p className="mt-3 text-sm text-white/60">{entry.notes}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-float backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Zonas de exclusao</p>
          <div className="mt-4 grid gap-3">
            {exclusionZones.map((zone) => (
              <div
                className="rounded-[24px] border border-white/10 bg-night/40 p-4"
                key={zone.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                      zone.severity === 'BLOCKED'
                        ? 'bg-rose-500/15 text-rose-200'
                        : 'bg-amber-400/15 text-amber-200'
                    }`}
                  >
                    {zone.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60">{zone.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/45">
                  {zone.region} · raio {zone.radiusKm} km
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
