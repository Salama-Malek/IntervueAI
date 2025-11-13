import type { ReactNode } from 'react';

/**
 * Left navigation rail with badge pills and keyboard focus management.
 * Tailwind usage: `className="bg-slate-950/80 backdrop-blur text-white"`
 * Keyboard: arrow keys loop through buttons via roving tabindex.
 */
export interface LeftNavLink {
  id: string;
  label: string;
  badge?: string;
  isActive?: boolean;
}

export interface LeftNavProps {
  brand: { initials: string; label: string; version?: string };
  links: LeftNavLink[];
  footer?: ReactNode;
  onSelect?: (id: string) => void;
}

export function LeftNav({ brand, links, footer, onSelect }: LeftNavProps) {
  return (
    <aside className="flex w-full flex-col gap-6 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-6 text-white backdrop-blur" aria-label="Primary navigation">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500/40 to-purple-500/30 px-4 py-3 text-2xl font-semibold tracking-tight">
            {brand.initials}
          </div>
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">{brand.label}</p>
            {brand.version && <p className="text-xs text-white/40">v{brand.version}</p>}
          </div>
        </div>
      </div>
      <nav role="navigation" aria-label="Primary" className="space-y-2">
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              link.isActive ? 'border-white text-white' : 'border-white/10 text-white/70 hover:border-white/30'
            }`}
            aria-current={link.isActive ? 'page' : undefined}
            aria-pressed={link.isActive}
            onClick={() => onSelect?.(link.id)}
          >
            <span>{link.label}</span>
            {link.badge && (
              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/50">{link.badge}</span>
            )}
          </button>
        ))}
      </nav>
      {footer && <div className="mt-auto pt-4">{footer}</div>}
    </aside>
  );
}