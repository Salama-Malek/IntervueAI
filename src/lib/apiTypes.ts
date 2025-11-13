/**
 * REST API DTOs for the backend-facing interview adapter
 */

import type { InterviewConfig } from '../adapters/AdapterTypes';
import type { SessionSummary, Utterance } from './summarize';

export type SessionId = string;

// Request/Response payloads
export interface StartSessionRequest extends InterviewConfig {}

export interface AdapterReplyDTO {
  text: string;
  score?: number;
  feedback?: string;
}

export interface StartSessionResponse {
  sessionId: SessionId;
  firstQuestion: AdapterReplyDTO;
}

export interface NextTurnRequest {
  userText: string;
}

export interface NextTurnResponse {
  reply: AdapterReplyDTO;
}

export interface PersistSessionRequest {
  sessionId: SessionId;
  config: InterviewConfig;
  transcript: Utterance[];
  summary: SessionSummary;
  createdAt: string;
}

export interface PersistSessionResponse {
  stored: boolean;
}

export interface SessionsResponse {
  sessions: PersistSessionRequest[];
}

// Minimal client error shape
export interface ApiError {
  status: number;
  message: string;
}

export function isApiError(value: unknown): value is ApiError {
  return (
    !!value &&
    typeof value === 'object' &&
    'status' in value &&
    'message' in value
  );
}
