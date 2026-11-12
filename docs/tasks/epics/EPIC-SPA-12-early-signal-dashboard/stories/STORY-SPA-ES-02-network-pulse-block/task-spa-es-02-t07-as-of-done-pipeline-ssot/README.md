# SPA-ES-02-T07 — As-of-Done pipeline SSOT (F1)

**Status:** Done — P6 PASS 2026-08-17T11:22:13Z · F1 CLOSED  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [audit-STORY-SPA-ES-02-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-02-execution-2026-08-17.md) §F1  
**Depends on:** SPA-ES-02-T06 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T11:19:36Z  
**Gate Date:** 2026-08-17T11:22:13Z  
**Package:** `pkg-000067` **unchanged** · wave `spa_es_02_audit_2026_08_17`

## Purpose
Doc-only: rewrite pipeline §Текущее состояние last bullet so present-tense matches wired Pulse (L36 + product). L39 still says titled placeholder / **no Pulse HTTP**.

## Risk
Inventing new AC; rewriting product JSX/CSS; implementing ES-03…05; rewriting `pkg-000067`.

## Code Facts (re-verify at execute)
- Product wired: [`GatewayNetworkPulseRepository.js`](../../../../../../../src/repositories/GatewayNetworkPulseRepository.js) L23–24 `GET {base}/tallinn/network-pulse`; [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L42 Pulse child.
- Pipeline As-of-Done (this P6): [`STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md) L35–43 — Current wired · Historical titled placeholder / no Pulse HTTP.
- Backlog §Текущее состояние already **wired** (no stale «no HTTP»): [`STORY-SPA-ES-02-network-pulse-block.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-02-network-pulse-block.md) L22–23 — not rewritten.

## Gap
Audit F1 Medium — pipeline L39 contradicts L36 + repository + discovery pulse slot.

## AC / DoD
- [x] (P0) Pipeline §Текущее состояние As-of-Done: Pulse slot **wired** (HTTP + bind-or-omit); Historical: titled placeholder / no Pulse HTTP (pre-P3).
- [x] (P0) Do not invent AC wording.
- [x] (P0) Doc-only — no product source.
- [x] (P0) Do not mix ES-03…05; do not rewrite `pkg-000067`.

## Where to change
- [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md) §Текущее состояние (As-of-Done / Historical)

## Out of scope
Product JSX/CSS; ES-03…05; M137 PNG Contributors (F3 WAIVED); invent AC; rewrite `pkg-000067`; git push.

## Verification
```bash
rg -n "As-of-Done|Historical|no Pulse HTTP|titled placeholder|GatewayNetworkPulseRepository|Текущее состояние" spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-02-network-pulse-block/STORY-SPA-ES-02-network-pulse-block.md
```
