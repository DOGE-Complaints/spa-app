# SPA-ES-01-T02 — Slot layout M136 five blocks

**Status:** Done  
**Story:** [`../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)  
**Decision Ref:** [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) · FR-ES-01.2  
**Depends on:** prior ES wave tasks; [ADMIN-ESD-06 ADR](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md)  
**ui_scope:** `visual`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md`](../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16 · **P1.3 apply:** 2026-08-17T10:14:14Z  
**Package:** `pkg-000066`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png
```

## Purpose
Slot layout M136 five blocks for ES-01 (Board Pre-Cluster Discovery Shell).

## Risk
Inventing Pulse/Emerging paths; collapsing zero-Issues to sole `board-empty`; fabricating metrics; Offers/Voices; breaking PH-04 feed; touching `/dashboard`.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) — `showEmptyBoard` (~L161); `board-empty` (~L326); `getIssues`.
- Issues: [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) — pattern for Early Signal repo (D4).
- API: [STORY-SPA-ES-api-requirements.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) §1.
- Icons: [STORY-SPA-ES-icon-assets.md](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-icon-assets.md).
- ADR D1–D10: [ADMIN-ESD-06](../../../../../../backlog-stories/early-signal-dashboard/ADMIN-ESD-06-tech-decomposition.md).
- spa Pulse/Emerging consumers: currently **0** hits in `src/`.

## AC / DoD
- [x] (P0) FR-ES-01.2
- [x] (P0) No invented gateway path; no Offers/Voices; no `/dashboard` change
- [x] (P1) Align with mockup M136

## Where to change
- `components/earlySignal/EarlySignalDiscovery.jsx`
- Related: `spa-app/src/pages/BoardPage.jsx`, `spa-app/src/components/earlySignal/*`, `spa-app/src/i18n/earlySignalDictionary.js` (as applicable)

## Out of scope
Invent gateway paths/fields; Offers/Solutions; Voices/Contributors KPI; REQ-12 `/dashboard`; fabricated counts / «N Stories until Issue»; coverage % DTO; bullrun pkg activate.

## Verification
```bash
test -f spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md
rg -n 'network-pulse|emerging-signals|board-early-signal-discovery|board-empty' spa-app/src || true
```
