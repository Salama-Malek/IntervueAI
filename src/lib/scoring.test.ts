import { describe, it, expect } from 'vitest';
import { scoreResponse } from './scoring';

describe('scoreResponse', () => {
  it('should score a well-structured technical response highly', () => {
    const text = `First, I would use React hooks for state management because they provide 
    a clean and functional approach. Second, I would implement useEffect for side effects. 
    However, for complex state, I might consider using Context API or Redux. Therefore, 
    the choice depends on the application's complexity and requirements.`;

    const result = scoreResponse(text, 'Frontend', 'Junior');

    expect(result.score).toBeGreaterThan(60);
    expect(result.feedback).toBeDefined();
    expect(result.breakdown.structure).toBeGreaterThan(50);
    expect(result.breakdown.technical).toBeGreaterThan(0);
  });

  it('should score a short response lower', () => {
    const text = 'I would use React hooks.';

    const result = scoreResponse(text, 'Frontend', 'Junior');

    expect(result.score).toBeLessThan(50);
    expect(result.breakdown.length).toBeLessThan(50);
  });

  it('should score a response without structure markers lower', () => {
    const text = `I would use React hooks for state management. 
    They provide a clean approach. I would implement useEffect. 
    For complex state I might use Context API. The choice depends on complexity.`;

    const result = scoreResponse(text, 'Frontend', 'Junior');

    expect(result.breakdown.structure).toBeLessThan(50);
  });

  it('should score a response without technical keywords lower', () => {
    const text = `First, I think this is important. Second, we should consider 
    various options. However, the final decision depends on many factors. 
    Therefore, we need to analyze carefully. Finally, we can make a choice.`;

    const result = scoreResponse(text, 'Frontend', 'Junior');

    expect(result.breakdown.technical).toBeLessThan(30);
  });
});
