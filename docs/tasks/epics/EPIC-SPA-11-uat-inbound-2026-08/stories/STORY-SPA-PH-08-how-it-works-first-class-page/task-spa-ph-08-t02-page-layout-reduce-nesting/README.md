# SPA-PH-08-T02 — Page layout CSS/markup reduce nesting

**Status:** Done — P3 PASS 2026-08-09T07:46:13Z · **ui_anchor**  
**Story:** [`../STORY-SPA-PH-08-how-it-works-first-class-page.md`](../STORY-SPA-PH-08-how-it-works-first-class-page.md)  
**Decision Ref:** backlog PH-08 · M133 Path A · T01 audit  
**Depends on:** SPA-PH-08-T01  
**ui_scope:** `page`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T07:36:09Z  
**Package:** `pkg-000058`  
**@mockup:** `spa-app/docs/UX/mockups/home/mockup-133-public-how-it-works-page-state-sheet-spec.md`

## Purpose

Усилить first-class composition: intro / 4 steps / CTA без конкурирующих вложенных рамок (FR-PH-08.1–08.3).

## Code Facts (closed)

1. `.how-it-works-step` → transparent + hairline separator (not filled cards) · [`HowItWorksPage.css`](../../../../../../../src/pages/HowItWorksPage.css).
2. Route shell classes `how-it-works-route` / `how-it-works-shell` · [`HowItWorksPage.jsx`](../../../../../../../src/pages/HowItWorksPage.jsx).
3. Softened `.board-workspace` padding under `.how-it-works-shell` only.
4. `showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}` unchanged.

## AC / DoD

- [x] Visual: page not nested utility-card on desktop.
- [x] 4 steps + CTAs + Header + PublicFooter intact.
- [x] Competing nested frames weakened.
- [x] i18n keys unchanged.
- [x] UI-0 / UI-1 Path A / UI-3 PNGs under `ui-baseline/`.
- [x] No `PUBLIC_SHELL_SHOW_SIDEBAR` change.

## Verification

```bash
cd spa-app && npx vitest run src/pages/__tests__/HowItWorksPage.test.jsx
cd spa-app && npm run test:ui:how-it-works
```
