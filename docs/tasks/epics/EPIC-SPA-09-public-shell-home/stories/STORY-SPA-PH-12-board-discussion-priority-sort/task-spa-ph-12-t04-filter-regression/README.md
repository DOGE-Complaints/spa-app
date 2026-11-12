# SPA-PH-12-T04 — Filter regression (discussion priority)

**Status:** Done · P3 `2026-10-03T15:40:28Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** backlog STORY-SPA-PH-12 · AC-PH-12-03  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:28:25Z`  
**Package:** `pkg-000091`

## Purpose

Vitest/integration: active search/filters keep discussion priority among **visible** results.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | Sort applies after SEARCH filter (backlog dataflow) |

## AC / DoD

- [x] (P0) Filtered subset still discussion-first — **AC-PH-12-03**
- [x] (P0) No invent HTTP in tests

## Where to change

- Board/hook tests with mocked trees

## Out of scope

PH-04 empty/error (T05) · gate (T06) · product badge

## Verification

```bash
cd spa-app && npx vitest run src/pages/__tests__/BoardPage*.test.jsx src/**/sortIssuesByDiscussionPriority* 2>&1 | tail -30
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
