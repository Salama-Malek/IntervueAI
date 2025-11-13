/**
 * Visual indicator for microphone activity
 */

interface MicGateIndicatorProps {
  isActive: boolean;
  isListening: boolean;
}

export function MicGateIndicator({
  isActive,
  isListening,
}: MicGateIndicatorProps) {
  if (!isListening) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
      <span
        className={`inline-flex h-2 w-2 rounded-full ${
          isActive ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]' : 'bg-white/30'
        }`}
        aria-label={isActive ? 'Voice detected' : 'Idle'}
      />
      {isActive ? 'Speaking' : 'Listening'}
    </div>
  );
}
