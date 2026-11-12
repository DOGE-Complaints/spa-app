# SPA-THR-08-T03 — Board/Issue pass `profile` / gate into CommentComposer

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

Board/Issue (via live mount) pass Me `profile` / `identityVerified` into `CommentComposer` (end page wire gap).

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Composer + verify gate chrome Done | THR-02/05 |
| Page profile prop gap | api-req / threads-feed INDEX · THR-08 |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- `BoardPage.jsx` · `IssuePage.jsx` · `LiveIssueThreadMount.jsx` · `CommentComposer.jsx`

## Out of scope

HTTP close (T01) · error map (T04) · THR-09

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
