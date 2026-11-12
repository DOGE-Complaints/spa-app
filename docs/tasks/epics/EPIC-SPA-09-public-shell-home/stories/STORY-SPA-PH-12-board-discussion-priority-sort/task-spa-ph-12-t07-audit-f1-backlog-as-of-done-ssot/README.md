# SPA-PH-12-T07 — Backlog As-of-Done SSOT (F1)

**Status:** Done · P6 `2026-10-03T15:59:58Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** [audit-STORY-SPA-PH-12-execution-2026-10-03.md](../../../../../../analysis/audit-STORY-SPA-PH-12-execution-2026-10-03.md) · F1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:56:52Z`  
**Done:** `2026-10-03T15:59:58Z`  
**Package:** `pkg-000091` (unchanged · `run_mode=spa_ph_12_audit_2026_10_03`)  
**Gap:** F1 Medium → **CLOSED**

## Purpose

Doc-only: split backlog §Verified / §Gap into **Historical** vs **As-of-Done**. Meta Done kept.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Historical vs As-of-Done on backlog | [`../../../../backlog-stories/public-home/STORY-SPA-PH-12-board-discussion-priority-sort.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-12-board-discussion-priority-sort.md) |
| 2 | As-of-Done cites `listIssues` / Closed prefetch | same |
| 3 | No product `src/` | docs-only |

## AC / DoD

- [x] (P0) Backlog Historical vs As-of-Done SSOT — **F1**
- [x] (P0) No product `src/` change
- [x] (P0) No invent HTTP / badge / Map pin Fail

## Where changed

- `spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-12-board-discussion-priority-sort.md`

## Out of scope

Pipeline Verified (T08) · product code · invent HTTP · pkg edit

## Verification

```bash
rg -n 'As-of-Done|Historical|listIssues|не сортирует' spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-12-board-discussion-priority-sort.md | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
