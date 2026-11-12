# Acceptance verification — STORY-SPA-NS-03 ProfileRail + shelter nav

**Date:** `2026-10-09T16:09:26Z`  
**Package:** `pkg-000099`  
**Result:** **PASS**  
**ui_anchor:** T01 · `ui_gate: auto` · human gate **принято** overnight

## AC matrix

| AC | Evidence | Status |
|----|----------|--------|
| Rail metrics/status + nav only (Q15); no cabinet redesign | [`ProfileRail.jsx`](../../../../../../../src/components/AppShell/ProfileRail.jsx) · empty/metrics slots · no fake cards | PASS |
| Icons `/icons/next-shell/…` | board/profile/my-stories/location/verified/chevron-down wired · NS-02 promote Present | PASS |
| API = CAB `/story-activity` or honest empty | [`useStoryActivityRail.js`](../../../../../../../src/hooks/useStoryActivityRail.js) honest empty · no invent fields | PASS |
| Feed body OOS | NS-01 WIP host unchanged · no BoardFeed | PASS |
| Shelter-list intact classic | `#/board` still `PUBLIC_SHELL_SHOW_SIDEBAR=false` · Sidebar shelter path | PASS |

## §UI

| Check | Path / fact | Status |
|-------|-------------|--------|
| UI-0 | [`ui-baseline/pre-implement/`](./ui-baseline/pre-implement/) | PASS |
| UI-1 | [`ui-mockup-spec.md`](./ui-mockup-spec.md) · M149 ProfileRail · **принято** | PASS |
| UI-3 PNG | [`ui-baseline/post-implement/01-next-feed-profile-rail.png`](./ui-baseline/post-implement/01-next-feed-profile-rail.png) | PASS |
| Story-root pack (P6) | [`../screenshots/README.md`](../screenshots/README.md) · [`full-cycle/`](../screenshots/full-cycle/) | PASS |
| Story-root Happy | [`01-next-feed-profile-rail-happy.png`](../screenshots/full-cycle/01-next-feed-profile-rail-happy.png) · [`02-board-shelter-intact.png`](../screenshots/full-cycle/02-board-shelter-intact.png) | PASS |
| Vitest | ProfileRail.ns03 · AppShellLayout.ns03Rail · nextShellDictionary · NextFeedHostPage | PASS |
| `test:ui:board-shell` | exit 0 @ `2026-10-09T16:09:26Z` | PASS |
| Live smoke (backend UP) | Vite `4173` · rail Present · empty · P6 live PNGs | PASS |

## Out of scope (not FAIL)

BoardFeed · cabinet redesign · new SVG · new HTTP · flip `/` (NS-06) · right-rail NodeContext
