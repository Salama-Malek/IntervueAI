/**
 * Configuration panel for interview settings
 */

import type { Role, Seniority } from '../lib/questions';
import type { AdapterKind } from '../types/interview';
import type { InterviewConfig } from '../adapters/AdapterTypes';

type VisibleSection = 'role' | 'seniority' | 'language' | 'engine';

interface InterviewConfigPanelProps {
  role?: Role;
  seniority?: Seniority;
  language?: string;
  onRoleChange?: (role: Role) => void;
  onSeniorityChange?: (seniority: Seniority) => void;
  onLanguageChange?: (language: string) => void;
  adapter: AdapterKind;
  onAdapterChange: (adapter: AdapterKind) => void;
  disabled: boolean;
  visibleSections?: VisibleSection[];
  header?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  initialState?: InterviewConfig;
  onChange?: (changes: Partial<InterviewConfig>) => void;
}

const ROLES: Role[] = [
  'Frontend',
  'Backend',
  'Full-Stack',
  'Data Engineer',
  'Product Manager',
  'UX',
];

const SENIORITIES: Seniority[] = ['Junior', 'Mid', 'Senior'];

const LANGUAGES = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'ar-EG', label: 'Arabic (Egypt)' },
];

export function InterviewConfigPanel({
  role,
  seniority,
  language,
  onRoleChange,
  onSeniorityChange,
  onLanguageChange,
  adapter,
  onAdapterChange,
  disabled,
  visibleSections,
  header,
  initialState,
  onChange,
}: InterviewConfigPanelProps) {
  const sections = new Set<VisibleSection>(visibleSections ?? ['role', 'seniority', 'language', 'engine']);
  const headerEyebrow = header?.eyebrow ?? 'Configure';
  const headerTitle = header?.title ?? 'Session DNA';
  const headerDescription =
    header?.description ?? 'Blend roles, languages, and engines to sculpt the perfect mock lab.';

  const shouldRender = (section: VisibleSection) => sections.has(section);

  const currentRole = role ?? initialState?.role ?? 'Frontend';
  const currentSeniority = seniority ?? initialState?.seniority ?? 'Junior';
  const currentLanguage = language ?? initialState?.language ?? 'en-US';

  const handleRoleChange = (nextRole: Role) => {
    if (disabled) return;
    onRoleChange?.(nextRole);
    onChange?.({ role: nextRole });
  };

  const handleSeniorityChange = (nextSeniority: Seniority) => {
    if (disabled) return;
    onSeniorityChange?.(nextSeniority);
    onChange?.({ seniority: nextSeniority });
  };

  const handleLanguageChange = (nextLanguage: string) => {
    if (disabled) return;
    onLanguageChange?.(nextLanguage);
    onChange?.({ language: nextLanguage });
  };

  const handleAdapterChange = (nextAdapter: AdapterKind) => {
    if (disabled) return;
    onAdapterChange(nextAdapter);
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">{headerEyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold">{headerTitle}</h2>
        {headerDescription && <p className="text-sm text-white/60">{headerDescription}</p>}
      </div>

      {shouldRender('role') && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Role focus
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((r) => {
              const active = r === currentRole;
              return (
                <button
                  key={r}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleRoleChange(r)}
                  className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                    active
                      ? 'border-emerald-400 bg-emerald-400/10 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-pressed={active}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {shouldRender('seniority') && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Seniority</p>
          <div className="flex gap-2">
            {SENIORITIES.map((s) => {
              const active = s === currentSeniority;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSeniorityChange(s)}
                  className={`flex-1 rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? 'border-sky-400 bg-sky-400/10 text-white shadow-[0_0_25px_rgba(14,165,233,0.3)]'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-pressed={active}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {shouldRender('language') && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Language</p>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => {
              const active = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                    active
                      ? 'border-fuchsia-400 bg-fuchsia-400/10 text-white shadow-[0_0_25px_rgba(232,121,249,0.3)]'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-pressed={active}
                >
                  <div>{lang.label}</div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                    {lang.code}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {shouldRender('engine') && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Engine</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { value: 'local', label: 'Local scripts', sub: 'offline' },
              { value: 'rest', label: 'REST + AI', sub: 'cloud' },
            ].map((opt) => {
              const active = opt.value === adapter;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleAdapterChange(opt.value as AdapterKind)}
                  className={`rounded-2xl border px-3 py-3 text-left transition ${
                    active
                      ? 'border-purple-400 bg-purple-400/10 text-white shadow-[0_0_25px_rgba(167,139,250,0.35)]'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-pressed={active}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                    {opt.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}