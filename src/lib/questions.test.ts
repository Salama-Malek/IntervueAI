import { describe, it, expect } from 'vitest';
import { getQuestions, getRoleKeywords } from './questions';

describe('questions', () => {
  describe('getQuestions', () => {
    it('should return questions for Frontend Junior', () => {
      const questions = getQuestions('Frontend', 'Junior');

      expect(questions).toBeDefined();
      expect(questions.length).toBeGreaterThanOrEqual(10);
      expect(questions[0]).toHaveProperty('text');
      expect(questions[0]).toHaveProperty('keywords');
    });

    it('should return questions for Backend Senior', () => {
      const questions = getQuestions('Backend', 'Senior');

      expect(questions).toBeDefined();
      expect(questions.length).toBeGreaterThanOrEqual(10);
    });

    it('should return different questions for different seniorities', () => {
      const juniorQuestions = getQuestions('Frontend', 'Junior');
      const seniorQuestions = getQuestions('Frontend', 'Senior');

      expect(juniorQuestions[0].text).not.toBe(seniorQuestions[0].text);
    });
  });

  describe('getRoleKeywords', () => {
    it('should return keywords for a role', () => {
      const keywords = getRoleKeywords('Frontend', 'Junior');

      expect(keywords).toBeDefined();
      expect(keywords.length).toBeGreaterThan(0);
      expect(Array.isArray(keywords)).toBe(true);
    });

    it('should return unique keywords', () => {
      const keywords = getRoleKeywords('Frontend', 'Junior');
      const uniqueKeywords = [...new Set(keywords)];

      expect(keywords.length).toBe(uniqueKeywords.length);
    });
  });
});
