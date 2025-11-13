import { http, HttpResponse } from 'msw';
import type { InterviewConfig } from '../adapters/AdapterTypes';
import { getQuestions } from '../lib/questions';
import { scoreResponse } from '../lib/scoring';
import type { PersistSessionRequest } from '../lib/apiTypes';

interface SessionState {
  id: string;
  config: InterviewConfig;
  questionIndex: number;
  questions: { text: string }[];
}

const sessions = new Map<string, SessionState>();
const remoteSessions: PersistSessionRequest[] = [];

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

const base =
  ((import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL ?? '/api');
const endpoint = (path: string) => `${base.replace(/\/$/, '')}${path}`;

export const handlers = [
  http.post(endpoint('/sessions/start'), async ({ request }) => {
    const body = (await request.json()) as InterviewConfig;
    if (!body?.role || !body?.seniority || !body?.language) {
      return HttpResponse.json({ message: 'Invalid config' }, { status: 400 });
    }
    const id = makeId();
    const questions = getQuestions(body.role, body.seniority);
    sessions.set(id, {
      id,
      config: body,
      questionIndex: 0,
      questions,
    });
    return HttpResponse.json({
      sessionId: id,
      firstQuestion: { text: questions[0]?.text ?? 'No questions available.' },
    });
  }),

  http.get(endpoint('/sessions/:sessionId/first'), ({ params }) => {
    const session = sessions.get(params.sessionId as string);
    if (!session) {
      return HttpResponse.json({ message: 'Session not found' }, { status: 404 });
    }
    return HttpResponse.json({ text: session.questions[0]?.text ?? '' });
  }),

  http.post(endpoint('/sessions/:sessionId/message'), async ({ params, request }) => {
    const session = sessions.get(params.sessionId as string);
    if (!session) {
      return HttpResponse.json({ message: 'Session not found' }, { status: 404 });
    }
    const { userText } = (await request.json()) as { userText?: string };
    if (!userText) {
      return HttpResponse.json({ message: 'userText required' }, { status: 400 });
    }
    const { score, feedback } = scoreResponse(
      userText,
      session.config.role,
      session.config.seniority
    );
    session.questionIndex += 1;
    const done = session.questionIndex >= session.questions.length;
    const responseText = done
      ? `Score: ${score}/100. ${feedback} That concludes our interview. Thank you!`
      : `Score: ${score}/100. ${feedback} Next question: ${session.questions[session.questionIndex].text}`;

    if (done) {
      sessions.delete(session.id);
    }

    return HttpResponse.json({
      reply: {
        text: responseText,
        score,
        feedback,
      },
    });
  }),

  http.post(endpoint('/sessions/:sessionId/persist'), async ({ params, request }) => {
    const sessionId = params.sessionId as string;
    const body = (await request.json()) as PersistSessionRequest;
    if (!body?.summary || !body?.transcript || !body?.config) {
      return HttpResponse.json({ message: 'Invalid session payload' }, { status: 400 });
    }
    sessions.delete(sessionId);
    remoteSessions.unshift({
      ...body,
      createdAt: body.createdAt ?? new Date().toISOString(),
    });
    return HttpResponse.json({ stored: true });
  }),

  http.get(endpoint('/sessions'), () => {
    return HttpResponse.json({ sessions: remoteSessions.slice(0, 50) });
  }),
];
