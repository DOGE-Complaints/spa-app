# SPA-REQ11-01-T03 — Issue thread + reactions checklist

**Status:** Done · P3 `2026-09-29T13:42:10Z` (docs/checklist; runtime Pass BLOCKED)  
**Story:** [`../STORY-SPA-REQ11-01-board-threads-demo-verify.md`](../STORY-SPA-REQ11-01-board-threads-demo-verify.md)  
**Decision Ref:** backlog STORY-SPA-REQ11-01 · REQ-20 · S2  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-29T13:22:04Z`  
**Package:** `pkg-000089`

## Purpose

Checklist after wipe+replay: sample `{SPA_ORIGIN}/#/issue/{id}` (and/or board-mounted thread) shows comments + reaction summaries.

## Code Facts (verify exists)

| Claim | Evidence |
|-------|----------|
| Issue route | `App.jsx` `/issue/:id` · `IssuePage.jsx` |
| Live threads mount | `LiveIssueThreadMount.jsx` · Board/Issue pages |
| Tree Closed path | `ThreadsSocialClient.js` → `/threads/issues/{id}` |

## AC / DoD

- [x] (P0) Checklist + Evidence for comments + reaction summaries — **AC-SPA-REQ1101-02**
- [x] (P0) Evidence blocked until sibling replay (no invent Pass)
- [x] (P0) No invent threads HTTP / no product chrome

## Where to change

- Evidence notes under this story (docs only)
- Read-only: `IssuePage.jsx` · `LiveIssueThreadMount.jsx` · `ThreadsSocialClient.js`

## Out of scope

Board-only (T02) · CI screenshots as Pass · invent seed

## Verification

```bash
rg -n 'LiveIssueThreadMount|CLOSED_SOCIAL_PATHS|tree_read' spa-app/src/pages/IssuePage.jsx spa-app/src/repositories/ThreadsSocialClient.js | head
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
