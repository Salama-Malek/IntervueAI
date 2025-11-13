/**
 * Heuristic scoring for interview responses
 */

import type { Role, Seniority } from './questions';
import { getRoleKeywords } from './questions';

const STRUCTURE_MARKERS = [
  'first',
  'second',
  'third',
  'however',
  'therefore',
  'because',
  'finally',
  'additionally',
  'moreover',
  'furthermore',
  'consequently',
  'thus',
  'hence',
];

const TARGET_WORD_COUNT_MIN = 50;
const TARGET_WORD_COUNT_MAX = 120;

export interface ScoreResult {
  score: number;
  feedback: string;
  breakdown: {
    length: number;
    structure: number;
    technical: number;
  };
}

/**
 * Count words in a text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Normalize length score (0-1)
 * Target: 50-120 words
 */
function scoreLengthNormalized(wordCount: number): number {
  if (wordCount < TARGET_WORD_COUNT_MIN) {
    return Math.max(0, wordCount / TARGET_WORD_COUNT_MIN);
  }
  if (wordCount > TARGET_WORD_COUNT_MAX) {
    const excess = wordCount - TARGET_WORD_COUNT_MAX;
    return Math.max(0, 1 - excess / 100);
  }
  return 1;
}

/**
 * Score structure based on markers (0-1)
 */
function scoreStructure(text: string): number {
  const lowerText = text.toLowerCase();
  const foundMarkers = STRUCTURE_MARKERS.filter((marker) =>
    lowerText.includes(marker)
  );
  // Normalize: max 5 markers = 1.0
  return Math.min(1, foundMarkers.length / 5);
}

/**
 * Score technical content based on role keywords (0-1)
 */
function scoreTechnical(
  text: string,
  role: Role,
  seniority: Seniority
): number {
  const keywords = getRoleKeywords(role, seniority);
  const lowerText = text.toLowerCase();
  const foundKeywords = keywords.filter((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );
  // Normalize: max 10 keywords = 1.0
  return Math.min(1, foundKeywords.length / 10);
}

/**
 * Generate feedback based on score breakdown
 */
function generateFeedback(
  breakdown: ScoreResult['breakdown'],
  wordCount: number
): string {
  const feedback: string[] = [];

  if (breakdown.length < 0.7) {
    if (wordCount < TARGET_WORD_COUNT_MIN) {
      feedback.push('Try to elaborate more on your answer.');
    } else {
      feedback.push('Your answer is quite lengthy; try to be more concise.');
    }
  } else {
    feedback.push('Good answer length.');
  }

  if (breakdown.structure < 0.5) {
    feedback.push(
      'Consider structuring your response with clear transitions (e.g., first, however, therefore).'
    );
  } else {
    feedback.push('Well-structured response.');
  }

  if (breakdown.technical < 0.5) {
    feedback.push(
      'Include more technical details and relevant keywords for this role.'
    );
  } else {
    feedback.push('Strong technical content.');
  }

  return feedback.join(' ');
}

/**
 * Score an interview response
 * Returns a score from 0-100 with feedback
 */
export function scoreResponse(
  text: string,
  role: Role,
  seniority: Seniority
): ScoreResult {
  const wordCount = countWords(text);

  const lengthScore = scoreLengthNormalized(wordCount);
  const structureScore = scoreStructure(text);
  const technicalScore = scoreTechnical(text, role, seniority);

  // Weighted combination: 30% length, 30% structure, 40% technical
  const totalScore = Math.round(
    lengthScore * 0.3 * 100 +
      structureScore * 0.3 * 100 +
      technicalScore * 0.4 * 100
  );

  const breakdown = {
    length: Math.round(lengthScore * 100),
    structure: Math.round(structureScore * 100),
    technical: Math.round(technicalScore * 100),
  };

  const feedback = generateFeedback(breakdown, wordCount);

  return {
    score: totalScore,
    feedback,
    breakdown,
  };
}
