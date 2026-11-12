# SPA-ES-02-T01 — Pulse repository/service GET /tallinn/network-pulse

**Status:** Done  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) · FR-ES-02.1  
**Depends on:** ES-01 discovery slot; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `logic`  
**ui_anchor:** `false`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T11:02:15Z · **P3:** 2026-08-17T11:10:56Z  
**Package:** `pkg-000067`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

## Purpose
FE client for `GET /tallinn/network-pulse` (gateway base URL parity with Issues); no invented path (FR-ES-02.1).

## Risk
Inventing Pulse/Emerging paths; fabricating metrics; Offers/Voices; breaking PH-04 feed; touching `/dashboard`.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L162 `showEmptyBoard`; L326 `<EarlySignalDiscovery />` — `board-empty` **absent**.
- [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L4–5 slot `early-signal-slot-pulse`; L16–45 titled placeholders — **no** Pulse HTTP.
- Issues pattern: [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) L76 `` `${normalizedBaseUrl}/tallinn/issues` `` (D4).
- API: [STORY-SPA-ES-api-requirements.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) §2 · envelope `{ data, trace_id }`.
- ADR D1–D10: [ADMIN-ESD-06](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md).
- spa Pulse consumers: **0** (`rg network-pulse spa-app/src`).

## AC / DoD
- [x] (P0) FR-ES-02.1 FE client calls GET /tallinn/network-pulse (gateway base URL parity with Issues); no invented path.
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change

## Where to change
- New Pulse repository/service following `GatewayIssueRepository` / `issueService` (D4)
- Related: `spa-app/src/repositories/`, `spa-app/src/services/`

## Out of scope
Voices / Contributors metrics. Invent fields. `/metrics`. Changing Issues list API. Product UI (T02). ES-03 Emerging HTTP.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
rg -n 'network-pulse' spa-app/src || true
```
