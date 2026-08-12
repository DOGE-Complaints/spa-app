# SPA-PH-07-T02 — Wire chrome evidence runners

**Status:** Done — P3 PASS 2026-08-06T13:45:10Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) FR-PH-07.1 · FR-PH-07.4  
**Depends on:** SPA-PH-07-T01  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T13:24:06Z  
**Package:** `pkg-000052`

**UI gate (Path A):**
- `@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md`
- `@mockup: spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec-estonia.png`
- `@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md` (results/empty context for backdrop)

## Purpose
Chrome/CTA board evidence (primary: PH-06 full-cycle H1/H2 on `/#/board`) uses T01 helper with intentional `results` or `empty` backdrop so Submit/header shots are not silently framed by `board-load-error`.

## Risk
Breaking live-login hard-stop in PH-06 runner; capturing chrome while still on load-error; changing Submit CTA AC.

## Code Facts (re-verify at execute)
- [`public-submit-ph06-full-cycle.mjs`](../../../../../../../tests/puppeteer/public-submit-ph06-full-cycle.mjs) waits `public-nav-submit` + `board-submit-cta` only — no feed mode.
- Audit F6: PH-06 H1/H2 showed load-error with CTAs visible.
- PH-04 already has intentional modes; T01 extracts them.

## AC / DoD
- [x] (P0) Chrome board shots use intentional `results` or `empty` backdrop via T01 → FR-PH-07.1; backlog AC #1.
- [x] (P0) Live and mock chrome paths do not silently present load-error as «healthy board home» without naming → FR-PH-07.4.
- [x] (P0) Submit/chrome selectors still captured; no product Submit wiring change.
- [x] (P0) ui_anchor evidence under PH-07 and/or updated PH-06 full-cycle PNGs (story-root screenshots).

## Where to change
- `spa-app/tests/puppeteer/public-submit-ph06-full-cycle.mjs` (primary)
- Optional: other board-context chrome runners that share the same gap
- PH-07 `screenshots/full-cycle/` captures as needed

## Out of scope
Load-error path labeling (T03/T04); automated assert helper (T05); UX redesign of load-error.

## Verification
```bash
cd spa-app && npm run test:ui:submit-ph06-full
# Visual: H1/H2 must not show board-load-error when goal is chrome/CTA
```

Gate Date: 2026-08-06T13:45:10Z.
Gate: [`acceptance-verification-spa-ph-07-t02.md`](./acceptance-verification-spa-ph-07-t02.md)
