/**
 * KPI metric tile used for hero stats.
 * Tailwind usage: `className="rounded-3xl border border-white/10 bg-white/5"`
 * Accessibility: wrap with <section aria-label="Session KPIs"> to provide context.
 */
export interface KPICardProps {
  label: string;
  value: string;
  detail?: string;
  trend?: 'up' | 'down' | 'flat';
}

export function KPICard({ label, value, detail, trend = 'flat' }: KPICardProps) {
  const trendLabel = trend === 'up' ? 'Trending up' : trend === 'down' ? 'Trending down' : 'No change';
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_20px_50px_rgba(3,7,18,0.55)]" aria-label={`${label} metric`}>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-3xl font-semibold">{value}</p>
        <span className="text-xs text-white/50" aria-label={trendLabel}>
          {trend === 'up' && '?'}
          {trend === 'down' && '?'}
        </span>
      </div>
      {detail && <p className="mt-2 text-sm text-white/70">{detail}</p>}
    </article>
  );
}