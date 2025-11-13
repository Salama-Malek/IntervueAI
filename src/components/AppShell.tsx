/**
 * Main application shell rendered inside a dashboard layout with a fixed sidebar
 * and a focus mode for the interview studio.
 */

import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import type { InterviewConfig } from '../adapters/AdapterTypes';
import { InterviewConfigPanel } from './InterviewConfigPanel';
import { InterviewRoom } from './InterviewRoom';
import { getTextDirection } from '../lib/i18n';
import { HistoryPanel } from './HistoryPanel';
import { AnalyticsPanel } from './AnalyticsPanel';
import type { StoredSession } from '../lib/storage';
import type { AdapterKind } from '../types/interview';
import { SiteFooter } from './SiteFooter';
import { Header } from '../../design-system/components/Header';
import { LeftNav } from '../../design-system/components/LeftNav';
import { KPICard } from '../../design-system/components/KPICard';
import { PrimaryButton } from '../../design-system/components/PrimaryButton';

const SessionViewerModal = lazy(() => import('./SessionViewerModal'));

type NavLinkId = 'dashboard' | 'recordings' | 'insights' | 'library';

const NAV_LINKS: Array<{ id: NavLinkId; label: string; badge?: string }> = [
  { id: 'dashboard', label: 'Dashboard', badge: 'Live' },
  { id: 'recordings', label: 'Recordings', badge: '24' },
  { id: 'insights', label: 'Insights', badge: 'Pulse' },
  { id: 'library', label: 'Library', badge: 'Soon' },
];

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
  const [activeNav, setActiveNav] = useState<NavLinkId>('dashboard');

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

  const boardStatus = isInterviewStarted
    ? {
        label: 'Live capture',
        tone: 'live' as const,
      }
    : {
        label: 'Idle board',
        tone: 'idle' as const,
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

  const leftNavLinks = NAV_LINKS.map((link) => ({
    ...link,
    isActive: link.id === activeNav,
  }));

  const handleExportBoard = () => {
    console.info('Export board action requested');
  };

  const handleConfigChange = (changes: Partial<InterviewConfig>) => {
    setConfig((prev) => ({ ...prev, ...changes }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white" dir={textDirection}>
      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_-10%,rgba(109,40,217,0.35),transparent_50%),radial-gradient(circle_at_80%_-5%,rgba(56,189,248,0.25),transparent_45%)]" />

      <div className="relative z-10 min-h-screen xl:flex">
        <div className="xl:fixed xl:inset-y-0 xl:left-0 xl:z-20 xl:w-[380px]">
          <div className="flex h-full flex-col gap-6 border-b border-white/10 bg-slate-950/70 px-4 py-6 backdrop-blur xl:border-b-0 xl:border-r xl:px-6">
            <LeftNav
              brand={{ initials: 'IA', label: 'IntervueAI', version: '0.2' }}
              links={leftNavLinks}
              onSelect={(id) => setActiveNav(id as NavLinkId)}
              footer={
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
                  <p className="text-sm font-semibold text-white">Board status</p>
                  <p className="mt-1 text-white/80">{boardStatus.label}</p>
                </div>
              }
            />

            <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-[var(--shadow-glass-mid)]">
              <InterviewConfigPanel
                role={config.role}
                seniority={config.seniority}
                language={config.language}
                adapter={adapter}
                onAdapterChange={(a) => setAdapter(a)}
                disabled={isInterviewStarted}
                visibleSections={['role', 'seniority']}
                header={{
                  eyebrow: 'Configure',
                  title: 'Role & seniority',
                  description: 'Blend seniority and craft to focus each mock session.',
                }}
                initialState={config}
                onChange={handleConfigChange}
              />
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[var(--shadow-glass-low)]">
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/50">Session highlights</p>
              <dl className="mt-4 space-y-3 text-sm">
                {sessionHighlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    <dt className="text-[0.55rem] uppercase tracking-[0.35em] text-white/40">{item.label}</dt>
                    <dd className="mt-1 font-semibold text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-3xl border border-white/5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4 text-sm text-white/80">
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/60">Need a backend?</p>
              <p className="mt-2">
                This interface is frontend-only today. When you are ready to wire a backend, plug the REST adapter into your API
                or reach out to Salama for help.
              </p>
            </section>
          </div>
        </div>

        <div className="flex-1 xl:ml-[380px]">
          <div className="px-4 py-6 sm:px-8">
            <Header
              eyebrow="Ops center"
              title="Practice monitor"
              description="Track transcripts, analytics, and storage from a single board."
              statusChip={{ label: boardStatus.label, tone: boardStatus.tone }}
              actions={
                <div className="flex flex-wrap items-center gap-3">
                  <PrimaryButton variant="ghost" label="Export board" onClick={handleExportBoard} />
                  <div className="hidden sm:block rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-white/60">
                    <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/40">Active nav</p>
                    <p className="font-semibold text-white">{activeNav}</p>
                  </div>
                </div>
              }
            />

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <KPICard key={stat.label} label={stat.label} value={stat.value} detail={stat.detail} />
              ))}
            </section>

            <div className="mt-6 space-y-6">
              <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[var(--shadow-glass-mid)]">
                <InterviewConfigPanel
                  role={config.role}
                  seniority={config.seniority}
                  language={config.language}
                  adapter={adapter}
                  onAdapterChange={(a) => setAdapter(a)}
                  disabled={isInterviewStarted}
                  visibleSections={['language', 'engine']}
                  header={{
                    eyebrow: 'Live toggles',
                    title: 'Language & engine',
                    description: 'Adjust voice + adapter before each question.',
                  }}
                  initialState={config}
                  onChange={handleConfigChange}
                />
              </section>

              {isStudioFullscreen && <div className="fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-md" />}
              <div
                className={`rounded-[32px] border border-white/5 bg-white/5 p-1 shadow-[var(--shadow-glass-high)] backdrop-blur-2xl transition-all ${
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
                      <PrimaryButton
                        variant="ghost"
                        label={focusButtonLabel}
                        onClick={() => setIsStudioFullscreen((prev) => !prev)}
                      />
                      <span className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.35em] border-white/10 text-white/70">
                        {boardStatus.label}
                      </span>
                    </div>
                  </div>
                  <InterviewRoom config={config} adapter={adapter} onSessionStateChange={(active) => setIsInterviewStarted(active)} />
                  {isStudioFullscreen && (
                    <PrimaryButton
                      className="mt-6 w-full"
                      variant="ghost"
                      label="Collapse studio"
                      onClick={() => setIsStudioFullscreen(false)}
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),360px]">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[var(--shadow-glass-mid)]">
                    <HistoryPanel adapter={adapter} onLoad={(s) => setViewSession(s)} />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[var(--shadow-glass-mid)]">
                    <AnalyticsPanel />
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 shadow-[var(--shadow-glass-mid)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">Storage status</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Local-first</p>
                    <p className="mt-2">
                      Sessions are stored in-browser. Connect your backend later to sync using the REST adapter without changing this workspace.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <SiteFooter />
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewSession && (
        <Suspense fallback={null}>
          <SessionViewerModal session={viewSession} onClose={() => setViewSession(null)} />
        </Suspense>
      )}
    </div>
  );
}
