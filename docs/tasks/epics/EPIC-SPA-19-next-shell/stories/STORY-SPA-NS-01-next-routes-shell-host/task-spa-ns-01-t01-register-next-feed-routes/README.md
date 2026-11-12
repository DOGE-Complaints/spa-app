# SPA-NS-01-T01 — Register `#/next/feed*` above catch-all `*`

**Status:** Done · P3 `2026-10-09T15:09:58Z`  
**Story:** [`../STORY-SPA-NS-01-next-routes-shell-host.md`](../STORY-SPA-NS-01-next-routes-shell-host.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md)  
**ui_scope:** `shell`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:02:39Z`  
**Done:** `2026-10-09T15:09:58Z`  
**Package:** `pkg-000097`  
**puppeteer_gate:** `test:ui:board-shell`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)  
**ui-mockup-spec:** [`ui-mockup-spec.md`](./ui-mockup-spec.md) · gate **принято** overnight  
**ui-baseline:** [`ui-baseline/`](./ui-baseline/)

## Purpose
Register `#/next/feed*` above catch-all `*` under `AppShellLayout`.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Routes Present above `*` | [`App.jsx`](../../../../../../../src/App.jsx) `/next/feed` + `/next/feed/issue/:id` |
| 2 | Public shell chrome | [`sessionRoutePolicy.js`](../../../../../../../src/router/sessionRoutePolicy.js) `isPublicPath` includes `/next/feed*` |
| 3 | Host page | [`NextFeedHostPage.jsx`](../../../../../../../src/pages/NextFeedHostPage.jsx) |
| 4 | UI-0/1/3 | `ui-baseline/` + `ui-mockup-spec.md` |

## AC / DoD

- [x] `#/next/feed` and `#/next/feed/issue/:id` registered above catch-all `*`
- [x] Routes render inside `AppShellLayout`
- [x] No new HTTP endpoints · no BoardFeed invent
