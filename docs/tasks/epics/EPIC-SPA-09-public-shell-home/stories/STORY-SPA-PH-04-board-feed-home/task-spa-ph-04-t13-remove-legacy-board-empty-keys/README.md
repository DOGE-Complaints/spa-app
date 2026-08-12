# SPA-PH-04-T13 — Remove unused legacy board empty/error keys (post-audit F7)

**Status:** Done — P3 2026-08-04T12:48:38Z  
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [audit-STORY-SPA-PH-04-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-04-execution-2026-08-04.md) §F7  
**Depends on:** T09  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-04T12:33:45Z  
**Package:** `pkg-000049`

## Purpose
Удалить неиспользуемые legacy empty/error strings из `dictionaries.js` после cutover на `publicHome.board.*`.

## AC / DoD
- [x] (P0) Removed `noIssuesRecorded`, `noResultsMatch`, `loadErrorSubtitle` (unused).
- [x] (P0) Kept `loadErrorTitle` — still used by `IssuePage.jsx`.
- [x] (P0) `publicHome.board.*` preserved; tests green.

## Gate
[`acceptance-verification-spa-ph-04-t13.md`](./acceptance-verification-spa-ph-04-t13.md)
