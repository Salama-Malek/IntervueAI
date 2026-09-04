/**
 * Configuration panel for interview settings
 */

import type { Role, Seniority } from '../lib/questions';
import type { AdapterKind } from '../types/interview';

interface InterviewConfigPanelProps {
  role: Role;
  seniority: Seniority;
  language: string;
  onRoleChange: (role: Role) => void;
  onSeniorityChange: (seniority: Seniority) => void;
  onLanguageChange: (language: string) => void;
  adapter: AdapterKind;
  onAdapterChange: (adapter: AdapterKind) => void;
  disabled: boolean;
  visibleSections?: string[];
  header?: {
    eyebrow: string;
    title: string;
    description: string;
  };
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
}: InterviewConfigPanelProps) {
  return (
    <div className="space-y-6 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Configure</p>
        <h2 className="mt-2 text-2xl font-semibold">Session DNA</h2>
        <p className="text-sm text-white/60">
          Blend roles, languages, and engines to sculpt the perfect mock lab.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Role focus
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map((r) => {
            const active = r === role;
            return (
              <button
                key={r}
                type="button"
                disabled={disabled}
                onClick={() => onRoleChange(r)}
                className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                  active
                    ? 'border-emerald-400 bg-emerald-400/10 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Seniority</p>
        <div className="flex gap-2">
          {SENIORITIES.map((s) => {
            const active = s === seniority;
            return (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => onSeniorityChange(s)}
                className={`flex-1 rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? 'border-sky-400 bg-sky-400/10 text-white shadow-[0_0_25px_rgba(14,165,233,0.3)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Language</p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => {
            const active = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                disabled={disabled}
                onClick={() => onLanguageChange(lang.code)}
                className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                  active
                    ? 'border-fuchsia-400 bg-fuchsia-400/10 text-white shadow-[0_0_25px_rgba(232,121,249,0.3)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
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
                onClick={() => onAdapterChange(opt.value as AdapterKind)}
                className={`rounded-2xl border px-3 py-3 text-left transition ${
                  active
                    ? 'border-purple-400 bg-purple-400/10 text-white shadow-[0_0_25px_rgba(167,139,250,0.35)]'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
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
    </div>
  );
}

