# SPA-THR-09-T04 — Close `attach_ref`; POST refs only; map attach-denied

**Status:** Done  
**Story:** [`../STORY-SPA-THR-09-reactions-attach-wire.md`](../STORY-SPA-THR-09-reactions-attach-wire.md)  
**Decision Ref:** backlog THR-09 · api-req §5/§6 · OpenAPI  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-09-24T08:07:05Z`  
**Package:** `pkg-000085`

## Purpose

Close `attach_ref`; POST refs only; map `DOMAIN_ERROR` + `details.reason=attach-denied` (often 200).

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| `attach_ref` still open | `ThreadsSocialClient.js` |
| Path SSOT | api-req §6 · `POST …/attachment-refs` |

## AC / DoD

- [x] (P0) Purpose delivered with evidence
- [x] (P0) Closed paths only — PUT reactions / POST attachment-refs · no invent · no multipart blob
- [x] (P0) No escalate · no invent catalog ids · no git push

## Where to change

- `ThreadsSocialClient.js`

## Out of scope

Composer live wire (T05) · multipart blob · escalate

## Verification

```bash
cd spa-app && npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
