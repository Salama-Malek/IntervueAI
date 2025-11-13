import express from 'express';
import cors from 'cors';

const SEED_QUESTIONS = {
  Frontend: [
    'Explain the difference between useEffect and useLayoutEffect.',
    'How would you improve performance in a large React app?',
    'Describe how the browser rendering pipeline works.',
    'When would you use memoization in React and why?',
    'What are common accessibility pitfalls and fixes?',
  ],
  Backend: [
    'Design a rate limiter for an API.',
    'Explain database indexing and when it hurts.',
    'How do you scale a write-heavy service?',
    'Contrast REST, gRPC, and GraphQL tradeoffs.',
    'How to handle idempotency in payment APIs?',
  ],
  'Full-Stack': [
    'Design end-to-end auth with email verification.',
    'How do you structure a monorepo vs polyrepo?',
    'Describe a caching strategy across client and server.',
    'What is an effective error-handling strategy?',
    'Discuss CI/CD for a full-stack app.',
  ],
  'Data Engineer': [
    'Design a daily ETL for user events at scale.',
    'Partitioning vs bucketing in data lakes?',
    'How do you ensure data quality and lineage?',
    'Batch vs streaming: when and why?',
    'Optimize a slow warehouse query.',
  ],
  'Product Manager': [
    'Define success metrics for a new onboarding.',
    'Prioritize features for a v1 roadmap.',
    'How do you run effective A/B tests?',
    'Gathering requirements from enterprise customers.',
    'Handling conflicting stakeholder priorities.',
  ],
  UX: [
    'Walk through your design process for a new feature.',
    'How do you validate usability early?',
    'Design for accessibility in complex UIs.',
    'When to use motion and micro-interactions?',
    'Approach to design debt and cleanup.',
  ],
};

const STRUCTURE_MARKERS = [
  'first',
  'second',
  'however',
  'therefore',
  'finally',
  'additionally',
  'moreover',
  'thus',
];
const TARGET_MIN = 50;
const TARGET_MAX = 120;
const ROLE_KEYWORDS = {
  Frontend: ['react', 'performance', 'accessibility', 'a11y', 'bundle', 'vite', 'state', 'memo', 'hooks', 'css'],
  Backend: ['database', 'index', 'cache', 'redis', 'queue', 'grpc', 'graphq', 'rest', 'consistency', 'replication'],
  'Full-Stack': ['auth', 'jwt', 'api', 'ci/cd', 'testing', 'monitoring', 'logging', 'cache', 'cdn', 'deployment'],
  'Data Engineer': ['spark', 'etl', 'warehouse', 'kafka', 'delta', 'airflow', 'dbt', 'partition', 'schema', 'batch'],
  'Product Manager': ['metric', 'okr', 'a/b', 'cohort', 'mvp', 'roadmap', 'user', 'retention', 'activation', 'north star'],
  UX: ['usability', 'a11y', 'research', 'prototype', 'wireframe', 'affordance', 'heuristic', 'contrast', 'motion', 'layout'],
};

function countWords(t) {
  return t.trim().split(/\s+/).filter(Boolean).length;
}
function scoreLengthNormalized(w) {
  if (w < TARGET_MIN) return Math.max(0, w / TARGET_MIN);
  if (w > TARGET_MAX) return Math.max(0, 1 - (w - TARGET_MAX) / 100);
  return 1;
}
function scoreStructure(t) {
  const L = t.toLowerCase();
  const found = STRUCTURE_MARKERS.filter((m) => L.includes(m));
  return Math.min(1, found.length / 5);
}
function scoreTechnical(t, role) {
  const L = t.toLowerCase();
  const found = (ROLE_KEYWORDS[role] || []).filter((k) => L.includes(k.toLowerCase()));
  return Math.min(1, found.length / 10);
}
function generateFeedback(length, structure, technical, wordCount) {
  const fb = [];
  if (length < 0.7) {
    fb.push(wordCount < TARGET_MIN ? 'Elaborate more.' : 'Be more concise.');
  } else {
    fb.push('Good length.');
  }
  fb.push(structure < 0.5 ? 'Use clearer transitions.' : 'Well-structured.');
  fb.push(technical < 0.5 ? 'Add more relevant technical detail.' : 'Good technical depth.');
  return fb.join(' ');
}

const app = express();
app.use(cors());
app.use(express.json());

const sessions = new Map();
const persistedSessions = [];

app.post('/sessions/start', (req, res) => {
  const body = req.body ?? {};
  if (!body || !body.role || !body.seniority || !body.language) {
    return res.status(400).json({ message: 'Invalid config' });
  }
  const id = Math.random().toString(36).slice(2, 10);
  const questions = SEED_QUESTIONS[body.role] ?? SEED_QUESTIONS['Frontend'];
  sessions.set(id, { id, config: body, questions, idx: 0 });

  const first = { text: questions[0] };
  return res.json({ sessionId: id, firstQuestion: first });
});

app.get('/sessions/:id/first', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ message: 'Session not found' });
  return res.json({ text: session.questions[0] });
});

app.post('/sessions/:id/message', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ message: 'Session not found' });
  const { userText } = req.body ?? {};
  if (!userText || typeof userText !== 'string') {
    return res.status(400).json({ message: 'userText required' });
  }

  const wc = countWords(userText);
  const sLen = scoreLengthNormalized(wc);
  const sStr = scoreStructure(userText);
  const sTec = scoreTechnical(userText, session.config.role);
  const total = Math.round(sLen * 30 + sStr * 30 + sTec * 40);
  const feedback = generateFeedback(sLen, sStr, sTec, wc);

  session.idx += 1;
  const done = session.idx >= session.questions.length;
  const nextText = done
    ? `Score: ${total}/100. ${feedback}. That concludes our interview. Thank you!`
    : `Score: ${total}/100. ${feedback}. Next question: ${session.questions[session.idx]}`;

  return res.json({
    reply: {
      text: nextText,
      score: total,
      feedback,
    },
  });
});

app.post('/sessions/:id/persist', (req, res) => {
  const session = sessions.get(req.params.id);
  const body = req.body ?? {};
  if (!body || !body.transcript || !body.summary) {
    return res.status(400).json({ message: 'Invalid session payload' });
  }
  if (!body.createdAt) {
    body.createdAt = new Date().toISOString();
  }
  persistedSessions.unshift({
    sessionId: req.params.id,
    storedAt: new Date().toISOString(),
    payload: body,
  });
  return res.json({ stored: true });
});

app.get('/sessions', (req, res) => {
  const limit = Number(req.query.limit ?? 50);
  const data = persistedSessions.slice(0, limit).map((entry) => entry.payload);
  return res.json({ sessions: data });
});

const PORT = Number(process.env.PORT ?? 8787);
app.listen(PORT, () => {
  console.log(`IntervueAI API listening on :${PORT}`);
});
