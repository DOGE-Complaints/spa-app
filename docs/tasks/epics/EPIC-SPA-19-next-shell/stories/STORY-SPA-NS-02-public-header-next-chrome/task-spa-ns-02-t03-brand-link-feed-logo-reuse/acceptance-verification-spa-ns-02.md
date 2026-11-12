# Acceptance verification — STORY-SPA-NS-02 PublicHeader next chrome

**Date:** `2026-10-09T15:46:55Z`  
**Package:** `pkg-000098`  
**Result:** **PASS**  
**ui_anchor:** T03 · `ui_gate: auto` · human gate **принято** overnight

## AC matrix

| AC | Evidence | Status |
|----|----------|--------|
| Brand → `#/next/feed`; logo reuse | Live evaluate `href=#/next/feed` · logo `/assets/DOGEstonia-logo-horizontal.png` · [`Header.jsx`](../../../../../../../src/components/AppShell/Header.jsx) | PASS |
| Guest/auth/locale/theme | Guest Sign in live · ThemeToggle + LanguageSelector present · logout → `/next/feed` ([`AccountControl.jsx`](../../../../../../../src/components/AccountControl/AccountControl.jsx)) | PASS |
| Icons `/icons/next-shell/…` | Promote `public/icons/next-shell/{navigation,actions,status}/` · curl 200 · live menu/search/theme/account/notifications srcs | PASS |
| Logout → feed home; no `/logout` | Vitest AccountControl · client `signOut` only | PASS |
| Search affordance ≠ live search; feed OOS | `public-header-search-affordance` aria «coming later» · WIP host unchanged | PASS |

## §UI

| Check | Path / fact | Status |
|-------|-------------|--------|
| UI-0 | [`ui-baseline/pre-implement/`](./ui-baseline/pre-implement/) | PASS |
| UI-1 | [`ui-mockup-spec.md`](./ui-mockup-spec.md) · M149 §4 · **принято** | PASS |
| UI-3 PNG | [`ui-baseline/post-implement/01-next-feed-header-chrome.png`](./ui-baseline/post-implement/01-next-feed-header-chrome.png) | PASS |
| Story-root pack (P6) | [`../screenshots/README.md`](../screenshots/README.md) · [`full-cycle/`](../screenshots/full-cycle/) | PASS |
| Story-root Happy | [`01-next-feed-header-happy.png`](../screenshots/full-cycle/01-next-feed-header-happy.png) · [`02-guest-or-theme-chrome.png`](../screenshots/full-cycle/02-guest-or-theme-chrome.png) | PASS |
| Vitest | Header.publicNav · Header.ns02Chrome · AccountControl · ThemeToggle · nextShellDictionary · NextFeedHostPage | PASS |
| `test:ui:board-shell` | exit 0 @ `2026-10-09T15:46:55Z` | PASS |
| Live smoke (backend UP) | Vite `4173` · brand/icons/WIP evaluate · P6 live PNGs | PASS |

## Out of scope (not FAIL)

BoardFeed · notifications inbox · new SVG/logo · flip `/` (NS-06) · ProfileRail (NS-03)
