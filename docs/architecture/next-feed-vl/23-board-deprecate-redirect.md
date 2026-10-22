# Arch note — NF-23 Board deprecate redirect

> P8 local close `2026-10-22T14:39:25Z` · `pkg-000206` · structure Present · visual BLOCK (OP eye)

## Pattern

Classic `#/board` replace-redirects to `#/next/feed`. Soft public CTAs (Header dashboard · HowItWorks · Footer brand · soft AppShell nav) retarget `/next/feed`. Inventory before purge — `BoardPage` file held; shared boardQuery/Filters/map kept.

## Surfaces

- `App.jsx` — `path="/board"` → `<Navigate to="/next/feed" replace />`
- `Header.jsx` · `HowItWorksPage.jsx` · `PublicFooter.jsx` · soft `AppShell.jsx` nav
- Inventory: story `inventory-board-vs-shared.md`
- Smoke: `tests/puppeteer/board-shell-smoke.mjs` asserts `#/board` → next-feed host

## Markers

`App.nf23BoardRedirect` · NS-06 board case · Path A CAPTURE-META `fails: []`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent CDN · no mass-delete without inventory.
