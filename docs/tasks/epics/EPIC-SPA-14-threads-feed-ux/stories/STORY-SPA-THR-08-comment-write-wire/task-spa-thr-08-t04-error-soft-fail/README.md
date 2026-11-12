# SPA-THR-08-T04 — Map 401/403/200-DOMAIN/422 → verify / post-fail / max-depth

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

Map errors per api-req §8: 401/403 → verify handoff; 200+`DOMAIN_ERROR` (depth) → max-depth / post-fail; 422 → post-fail.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Error matrix | api-req §8 |
| Domain-on-200 | threads API envelope |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- composer/tree soft-fail surfaces · client error classification

## Out of scope

Success refresh (T05) · THR-09 attach-denied

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
