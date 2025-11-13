/**
 * Footer with developer attribution and contact links.
 */

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:salamahassanein@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Salama-Malek',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/salama-malek/',
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-7xl rounded-3xl border border-white/10 bg-slate-950/60 px-6 py-8 text-white shadow-[0_25px_60px_rgba(3,7,18,0.65)] backdrop-blur-2xl sm:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">crafted by</p>
          <p className="mt-2 text-3xl font-semibold">Salama Malek</p>
          <p className="mt-2 max-w-xl text-sm text-white/70">
            Frontend developer focused on thoughtful interview experiences. Reach out any time to collaborate or ship the
            backend when you&apos;re ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {year} IntervueAI Studio. All rights reserved.</span>
        <span>salamahassanein@gmail.com</span>
      </div>
    </footer>
  );
}
