# Design Redesign Commit Log

1. **chore: add design-redesign-report.json** — Generated machine-readable report (summary, stack, routes, components, fixes, migration plan, deliverables).
2. **feat(ui): add design-system tokens and component skeletons** — Added tokens, README, six component skeletons, and desktop/tablet/mobile mockups in `/design-system`.
3. **refactor(ui): replace Header, LeftNav, KPICard, PrimaryButton with skeletons** — Added the four remaining layout primitives as reusable React/Tailwind skeletons.
4. **chore: add proposed content edits under _proposed_content_edits/** — Captured original vs cleaned copy for Dashboard, Recordings, Insights, Library routes.
5. **perf: add image optimization notes and critical CSS skeleton** — Documented image budget/strategy and added `src/styles/critical.css` for inlining.
6. **test: add accessibility snapshot tests & basic CI config update** — Added Vitest snapshots, GitHub Actions workflow, PR description, and this commit log.
7. **chore: integrate design tokens + critical css** - Imported the new design tokens + critical layers ahead of the app bundle to prevent FOUC.
8. **feat(ui): wire design-system Header/LeftNav/KPICard/PrimaryButton** - Rebuilt AppShell and ControlsBar with the shared design-system primitives.
9. **feat(ui): replace Session DNA markup with InterviewConfigPanel** - Extended the panel API (headers, sections, onChange) and hooked both DNA cards into it.
10. **fix(a11y): resolve dialog, transcript, and mock typings** - Added a reusable dialog wrapper, improved mic/log aria semantics, and tightened Jest speech mocks.
11. **perf: lazy-load session modal and preconnect fonts** - Deferred the session viewer via React.lazy and preconnected Google Fonts to reduce blocking requests.
12. **test: refresh accessibility snapshots and bootstrap entry** - Removed top-level await, reran Vitest in update mode, and confirmed the suite/build stay green.

