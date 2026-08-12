# SPA-PH-08-T03 — Desktop + narrow regression

**Status:** Done — P3 PASS 2026-08-09T07:46:54Z  
**Story:** [`../STORY-SPA-PH-08-how-it-works-first-class-page.md`](../STORY-SPA-PH-08-how-it-works-first-class-page.md)  
**Decision Ref:** backlog PH-08 FR-PH-08.4  
**Depends on:** SPA-PH-08-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Package:** `pkg-000058`

## Purpose

Подтвердить порядок intro→steps→CTA→footer на desktop и narrow после T02.

## Code Facts (closed)

1. Vitest HowItWorksPage **6/6** (incl. PH-08 shell + CSS assertions).
2. `npm run test:ui:how-it-works` PASS.
3. UI-3 narrow PNG · T02 `post-implement/02-hiw-first-class-narrow-390x844.png`.

## AC / DoD

- [x] Desktop order intro→steps→CTA→footer.
- [x] Narrow order preserved.
- [x] Vitest + UI smoke PASS.
- [x] Evidence cited.

## Verification

```bash
cd spa-app && npx vitest run src/pages/__tests__/HowItWorksPage.test.jsx
cd spa-app && npm run test:ui:how-it-works
```
