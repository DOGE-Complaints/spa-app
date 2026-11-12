# SPA-ES-01-T07 — As-of-Done pipeline + backlog SSOT (F1)

**Status:** Done — P6 PASS 2026-08-17T10:48:15Z · F1 CLOSED  
**Story:** [`../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md)  
**Decision Ref:** [audit-STORY-SPA-ES-01-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-01-execution-2026-08-17.md) §F1  
**Depends on:** SPA-ES-01-T06 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T10:43:26Z  
**Gate Date:** 2026-08-17T10:48:15Z  
**Package:** `pkg-000066` **unchanged** · wave `spa_es_01_audit_2026_08_17`

## Purpose
Doc-only: As-of-Done / Historical split in pipeline + backlog §Текущее состояние. Present-tense still claims `board-empty` sole empty + Early Signal UI **0**.

## Risk
Inventing new AC; rewriting product JSX; implementing ES-02…05 Pulse/Emerging.

## Code Facts (re-verify at execute)
- Product: [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) `data-testid="board-early-signal-discovery"`; [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) L162 `showEmptyBoard` · L326 `<EarlySignalDiscovery />`.
- Pipeline still pre-cutover: [`STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) L35–37.
- Backlog still pre-cutover: [`STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) L23–24.
- Pulse/Emerging consumers in `spa-app/src`: still **0** (keep as current fact).

## Gap
Audit F1 Medium — pipeline + backlog §Текущее состояние present-tense pre-cutover (`board-empty` sole empty + Early Signal UI **0**) vs `EarlySignalDiscovery` + BoardPage L326.

## AC / DoD
- [x] (P0) Pipeline §Текущее состояние As-of-Done: unfiltered empty → discovery; Historical: sole `board-empty`.
- [x] (P0) Backlog §Текущее состояние matches pipeline (same split).
- [x] (P0) Do not invent AC wording.
- [x] (P0) Doc-only — no product source.

## Where to change
- [`../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) §Текущее состояние
- [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) §Текущее состояние

## Out of scope
ES-02…05 implementation; Offers; `/dashboard`; invent AC; rewrite `pkg-000066`.

## Verification
```bash
rg -n "board-empty|EarlySignalDiscovery|Текущее состояние" spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md spa-app/docs/tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md
```
