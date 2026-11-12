# SPA-ES-05-T01 — Continuum layout feed + residual

**Status:** Done  
**Story:** [`../STORY-SPA-ES-05-issues-continuum-regression.md`](../STORY-SPA-ES-05-issues-continuum-regression.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-05-issues-continuum-regression.md) · FR-ES-05.1 / FR-ES-05.2 · FR-ES-05.L10N  
**Depends on:** ES-01…04 Done (empty discovery); PH-04 feed; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T12:26:25Z · **P3:** 2026-08-17T13:10:12Z  
**Package:** `pkg-000070`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
```

Path A spec: [`ui-mockup-spec.md`](./ui-mockup-spec.md)

## Purpose
Continuum layout: when `issues.length ≥ 1`, PH-04 Issue feed remains primary; optional residual discovery chrome (M140) beside it. Host `/board` only.

## Risk
Reopening ES-01…04 empty-discovery AC; collapsing Issues ≥ 1 to sole empty discovery; inventing continuum HTTP; Offers/Voices; `/dashboard`; mockup-01.

## Code Facts (As-of-Done P3 2026-08-17T13:10:12Z)
- Empty board unchanged: [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) `showEmptyBoard` → `<EarlySignalDiscovery />`.
- Issues ≥ 1: `showResults` → `data-testid="board-continuum"` · `board-feed` + [`ContinuumResidual.jsx`](../../../../../../../src/components/earlySignal/ContinuumResidual.jsx).
- L10N `earlySignal.continuum.*` in [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js).
- API: [api-req §1](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) — `issueService` → `GET /tallinn/issues`; no new continuum endpoint.

## AC / DoD
- [x] (P0) FR-ES-05.1 When `issues.length ≥ 1`, existing Issue cards/feed still render — regression on `BoardPage` list path (AC-SPA-ES-05).
- [x] (P0) FR-ES-05.2 Optional residual discovery rail/chrome (M140) where data allows — Pulse/Emerging/Missing compact; omit blocks without data (PRODUCT-BRIEF #7).
- [x] (P0) FR-ES-05.L10N `earlySignal.continuum.*`; reuse `publicHome.board.*` for feed empty/error/loading.
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P0) UI Path A: @mockup M140 md+png on this ui_anchor task

## Where to change
- New `ContinuumResidual.jsx` in `spa-app/src/components/earlySignal/` mounted from [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) when Issues ≥ 1
- Related: [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)

## Out of scope
Feed regression tests (T02). Compact slot bind details (T03). Topic icons (T04). Product code this P1. ES-01…04 empty-board JSX.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.md
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-140-issue-continuum-residual-discovery-state-sheet-spec.png
rg -n 'ContinuumResidual|showEmptyBoard|showResults|earlySignal.continuum' spa-app/src || true
```
