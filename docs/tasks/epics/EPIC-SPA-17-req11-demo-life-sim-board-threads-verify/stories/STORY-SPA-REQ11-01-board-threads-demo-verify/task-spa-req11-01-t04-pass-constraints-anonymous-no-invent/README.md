# SPA-REQ11-01-T04 — Pass constraints: anonymous · no invent · optional smoke

**Status:** Done · P3 `2026-09-29T13:42:10Z` (docs/checklist; runtime Pass BLOCKED)  
**Story:** [`../STORY-SPA-REQ11-01-board-threads-demo-verify.md`](../STORY-SPA-REQ11-01-board-threads-demo-verify.md)  
**Decision Ref:** backlog STORY-SPA-REQ11-01 · REQ-20 · locks 2A / K1 · S3  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-29T13:22:04Z`  
**Package:** `pkg-000089`

## Purpose

Document Pass constraints: anonymous sufficient (2A / K1); Pass does **not** require CI gate / screenshot pack (S3); no new spa HTTP / product chrome; optional lightweight smoke notes only; gap → follow-up story only.

## Code Facts (verify exists)

| Claim | Evidence |
|-------|----------|
| Default Pass = no SPA code | backlog Scope item 4 · Out of scope |
| Closed paths only | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS` |
| Board/issue shell already present | `App.jsx` · `BoardPage` · `IssuePage` |

## AC / DoD

- [x] (P0) Pass does not require CI / screenshot pack — **AC-SPA-REQ1101-03**
- [x] (P0) Pass does not require login — **AC-SPA-REQ1101-04**
- [x] (P0) No new spa HTTP / chrome for Pass; gap → follow-up — **AC-SPA-REQ1101-05**
- [x] (P0) Optional smoke notes documented as Evidence-only (Scope 3)

## Where to change

- Evidence / Pass constraints notes under this story (docs only)

## Out of scope

Implementing follow-up product story · invent HTTP · fixture-resident login

## Verification

```bash
rg -n 'CLOSED_SOCIAL_PATHS|/threads/by-issue' spa-app/src/repositories/ThreadsSocialClient.js | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
