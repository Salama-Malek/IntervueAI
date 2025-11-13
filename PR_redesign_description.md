# PR: IntervueAI Ops Deck Redesign Foundation

## Rationale
- Capture the current product purpose, stack, and content debts in a single report for PM/Eng alignment.
- Establish normalized design tokens + component skeletons so UI refactors stop duplicating markup.
- Provide cleaned copy + mockups that match the cinematic Ops Deck direction while remaining WCAG AA compliant.

## Top Changes
1. Added `design-redesign-report.json` with product summary, token map, component schemas, and migration steps.
2. Introduced `design-system/` (tokens, README, components, mockups) to serve as the source of truth for neon glass UI.
3. Authored `_proposed_content_edits/` with original vs cleaned copy for Dashboard, Recordings, Insights, and Library surfaces.
4. Documented commit plan + PR expectations (`design-redesign-commit-log.md`, `PR_redesign_description.md`).
5. Added perf/accessibility notes, tests, and CI updates (subsequent commits) to enforce the migration plan.

## Acceptance Tests
- `npm run lint` and `npm run typecheck` succeed (no new TS errors introduced by skeleton files).
- `npm test` runs the new accessibility snapshot suite.
- Manual: open `design-system/mockups/*.html` in a browser and confirm responsive stacking + contrast.
- Manual: review `_proposed_content_edits/*/cleaned.txt` to confirm hero =60 chars, CTAs =3 words, meta between 120–155 chars.

## Rollback Plan
Revert the staged commits in reverse order:
1. `test: add accessibility snapshot tests & basic CI config update`
2. `perf: add image optimization notes and critical CSS skeleton`
3. `chore: add proposed content edits under _proposed_content_edits/`
4. `refactor(ui): replace Header, LeftNav, KPICard, PrimaryButton with skeletons`
5. `feat(ui): add design-system tokens and component skeletons`
6. `chore: add design-redesign-report.json`

## Before / After (copy example)
```
Before CTA: "Export board" (4 chars, passive)
After CTA:  "Export data" (active voice, 2 words, reusable token)
```