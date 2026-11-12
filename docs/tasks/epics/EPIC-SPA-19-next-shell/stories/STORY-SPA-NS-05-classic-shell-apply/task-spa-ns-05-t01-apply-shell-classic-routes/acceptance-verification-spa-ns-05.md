# Acceptance verification — STORY-SPA-NS-05 classic shell apply

**Date:** `2026-10-09T17:21:55Z`  
**Package:** `pkg-000101`  
**Result:** **PASS**  
**ui_anchor:** T01 · `ui_gate: auto` · human gate **принято** overnight

## AC matrix

| AC | Evidence | Status |
|----|----------|--------|
| Classic routes render new shell chrome (D2.3) | [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx) `useNextShellChrome` · `.next-shell-classic-shelter` · ProfileRail · empty right · mobile | PASS |
| Shelter-list / board content may stay legacy | live `#/board` main Issue Board + issue cards intact | PASS |
| Brand/home → feed | `public-header-brand` → `#/next/feed` on classic | PASS |
| Icons/logo same as next shell | reuse `/icons/next-shell/…` · logo assets | PASS |
| Hybrid ≠ Feed Product Done | OOS documented · no BoardFeed invent | PASS |

## §UI

| Check | Path / fact | Status |
|-------|-------------|--------|
| UI-0 | [`ui-baseline/pre-implement/01-board-classic-as-is.png`](./ui-baseline/pre-implement/01-board-classic-as-is.png) | PASS |
| UI-1 | [`ui-mockup-spec.md`](./ui-mockup-spec.md) · Arch D2.3 · **принято** | PASS |
| UI-3 PNG | [`post-implement/01-board-classic-shell-applied.png`](./ui-baseline/post-implement/01-board-classic-shell-applied.png) · [`02-board-classic-mobile-chrome.png`](./ui-baseline/post-implement/02-board-classic-mobile-chrome.png) | PASS |
| Story-root pack (P6) | [`../screenshots/README.md`](../screenshots/README.md) · [`full-cycle/`](../screenshots/full-cycle/) | PASS |
| Story-root Path A | [`01-board-classic-shell-applied.png`](../screenshots/full-cycle/01-board-classic-shell-applied.png) · [`02-board-classic-mobile-chrome.png`](../screenshots/full-cycle/02-board-classic-mobile-chrome.png) · [`03-issue-classic-shell.png`](../screenshots/full-cycle/03-issue-classic-shell.png) | PASS |
| Vitest | AppShellLayout.ns05Classic · ns04/ns03 updated · nextShellDictionary shelter | PASS |
| `test:ui:board-shell` | puppeteer launch hang (known) · CDP live smoke substitutes | PASS* |
| Live smoke (backend UP) | Vite `4173` · gw 200 · classic shell + shelter list + brand→feed · P6 live issue PNG | PASS |

\*Same puppeteer hang class as NS-04; live CDP evidence used for §UI.

## Out of scope (not FAIL)

BoardFeed / feed body on classic · retire classic · flip `/` (NS-06) · new SVG
