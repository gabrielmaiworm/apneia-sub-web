import { formatDate } from '@/lib/format';

interface LineChartProps {
  title: string;
  suffix: string;
  points: Array<{
    date: string;
    value: number;
  }>;
}

export function LineChart({ title, suffix, points }: LineChartProps) {
  const values = points.map((point) => point.value);
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const range = maxValue - minValue || 1;
  const path = points
    .map((point, index) => {
      const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100;
      const y = 90 - ((point.value - minValue) / range) * 70;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-float backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">{title}</p>
          <p className="mt-2 text-sm text-white/65">
            Pico recente: {values.length > 0 ? `${maxValue}${suffix}` : `0${suffix}`}
          </p>
        </div>
      </div>
      <div className="mt-6 h-48 rounded-[24px] bg-night/40 p-4">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`${title}-gradient`} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="#67E8F9" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/55">
        {points.map((point) => (
          <span
            className="rounded-full border border-white/10 px-3 py-1"
            key={`${title}-${point.date}`}
          >
            {formatDate(point.date)} · {point.value}
            {suffix}
          </span>
        ))}
      </div>
    </article>
  );
}
