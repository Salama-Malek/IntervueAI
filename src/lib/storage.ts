import type { InterviewConfig } from '../adapters/AdapterTypes';
import type { SessionSummary, Utterance } from './summarize';

export interface StoredSession {
  id: string;
  config: InterviewConfig;
  transcript: Utterance[];
  metrics: SessionSummary;
  createdAt: string; // ISO
}

const KEY = 'intervueai:sessions:v1';

function readAll(): StoredSession[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as StoredSession[];
    return [];
  } catch {
    return [];
  }
}

function writeAll(list: StoredSession[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function saveSession(session: StoredSession) {
  const list = readAll();
  const idx = list.findIndex((s) => s.id === session.id);
  if (idx >= 0) list[idx] = session;
  else list.unshift(session);
  writeAll(list);
}

export function listSessions(): StoredSession[] {
  return readAll();
}

export function getSession(id: string): StoredSession | undefined {
  return readAll().find((s) => s.id === id);
}

export function deleteSession(id: string) {
  const list = readAll().filter((s) => s.id !== id);
  writeAll(list);
}

