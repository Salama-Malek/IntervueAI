/**
 * Session summary and metrics calculation
 */

export type Speaker = 'user' | 'ai' | 'system';

export interface Utterance {
  id: string;
  speaker: Speaker;
  text: string;
  startedAt: number;
  endedAt?: number;
}

export interface SessionSummary {
  turns: number;
  userWordCount: number;
  aiQuestions: number;
  metrics: Record<string, number>;
}

/**
 * Count words in a text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Calculate session summary from transcript
 */
export function calculateSummary(
  transcript: Utterance[]
): SessionSummary {
  const userUtterances = transcript.filter((u) => u.speaker === 'user');
  const aiUtterances = transcript.filter((u) => u.speaker === 'ai');

  const userWordCount = userUtterances.reduce(
    (sum, u) => sum + countWords(u.text),
    0
  );

  // Count AI questions (utterances ending with '?')
  const aiQuestions = aiUtterances.filter((u) => u.text.includes('?')).length;

  // Calculate average response time (if timestamps are available)
  const responseTimes: number[] = [];
  for (let i = 1; i < transcript.length; i++) {
    const prev = transcript[i - 1];
    const curr = transcript[i];
    if (prev.endedAt && curr.startedAt) {
      responseTimes.push(curr.startedAt - prev.endedAt);
    }
  }

  const avgResponseTime =
    responseTimes.length > 0
      ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
      : 0;

  // Try to extract a final score from the last AI utterance if it follows
  // the pattern: "Score: NN/100"
  let finalScore = 0;
  if (aiUtterances.length > 0) {
    const lastAi = aiUtterances[aiUtterances.length - 1];
    const m = /Score:\s*(\d{1,3})\s*\/\s*100/i.exec(lastAi.text);
    if (m) {
      const val = Number(m[1]);
      if (!Number.isNaN(val)) {
        finalScore = Math.max(0, Math.min(100, Math.round(val)));
      }
    }
  }

  return {
    turns: userUtterances.length,
    userWordCount,
    aiQuestions,
    metrics: {
      avgResponseTimeMs: Math.round(avgResponseTime),
      totalDurationMs:
        transcript.length > 0 && transcript[transcript.length - 1].endedAt
          ? transcript[transcript.length - 1].endedAt! - transcript[0].startedAt
          : 0,
      finalScore,
    },
  };
}
