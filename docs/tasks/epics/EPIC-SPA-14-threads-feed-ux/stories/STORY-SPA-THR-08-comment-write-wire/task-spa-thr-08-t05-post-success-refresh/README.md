# SPA-THR-08-T05 — After create/reply: refresh tree or optimistic insert matching CommentItem

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

On success: append or refetch tree; clear draft; respect knobs `max_depth` (no reply beyond depth).

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Tree read Closed | THR-07 `getThreadTree` |
| knobs `max_depth` cache | `threadsKnobsCache.js` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- `LiveIssueThreadMount` / tree refresh · `CommentTree` · draft clear

## Out of scope

Vitest (T06) · THR-09

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
