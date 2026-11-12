# SPA-ES-02-T03 — Bind map §2.2; no Contributors

**Status:** Done  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) · FR-ES-02.2/02.4 · AC-SPA-ES-08  
**Depends on:** T02 Pulse UI  
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
Map Pulse `data` fields to UI slots per api-req §2.2; omit Contributors/Voices and forbidden UI (FR-ES-02.4 · AC-SPA-ES-08).

## Risk
Inventing fields; wiring Voices/Contributors; `/metrics`; cabinet `story-activity`; fabricating counts.

## Code Facts (re-verify at execute)
- Bind map SSOT: [STORY-SPA-ES-api-requirements.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) §2.2 — Stories→`stories_collected`; Areas→`areas`; Languages→`languages`; Topics→`topics`; Activity/7d→`recent_stories_7d`; Contributors/Voices → **omit**.
- [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) pulse slot is still a titled placeholder (no mapper).
- spa Pulse consumers: **0** (`rg network-pulse spa-app/src`).
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L326 `<EarlySignalDiscovery />` — `board-empty` **absent**.

## AC / DoD
- [x] (P0) FR-ES-02.2 **ESD-P-bound:** render metric slots only for fields in api-req §2.2 bind map.
- [x] (P0) FR-ES-02.4 Forbidden UI: Contributors/Voices, «N Stories until Issue», `/metrics`, cabinet `story-activity` (api-req §8).
- [x] (P0) AC-SPA-ES-08 bind-or-omit

## Where to change
- Pulse mapper + `NetworkPulseBlock` (or Pulse slot) under `spa-app/src/components/earlySignal/`
- Related: Pulse repository/service from T01

## Out of scope
Voices / Contributors metrics. Invent fields. `/metrics`. Changing Issues list API. ES-03 Emerging HTTP.

## Verification
```bash
rg -n 'contributors|Voices|story-activity|/metrics' spa-app/src/components/earlySignal || true
rg -n 'network-pulse' spa-app/src || true
```
