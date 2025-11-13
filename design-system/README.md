# IntervueAI Design System

This folder captures the visual system extracted from the current Ops Deck mock (dark neon studio) so engineers and designers can iterate without re-inspecting screenshots.

## Token Mapping

| Screenshot motif | Token(s) |
| --- | --- |
| Midnight gradient background | `colors.ink.1000`, `colors.ink.900`, `colors.accent.indigo`
| Glass cards & panels | `colors.glass.light`, `colors.border.soft`, `elevation.glass.mid`
| Neon KPIs (emerald/cyan/fuchsia) | `colors.accent.emerald`, `colors.accent.cyan`, `colors.accent.fuchsia`
| Alert banners (warning/danger) | `colors.warning`, `colors.danger`
| Eyebrow labels | `typography.letterSpacing.eyebrow`, `typography.sizes.xs`
| Primary pill buttons | `radii.pill`, `components.button`, `elevation.cta`

## Usage

1. Import `design-system/tokens.json` into Storybook or Tailwind config to sync colors and spacing.
2. Each component skeleton in `components/` is written in TypeScript + Tailwind-ready classes. Drop them into `/src/components` and adjust data flows; the structural markup already follows WCAG AA (aria labels, keyboard affordances, focus styles).
3. Mockups under `mockups/` demonstrate responsive stacking. Copy the inline CSS variables if you need quick static previews.
4. Keep hero headlines =60 characters and body copy =155 characters per the content audit.

## Accessibility Notes

- Maintain `aria-current="page"` on nav items (`LeftNav`).
- Primary buttons expose `aria-busy` when loading; always pair gradient fills with a solid focus ring.
- For Transcript and Playback lists, prefer `<section role="log">` + `aria-live="polite"` when hooking live data.
- Modal/footer combos (`FooterAuthorCard`) include landmark roles, so avoid nesting them inside other `<footer>` tags.

## Extending Tokens

- Motion tokens fall back to `prefers-reduced-motion`; wrap long gradients in `@media (prefers-reduced-motion: reduce)` and disable glow transitions.
- Elevation presets map 1:1 to the glass cards already used in `AppShell.tsx`. Use `elevation.glass.high` only for overlays/focus mode to keep contrast within WCAG AA.
