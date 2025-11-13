/**
 * Transcript display with diarization
 */

import type { Utterance } from '../lib/summarize';

interface TranscriptListProps {
  transcript: Utterance[];
  interimText?: string;
}

export function TranscriptList({
  transcript,
  interimText,
}: TranscriptListProps) {
  const getSpeakerColor = (speaker: Utterance['speaker']) => {
    switch (speaker) {
      case 'user':
        return 'bg-gradient-to-r from-sky-500 to-cyan-400';
      case 'ai':
        return 'bg-gradient-to-r from-fuchsia-500 to-purple-500';
      case 'system':
        return 'bg-white/20';
    }
  };

  const getSpeakerLabel = (speaker: Utterance['speaker']) => {
    switch (speaker) {
      case 'user':
        return 'USER';
      case 'ai':
        return 'AI';
      case 'system':
        return 'SYSTEM';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {transcript.map((utterance) => (
        <div key={utterance.id} className="flex gap-3">
          <div
            className={`flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold text-white tracking-widest ${getSpeakerColor(
              utterance.speaker
            )}`}
          >
            {getSpeakerLabel(utterance.speaker)}
          </div>
          <div className="flex-1 rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-white/90">
            {utterance.text}
          </div>
        </div>
      ))}
      {interimText && (
        <div className="flex gap-3 opacity-60">
          <div className="flex-shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-3 py-1 text-[11px] font-semibold text-white tracking-widest">
            USER
          </div>
          <div className="flex-1 rounded-2xl border border-white/5 bg-white/5 px-4 py-2 italic text-white/60">
            {interimText}
          </div>
        </div>
      )}
    </div>
  );
}
