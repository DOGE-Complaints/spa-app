# SPA-NS-04-T02 — Mobile shell chrome (app bar / bottom nav) chrome-only

**Status:** Done · P3 `2026-10-09T16:29:50Z`  
**Story:** [`../STORY-SPA-NS-04-shell-grid-mobile-chrome.md`](../STORY-SPA-NS-04-shell-grid-mobile-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md)  
**Depends on:** T01 layout grid  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:22:04Z`  
**Done:** `2026-10-09T16:29:50Z`  
**Package:** `pkg-000100`  

## Purpose
Narrow/mobile shell chrome (app bar / bottom nav) per M149 E + M159 **chrome-only** — FR-NS-04.2.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | MobileAppBar Present | [`MobileAppBar.jsx`](../../../../../../../src/components/AppShell/MobileAppBar.jsx) |
| 2 | MobileBottomNav Present | [`MobileBottomNav.jsx`](../../../../../../../src/components/AppShell/MobileBottomNav.jsx) Board + Profile |
| 3 | Wired on `#/next/feed*` | [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) · ≤767 CSS show |
| 4 | No feed stress body | WIP host only · OOS next-feed |

## AC / DoD

- [x] (P0) Mobile chrome-only AC
- [x] (P0) `nextShell.mobile.*` a11y
- [x] (P0) Feed stress OOS
