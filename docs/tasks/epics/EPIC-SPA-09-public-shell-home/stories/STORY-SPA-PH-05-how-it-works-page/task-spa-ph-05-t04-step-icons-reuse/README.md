# SPA-PH-05-T04 — Step icons reuse

**Status:** Done — P3 2026-08-04T13:22:05Z
**Story:** [`../STORY-SPA-PH-05-how-it-works-page.md`](../STORY-SPA-PH-05-how-it-works-page.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-05-how-it-works-page.md) icons table  
**Depends on:** T02  
**extends ui-mockup:** [`../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md`](../task-spa-ph-05-t02-four-step-layout/ui-mockup-spec.md)  
**ui_scope:** `mixed`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T13:09:56Z  
**Package:** `pkg-000050`

## Purpose
Wire catalog icon paths for step visuals: `ic-doc-new` (step 1), `ic-field-summary` (step 3); optional `ic-chevron-right` / `ic-external-link` (PH-06 catalog #3).

## Risk
Inventing non-catalog paths; blocking on missing PNG (icons non-blocking).

## Code Facts (re-verify at execute)
- Catalog: [STORY-SPA-PH-icon-assets.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md).
- On disk (verified P1): `/icons/story-handoff/ic-doc-new.png`, `ic-field-summary.png` — real 1024².
- Optional external/chevron under `/icons/public-home/` — placeholder-ok OK.

## AC / DoD
- [x] (P0) Catalog paths wired for step 1 doc + step 3 summary → backlog AC #4 (icons linked).
- [x] (P0) Missing/placeholder PNG does not block layout/tests (icons non-blocking rule).

## Where to change
- `spa-app/src/pages/HowItWorksPage.jsx` (+ CSS)

## Out of scope
Designing new icon art; mandatory PH-06 external icon file.

## Verification
```bash
rg -n 'ic-doc-new|ic-field-summary|ic-external-link|ic-chevron-right' spa-app/src/pages/HowItWorksPage.jsx
ls -la spa-app/public/icons/story-handoff/ic-doc-new.png spa-app/public/icons/story-handoff/ic-field-summary.png
```
