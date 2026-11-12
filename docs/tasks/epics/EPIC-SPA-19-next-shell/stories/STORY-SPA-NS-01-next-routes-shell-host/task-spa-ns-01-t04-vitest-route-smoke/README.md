# SPA-NS-01-T04 — Vitest: next feed routes render in shell

**Status:** Done · P3 `2026-10-09T15:09:58Z`  
**Story:** [`../STORY-SPA-NS-01-next-routes-shell-host.md`](../STORY-SPA-NS-01-next-routes-shell-host.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md)  
**Depends on:** T01–T03  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:02:39Z`  
**Done:** `2026-10-09T15:09:58Z`  
**Package:** `pkg-000097`  
**Gate:** [`acceptance-verification-spa-ns-01.md`](./acceptance-verification-spa-ns-01.md)

## Purpose
Vitest smoke + story acceptance §UI (no separate T05 gate).

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Route smoke PASS | `src/pages/__tests__/NextFeedHostPage.test.jsx` |
| 2 | Policy public | `sessionRoutePolicy.test.js` |
| 3 | board-shell regression | `npm run test:ui:board-shell` PASS |
| 4 | Acceptance | `acceptance-verification-spa-ns-01.md` PASS |

## AC / DoD

- [x] Vitest covers next feed routes in `AppShellLayout`
- [x] Placeholder visible · no fake feed cards
- [x] Story AC evidenced + §UI
