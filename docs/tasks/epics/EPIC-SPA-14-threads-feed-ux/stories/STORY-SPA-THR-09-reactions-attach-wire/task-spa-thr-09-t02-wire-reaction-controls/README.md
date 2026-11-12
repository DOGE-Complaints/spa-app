# SPA-THR-09-T02 — ReactionControls: persist toggle; apply `selected` / summary / aggregate

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** backlog THR-09 · api-req §5/§6 · OpenAPI  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:07:05Z`  
**Package:** `pkg-000085`

## Purpose

Wire `ReactionControls` to persist toggle; apply `selected` / `summary_marks` / `aggregate_count` from U2.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Picker chrome Done | THR-03 |
| Catalog SSOT | `reactionsV1Catalog.js` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed paths only — PUT reactions / POST attachment-refs · no invent · no multipart blob
- [x] (P0) No escalate · no invent catalog ids · no git push

## Where to change

- `ReactionControls.jsx` · mount wiring

## Out of scope

Knobs capacity (T03) · attach · invent catalog

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
