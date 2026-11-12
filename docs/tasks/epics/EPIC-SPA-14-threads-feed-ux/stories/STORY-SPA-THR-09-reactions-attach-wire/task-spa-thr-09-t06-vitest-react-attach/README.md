# SPA-THR-09-T06 — Vitest: add/remove mark; attach ok; attach-denied DOMAIN on 200

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** backlog THR-09 · api-req §5/§6 · OpenAPI  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:07:05Z`  
**Package:** `pkg-000085`

## Purpose

Vitest with OpenAPI fixtures: add/remove mark; attach ok; attach-denied DOMAIN on 200.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Existing social tests | `ThreadsSocialClient.test.js` |
| Fixtures | OpenAPI / API_REFERENCE |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed paths only — PUT reactions / POST attachment-refs · no invent · no multipart blob
- [x] (P0) No escalate · no invent catalog ids · no git push

## Where to change

- `**/__tests__/**` near client / controls / composer

## Out of scope

Story gate Date (T07)

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
