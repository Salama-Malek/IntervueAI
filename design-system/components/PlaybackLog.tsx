/**
 * Playback log surfaced on the right rail.
 * Tailwind usage: `className="rounded-3xl border border-white/10 bg-white/5"`
 * Accessibility: list items expose aria-expanded + buttons for actions.
 */
export interface PlaybackSession {
  id: string;
  label: string;
  timestamp: string;
  stats: string;
}

export interface PlaybackLogProps {
  sessions: PlaybackSession[];
  expandedId?: string | null;
  onToggle?: (id: string) => void;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PlaybackLog({ sessions, expandedId, onToggle, onView, onDownload, onDelete }: PlaybackLogProps) {
  return (
    <section aria-label="Playback log" className="space-y-3 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Playback Log</h2>
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">Archive</span>
      </div>
      <ul className="space-y-3">
        {sessions.map((session) => {
          const expanded = expandedId === session.id;
          return (
            <li key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/20">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                aria-expanded={expanded}
                onClick={() => onToggle?.(session.id)}
              >
                <div>
                  <p className="text-sm font-semibold">{session.label}</p>
                  <p className="text-xs text-white/60">{session.timestamp}</p>
                </div>
                <p className="text-xs text-white/60">{session.stats}</p>
              </button>
              {expanded && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-emerald-400/40 px-4 py-1 text-xs font-semibold text-emerald-300"
                    onClick={() => onView?.(session.id)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/30 px-4 py-1 text-xs text-white/80"
                    onClick={() => onDownload?.(session.id)}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-red-400/40 px-4 py-1 text-xs text-red-300"
                    onClick={() => onDelete?.(session.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}