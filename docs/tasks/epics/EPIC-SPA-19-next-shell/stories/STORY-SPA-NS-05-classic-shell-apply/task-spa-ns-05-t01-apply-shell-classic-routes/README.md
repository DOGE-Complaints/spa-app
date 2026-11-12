# SPA-NS-05-T01 — Same shell composition on classic `/board`, `/issue/:id`

**Status:** Done · P3 `2026-10-09T17:21:55Z`  
**Story:** [`../STORY-SPA-NS-05-classic-shell-apply.md`](../STORY-SPA-NS-05-classic-shell-apply.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md)  
**Depends on:** NS-01…04 shell composition Done on next  
**ui_scope:** `shell`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:42:01Z`  
**Done:** `2026-10-09T17:21:55Z`  
**Package:** `pkg-000101`  
**puppeteer_gate:** `test:ui:board-shell` (hang · CDP live substitute)  
**acceptance:** [`acceptance-verification-spa-ns-05.md`](./acceptance-verification-spa-ns-05.md) · **PASS**  
**ui-mockup-spec:** [`ui-mockup-spec.md`](./ui-mockup-spec.md) · gate **принято** overnight  
**ui-baseline:** [`ui-baseline/`](./ui-baseline/)  

**@mockup:** [`../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md`](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) §3 D2.3  
**@risks:** [`../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row NS-X  
**@shell-reuse:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)  
**@icons:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md)

## Purpose
Same AppShell composition on classic `#/board`, `#/issue/:id` — FR-NS-05.1. Optional `nextShell.shelter.classicHint`.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Classic uses next-shell chrome | [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) `useNextShellChrome` · `.next-shell-classic-shelter` |
| 2 | ProfileRail + empty right + mobile | same slots as next-feed |
| 3 | UI-0/1/3 | `ui-baseline/` + `ui-mockup-spec.md` · gate PASS |
| 4 | Vitest | `AppShellLayout.ns05Classic.test.jsx` |

## AC / DoD

- [x] (P0) Classic routes render new shell chrome (D2.3)
- [x] (P0) UI gate §UI PASS
- [x] (P0) Feed body OOS

## Out of scope
BoardFeed · retire classic · `/` flip · git push.
