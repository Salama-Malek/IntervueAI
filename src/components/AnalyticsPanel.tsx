import { useEffect, useMemo, useState } from 'react';
import { listSessions, type StoredSession } from '../lib/storage';

function Sparkline({ values, color = '#60a5fa', height = 40 }: { values: number[]; color?: string; height?: number }) {
  const width = 160;
  if (!values.length) return <svg width={width} height={height} />;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = Math.max(1, max - min);
  const stepX = values.length > 1 ? width / (values.length - 1) : width;
  const points = values.map((v, i) => {
    const x = Math.round(i * stepX);
    const y = Math.round(height - ((v - min) / span) * (height - 4) - 2);
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} aria-hidden="true">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points.join(' ')} />
    </svg>
  );
}

const formatMetricValue = (value: number | null, decimals = 0) => {
  if (value === null || Number.isNaN(value)) return '—';
  return value.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals > 0 ? 1 : 0,
  });
};

const average = (values: number[]) => {
  if (!values.length) return null;
  const sum = values.reduce((acc, n) => acc + n, 0);
  return sum / values.length;
};

function MetricCard({
  label,
  values,
  color,
  decimals = 0,
}: {
  label: string;
  values: number[];
  color: string;
  decimals?: number;
}) {
  const count = values.length;
  const latest = count ? values[count - 1] : null;
  const avg = average(values);
  const runLabel = count === 1 ? 'run' : 'runs';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:border-white/20 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex-1">
        <div className="text-xs uppercase tracking-[0.35em] text-white/45">{label}</div>
        <div className="mt-2 text-2xl font-semibold text-white">{formatMetricValue(latest, decimals)}</div>
        <div className="text-xs text-white/60">
          {count ? `Avg ${formatMetricValue(avg, decimals)} · ${count} ${runLabel}` : 'Awaiting first run'}
        </div>
      </div>
      <Sparkline values={values} color={color} />
    </div>
  );
}

export function AnalyticsPanel() {
  const [sessions, setSessions] = useState<StoredSession[]>([]);
  useEffect(() => setSessions(listSessions()), []);

  const sorted = useMemo(
    () => [...sessions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [sessions]
  );

  const toNumbers = (vals: (number | undefined)[]) =>
    vals.filter((value): value is number => typeof value === 'number' && !Number.isNaN(value));

  const turns = toNumbers(sorted.map((s) => s.metrics.turns));
  const words = toNumbers(sorted.map((s) => s.metrics.userWordCount));
  const scores = toNumbers(sorted.map((s) => s.metrics.metrics['finalScore']));

  const metricCards = [
    { key: 'turns', label: 'Turns', values: turns, color: '#34d399', decimals: 0 },
    { key: 'words', label: 'Words', values: words, color: '#60a5fa', decimals: 0 },
    { key: 'score', label: 'Score', values: scores, color: '#fbbf24', decimals: 1 },
  ].filter((card) => card.key !== 'score' || sorted.length > 0);

  return (
    <div className="space-y-3 text-white">
      <h2 className="text-xl font-semibold">Pulse</h2>
      {sorted.length === 0 ? (
        <p className="text-sm text-white/60">Run a session to unlock motion charts.</p>
      ) : (
        <div className="space-y-4 text-sm">
          {metricCards.map((card) => (
            <MetricCard key={card.key} label={card.label} values={card.values} color={card.color} decimals={card.decimals} />
          ))}
        </div>
      )}
    </div>
  );
}
