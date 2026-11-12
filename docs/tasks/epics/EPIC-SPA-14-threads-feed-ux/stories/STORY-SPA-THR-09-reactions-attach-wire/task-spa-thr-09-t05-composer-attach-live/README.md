# SPA-THR-09-T05 — CommentComposer attach uses live client + media allowlist from knobs

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** backlog THR-09 · api-req §5/§6 · OpenAPI  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:07:05Z`  
**Package:** `pkg-000085`

## Purpose

CommentComposer attach uses live client + `media_allowed_types` from knobs; reuse Bearer + verify from THR-08.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Attach chip chrome | THR-02 |
| Bearer/gate | THR-08 |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed paths only — PUT reactions / POST attachment-refs · no invent · no multipart blob
- [x] (P0) No escalate · no invent catalog ids · no git push

## Where to change

- `CommentComposer.jsx` · knobs media allowlist

## Out of scope

Vitest (T06) · blob upload API

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
