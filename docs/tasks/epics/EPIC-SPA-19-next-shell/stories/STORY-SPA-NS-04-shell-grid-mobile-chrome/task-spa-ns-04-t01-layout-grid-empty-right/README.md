# SPA-NS-04-T01 — Layout grid + empty/omit right-rail slot (Q16)

**Status:** Done · P3 `2026-10-09T16:29:50Z`  
**Story:** [`../STORY-SPA-NS-04-shell-grid-mobile-chrome.md`](../STORY-SPA-NS-04-shell-grid-mobile-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md)  
**Depends on:** NS-01 host · NS-02/03 chrome preferred  
**ui_scope:** `shell`  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T16:22:04Z`  
**Done:** `2026-10-09T16:29:50Z`  
**Package:** `pkg-000100`  
**puppeteer_gate:** `test:ui:board-shell`  
**acceptance:** [`acceptance-verification-spa-ns-04.md`](./acceptance-verification-spa-ns-04.md) · **PASS**  
**ui-mockup-spec:** [`ui-mockup-spec.md`](./ui-mockup-spec.md) · gate **принято** overnight  
**ui-baseline:** [`ui-baseline/`](./ui-baseline/)  

**@mockup:** [`../../../../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.png`](../../../../../../UX/next/feed/DOGEstonia-dashboard-layout-artboard-v1.0.png)  
**@mockup-mobile:** [`../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md)  
**@component:** [`../../../../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) §12 omit · §9 MobileAppBar  
**@dui:** [`../../../../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md`](../../../../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) Q16

## Purpose
Layout grid hosts header + profile rail + main + optional empty/omit right slot (Q16) — FR-NS-04.1.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Empty right slot Present | [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx) `showRightSlot` · `data-testid="next-shell-right-slot"` |
| 2 | Grid 240 + main + 280 empty | [`ProfileRail.css`](../../../../../../../src/components/AppShell/ProfileRail.css) · live `240px … 280px` |
| 3 | No NodeContextRail product | slot `aria-hidden` · empty · no HTTP |
| 4 | UI-0/1/3 | `ui-baseline/` + `ui-mockup-spec.md` · gate PASS |

## AC / DoD

- [x] (P0) Grid + empty/omitted right-rail product module (Q16)
- [x] (P0) UI gate §UI PASS
- [x] (P0) Feed body OOS
