# Arch note — NS-07 shell dark icon chrome

> P3 `2026-10-21T20:10:51Z` · `pkg-000199` · structure Present · visual BLOCK (OP eye)

## Pattern

`ShellChromeIcon` — CSS `mask-image` + `background-color: currentColor` (same approach as `CrReactionIcon`). External SVG `<img>` cannot inherit button text color on dark.

## Surfaces

- Header: search · notifications · menu
- ThemeToggle · AccountControl (account glyph + chevron; photo avatars stay `<img>`)
- ProfileRail · MobileBottomNav · MobileAppBar

## Markers

`data-ns07="mask"` · `data-ns07-icon-src` · soft `data-ns07-rail="mask"`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · light theme held (no invert-only hack).
