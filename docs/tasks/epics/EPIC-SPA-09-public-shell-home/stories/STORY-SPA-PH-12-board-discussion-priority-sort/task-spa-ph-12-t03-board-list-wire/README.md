# SPA-PH-12-T03 — Board List wire sorted order

**Status:** Done · P3 `2026-10-03T15:40:28Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** backlog STORY-SPA-PH-12 · AC-PH-12-01/04  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:28:25Z`  
**Package:** `pkg-000091`

## Purpose

Wire List feed on `BoardPage` to sorted order after SEARCH filter; Map order unchanged; loading settle per backlog Target (sort-before-stable-list or one reorder).

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `BoardPage.jsx` List render from `filteredIssues` |
| 2 | Map uses filtered set — pin reorder OOS |

## AC / DoD

- [x] (P0) List uses discussion-priority order — **AC-PH-12-01**
- [x] (P0) Map pin order not required to change — **FR-PH-12.4**
- [x] (P0) Prefetch must not convert gateway success into load-error — **AC-PH-12-04**

## Where to change

- `src/pages/BoardPage.jsx`

## Out of scope

Helper/tests (T01) · filter vitest (T04) · invent HTTP · badge/L10N

## Verification

```bash
rg -n 'sortIssuesByDiscussionPriority|listIssues|filteredIssues' spa-app/src/pages/BoardPage.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
