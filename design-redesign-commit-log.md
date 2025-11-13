# Design Redesign Commit Log

1. **chore: add design-redesign-report.json** — Generated machine-readable report (summary, stack, routes, components, fixes, migration plan, deliverables).
2. **feat(ui): add design-system tokens and component skeletons** — Added tokens, README, six component skeletons, and desktop/tablet/mobile mockups in `/design-system`.
3. **refactor(ui): replace Header, LeftNav, KPICard, PrimaryButton with skeletons** — Added the four remaining layout primitives as reusable React/Tailwind skeletons.
4. **chore: add proposed content edits under _proposed_content_edits/** — Captured original vs cleaned copy for Dashboard, Recordings, Insights, Library routes.
5. **perf: add image optimization notes and critical CSS skeleton** — Documented image budget/strategy and added `src/styles/critical.css` for inlining.
6. **test: add accessibility snapshot tests & basic CI config update** — Added Vitest snapshots, GitHub Actions workflow, PR description, and this commit log.