import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { deleteSession, type StoredSession } from '../lib/storage';
import { useSessionsData } from '../hooks/useSessionsData';
import type { AdapterKind } from '../types/interview';

interface HistoryPanelProps {
  adapter: AdapterKind;
  onLoad?: (session: StoredSession) => void;
}

export function HistoryPanel({ adapter, onLoad }: HistoryPanelProps) {
  const queryClient = useQueryClient();
  const { data: sessions = [], isLoading, isError, queryKey } = useSessionsData(adapter);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Delete this session?')) {
      deleteSession(id);
      queryClient.invalidateQueries({ queryKey });
    }
  };

  return (
    <div className="space-y-3 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Playback Log</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">Archive</span>
      </div>
      {isLoading && <p className="text-sm text-white/60">Loading recent sessions…</p>}
      {isError && (
        <p className="text-sm text-red-300">Unable to load sessions. Showing local cache if available.</p>
      )}
      {sessions.length === 0 && !isLoading && (
        <p className="text-sm text-white/60">
          No sessions yet. Complete an interview to see your timeline light up.
        </p>
      )}
      <ul className="space-y-3">
        {sessions.map((s) => {
          const isExpanded = expandedId === s.id;
          return (
            <li
              key={s.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-inner shadow-black/20 transition hover:border-white/20"
            >
              <button
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
              >
                <div>
                  <div className="text-sm font-semibold">
                    {s.config.role} / {s.config.seniority}
                  </div>
                  <div className="text-xs text-white/50">
                    {new Date(s.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  Turns {s.metrics.turns} / Words {s.metrics.userWordCount}
                </div>
              </button>
              {isExpanded && (
                <div className="mt-3 space-y-2 rounded-2xl border border-white/5 bg-black/20 p-3 text-sm text-white/80">
                  <div className="grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>AI {s.metrics.aiQuestions}</span>
                    <span>Avg {s.metrics.metrics['avgResponseTimeMs']} ms</span>
                    <span>Total {s.metrics.metrics['totalDurationMs']} ms</span>
                    {typeof s.metrics.metrics['finalScore'] === 'number' && (
                      <span>Score {s.metrics.metrics['finalScore']}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-full border border-emerald-400/40 px-4 py-1 text-xs font-semibold text-emerald-300 hover:border-emerald-300"
                      onClick={() => onLoad?.(s)}
                    >
                      View transcript
                    </button>
                    <button
                      className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/70 hover:text-white"
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `intervueai_${s.id}.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Download JSON
                    </button>
                    <button
                      className="rounded-full border border-red-400/40 px-4 py-1 text-xs text-red-300 hover:border-red-300"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
