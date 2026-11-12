# SPA-ES-03-T01 — Emerging repository GET /tallinn/emerging-signals

**Status:** Done  
**Story:** [`../STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-03-emerging-signals-provisional.md) · FR-ES-03.1  
**Depends on:** ES-01 discovery slot; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:30:36Z · **P3:** 2026-08-17T11:36:37Z  
**Package:** `pkg-000068`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png
```

## Purpose
FE client for `GET /tallinn/emerging-signals` (default `top_n=10`, clamp `[1,50]`); no invented path (FR-ES-03.1). Do not reuse `GET /tallinn/issues`.

## Risk
Inventing Emerging/Pulse paths; using Issues list as Emerging source; fabricating `signals` rows; Offers/Voices; `/dashboard`.

## Code Facts (As-of-Done P3 2026-08-17T11:36:37Z)
- [`GatewayEmergingSignalsRepository.js`](../../../../../../../src/repositories/GatewayEmergingSignalsRepository.js) L32 `` `${normalizedBaseUrl}/tallinn/emerging-signals?top_n=${clamped}` ``.
- [`emergingSignalsService.js`](../../../../../../../src/services/emergingSignalsService.js) fail/missing repo → `{ status: 'empty', cards: [] }`.
- [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L44 `<EmergingSignalsBlock />`.
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L326 `<EarlySignalDiscovery />`.

## AC / DoD
- [x] (P0) FR-ES-03.1 FE client calls GET /tallinn/emerging-signals (default `top_n=10`, clamp `[1,50]`).
- [x] (P0) No invented gateway path; do not reuse `GET /tallinn/issues`; no Offers/Voices; no `/dashboard` change

## Where to change
- New Emerging repository/service following `GatewayNetworkPulseRepository` / `networkPulseService` (D4)
- Related: `spa-app/src/repositories/`, `spa-app/src/services/`

## Out of scope
Persistent `EmergingSignal` entity. Issues-shaped list. Voices. Promotion gates. Product UI (T02). ES-04/05. Reopening Pulse AC.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md
rg -n 'emerging-signals' spa-app/src || true
```
