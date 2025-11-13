import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Gradient CTA used for "Begin Session" and similar actions.
 * Tailwind usage: `className="bg-gradient-to-r from-emerald-500 to-cyan-400"`
 * Keyboard: exposes :focus-visible ring + `aria-busy` when loading.
 */
export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'danger' | 'ghost';
  label: string;
}

const VARIANTS: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
  primary: 'from-emerald-500 to-cyan-400 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)]',
  danger: 'from-rose-500 to-red-500 text-white shadow-[0_10px_30px_rgba(244,63,94,0.35)]',
  ghost: 'from-transparent to-transparent text-white/80 border border-white/30 shadow-none',
};

export function PrimaryButton({ icon, loading, variant = 'primary', label, className = '', disabled, ...props }: PrimaryButtonProps) {
  const stateClasses = disabled || loading ? 'cursor-not-allowed opacity-40' : 'hover:translate-y-0.5';
  return (
    <button
      type="button"
      {...props}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
        VARIANTS[variant]
      } ${stateClasses} ${className}`}
    >
      {icon}
      <span>{loading ? 'Loading…' : label}</span>
    </button>
  );
}