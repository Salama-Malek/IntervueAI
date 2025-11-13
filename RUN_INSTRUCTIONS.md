# Run Instructions

## Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm installed (or use npm/yarn)

### Installation & Development

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# The app will be available at http://localhost:5173
```

### Run with REST API backend (local)

```bash
# Start API server (port 8787)
npm run server:dev

# Or run API + Vite together
npm run dev:full

# Configure the frontend to talk to the API
# copy .env.example to .env.local and set:
#   VITE_ADAPTER=rest
#   VITE_API_BASE_URL=http://localhost:8787
```

### Frontend-only mocking with MSW

```bash
# Enable REST adapter & mock worker
echo "VITE_ADAPTER=rest" >> .env.local
echo "VITE_USE_MSW=true" >> .env.local

# Run the usual dev server; MSW intercepts /sessions/*
pnpm dev
```

Set `VITE_USE_MSW=false` (or remove it) to call a real backend again.

### Build & Preview

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Code Quality

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format
```

## Using npm instead of pnpm

If you prefer npm:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Using yarn instead of pnpm

If you prefer yarn:

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test
```

## Deployment

### Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Netlify

1. Build the project: `pnpm build`
2. Drag and drop the `dist` folder to Netlify
3. Or use Netlify CLI:

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Build the project
pnpm build

# Push dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

## Important Notes

- **HTTPS Required**: The app requires HTTPS for microphone access. Use a deployment platform that provides HTTPS (Vercel, Netlify, etc.)
- **Browser Support**: Best experience in Chrome or Edge. Firefox and Safari have limited Web Speech API support.
- **Microphone Permissions**: You'll be prompted to grant microphone permissions when starting an interview.

## Troubleshooting

### "Speech recognition not supported" error

- Ensure you're using Chrome or Edge
- Ensure the site is served over HTTPS
- Check browser permissions for microphone access

### Build size exceeds 90 KB

- Run `pnpm build` and check the output
- Gzip the main JS bundle to verify actual size:
  ```bash
  gzip -c dist/assets/index-*.js | wc -c
  ```

### Tests failing

- Ensure all dependencies are installed: `pnpm install`
- Clear cache: `rm -rf node_modules && pnpm install`
- Check Node.js version: `node --version` (should be 18+)
