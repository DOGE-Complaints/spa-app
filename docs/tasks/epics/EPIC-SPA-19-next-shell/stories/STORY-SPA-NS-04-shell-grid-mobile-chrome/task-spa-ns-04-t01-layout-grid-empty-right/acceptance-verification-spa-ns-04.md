# Acceptance verification — STORY-SPA-NS-04 shell grid + mobile chrome

**Date:** `2026-10-09T16:29:50Z`  
**Package:** `pkg-000100`  
**Result:** **PASS**  
**ui_anchor:** T01 · `ui_gate: auto` · human gate **принято** overnight

## AC matrix

| AC | Evidence | Status |
|----|----------|--------|
| Grid + empty/omit right-rail product (Q16) | [`AppShell.jsx`](../../../../../../../src/components/AppShell/AppShell.jsx) `showRightSlot` · empty `next-shell-right-slot` · live cols `240px … 280px` · no NodeContextRail | PASS |
| Mobile chrome-only; no feed stress body | [`MobileAppBar.jsx`](../../../../../../../src/components/AppShell/MobileAppBar.jsx) · [`MobileBottomNav.jsx`](../../../../../../../src/components/AppShell/MobileBottomNav.jsx) · ≤767 CSS · WIP main kept | PASS |
| Icons `/icons/next-shell/…` | menu/back/close/board/profile wired | PASS |
| No right-rail HTTP invent | empty slot only · no API | PASS |
| Feed body OOS | NS-01 WIP host unchanged | PASS |

## §UI

| Check | Path / fact | Status |
|-------|-------------|--------|
| UI-0 | [`ui-baseline/pre-implement/01-next-feed-grid-as-is.png`](./ui-baseline/pre-implement/01-next-feed-grid-as-is.png) (NS-03 shell as-is) | PASS |
| UI-1 | [`ui-mockup-spec.md`](./ui-mockup-spec.md) · layout + M149 E / M159 · **принято** | PASS |
| UI-3 PNG | [`post-implement/01-next-feed-grid-empty-right.png`](./ui-baseline/post-implement/01-next-feed-grid-empty-right.png) · [`02-next-feed-mobile-chrome.png`](./ui-baseline/post-implement/02-next-feed-mobile-chrome.png) | PASS |
| Story-root pack (P6) | [`../screenshots/README.md`](../screenshots/README.md) · [`full-cycle/`](../screenshots/full-cycle/) | PASS |
| Story-root Path A | [`01-…empty-right.png`](../screenshots/full-cycle/01-next-feed-grid-empty-right.png) · [`02-…mobile-chrome.png`](../screenshots/full-cycle/02-next-feed-mobile-chrome.png) · [`03-board-shelter-intact.png`](../screenshots/full-cycle/03-board-shelter-intact.png) | PASS |
| Vitest | AppShellLayout.ns04Grid · MobileChrome.ns04 · nextShellDictionary | PASS |
| `test:ui:board-shell` | exit 0 @ `2026-10-09T16:29:50Z` | PASS |
| Live smoke (backend UP) | Vite `4173` · gw 200 · empty right · mobile chrome + BottomNav · P6 live PNGs | PASS |

## Out of scope (not FAIL)

NodeContextRail product · BoardFeed · M159 feed stress · new SVG · flip `/` (NS-06)
