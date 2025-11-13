import { describe, it, expect } from 'vitest';
import { calculateSummary, type Utterance } from './summarize';

describe('calculateSummary', () => {
  it('should calculate correct metrics from transcript', () => {
    const transcript: Utterance[] = [
      {
        id: '1',
        speaker: 'system',
        text: 'Interview started',
        startedAt: 1000,
        endedAt: 1100,
      },
      {
        id: '2',
        speaker: 'ai',
        text: 'What is your experience with React?',
        startedAt: 1200,
        endedAt: 1500,
      },
      {
        id: '3',
        speaker: 'user',
        text: 'I have three years of experience with React and Redux.',
        startedAt: 2000,
        endedAt: 3000,
      },
      {
        id: '4',
        speaker: 'ai',
        text: 'Can you explain hooks?',
        startedAt: 3500,
        endedAt: 4000,
      },
      {
        id: '5',
        speaker: 'user',
        text: 'Hooks are functions that let you use state in functional components.',
        startedAt: 4500,
        endedAt: 5500,
      },
    ];

    const summary = calculateSummary(transcript);

    expect(summary.turns).toBe(2); // Two user utterances
    expect(summary.userWordCount).toBeGreaterThan(0);
    expect(summary.aiQuestions).toBe(2); // Two AI questions
    expect(summary.metrics.totalDurationMs).toBe(4500); // 5500 - 1000
  });

  it('should handle empty transcript', () => {
    const summary = calculateSummary([]);

    expect(summary.turns).toBe(0);
    expect(summary.userWordCount).toBe(0);
    expect(summary.aiQuestions).toBe(0);
  });

  it('should count words correctly', () => {
    const transcript: Utterance[] = [
      {
        id: '1',
        speaker: 'user',
        text: 'This is a test with ten words in this sentence.',
        startedAt: 1000,
        endedAt: 2000,
      },
    ];

    const summary = calculateSummary(transcript);

    expect(summary.userWordCount).toBe(10);
  });
});
