import { createApiClient } from './apiClient';
import type {
  PersistSessionRequest,
  PersistSessionResponse,
  SessionsResponse,
} from './apiTypes';
import type { StoredSession } from './storage';

const api = createApiClient();

export async function persistSession(
  payload: PersistSessionRequest
): Promise<PersistSessionResponse> {
  return api.request<PersistSessionResponse>(
    `/sessions/${payload.sessionId}/persist`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}

export async function fetchSessions(): Promise<StoredSession[]> {
  const response = await api.request<SessionsResponse>('/sessions', {
    method: 'GET',
  });

  return response.sessions.map(convertToStoredSession);
}

function convertToStoredSession(record: PersistSessionRequest): StoredSession {
  return {
    id: record.sessionId,
    config: record.config,
    transcript: record.transcript,
    metrics: record.summary,
    createdAt: record.createdAt ?? new Date().toISOString(),
  };
}
