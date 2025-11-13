/**
 * Visual indicator for microphone activity
 */

interface MicGateIndicatorProps {
  isActive: boolean;
  isListening: boolean;
}

export function MicGateIndicator({ isActive, isListening }: MicGateIndicatorProps) {
  const statusText = isListening ? (isActive ? 'Speaking' : 'Listening') : 'Mic idle';
  const srText = isListening
    ? isActive
      ? 'Microphone detected speech'
      : 'Microphone listening'
    : 'Microphone idle';

  return (
    <div
      className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60"
      role="status"
      aria-live="polite"
    >
      <span
        className={`inline-flex h-2 w-2 rounded-full ${
          isActive ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]' : 'bg-white/30'
        }`}
        aria-hidden="true"
      />
      <span aria-hidden="true">{statusText}</span>
      <span className="sr-only">{srText}</span>
    </div>
  );
}
