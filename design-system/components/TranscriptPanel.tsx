/**
 * Transcript log wrapper with diarized chips.
 * Tailwind usage: `className="rounded-3xl border border-white/10 bg-black/20"`
 * Accessibility: role="log" w/ aria-live polite for interim text.
 */
export interface TranscriptEntry {
  id: string;
  speaker: 'user' | 'ai' | 'system';
  text: string;
}

export interface TranscriptPanelProps {
  entries: TranscriptEntry[];
  interimText?: string;
}

const chipStyles: Record<TranscriptEntry['speaker'], string> = {
  user: 'from-sky-500 to-cyan-400',
  ai: 'from-fuchsia-500 to-purple-500',
  system: 'from-white/40 to-white/20 text-slate-900',
};

export function TranscriptPanel({ entries, interimText }: TranscriptPanelProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/20 p-5" aria-label="Transcript" role="log" aria-live="polite">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">Live feed</p>
          <h2 className="text-2xl font-semibold text-white">Transcript</h2>
        </div>
        <p className="text-xs text-white/60">{entries.length ? 'Capturing responses' : 'Idle'}</p>
      </header>
      <div className="flex flex-col gap-3">
        {entries.map((utterance) => (
          <div key={utterance.id} className="flex gap-3">
            <span className={`flex-shrink-0 rounded-full bg-gradient-to-r px-3 py-1 text-[0.65rem] font-semibold tracking-[0.35em] text-white ${
              chipStyles[utterance.speaker]
            }`}>
              {utterance.speaker.toUpperCase()}
            </span>
            <p className="flex-1 rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-white/90">{utterance.text}</p>
          </div>
        ))}
        {interimText && (
          <div className="flex gap-3 opacity-70">
            <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.35em] text-white">
              USER
            </span>
            <p className="flex-1 rounded-2xl border border-dashed border-white/10 px-4 py-2 text-sm text-white/60">{interimText}</p>
          </div>
        )}
      </div>
    </section>
  );
}