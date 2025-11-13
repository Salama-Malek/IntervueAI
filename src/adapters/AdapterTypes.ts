/**
 * Adapter interface for interview reply generation
 */

import type { Role, Seniority } from '../lib/questions';

export interface InterviewConfig {
  role: Role;
  seniority: Seniority;
  language: string;
  voice?: string;
}

export interface AdapterReply {
  text: string;
  score?: number;
  feedback?: string;
}

export interface InterviewAdapter {
  /**
   * Initialize the adapter with configuration
   */
  initialize(config: InterviewConfig): Promise<void>;

  /**
   * Get the first question to start the interview
   */
  getFirstQuestion(): Promise<AdapterReply>;

  /**
   * Process user's final response and get next question with feedback
   */
  onUserFinal(userText: string): Promise<AdapterReply>;

  /**
   * Clean up resources
   */
  cleanup(): void;
}
