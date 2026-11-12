# SPA-REQ11-01-T01 — Runbook routes + profile SPA origin

**Status:** Done · P3 `2026-09-29T13:42:10Z` (docs/checklist; runtime Pass BLOCKED)  
**Story:** [`../STORY-SPA-REQ11-01-board-threads-demo-verify.md`](../STORY-SPA-REQ11-01-board-threads-demo-verify.md)  
**Decision Ref:** backlog STORY-SPA-REQ11-01 · REQ-20 · lock **1A**  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-29T13:22:04Z`  
**Package:** `pkg-000089`

## Purpose

Write operator runbook notes: canonical hash routes `#/board` and `#/issue/:id` (lock 1A); document which **profile SPA origin** to open (`local` vs Uus Veerenni — from sibling GW profile ops).

## Code Facts (verify exists)

| Claim | Evidence |
|-------|----------|
| HashRouter | `spa-app/src/main.jsx` |
| Board + issue routes | `spa-app/src/App.jsx` `/board` · `/issue/:id` |
| Canonical hash URLs | `#/board` · `#/issue/{id}` |

## AC / DoD

- [x] (P0) Runbook documents `#/board` and `#/issue/:id` — **Scope 1** · lock 1A
- [x] (P0) Runbook names profile SPA origin source (sibling profile table) — not invent host
- [x] (P0) No product `src/` change for this task

## Where to change

- Evidence / runbook notes under this story (docs only)
- Read-only: `src/App.jsx` · `src/main.jsx`

## Out of scope

Board Evidence (T02) · issue/reactions (T03) · Pass constraints (T04) · invent HTTP · product chrome

## Verification

```bash
rg -n 'path="/board"|path="/issue/:id"|HashRouter' spa-app/src/App.jsx spa-app/src/main.jsx
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
