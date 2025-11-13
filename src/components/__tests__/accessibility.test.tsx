import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { TranscriptList } from '../TranscriptList';
import { SiteFooter } from '../SiteFooter';
import type { Utterance } from '../../lib/summarize';

describe('accessibility snapshots', () => {
  it('renders transcript list with diarized badges', () => {
    const transcript: Utterance[] = [
      {
        id: 'u1',
        speaker: 'user',
        text: 'I optimize bundle size by code-splitting adapters.',
        startedAt: Date.now(),
        endedAt: Date.now(),
      },
      {
        id: 'a1',
        speaker: 'ai',
        text: 'Score: 85/100. Next question: explain memoization tradeoffs.',
        startedAt: Date.now(),
        endedAt: Date.now(),
      },
    ];
    const { container } = render(<TranscriptList transcript={transcript} interimText="Typing…" />);
    expect(container).toMatchSnapshot();
  });

  it('renders footer with contact links + roles', () => {
    const { container, getByRole } = render(<SiteFooter />);
    expect(getByRole('contentinfo')).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});