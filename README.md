# IntervueAI

**Voice-First Mock Interview Platform** - A frontend-only MVP for conducting mock technical interviews using voice interaction.

## Features

- **Voice-First Interaction**: Real-time speech-to-text and text-to-speech using Web Speech API
- **Multiple Roles**: Frontend, Backend, Full-Stack, Data Engineer, Product Manager, UX
- **Seniority Levels**: Junior, Mid, Senior with tailored questions
- **Heuristic Scoring**: Automatic evaluation based on length, structure, and technical content
- **Live Transcript**: Real-time diarized transcript with interim results
- **Cinematic Studio UI**: Gradient-rich, glassmorphic workspace with hero stats, holographic controls, analytics, and history panels
- **Session Export**: Download interview sessions as JSON
- **Internationalization**: Support for multiple languages with auto RTL layout
- **Accessibility**: Keyboard navigation, ARIA labels, reduced motion support

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **Web Speech API** for STT/TTS
- **Web Audio API** for RMS microphone activity detection
- **Vitest** + **React Testing Library** for testing
- **ESLint** + **Prettier** for code quality

## Prerequisites

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- **HTTPS** connection (required for microphone access)
- **Chrome** or **Edge** browser (for best Web Speech API support)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd intervueai

# Install dependencies
pnpm install
```

## Development

```bash
# Start development server
pnpm dev

# The app will be available at http://localhost:5173
# For microphone access, you may need to use HTTPS in production
```

### Running with REST backend locally

```bash
# Start API server (port 8787)
npm run server:dev

# Or run both API and Vite together
npm run dev:full

# Configure the frontend to use the REST adapter
# copy .env.example to .env.local and set:
#   VITE_ADAPTER=rest
#   VITE_API_BASE_URL=http://localhost:8787
```

## Build

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

The application is a static site and can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push the `dist` folder to `gh-pages` branch

**Important**: Ensure HTTPS is enabled for microphone access.

### Adapter Selection (Local vs REST)

- Default adapter is `local` (heuristic, no backend required).
- To use a backend, set environment variables (copy `.env.example` to `.env.local`):

```
VITE_ADAPTER=rest
VITE_API_BASE_URL=http://localhost:8787
```

- You can also switch adapters from the "Adapter" dropdown in the settings panel.

### Analytics

- The left panel shows simple trends (turns, words, and final score if available) across saved sessions.
- Final score is inferred from the last AI message when it contains a pattern like `Score: 78/100`.

### Mocking the Backend (MSW)

- Frontend-only development can run entirely against the `RestLLMAdapter` by enabling MSW:

```
VITE_ADAPTER=rest
VITE_USE_MSW=true
VITE_API_BASE_URL=/api
```

- When `VITE_USE_MSW=true`, the app boots a Mock Service Worker that implements the `/sessions/*` endpoints using the local question bank and heuristic scoring. Disable it (set to `false`) to hit a real backend.

### API Contract

- A minimal OpenAPI spec is available at `server/openapi.yaml` describing the REST adapter endpoints.

## Usage

1. **Configure Interview**: Select role, seniority level, and language
2. **Start Interview**: Click "Start Interview" and grant microphone permissions
3. **Speak Naturally**: Answer questions verbally; the AI will respond with feedback and next question
4. **Review Transcript**: View real-time transcript with speaker labels
5. **Stop & Export**: Click "Stop Interview" to end and view summary; export session as JSON

### History

- Sessions are automatically saved locally on stop and listed in the History panel.
- From History you can view details, download JSON, or delete entries.

### Keyboard Shortcuts

- **Space**: Toggle listening (when interview is active)

## Project Structure

```
intervueai/
├── src/
│   ├── adapters/
│   │   ├── AdapterTypes.ts          # Adapter interface
│   │   └── LocalWebSpeechAdapter.ts # Local scripted adapter
│   ├── components/
│   │   ├── AppShell.tsx             # Main app container
│   │   ├── InterviewConfigPanel.tsx # Configuration panel
│   │   ├── InterviewRoom.tsx        # Interview session manager
│   │   ├── TranscriptList.tsx       # Transcript display
│   │   ├── MicGateIndicator.tsx     # Mic activity indicator
│   │   ├── ControlsBar.tsx          # Control buttons
│   │   └── ReportPanel.tsx          # Session summary
│   ├── hooks/
│   │   ├── useRmsGate.ts            # RMS mic activity detection
│   │   ├── useSpeechStt.ts          # Speech-to-text hook
│   │   └── useSpeechTts.ts          # Text-to-speech hook
│   ├── lib/
│   │   ├── questions.ts             # Question bank (10-12 per role/seniority)
│   │   ├── scoring.ts               # Heuristic scoring logic
│   │   ├── summarize.ts             # Session summary calculation
│   │   ├── i18n.ts                  # Internationalization utilities
│   │   └── ids.ts                   # ID generation
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Global styles
│   └── setupTests.ts                # Test setup
├── examples/                        # Example exported sessions
├── .github/workflows/               # CI/CD workflows
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Test Coverage

- **Unit Tests**: `scoring.ts`, `summarize.ts`, `questions.ts`
- **Component Tests**: `TranscriptList.tsx`
- **Integration**: Adapter interaction with components

## Performance

- **Bundle Size**: < 90 KB gzipped (app + vendor, excluding Tailwind CSS)
- **Idle CPU**: < 5% with microphone off
- **First Interaction**: < 100 ms

## Browser Support

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Limited Web Speech API support
- **Safari**: Limited Web Speech API support

**Note**: The app gracefully degrades with a banner when Web Speech API is unavailable.

## Accessibility

- Keyboard-navigable controls
- ARIA labels for screen readers
- Respects `prefers-reduced-motion`
- RTL layout support for Arabic, Farsi, Urdu

## Internationalization

Currently supported languages:

- **English (US)**: `en-US`
- **Arabic (Egypt)**: `ar-EG`

The app automatically switches to RTL layout for Arabic-like languages.

## Future Enhancements

- **RestLLMAdapter**: Integration with external LLM APIs
- **WebRTCAdapter**: Real-time streaming with backend services
- **More Languages**: Expand language support
- **Advanced Scoring**: Machine learning-based evaluation
- **Video Recording**: Optional video capture during interviews

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Verification Checklist

✅ Chrome over HTTPS: Start → speak → AI TTS reply → transcript updates → Stop → export JSON  
✅ Language switch to ar-EG flips layout to RTL  
✅ STT/TTS use selected locale  
✅ App degrades with clear banner if STT/TTS unavailable  
✅ Exported JSON parses back with the same shape  
✅ Build size under 90 KB gzipped (app + vendor, excluding Tailwind)  
✅ Typecheck, lint, and tests pass in CI

## Lighthouse Summary

Run Lighthouse audit on the production build:

```bash
pnpm build
pnpm preview
# Open Chrome DevTools → Lighthouse → Run audit
```

Expected scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+
#   I n t e r v u e A I  
 