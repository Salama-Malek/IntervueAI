# IntervueAI

![Deploy](https://github.com/Salama-Malek/IntervueAI/actions/workflows/deploy.yml/badge.svg)

Live demo: https://salama-malek.github.io/IntervueAI/

Voice-first mock interview platform for practicing technical interviews in the browser.

## Overview

IntervueAI runs a mock interview entirely through speech: it asks role- and seniority-specific questions, listens to your spoken answer via the Web Speech API, scores it heuristically (length, structure, and role-relevant keywords), and speaks back feedback before moving to the next question. It works fully client-side out of the box (no backend required), and can optionally be pointed at a REST API for session persistence and server-side scoring. Sessions are recorded as a live transcript, saved to history, and exportable as JSON.

## Features

- Voice-first interaction using the Web Speech API for speech-to-text and text-to-speech
- Six interview tracks (Frontend, Backend, Full-Stack, Data Engineer, Product Manager, UX) across Junior/Mid/Senior levels
- Heuristic answer scoring based on response length, structure, and role keywords
- Live, diarized transcript with interim speech results
- Session history with detail view, JSON export, and delete
- Pluggable adapters: local heuristic engine or REST backend, switchable via settings or env vars
- Optional Mock Service Worker (MSW) layer to exercise the REST adapter without a live server
- Internationalization with automatic RTL layout (English, Arabic)
- Keyboard navigation, ARIA labels, and reduced-motion support

## Tech stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS
- Web Speech API (STT/TTS) and Web Audio API (microphone RMS detection)
- TanStack Query for data fetching
- Express backend (`server/`) exposing a minimal REST API, documented via `server/openapi.yaml`
- MSW for mocking the REST adapter in the browser
- Vitest + React Testing Library for tests; ESLint + Prettier for linting/formatting

## Getting started

### Prerequisites

- Node.js 18+
- Chrome or Edge (best Web Speech API support)
- HTTPS in production (required for microphone access)

### Install

```bash
git clone <repository-url>
cd IntervueAI
npm install
```

### Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```
VITE_ADAPTER=local            # "local" (no backend) or "rest"
VITE_API_BASE_URL=http://localhost:8787
VITE_USE_MSW=false            # true to mock the REST adapter in-browser
```

### Run (local adapter, no backend)

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### Run with the REST backend

```bash
npm run server:dev     # starts the Express API on port 8787
npm run dev:full       # runs the API and Vite dev server together
```

Set `VITE_ADAPTER=rest` and `VITE_API_BASE_URL=http://localhost:8787` in `.env.local`, or switch adapters from the Adapter dropdown in the app's settings panel.

### Scripts

```bash
npm run typecheck      # TypeScript type checking
npm run lint           # ESLint
npm run format         # Prettier
npm run test           # Vitest
npm run test:coverage  # Vitest with coverage
npm run build          # Production build
npm run preview        # Preview the production build
```

## Project structure

```
IntervueAI/
├── src/
│   ├── adapters/         # Local (heuristic) and REST interview adapters
│   ├── components/       # UI: AppShell, InterviewRoom, TranscriptList, HistoryPanel, ReportPanel, ...
│   ├── context/          # Auth context/state
│   ├── hooks/            # useSpeechStt, useSpeechTts, useRmsGate, useAuth, useSessionsData
│   ├── lib/               # Question bank, scoring, summarization, i18n, API client
│   ├── mocks/             # MSW handlers for the REST adapter
│   └── App.tsx, main.tsx
├── server/                # Express REST API + OpenAPI spec
├── examples/              # Example exported sessions
└── package.json
```

## License

MIT
