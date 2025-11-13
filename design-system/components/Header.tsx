import type { ReactNode } from 'react';

/**
 * Application chrome header for the Ops Deck view.
 * Tailwind usage: `className="bg-[color:var(--ink-900)] text-white"`
 * Keyboard: actions live inside the `actions` slot and should expose focus outlines.
 */
export interface HeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  statusChip?: { label: string; tone?: 'idle' | 'live' };
  actions?: ReactNode;
}

export function Header({ eyebrow, title, description, statusChip, actions }: HeaderProps) {
  return (
    <header role="banner" className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/50 px-6 py-4 text-white">
      <div>
        {eyebrow && (
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/50" aria-label="Section eyebrow">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
        {description && <p className="text-sm text-white/60">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {statusChip && (
          <span
            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.35em] ${
              statusChip.tone === 'live'
                ? 'border-emerald-400/70 text-emerald-200'
                : 'border-white/20 text-white/70'
            }`}
            role="status"
          >
            {statusChip.label}
          </span>
        )}
        {actions}
      </div>
    </header>
  );
}