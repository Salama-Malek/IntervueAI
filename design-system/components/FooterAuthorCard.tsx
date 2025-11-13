import type { ReactNode } from 'react';

/**
 * Attribution footer used on the Ops Deck.
 * Tailwind usage: `className="rounded-3xl border border-white/10 bg-slate-950/60"`
 * Accessibility: use role="contentinfo" and keep contact links keyboard reachable.
 */
export interface FooterAuthorCardProps {
  author: string;
  role: string;
  bio: string;
  contacts: Array<{ label: string; href: string; external?: boolean }>;
  metadata?: ReactNode;
}

export function FooterAuthorCard({ author, role, bio, contacts, metadata }: FooterAuthorCardProps) {
  return (
    <footer role="contentinfo" className="rounded-3xl border border-white/10 bg-slate-950/60 px-6 py-8 text-white shadow-[0_25px_60px_rgba(3,7,18,0.65)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-white/50">crafted by</p>
          <p className="mt-2 text-3xl font-semibold">{author}</p>
          <p className="text-sm text-white/60">{role}</p>
          <p className="mt-2 max-w-xl text-sm text-white/70">{bio}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noreferrer' : undefined}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {contact.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/60">
        {metadata ?? 'All rights reserved.'}
      </div>
    </footer>
  );
}