# SPA-PH-12-T05 — PH-04 empty / loading / error states

**Status:** Done · P3 `2026-10-03T15:40:28Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** backlog STORY-SPA-PH-12 · AC-PH-12-04  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:28:25Z`  
**Package:** `pkg-000091`

## Purpose

Confirm empty / loading / load-error board states unchanged vs PH-04 when discussion prefetch is present.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | PH-04 state machine on `BoardPage` |
| 2 | Prefetch must not force error on gateway success |

## AC / DoD

- [x] (P0) Empty / filtered-empty / loading / load-error still correct — **AC-PH-12-04**
- [x] (P0) Evidence: vitest and/or manual notes

## Where to change

- Tests / evidence notes (product only if regression found)

## Out of scope

Sort AC (T01–T03) · invent HTTP · Map

## Verification

```bash
rg -n 'loading|load.error|empty|discovery' spa-app/src/pages/BoardPage.jsx spa-app/src/pages/__tests__/BoardPage*.test.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
