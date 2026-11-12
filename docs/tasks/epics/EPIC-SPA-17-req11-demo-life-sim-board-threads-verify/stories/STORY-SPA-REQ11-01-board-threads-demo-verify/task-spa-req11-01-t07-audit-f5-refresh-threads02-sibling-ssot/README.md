# SPA-REQ11-01-T07 — Refresh THREADS-02 sibling SSOT (F5)

**Status:** Done · P6 `2026-09-29T13:54:03Z`  
**Story:** [`../STORY-SPA-REQ11-01-board-threads-demo-verify.md`](../STORY-SPA-REQ11-01-board-threads-demo-verify.md)  
**Decision Ref:** [reaudit-STORY-SPA-REQ11-01-gap-closure-2026-09-29.md](../../../../../../analysis/reaudit-STORY-SPA-REQ11-01-gap-closure-2026-09-29.md) · F5  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-29T13:52:52Z`  
**Done:** `2026-09-29T13:54:03Z`  
**Package:** `pkg-000089` (unchanged · `run_mode=spa_req11_01_audit_2026_09_29`)  
**Gap:** F5 Low → **CLOSED**

## Purpose

Refresh stale THREADS sibling rows on the story gate + P3 run-summary so THREADS-REQ11-02 matches disk (**Done**) while THREADS-03…04 stay Todo. Keep GW rows from F2/T06. Keep gate Result **BLOCKED**. Do **not** invent Pass.

## Code Facts (As-of-Done)

| Claim | Evidence |
|-------|----------|
| Gate: THREADS-01/02 Done · 03…04 Todo | [`../task-spa-req11-01-t05-story-gate/acceptance-verification-spa-req11-01.md`](../task-spa-req11-01-t05-story-gate/acceptance-verification-spa-req11-01.md) · P6 F5 `2026-09-29T13:54:03Z` |
| P3 run-summary matches | [`../../../../../../run-reports/run-summary-20260929-1342-spa-req11-01-p3.md`](../../../../../../run-reports/run-summary-20260929-1342-spa-req11-01-p3.md) |
| GW rows unchanged (F2 kept) | gate GW-01 Done · 02…04 Todo |
| Gate Result still **BLOCKED** | gate Result unchanged |
| THREADS-REQ11-02 Done on disk | threads backlog L5 |
| No `src/` change | this P6 docs-only |

## AC / DoD

- [x] (P0) Gate: THREADS-01 Done · THREADS-02 **Done** · THREADS-03…04 Todo — **F5**
- [x] (P0) P3 run-summary sibling table matches gate
- [x] (P0) GW-01 Done · GW-02…04 Todo unchanged (F2 kept)
- [x] (P0) Gate Result remains **BLOCKED**; no invent Pass / `src/`

## Where changed

- `…/task-spa-req11-01-t05-story-gate/acceptance-verification-spa-req11-01.md` — THREADS rows
- `spa-app/docs/tasks/run-reports/run-summary-20260929-1342-spa-req11-01-p3.md` — THREADS rows
- prior P6 F2 run-summary F1 await note → THREADS-03…04

## Out of scope

Wipe+replay (F1) · reopen F2 · SPA_ORIGIN (F3) · invent Pass · product code · rewrite `pkg-000089`

## Verification

```bash
rg -n 'THREADS-REQ11' spa-app/docs/tasks/epics/EPIC-SPA-17-req11-demo-life-sim-board-threads-verify/stories/STORY-SPA-REQ11-01-board-threads-demo-verify/task-spa-req11-01-t05-story-gate/acceptance-verification-spa-req11-01.md spa-app/docs/tasks/run-reports/run-summary-20260929-1342-spa-req11-01-p3.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
