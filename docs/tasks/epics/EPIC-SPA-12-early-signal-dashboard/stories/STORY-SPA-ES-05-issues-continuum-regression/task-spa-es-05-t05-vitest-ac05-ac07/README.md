# SPA-ES-05-T05 — Vitest AC-05/07; no Offers

**Status:** Done  
**Story:** [`../STORY-SPA-ES-05-issues-continuum-regression.md`](../STORY-SPA-ES-05-issues-continuum-regression.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) · FR-ES-05.3 / FR-ES-05.4 · FR-ES-05.L10N · AC-SPA-ES-05/07/06  
**Depends on:** T01–T04  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md`](../task-spa-es-05-t01-continuum-layout/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T12:26:25Z · **P3:** 2026-08-17T13:10:12Z  
**Package:** `pkg-000070`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
```

## Purpose
Vitest: Issues ≥ 1 feed still renders (AC-SPA-ES-05); `/dashboard` unchanged (AC-SPA-ES-07); no Offers (AC-SPA-ES-06); no forbidden ratio strings (AC-SPA-ES-03); L10N `earlySignal.continuum.*`.

## Risk
Inventing AC; asserting coverage %; changing REQ-12 dashboard; Offers; mixing ES-01…04 tests as continuum.

## Code Facts (As-of-Done P3 2026-08-17T13:10:12Z)
- Vitest: [`BoardPage.continuum.test.jsx`](../../../../../../../src/pages/__tests__/BoardPage.continuum.test.jsx) · [`ContinuumResidual.test.jsx`](../../../../../../../src/components/earlySignal/__tests__/ContinuumResidual.test.jsx) · dictionary FLAT_KEYS continuum.
- `/dashboard`: `App.jsx` route unchanged (AC-SPA-ES-07).
- Live: 124 files, 542 passed | 2 skipped.

## AC / DoD
- [x] (P0) FR-ES-05.3 REQ-12 `/dashboard` behavior unchanged (AC-SPA-ES-07).
- [x] (P0) FR-ES-05.4 No Offers/Solutions on continuum board (AC-SPA-ES-06).
- [x] (P0) FR-ES-05.L10N `earlySignal.continuum.*`; reuse `publicHome.board.*` for feed empty/error/loading.
- [x] (P0) Issues ≥ 1 → feed still renders (AC-SPA-ES-05); no forbidden strings (AC-SPA-ES-03).
- [x] (P0) No invented gateway path; no Voices; no `/dashboard` change

## Where to change
- `__tests__` for BoardPage continuum + dictionary keys
- Related: [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)

## Out of scope
Story gate (T06). Product code this P1.

## Verification
```bash
rg -n 'continuum|Offers|dashboard' spa-app/src/i18n spa-app/src/pages/BoardPage.jsx spa-app/src/components/earlySignal || true
```
