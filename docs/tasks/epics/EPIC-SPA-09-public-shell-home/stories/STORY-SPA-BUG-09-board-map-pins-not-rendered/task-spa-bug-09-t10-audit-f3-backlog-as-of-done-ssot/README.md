# SPA-BUG-09-T10 — Backlog As-of-Done vs Historical SSOT (F3)

**Status:** Done · P6 `2026-10-03T15:25:37Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-09-execution-2026-10-03.md](../../../../../../analysis/audit-STORY-SPA-BUG-09-execution-2026-10-03.md) · F3  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:22:22Z`  
**Done:** `2026-10-03T15:25:37Z`  
**Package:** `pkg-000090` (unchanged · `run_mode=spa_bug_09_audit_2026_10_03`)  
**Gap:** F3 Low → **CLOSED**

## Purpose

Split backlog Symptom / Expected vs Actual / Root-cause into **Historical** vs **As-of-Done**. Meta Done kept. Docs-only.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Historical vs As-of-Done on backlog | [`../../../../backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md) |
| 2 | Meta Status still Done | same · gate PASS unchanged |
| 3 | No product `src/` | docs-only |

## AC / DoD

- [x] (P0) Historical vs As-of-Done prose on backlog — **F3**
- [x] (P0) Meta Done unchanged; no invent product AC Fail
- [x] (P0) No product `src/` change

## Where changed

- `spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md`

## Out of scope

screenshots (T08/T09) · H2 geo · BoardIssuesMap rewrite · pkg-000090 edit · reopen product Fail

## Verification

```bash
rg -n 'As-of-Done|Historical|await map\.loadImage' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
