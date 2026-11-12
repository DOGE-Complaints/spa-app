# SPA-ES-02-T05 — Vitest omit on fail; no fabricated counts

**Status:** Done  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) · AC-SPA-ES-08/03 · FR-ES-02.L10N  
**Depends on:** T01–T04  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md`](../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:02:15Z · **P3:** 2026-08-17T11:10:56Z  
**Package:** `pkg-000067`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

## Purpose
Vitest honesty: failure → omit copy; no fabricated counts; no Contributors/Voices; no forbidden strings (AC-SPA-ES-03); L10N `earlySignal.pulse.*`.

## Risk
Tests that assert fake KPI numbers; missing omit path; unlocking AC-SPA-ES-03 copy.

## Code Facts (re-verify at execute)
- [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js) — ES-01 keys: `earlySignal.pulse.title` only; omit/metric keys **not** present yet.
- Discovery tests exist for ES-01 shell; Pulse HTTP consumers **0**.
- L10N table SSOT: backlog / pipeline §«Тексты и переводы» `earlySignal.pulse.*`.
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L326 `<EarlySignalDiscovery />`.

## AC / DoD
- [x] (P0) Failure → omit copy; no fabricated counts; no Contributors/Voices.
- [x] (P0) No forbidden strings (AC-SPA-ES-03).
- [x] (P0) FR-ES-02.L10N `earlySignal.pulse.*`; metric labels only for bindable slots.

## Where to change
- `__tests__` next to Pulse repository/UI + [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js)
- Related: `spa-app/src/components/earlySignal/*`

## Out of scope
Voices / Contributors metrics. Invent fields. `/metrics`. ES-03 Emerging HTTP. Product JSX beyond test fixtures.

## Verification
```bash
cd spa-app && npx vitest run --passWithNoTests
rg -n 'earlySignal.pulse' spa-app/src/i18n || true
```
