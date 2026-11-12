# SPA-THR-08-T02 — Resolve access token for social writes (reuse identity session store)

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

Resolve access token for social writes — reuse identity session store (same pattern as identity Bearer).

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Me / identity_verified helpers exist | `spa-app/src/auth/meIdentityVerified.js` |
| Identity session Bearer pattern | existing identity client usage |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- identity session token source · `ThreadsSocialClient` auth header wiring

## Out of scope

Close ops body (T01 primarily) · page profile props (T03) · THR-09

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
