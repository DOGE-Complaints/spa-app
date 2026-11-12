# SPA-ES-03-T04 — Vitest signals ≠ issues; empty honest

**Status:** Done  
**Story:** [`../STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) · AC-SPA-ES-02/08/03 · FR-ES-03.L10N  
**Depends on:** T01–T03  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md`](../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:30:36Z · **P3:** 2026-08-17T11:36:37Z  
**Package:** `pkg-000068`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

## Purpose
Vitest honesty: `signals` ≠ Issues; empty/fail → honest empty; no fabricated rows; no forbidden strings (AC-SPA-ES-03); L10N `earlySignal.emerging.*`.

## Risk
Tests that assert fake provisional rows; Issue-shaped cards; unlocking AC-SPA-ES-03 copy.

## Code Facts (As-of-Done P3 2026-08-17T11:36:37Z)
- Vitest: `GatewayEmergingSignalsRepository.test.js` · `bindEmergingSignals.test.js` · `emergingSignalsService.test.js` · `EmergingSignalsBlock.test.jsx` · dictionary FLAT_KEYS ES-03.
- Live: 118 files, 528 passed | 2 skipped (`npx vitest run --passWithNoTests`).

## AC / DoD
- [x] (P0) Topic/provisional ≠ Issue (AC-SPA-ES-02); no fabricated counts (AC-SPA-ES-08); no forbidden strings (AC-SPA-ES-03).
- [x] (P0) Failure / `signals: []` → honest empty; no fabricated provisional rows.
- [x] (P0) FR-ES-03.L10N `earlySignal.emerging.*`.

## Where to change
- `__tests__` next to Emerging repository/UI + [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)
- Related: `spa-app/src/components/earlySignal/*`

## Out of scope
Persistent `EmergingSignal` entity. Voices. ES-04/05. Product JSX beyond test fixtures.

## Verification
```bash
cd spa-app && npx vitest run --passWithNoTests
rg -n 'earlySignal.emerging' spa-app/src/i18n || true
```
