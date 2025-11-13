import type { ReactNode } from 'react';

/**
 * Shell wrapper around the live interview tools.
 * Tailwind usage: `className="rounded-[32px] border border-white/5 bg-white/5"`
 * Accessibility: exposes aria-live status + focus mode toggle button.
 */
export interface InterviewStudioProps {
  title?: string;
  status: 'idle' | 'capturing';
  onToggleFocus?: () => void;
  focusLabel?: string;
  children: ReactNode;
}

export function InterviewStudio({ title = 'Interview studio', status, onToggleFocus, focusLabel = 'Focus mode', children }: InterviewStudioProps) {
  return (
    <section className="rounded-[32px] border border-white/5 bg-white/5 p-5 text-white shadow-[0_35px_90px_rgba(3,7,18,0.7)]" aria-labelledby="interview-studio-heading">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/40">Live desk</p>
          <h2 id="interview-studio-heading" className="text-2xl font-semibold">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {onToggleFocus && (
            <button
              type="button"
              onClick={onToggleFocus}
              className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/80 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {focusLabel}
            </button>
          )}
          <span
            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.35em] ${
              status === 'capturing' ? 'border-emerald-400/70 text-emerald-200' : 'border-white/20 text-white/60'
            }`}
            role="status"
            aria-live="polite"
          >
            {status === 'capturing' ? 'Live capture' : 'Idle board'}
          </span>
        </div>
      </header>
      {children}
    </section>
  );
}