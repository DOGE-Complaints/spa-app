# SPA-THR-08-T07 — Story gate THR-08

**Status:** Done  
**Story:** [`../STORY-SPA-THR-08-comment-write-wire.md`](../STORY-SPA-THR-08-comment-write-wire.md)  
**Decision Ref:** backlog THR-08 · api-req §3/§8 · OpenAPI `createThreadComment`  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T07:50:12Z`
**Completed:** `2026-09-24T07:57:18Z`  
**Package:** `pkg-000084`

## Purpose

Story gate THR-08 — fill `acceptance-verification-spa-thr-08.md` after live vitest + `--verify` in P3.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Story AC on disk | pipeline story + backlog |
| pkg paths | `pkg-000084` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed POST only — `POST /threads/issues/{issue_id}/comments` · no invent paths
- [x] (P0) No THR-09 / escalate / blob · no git push

## Where to change

- `acceptance-verification-spa-thr-08.md` (this folder) — Date only after live P3 verify

## Out of scope

P4 audit · product commits (P8) · UX screenshots (`ui_scope: none`)

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
