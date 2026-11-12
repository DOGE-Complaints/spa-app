# SPA-PH-12-T01 — Discussion definition + sort helper

**Status:** Done · P3 `2026-10-03T15:40:28Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** backlog STORY-SPA-PH-12 · AC-PH-12-01/02  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:28:25Z`  
**Package:** `pkg-000091`

## Purpose

Lock `populated` = ≥1 comment (`mapThreadTreeToBlock`); implement pure `sortIssuesByDiscussionPriority` + unit tests.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `mapThreadTreeToBlock` status `populated` / `empty` |
| 2 | NEW helper module under `spa-app/src/` |

## AC / DoD

- [x] (P0) Helper: discussion-true first; stable original index ties — **AC-PH-12-01/02**
- [x] (P0) Unit tests: mix / all empty / all populated / ties
- [x] (P0) Missing/false/unavailable → no boost

## Where to change

- NEW `src/…/sortIssuesByDiscussionPriority.js` (+ `__tests__`)

## Out of scope

Prefetch (T02) · BoardPage wire (T03) · invent HTTP · badge/L10N · Map reorder

## Verification

```bash
rg -n 'sortIssuesByDiscussionPriority|populated' spa-app/src --glob '*.js' | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
