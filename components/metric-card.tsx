interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
}

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-float backdrop-blur">
      <p className="text-xs uppercase tracking-[0.24em] text-white/55">{label}</p>
      <strong className="mt-4 block text-4xl font-semibold text-white">{value}</strong>
      <p className="mt-3 text-sm leading-6 text-white/65">{hint}</p>
    </article>
  );
}
