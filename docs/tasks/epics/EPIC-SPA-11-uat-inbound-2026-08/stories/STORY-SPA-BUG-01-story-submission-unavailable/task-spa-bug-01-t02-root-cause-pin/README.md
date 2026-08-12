# SPA-BUG-01-T02 — Root-cause pin (SPA vs gateway/intake vs env/network)

**Status:** Done — P3 PASS 2026-08-06T20:19:57Z · **P4 verified** ([audit](../../../../../../analysis/audit-STORY-SPA-BUG-01-execution-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md) FR-BUG-01.2 · Pin rules D  
**Depends on:** SPA-BUG-01-T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T19:21:54Z  
**Package:** `pkg-000053`

## Purpose
По evidence T01 зафиксировать **ровно один** primary layer: SPA / gateway-intake / env-network — и владельца fix для T03.

## Risk
Неверный pin → бессмысленный FE hotfix или ложный gateway ticket.

## Code Facts (re-verify at execute)
- T01 evidence note (`submit_post.status` / `cors_failed`).
- Catch-all: [`StorySubmitPage.jsx`](../../../../../../../src/pages/StorySubmitPage.jsx) `mapDraftErrorPhase` — 401/404 special-cased; **503 and all else → SERVICE_DOWN**.
- Pin table (backlog §D): 202+UI down→SPA; 5xx/503→gateway/intake; 403 verify→auth mapping; 401 session; 404 expired; status 0/CORS→network; GET OK + no POST→SPA handler.
- Reject weak hyp «empty VITE_GATEWAY» if preview GET on same base worked (backlog §Что это не).

## AC / DoD
- [x] (P0) Analysis note: one primary layer + next fix owner → FR-BUG-01.2 · backlog AC #2.
- [x] (P0) Note cites T01 `submit_post.status` (or cors_failed); maps via pin rules; rejects empty-gateway-if-preview-OK.
- [x] (P0) No product code change in this task.

## Where to change
- `spa-app/docs/analysis/` (root-cause / pin note)

## Out of scope
Code change (T03); asserting layer without T01 status/cors row.

## Verification
```bash
rg -n "primary layer|submit_post|SPA|gateway|cors_failed" spa-app/docs/analysis/
# Must cite T01 status before claiming pin
```
