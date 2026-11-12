# SPA-REQ11-01-T02 — X-11-01 board non-empty checklist

**Status:** Done · P3 `2026-09-29T13:42:10Z` (docs/checklist; runtime Pass BLOCKED)  
**Story:** [`../STORY-SPA-REQ11-01-board-threads-demo-verify.md`](../STORY-SPA-REQ11-01-board-threads-demo-verify.md)  
**Decision Ref:** backlog STORY-SPA-REQ11-01 · REQ-20 · X-11-01 / S1  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-29T13:22:04Z`  
**Package:** `pkg-000089`

## Purpose

X-11-01 checklist after wipe+replay: `{SPA_ORIGIN}/#/board` shows lived-in issue cards (not empty). Evidence placeholder until siblings replay Done.

## Code Facts (verify exists)

| Claim | Evidence |
|-------|----------|
| Board page mounts | `spa-app/src/pages/BoardPage.jsx` |
| Issues via gateway | `GatewayIssueRepository.js` → `/node/issues` |
| Content until replay | Empty after wipe — runtime Unknown until sibling Pass |

## AC / DoD

- [x] (P0) Checklist + Evidence path for non-empty board after replay — **AC-SPA-REQ1101-01**
- [x] (P0) Evidence marked blocked until GW55+threads04 Done (no invent Pass)
- [x] (P0) No product `src/` change as default Pass

## Where to change

- Evidence notes under this story (docs only)
- Read-only: `BoardPage.jsx` · `GatewayIssueRepository.js`

## Out of scope

Issue/reactions (T03) · invent board APIs · screenshot pack as Pass

## Verification

```bash
rg -n 'node/issues|BoardPage' spa-app/src/repositories/GatewayIssueRepository.js spa-app/src/pages/BoardPage.jsx | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
