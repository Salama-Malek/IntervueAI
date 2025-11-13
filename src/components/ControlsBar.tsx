/**
 * Control buttons for interview session
 */

interface ControlsBarProps {
  isInterviewActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onExport: () => void;
  canStart: boolean;
}

export function ControlsBar({
  isInterviewActive,
  onStart,
  onStop,
  onExport,
  canStart,
}: ControlsBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {!isInterviewActive ? (
        <button
          onClick={onStart}
          disabled={!canStart}
          className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Start interview"
        >
          Begin Session
        </button>
      ) : (
        <button
          onClick={onStop}
          className="rounded-full bg-gradient-to-r from-rose-500 to-red-500 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)]"
          aria-label="Stop interview"
        >
          End Session
        </button>
      )}
      <button
        onClick={onExport}
        disabled={isInterviewActive}
        className="rounded-full border border-white/30 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Export session as JSON"
      >
        Export JSON
      </button>
    </div>
  );
}
