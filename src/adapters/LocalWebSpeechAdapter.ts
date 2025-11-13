/**
 * Local adapter using scripted questions and heuristic scoring
 */

import type {
  InterviewAdapter,
  InterviewConfig,
  AdapterReply,
} from './AdapterTypes';
import { getQuestions, type Question } from '../lib/questions';
import { scoreResponse } from '../lib/scoring';

export class LocalWebSpeechAdapter implements InterviewAdapter {
  private config: InterviewConfig | null = null;
  private questions: Question[] = [];
  private currentQuestionIndex = 0;

  async initialize(config: InterviewConfig): Promise<void> {
    this.config = config;
    this.questions = getQuestions(config.role, config.seniority);
    this.currentQuestionIndex = 0;
  }

  async getFirstQuestion(): Promise<AdapterReply> {
    if (!this.config || this.questions.length === 0) {
      throw new Error('Adapter not initialized');
    }

    const question = this.questions[0];
    this.currentQuestionIndex = 0;

    return {
      text: question.text,
    };
  }

  async onUserFinal(userText: string): Promise<AdapterReply> {
    if (!this.config) {
      throw new Error('Adapter not initialized');
    }

    // Score the user's response
    const scoreResult = scoreResponse(
      userText,
      this.config.role,
      this.config.seniority
    );

    // Move to next question
    this.currentQuestionIndex++;

    // Check if we have more questions
    if (this.currentQuestionIndex >= this.questions.length) {
      return {
        text: `Score: ${scoreResult.score}/100. ${scoreResult.feedback}. That concludes our interview. Thank you for your time!`,
        score: scoreResult.score,
        feedback: scoreResult.feedback,
      };
    }

    const nextQuestion = this.questions[this.currentQuestionIndex];

    return {
      text: `Score: ${scoreResult.score}/100. ${scoreResult.feedback}. Next question: ${nextQuestion.text}`,
      score: scoreResult.score,
      feedback: scoreResult.feedback,
    };
  }

  cleanup(): void {
    this.config = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
  }
}
