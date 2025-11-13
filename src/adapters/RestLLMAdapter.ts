/**
 * REST-backed adapter that delegates question/feedback to a backend API
 */

import type {
  InterviewAdapter,
  InterviewConfig,
  AdapterReply,
} from './AdapterTypes';
import type {
  StartSessionRequest,
  StartSessionResponse,
  NextTurnRequest,
  NextTurnResponse,
} from '../lib/apiTypes';
import { createApiClient } from '../lib/apiClient';

export class RestLLMAdapter implements InterviewAdapter {
  private config: InterviewConfig | null = null;
  private sessionId: string | null = null;
  private cachedFirst: AdapterReply | null = null;
  private api = createApiClient();

  async initialize(config: InterviewConfig): Promise<void> {
    this.config = config;
    this.sessionId = null;
    this.cachedFirst = null;

    const payload: StartSessionRequest = { ...config };
    const res = await this.api.request<StartSessionResponse>(
      '/sessions/start',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    this.sessionId = res.sessionId;
    this.cachedFirst = { ...res.firstQuestion };
  }

  async getFirstQuestion(): Promise<AdapterReply> {
    if (!this.config) throw new Error('Adapter not initialized');
    if (this.cachedFirst) {
      const first = this.cachedFirst;
      this.cachedFirst = null;
      return first;
    }
    // Optional: try to fetch from backend if not cached
    if (!this.sessionId) throw new Error('Missing session');
    const res = await this.api.request<{ text: string }>(
      `/sessions/${this.sessionId}/first`,
      { method: 'GET' }
    );
    return { text: res.text };
  }

  async onUserFinal(userText: string): Promise<AdapterReply> {
    if (!this.config || !this.sessionId)
      throw new Error('Adapter not initialized');

    const payload: NextTurnRequest = { userText };
    const res = await this.api.request<NextTurnResponse>(
      `/sessions/${this.sessionId}/message`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    return { ...res.reply };
  }

  cleanup(): void {
    this.config = null;
    this.sessionId = null;
    this.cachedFirst = null;
  }

}
