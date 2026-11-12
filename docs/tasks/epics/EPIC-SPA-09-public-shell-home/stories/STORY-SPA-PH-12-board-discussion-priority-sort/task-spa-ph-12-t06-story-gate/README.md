# SPA-PH-12-T06 — Story gate PH-12

**Status:** Done · P3 `2026-10-03T15:40:28Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** backlog STORY-SPA-PH-12 · AC-PH-12-01…04  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:28:25Z`  
**Package:** `pkg-000091`

## Purpose

Story acceptance gate: AC matrix; spa-owned sort after filter via Closed tree prefetch; no invent HTTP; no badge.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `acceptance-verification-spa-ph-12.md` (P3) |

## AC / DoD

- [x] (P0) All AC Pass or documented BLOCKED with facts — **AC-PH-12-01…04**
- [x] (P0) Pin note: SPA List sort + Closed trees; no invent HTTP
- [x] (P0) Date stamped post live-run

## Where to change

- `task-spa-ph-12-t06-story-gate/acceptance-verification-spa-ph-12.md` (P3)

## Out of scope

Product implement · invent Pass · Map pin reorder · badge

## Verification

```bash
rg -n 'AC-PH-12|PASS|BLOCKED' spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-12-board-discussion-priority-sort/task-spa-ph-12-t06-story-gate/acceptance-verification-spa-ph-12.md | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
