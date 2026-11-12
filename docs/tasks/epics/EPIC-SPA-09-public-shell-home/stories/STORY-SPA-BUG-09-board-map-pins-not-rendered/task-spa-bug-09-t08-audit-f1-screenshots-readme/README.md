# SPA-BUG-09-T08 — Story-root screenshots README (F1)

**Status:** Done · P6 `2026-10-03T15:23:44Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-09-execution-2026-10-03.md](../../../../../../analysis/audit-STORY-SPA-BUG-09-execution-2026-10-03.md) · F1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:22:22Z`  
**Done:** `2026-10-03T15:23:44Z`  
**Package:** `pkg-000090` (unchanged · `run_mode=spa_bug_09_audit_2026_10_03`)  
**Gap:** F1 Medium → **CLOSED**

## Purpose

Add story-root [`../screenshots/README.md`](../screenshots/README.md) inventory pointing at `full-cycle/` (+ baseline/archive pointers). Docs-only.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Story-root `screenshots/README.md` Present | [`../screenshots/README.md`](../screenshots/README.md) |
| 2 | Points at full-cycle + ui-baseline + ui-after + T01 | same |
| 3 | No product `src/` | this P6 docs-only |

## AC / DoD

- [x] (P0) NEW `screenshots/README.md` lists full-cycle UI-3 + pointers to baseline/archive — **F1**
- [x] (P0) No product `src/` change
- [x] (P0) Gap F1 CLOSED

## Where changed

- `…/STORY-SPA-BUG-09…/screenshots/README.md` (NEW)

## Out of scope

H2 life-sim geo · Edge PNG capture (T09) · backlog As-of-Done (T10) · BoardIssuesMap rewrite · pkg-000090 edit

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-BUG-09-board-map-pins-not-rendered/screenshots/README.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
