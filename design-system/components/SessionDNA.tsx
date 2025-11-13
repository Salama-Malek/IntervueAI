/**
 * Session DNA control group (roles, seniority, language, adapter).
 * Tailwind usage: `className="space-y-6 text-white"`
 * Keyboard: buttons expose aria-pressed for toggle semantics.
 */
export interface SessionDnaOption {
  id: string;
  label: string;
  helper?: string;
}

export interface SessionDNAProps {
  title?: string;
  description?: string;
  groups: Array<{
    id: 'role' | 'seniority' | 'language' | 'engine' | string;
    label: string;
    options: SessionDnaOption[];
    value: string;
  }>;
  onSelect: (groupId: string, optionId: string) => void;
  disabled?: boolean;
}

export function SessionDNA({ title = 'Session DNA', description, groups, onSelect, disabled }: SessionDNAProps) {
  return (
    <section aria-labelledby="session-dna-heading" className="space-y-6 text-white">
      <header>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Configure</p>
        <h2 id="session-dna-heading" className="mt-2 text-2xl font-semibold">
          {title}
        </h2>
        {description && <p className="text-sm text-white/60">{description}</p>}
      </header>
      {groups.map((group) => (
        <div key={group.id} className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{group.label}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={group.label}>
            {group.options.map((option) => {
              const active = option.id === group.value;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`rounded-2xl border px-4 py-2 text-left text-sm transition focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    active ? 'border-emerald-400 bg-emerald-400/10 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-pressed={active}
                  disabled={disabled}
                  onClick={() => onSelect(group.id, option.id)}
                >
                  <span>{option.label}</span>
                  {option.helper && <p className="text-[0.55rem] uppercase tracking-[0.2em] text-white/40">{option.helper}</p>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}