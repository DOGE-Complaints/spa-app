# Arch note — NS-09 ProfileRail Feed cleanup

> P8 local close `2026-10-22T13:19:51Z` · `pkg-000202` · structure Present · visual BLOCK (OP eye)

## Pattern

Drop top summary Profile block (icon + meta + non-working chevron). Keep lower nav **Profile** as sole Profile entry. Nav label **Feed** (was Board) · `to=/next/feed` held · soft MobileBottomNav Feed. Omit «No stories yet» empty copy (metrics-only when Present). No invent activity API.

## Surfaces

- `ProfileRail.jsx` / `.css` — no summary · Feed label · empty omit
- `nextShellDictionary.js` — `rail.board` / `mobile.navBoard` → Feed (et/ru/en)
- Soft `MobileBottomNav.jsx`

## Markers

`data-ns09="rail"` · `data-testid=profile-rail-nav-feed-label` · Path A CAPTURE-META probe summaryAbsent/emptyAbsent/feedLabel

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent activity API · Logo/locale OOS.
