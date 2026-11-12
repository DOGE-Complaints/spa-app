# SPA-THR-08-T01 — Close create/reply ops; POST + Bearer; parse CommentItem envelope

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

Close `comment_create` / `comment_reply` in `ThreadsSocialClient`; real POST + Bearer; parse CommentItem envelope.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| `comment_create` / `comment_reply` still open | `ThreadsSocialClient.js` SOCIAL_HTTP_CONTRACT |
| Closed path SSOT | api-req §3 · `POST /threads/issues/{issue_id}/comments` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- `spa-app/src/repositories/ThreadsSocialClient.js`

## Out of scope

Session token resolve (T02) · composer props (T03) · soft-fail UX (T04) · THR-09

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
