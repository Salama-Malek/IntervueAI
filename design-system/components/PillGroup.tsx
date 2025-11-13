/**
 * Generic pill selector for chips like Session highlights.
 * Tailwind usage: `className="rounded-full border px-4 py-2"`
 * Keyboard: uses radiogroup semantics for predictability.
 */
export interface PillOption {
  id: string;
  label: string;
  badge?: string;
}

export interface PillGroupProps {
  label: string;
  options: PillOption[];
  value: string;
  onChange: (id: string) => void;
}

export function PillGroup({ label, options, value, onChange }: PillGroupProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            role="radio"
            aria-checked={selected}
            type="button"
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              selected ? 'border-cyan-300 text-white' : 'border-white/15 text-white/70 hover:border-white/40'
            }`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
            {option.badge && <span className="ml-2 text-[0.55rem] text-white/50">{option.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}