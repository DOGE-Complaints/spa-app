# SPA-PH-12-T02 — Prefetch discussion flags

**Status:** Done · P3 `2026-10-03T15:40:28Z`  
**Story:** [`../STORY-SPA-PH-12-board-discussion-priority-sort.md`](../STORY-SPA-PH-12-board-discussion-priority-sort.md)  
**Decision Ref:** backlog STORY-SPA-PH-12 · AC-PH-12-01/02  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:28:25Z`  
**Package:** `pkg-000091`

## Purpose

Prefetch Closed `getThreadTree` for **filtered** issue ids; map → `hasDiscussion` flags; bounded concurrency; fail-soft unavailable.

## Code Facts (verify in P3)

| # | Claim |
|---|-------|
| 1 | `ThreadsSocialClient.getThreadTree` Closed path |
| 2 | `ensureThreadsKnobsCached` |
| 3 | No batch trees HTTP — per-issue only |

## AC / DoD

- [x] (P0) Flags from `mapThreadTreeToBlock(…).status === 'populated'` — **AC-PH-12-01/02**
- [x] (P0) Fail-soft: tree fail → no boost; gateway issues still usable
- [x] (P0) No invent HTTP paths

## Where to change

- Optional `useBoardDiscussionFlags` / BoardPage orchestration helpers
- Reuse threads client + mapper + knobs cache

## Out of scope

Sort helper pure (T01) · List wire (T03) · invent batch API · badge

## Verification

```bash
rg -n 'getThreadTree|ensureThreadsKnobsCached|hasDiscussion' spa-app/src/pages spa-app/src --glob '*.{js,jsx}' | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
