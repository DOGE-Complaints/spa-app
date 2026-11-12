# SPA-REQ10-02-T03 — CommentTree comment `initialSelected`

**Status:** Done · P3 `2026-09-28T18:22:01Z`  
**Story:** [`../STORY-SPA-REQ10-02-reaction-selected-reload.md`](../STORY-SPA-REQ10-02-reaction-selected-reload.md)  
**Decision Ref:** backlog STORY-SPA-REQ10-02 · REQ-19 · Option A both levels  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-28T18:17:14Z`  
**Package:** `pkg-000088`

## Purpose

Pass per-comment mapped `selected` into comment `ReactionControls` as `initialSelected`. Counts still from node summaryMarks/aggregateCount.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Comment ReactionControls `initialSelected={node.selected ?? []}` | `CommentTree.jsx` |
| Counts still from `node.summaryMarks` / `aggregateCount` | same props |

## AC / DoD

- [x] (P0) Comment pickers receive `initialSelected` when mapped — **AC-01**
- [x] (P0) Counts unchanged source (summaries) — **AC-02**

## Where to change

- `spa-app/src/components/threads/CommentTree.jsx`

## Out of scope

Root wire (T02) · mapper (T01) · Option B

## Verification

```bash
rg -n 'initialSelected' spa-app/src/components/threads/CommentTree.jsx
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
