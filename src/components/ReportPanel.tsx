/**
 * Session summary and metrics display
 */

import type { SessionSummary } from '../lib/summarize';

interface ReportPanelProps {
  summary: SessionSummary;
}

export function ReportPanel({ summary }: ReportPanelProps) {
  const finalScore = summary.metrics.finalScore ?? null;
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Debrief</p>
          <h2 className="text-2xl font-semibold">Session Summary</h2>
        </div>
        {finalScore !== null && (
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">Score</div>
            <div className="text-3xl font-bold text-emerald-300">{finalScore}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Metric label="Turns" value={summary.turns} />
        <Metric label="Words" value={summary.userWordCount} />
        <Metric label="AI prompts" value={summary.aiQuestions} />
        <Metric
          label="Avg response"
          value={
            summary.metrics.avgResponseTimeMs
              ? `${(summary.metrics.avgResponseTimeMs / 1000).toFixed(1)}s`
              : '—'
          }
        />
      </div>

      <div className="text-sm">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40">Total duration</div>
        <div className="text-lg font-semibold">
          {summary.metrics.totalDurationMs
            ? `${(summary.metrics.totalDurationMs / 1000 / 60).toFixed(1)} minutes`
            : '—'}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
      <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}
