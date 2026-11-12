# SPA-THR-09-T01 — Close `react`; PUT + Bearer; parse ReactionData

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** backlog THR-09 · api-req §5/§6 · OpenAPI  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:07:05Z`  
**Package:** `pkg-000085`

## Purpose

Close `react` in `ThreadsSocialClient`; real PUT + Bearer; parse ReactionData envelope.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| `react` still open | `ThreadsSocialClient.js` SOCIAL_HTTP_CONTRACT |
| Closed path SSOT | api-req §5 · `PUT /threads/issues/{issue_id}/reactions` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed paths only — PUT reactions / POST attachment-refs · no invent · no multipart blob
- [x] (P0) No escalate · no invent catalog ids · no git push

## Where to change

- `spa-app/src/repositories/ThreadsSocialClient.js`

## Out of scope

UI wire (T02) · knobs picker (T03) · attach (T04) · invent ids

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
