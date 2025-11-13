# PR: IntervueAI Ops Deck Refactor

## Rationale
- Align the live Ops Deck with the new design-system primitives so the running app matches the documented mockups/tokens.
- Centralize Session DNA logic through `InterviewConfigPanel` so role/language toggles share ARIA + handler semantics.
- Address the previously reported accessibility gaps (no dialog semantics, missing `role="log"`, silent mic state) and unblock CI by stabilizing mocks/tests.

## Top Changes
1. Routed `main.tsx` through `design-tokens.css`/`critical.css` and rebuilt `AppShell` with `Header`, `LeftNav`, `KPICard`, and `PrimaryButton`.
2. Upgraded `InterviewConfigPanel` to expose `visibleSections`, `header`, and `onChange` props and wired both Session DNA cards into it.
3. Added a reusable `Dialog` + aria fixes for transcript/mic widgets, refreshed snapshots, and lazy-loaded the Session Viewer for smaller first paint.

## Acceptance Criteria
- Visual tokens applied: new sidebar/Header/KPI cards render from the design-system components.
- Session DNA uses `InterviewConfigPanel` with sections/headers and disables controls while recording.
- Transcript panel exposes `role="log"` + `aria-live="polite"`; mic indicator announces idle/listening states.
- `npm run test -- --run` and `npm run build` both succeed locally (see logs below).

## Rollback Plan
Revert commits in reverse order:
1. `test: refresh accessibility snapshots and bootstrap entry`
2. `perf: lazy-load session modal and preconnect fonts`
3. `fix(a11y): resolve dialog, transcript, and mock typings`
4. `feat(ui): replace Session DNA markup with InterviewConfigPanel`
5. `feat(ui): wire design-system Header/LeftNav/KPICard/PrimaryButton`
6. `chore: integrate design tokens + critical css`

## Verification / Screenshot Notes
1. `npm run dev` ? visit http://localhost:5173 and capture:
   - Sidebar + Header + KPIs (desktop).
   - Interview Studio (before and after toggling focus mode).
2. Open Session Viewer from Playback Log ? ensure modal traps focus and record a screenshot.
3. Use browser dev tools to inspect `.transcript` container for `role="log"` and `aria-live="polite"` attributes.