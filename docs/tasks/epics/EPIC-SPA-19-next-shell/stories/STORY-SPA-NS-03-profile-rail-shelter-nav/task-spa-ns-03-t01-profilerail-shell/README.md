# SPA-NS-03-T01 — ProfileRail chrome (metrics/status + nav only Q15)

**Status:** Done · P3 `2026-10-09T16:09:26Z`  
**Story:** [`../STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md)  
**Depends on:** NS-01 host · NS-02 icons Present  
**ui_scope:** `shell`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:04:13Z`  
**Done:** `2026-10-09T16:09:26Z`  
**Package:** `pkg-000099`  
**puppeteer_gate:** `test:ui:board-shell`  
**acceptance:** [`acceptance-verification-spa-ns-03.md`](./acceptance-verification-spa-ns-03.md) · **PASS**  
**ui-mockup-spec:** [`ui-mockup-spec.md`](./ui-mockup-spec.md) · gate **принято** overnight  
**ui-baseline:** [`ui-baseline/`](./ui-baseline/)  

**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)  
**@component:** [`../../../../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) §10 ProfileRail  
**@register:** [`../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md`](../../../../../backlog-stories/next-shell/NS-shell-mockup-intake-register.md) row NS-R  
**@dui:** [`../../../../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md`](../../../../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) Q15

## Purpose
ProfileRail chrome (metrics/status + nav only Q15) — FR-NS-03.1 · `nextShell.rail.*`.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | ProfileRail Present | [`ProfileRail.jsx`](../../../../../../../src/components/AppShell/ProfileRail.jsx) |
| 2 | Mounted on `#/next/feed*` | [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) `NextFeedProfileRailSlot` · `next-shell-route` |
| 3 | Classic shelter intact | `#/board` · `PUBLIC_SHELL_SHOW_SIDEBAR=false` |
| 4 | UI-0/1/3 | `ui-baseline/` + `ui-mockup-spec.md` · gate PASS |

## AC / DoD

- [x] (P0) ProfileRail chrome Q15 · no fake cards
- [x] (P0) UI gate §UI PASS
- [x] (P0) Feed body OOS
