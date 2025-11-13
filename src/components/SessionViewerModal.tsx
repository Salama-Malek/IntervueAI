import type { StoredSession } from '../lib/storage';
import { Dialog } from './Dialog';

interface SessionViewerModalProps {
  session: StoredSession;
  onClose: () => void;
}

export function SessionViewerModal({ session, onClose }: SessionViewerModalProps) {
  const titleId = `session-viewer-${session.id}`;
  return (
    <Dialog open labelledBy={titleId} onClose={onClose}>
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Session playback</p>
          <h3 id={titleId} className="text-2xl font-semibold">
            {session.config.role} / {session.config.seniority}
          </h3>
          <p className="text-xs text-white/50">{new Date(session.createdAt).toLocaleString()}</p>
        </div>
        <button
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="grid max-h-[80vh] grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-2">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Summary</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Turns / {session.metrics.turns}</li>
            <li>User words / {session.metrics.userWordCount}</li>
            <li>AI questions / {session.metrics.aiQuestions}</li>
            <li>Avg response / {session.metrics.metrics['avgResponseTimeMs']} ms</li>
            <li>Total duration / {session.metrics.metrics['totalDurationMs']} ms</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Transcript</h4>
          <div className="max-h-[60vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-3">
            <ul className="space-y-2 text-sm">
              {session.transcript.map((u) => (
                <li key={u.id} className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2">
                  <span className="mr-2 text-xs uppercase tracking-[0.4em] text-white/50">
                    {u.speaker.toUpperCase()}
                  </span>
                  <span className="text-white/90">{u.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
