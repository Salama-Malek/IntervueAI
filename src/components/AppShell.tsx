/**
 * Main application shell rendered inside a dashboard layout with a fixed sidebar
 * and a focus mode for the interview studio.
 */

import { useEffect, useMemo, useState } from 'react';
import type { Role, Seniority } from '../lib/questions';
import type { InterviewConfig } from '../adapters/AdapterTypes';
import { InterviewConfigPanel } from './InterviewConfigPanel';
import { InterviewRoom } from './InterviewRoom';
import { getTextDirection } from '../lib/i18n';
import { HistoryPanel } from './HistoryPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import type { StoredSession } from '../lib/storage';
import { SessionViewerModal } from './SessionViewerModal';
import type { AdapterKind } from '../types/interview';
import { SiteFooter } from './SiteFooter';

export function AppShell() {
  const [config, setConfig] = useState<InterviewConfig>({
    role: 'Frontend',
    seniority: 'Junior',
    language: 'en-US',
  });
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isStudioFullscreen, setIsStudioFullscreen] = useState(false);

  const defaultAdapter = useMemo<AdapterKind>(() => {
    const adapterFromEnv = (import.meta as unknown as { env?: { VITE_ADAPTER?: AdapterKind } }).env?.VITE_ADAPTER;
    return adapterFromEnv ?? 'local';
  }, []);
  const [adapter, setAdapter] = useState<AdapterKind>(defaultAdapter);
  const [viewSession, setViewSession] = useState<StoredSession | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (isStudioFullscreen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
    return () => body.classList.remove('overflow-hidden');
  }, [isStudioFullscreen]);

  const textDirection = getTextDirection(config.language);
  const heroStats = [
    { label: 'Active roles', value: '6', detail: 'Frontend, Backend, Product' },
    { label: 'Avg. score lift', value: '+32%', detail: 'Last 20 recorded sessions' },
    { label: 'Languages', value: '2', detail: 'English & Arabic ready-made' },
    { label: 'Session capacity', value: 'Unlimited', detail: 'Local-first archive' },
  ];
  const navLinks = [
    { label: 'Dashboard', badge: 'Live', active: true },
    { label: 'Recordings', badge: '24' },
    { label: 'Insights', badge: 'Pulse' },
    { label: 'Library', badge: 'Soon' },
  ];

  const boardStatus = isInterviewStarted
    ? {
        label: 'Live capture',
        chipClass: 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200',
      }
    : {
        label: 'Idle board',
        chipClass: 'border-white/10 bg-white/5 text-white/70',
      };

  const languageLabels: Record<string, string> = {
    'en-US': 'English (US)',
    'ar-EG': 'Arabic (Egypt)',
  };
  const adapterLabels: Record<AdapterKind, string> = {
    local: 'Local scripts',
    rest: 'REST + AI',
  };

  const sessionHighlights = [
    { label: 'Role focus', value: config.role },
    { label: 'Seniority', value: config.seniority },
    { label: 'Language', value: languageLabels[config.language] ?? config.language },
    { label: 'Engine', value: adapterLabels[adapter] },
  ];

  const focusButtonLabel = isStudioFullscreen ? 'Exit focus' : 'Focus mode';

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white" dir={textDirection}>
      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_-10%,rgba(109,40,217,0.35),transparent_50%),radial-gradient(circle_at_80%_-5%,rgba(56,189,248,0.25),transparent_45%)]" />

      <div className="relative z-10 min-h-screen">
        <aside className="flex w-full flex-col border-b border-white/10 bg-slate-950/80 px-5 py-6 backdrop-blur xl:fixed xl:inset-y-0 xl:left-0 xl:z-20 xl:w-[360px] xl:border-b-0 xl:border-r xl:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/40 to-purple-500/40 px-4 py-3 text-2xl font-semibold tracking-tight text-white">
                IA
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">IntervueAI</p>
                <h1 className="text-xl font-semibold leading-tight">Ops Deck</h1>
              </div>
            </div>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
              v0.2
            </span>
          </div>

          <nav className="mt-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  link.active
                    ? 'border-white/40 bg-white/10 text-white shadow-[0_12px_40px_rgba(255,255,255,0.1)]'
                    : 'border-white/5 text-white/70 hover:border-white/20 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">{link.badge}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-[0_25px_60px_rgba(3,7,18,0.65)] backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Live controls</p>
                  <h2 className="mt-1 text-xl font-semibold">Role & seniority</h2>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${boardStatus.chipClass}`}>
                  {boardStatus.label}
                </span>
              </div>
              <InterviewConfigPanel
                role={config.role}
                seniority={config.seniority}
                language={config.language}
                onRoleChange={(role: Role) => setConfig({ ...config, role })}
                onSeniorityChange={(seniority: Seniority) => setConfig({ ...config, seniority })}
                onLanguageChange={(language: string) => setConfig({ ...config, language })}
                adapter={adapter}
                onAdapterChange={(a) => setAdapter(a)}
                disabled={isInterviewStarted}
                visibleSections={['role', 'seniority']}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Focus brief</p>
              <h2 className="mt-2 text-lg font-semibold">Session highlights</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {sessionHighlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <dt className="text-[11px] uppercase tracking-[0.3em] text-white/40">{item.label}</dt>
                    <dd className="mt-1 font-semibold text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-3xl border border-white/5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Need a backend?</p>
              <p className="mt-2">
                This interface is frontend-only today. When you are ready to wire a backend, plug the REST adapter into your API
                or reach out to Salama for help.
              </p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col xl:ml-[360px]">
          <div className="border-b border-white/10 bg-slate-900/50 px-4 py-4 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Ops center</p>
                <h2 className="text-2xl font-semibold">Practice monitor</h2>
                <p className="text-sm text-white/60">Track transcripts, analytics, and storage from a single board.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Export board
                </button>
                <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.35em] ${boardStatus.chipClass}`}>
                  {boardStatus.label}
                </span>
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">S</div>
                  <div>
                    <p className="text-sm font-semibold">Salama Malek</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(3,7,18,0.55)] backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/70">{stat.detail}</p>
                </div>
              ))}
            </section>

            <div className="mt-6 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_25px_60px_rgba(3,7,18,0.55)] backdrop-blur-xl">
                <InterviewConfigPanel
                  role={config.role}
                  seniority={config.seniority}
                  language={config.language}
                  onRoleChange={(role: Role) => setConfig({ ...config, role })}
                  onSeniorityChange={(seniority: Seniority) => setConfig({ ...config, seniority })}
                  onLanguageChange={(language: string) => setConfig({ ...config, language })}
                  adapter={adapter}
                  onAdapterChange={(a) => setAdapter(a)}
                  disabled={isInterviewStarted}
                  visibleSections={['language', 'engine']}
                  header={{
                    eyebrow: 'Live toggles',
                    title: 'Language & engine',
                    description: 'Adjust voice + adapter before each question.',
                  }}
                />
              </div>

              {isStudioFullscreen && <div className="fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-md" />}
              <div
                className={`rounded-[32px] border border-white/5 bg-white/5 p-1 shadow-[0_35px_90px_rgba(3,7,18,0.7)] backdrop-blur-2xl transition-all ${
                  isStudioFullscreen ? 'fixed inset-3 z-50 m-auto w-auto max-h-[calc(100vh-1.5rem)] overflow-y-auto p-4' : ''
                }`}
              >
                <div className="rounded-[28px] border border-white/5 bg-slate-950/60 p-5">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/40">Live desk</p>
                      <h2 className="mt-1 text-2xl font-semibold">Interview studio</h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:text-white"
                        onClick={() => setIsStudioFullscreen((prev) => !prev)}
                      >
                        {focusButtonLabel}
                      </button>
                      <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.35em] ${boardStatus.chipClass}`}>
                        {boardStatus.label}
                      </span>
                    </div>
                  </div>
                  <InterviewRoom config={config} adapter={adapter} onSessionStateChange={(active) => setIsInterviewStarted(active)} />
                  {isStudioFullscreen && (
                    <button
                      type="button"
                      className="mt-6 w-full rounded-full border border-white/30 px-4 py-2 text-sm text-white/80 hover:text-white"
                      onClick={() => setIsStudioFullscreen(false)}
                    >
                      Collapse studio
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),360px]">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(3,7,18,0.5)] backdrop-blur-xl">
                    <HistoryPanel adapter={adapter} onLoad={(s) => setViewSession(s)} />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(3,7,18,0.5)] backdrop-blur-xl">
                    <AnalyticsPanel />
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 shadow-[0_20px_40px_rgba(3,7,18,0.45)] backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Storage status</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Local-first</p>
                    <p className="mt-2">
                      Sessions are stored in-browser. Connect your backend later to sync using the REST adapter without changing
                      this workspace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <SiteFooter />
            </div>
          </div>
        </div>
      </div>

      {viewSession && <SessionViewerModal session={viewSession} onClose={() => setViewSession(null)} />}
    </div>
  );
}

