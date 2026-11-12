# SPA-REQ10-02-T01 — Mapper Option A `selected` (root + comments)

**Status:** Done · P3 `2026-09-28T18:22:01Z`  
**Story:** [`../STORY-SPA-REQ10-02-reaction-selected-reload.md`](../STORY-SPA-REQ10-02-reaction-selected-reload.md)  
**Decision Ref:** backlog STORY-SPA-REQ10-02 · REQ-19 · REQ10 §3.5 Option A · threads REQ10-05 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-28T18:17:14Z`  
**Package:** `pkg-000088`

## Purpose

Extend `mapThreadTreeToBlock` / `mapReactionSummaryPayload` (or adjacent helpers) to map optional Option A `selected[]` for **thread_root_reactions** and **per-comment** reaction payloads. Counts remain from `summary_marks` / `aggregate_count`. No invent HTTP / Option B.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| `mapActorSelected` + `selected` on summary payload | `mapThreadTreeToBlock.js` `mapActorSelected` / `mapReactionSummaryPayload` |
| Comment nodes include `selected` | `mapApiCommentToNode` |
| Root `threadRootReactions.selected` | `mapThreadTreeToBlock` via `mapReactionSummaryPayload(data.thread_root_reactions)` |

## AC / DoD

- [x] (P0) Root + comment mapped objects expose actor `selected` when present — **AC-01** · **AC-04**
- [x] (P0) Counts still from summaries/aggregates — **AC-02**
- [x] (P0) Absent/anonymous `selected` → safe empty (no throw) — Option A

## Where to change

- `spa-app/src/repositories/mapThreadTreeToBlock.js`
- related unit tests (fold or T04)

## Out of scope

Mount/block wire (T02) · CommentTree (T03) · invent paths · Option B

## Verification

```bash
cd spa-app && npx vitest run src/repositories/__tests__/ThreadsSocialClient.test.js
rg -n 'selected' spa-app/src/repositories/mapThreadTreeToBlock.js
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
