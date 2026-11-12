# SPA-THR-08-T06 — Vitest: verified happy path; deny; depth DOMAIN_ERROR on 200

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

Vitest with OpenAPI fixture envelopes: verified happy path; deny (unverified / 401/403); depth DOMAIN_ERROR on 200.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Existing social client tests | `ThreadsSocialClient.test.js` |
| Fixture envelopes | OpenAPI / API_REFERENCE |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- `spa-app/src/repositories/__tests__/**` · related component tests

## Out of scope

Story gate Date (T07) · THR-09

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
