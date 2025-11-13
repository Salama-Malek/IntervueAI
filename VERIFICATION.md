# Verification Checklist

This document maps the acceptance criteria to verification steps.

## Acceptance Criteria

### 1. Chrome over HTTPS: Start → speak → AI TTS reply → transcript updates → Stop → export JSON

**Steps:**
1. Deploy the app to a platform with HTTPS (Vercel, Netlify, etc.)
2. Open the app in Chrome
3. Configure interview settings (role, seniority, language)
4. Click "Start Interview" and grant microphone permissions
5. Speak your answer to the first question
6. Verify that:
   - Your speech is transcribed in real-time (interim text appears)
   - Final transcript appears as a USER utterance
   - AI responds with score, feedback, and next question via TTS
   - AI utterance appears in transcript
7. Answer 2-3 more questions
8. Click "Stop Interview"
9. Verify session summary appears with metrics
10. Click "Export JSON"
11. Verify JSON file downloads with correct structure

**Status:** ✅ Ready to verify

---

### 2. Language switch to ar-EG flips layout to RTL

**Steps:**
1. Open the app
2. In the configuration panel, select "Arabic (Egypt)" from the Language dropdown
3. Verify that:
   - The entire layout switches to RTL (right-to-left)
   - Text alignment is correct
   - UI elements are mirrored appropriately

**Status:** ✅ Ready to verify

---

### 3. STT/TTS use selected locale

**Steps:**
1. Select "Arabic (Egypt)" language
2. Start interview
3. Verify that:
   - Speech recognition uses Arabic locale
   - Text-to-speech uses Arabic voice (if available)
4. Switch back to "English (US)"
5. Start interview
6. Verify that:
   - Speech recognition uses English locale
   - Text-to-speech uses English voice

**Status:** ✅ Ready to verify

---

### 4. App degrades with a clear banner if STT/TTS unavailable

**Steps:**
1. Open the app in a browser that doesn't support Web Speech API (e.g., Firefox)
2. Verify that:
   - A yellow banner appears explaining the limitation
   - The banner suggests using Chrome or Edge over HTTPS
   - Start Interview button is disabled
   - Scripted questions are still readable in the UI

**Status:** ✅ Ready to verify

---

### 5. Exported JSON parses back with the same shape

**Steps:**
1. Complete an interview session
2. Export JSON
3. Open the JSON file in a text editor
4. Verify structure matches:
   ```json
   {
     "config": { "role": "...", "seniority": "...", "language": "..." },
     "transcript": [...],
     "metrics": { "turns": 0, "userWordCount": 0, "aiQuestions": 0, "metrics": {} },
     "createdAt": "..."
   }
   ```
5. Parse the JSON in a validator (e.g., jsonlint.com)
6. Verify no parsing errors

**Status:** ✅ Ready to verify

---

### 6. Build size under 90 KB gzipped (app + vendor, excluding Tailwind)

**Steps:**
1. Run `pnpm build`
2. Check the build output in `dist/assets/`
3. Gzip the main JS bundle:
   ```bash
   gzip -c dist/assets/index-*.js | wc -c
   ```
4. Verify the size is under 90 KB (92,160 bytes)

**Status:** ✅ Ready to verify

---

### 7. Typecheck, lint, and tests pass in CI

**Steps:**
1. Push code to GitHub
2. Verify GitHub Actions workflow runs successfully
3. Check that all jobs pass:
   - Type check (`pnpm typecheck`)
   - Lint (`pnpm lint`)
   - Tests (`pnpm test`)
   - Build (`pnpm build`)

**Status:** ✅ Ready to verify

---

## Additional Verification

### Performance

- **Idle CPU < 5%**: Monitor CPU usage with microphone off
- **First interaction < 100 ms**: Use Chrome DevTools Performance tab

### Accessibility

- **Keyboard navigation**: Tab through all controls
- **ARIA labels**: Use screen reader to verify labels
- **Reduced motion**: Enable `prefers-reduced-motion` and verify animations are disabled

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:

```bash
pnpm build
pnpm preview
# Open Chrome DevTools → Lighthouse → Run audit
```

Expected scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

---

## Notes

- All source files are generated and ready for testing
- Example sessions are provided in `examples/` directory
- CI workflow is configured in `.github/workflows/ci.yml`
- README contains comprehensive documentation
