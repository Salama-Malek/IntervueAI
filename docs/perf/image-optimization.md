# Image Optimization Notes

## Current Assets
- **Noise overlay** (`.noise-overlay` data URI) loads on every route and repaints continuously.
- **Background gradients** exist purely in CSS; no raster asset to compress.
- **Session screenshots / exports** currently saved as JSON only (no hero imagery).

## Recommendations
1. **Convert noise overlay into SVG mask**
   - Replace inline PNG with a 4px x 4px SVG + `mask-image` so we can control opacity per breakpoint.
   - Inline critical mask in production build to avoid additional requests.
2. **Use `image-set` for future hero art**
   - Export Figma hero glow at `1x/2x` AVIF + fallback PNG.
   - Example: `background-image: image-set(url('/hero.avif') 1x, url('/hero@2x.avif') 2x);`
3. **Lazy-load heavy canvases**
   - Wrap future waveform visualizers in `IntersectionObserver` so tablets do not parse WebGL until needed.
4. **Add build-time compression**
   - Plug `vite-imagetools` or `sharp` into CI to auto-generate AVIF/WebP variants.
5. **Document budgets**
   - Keep per-image budget <150KB (desktop hero) and <40KB (thumbnails) to meet Lighthouse PWA guidance.

## Rollout Steps
- [ ] Replace noise PNG with SVG mask + CSS custom property intensity.
- [ ] Introduce `/public/media/` and document naming scheme (`surface-token-intent@2x.avif`).
- [ ] Add check in CI to fail builds if new raster >150KB.