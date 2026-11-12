# SPA-THR-09-T03 — Apply knobs `reactions_enable` + `max_reactions_per_actor` to picker

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** backlog THR-09 · api-req §5/§6 · OpenAPI  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:07:05Z`  
**Package:** `pkg-000085`

## Purpose

Apply knobs `reactions_enable` + `max_reactions_per_actor` to picker; server remains SSOT on deny.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Knobs Closed + cache | THR-07 `threadsKnobsCache` |
| Fields | `reactions_enable` · `max_reactions_per_actor` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed paths only — PUT reactions / POST attachment-refs · no invent · no multipart blob
- [x] (P0) No escalate · no invent catalog ids · no git push

## Where to change

- knobs cache · ReactionControls / picker

## Out of scope

Attach (T04+) · invent catalog ids

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
