import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TranscriptList } from './TranscriptList';
import type { Utterance } from '../lib/summarize';

describe('TranscriptList', () => {
  it('should render transcript utterances', () => {
    const transcript: Utterance[] = [
      {
        id: '1',
        speaker: 'ai',
        text: 'What is your experience?',
        startedAt: 1000,
        endedAt: 2000,
      },
      {
        id: '2',
        speaker: 'user',
        text: 'I have 5 years of experience.',
        startedAt: 3000,
        endedAt: 4000,
      },
    ];

    render(<TranscriptList transcript={transcript} />);

    expect(screen.getByText('What is your experience?')).toBeInTheDocument();
    expect(
      screen.getByText('I have 5 years of experience.')
    ).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
  });

  it('should render interim text with opacity', () => {
    const transcript: Utterance[] = [];

    render(
      <TranscriptList transcript={transcript} interimText="I am speaking..." />
    );

    expect(screen.getByText('I am speaking...')).toBeInTheDocument();
  });

  it('should render system messages', () => {
    const transcript: Utterance[] = [
      {
        id: '1',
        speaker: 'system',
        text: 'Interview started',
        startedAt: 1000,
        endedAt: 1100,
      },
    ];

    render(<TranscriptList transcript={transcript} />);

    expect(screen.getByText('Interview started')).toBeInTheDocument();
    expect(screen.getByText('SYSTEM')).toBeInTheDocument();
  });
});
