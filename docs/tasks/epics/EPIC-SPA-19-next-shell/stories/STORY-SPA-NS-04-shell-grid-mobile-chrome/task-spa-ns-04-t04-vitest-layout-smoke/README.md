# SPA-NS-04-T04 — Vitest: grid hosts + no right-rail invent

**Status:** Done · P3 `2026-10-09T16:29:50Z`  
**Story:** [`../STORY-SPA-NS-04-shell-grid-mobile-chrome.md`](../STORY-SPA-NS-04-shell-grid-mobile-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md)  
**Depends on:** T01–T03  
**ui_scope:** `shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:22:04Z`  
**Done:** `2026-10-09T16:29:50Z`  
**Package:** `pkg-000100`  

## Purpose
Vitest smoke: grid hosts · empty right · mobile chrome · `nextShell.mobile.*`.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Layout grid tests | [`AppShellLayout.ns04Grid.test.jsx`](../../../../../../../src/layout/__tests__/AppShellLayout.ns04Grid.test.jsx) |
| 2 | Mobile chrome tests | [`MobileChrome.ns04.test.jsx`](../../../../../../../src/components/AppShell/__tests__/MobileChrome.ns04.test.jsx) |
| 3 | Dictionary mobile keys | [`nextShellDictionary.test.js`](../../../../../../../src/i18n/__tests__/nextShellDictionary.test.js) |

## AC / DoD

- [x] (P0) Vitest covers grid + no right-rail invent
- [x] (P0) No feed-content Done assumption
