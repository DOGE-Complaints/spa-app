# Arch note — NS-10 Header logo light + scale (vector)

> P8 local close `2026-10-22T13:40:36Z` · `pkg-000203` · structure Present · visual BLOCK (OP eye)

## Pattern

Public header brand on light/transparent chrome — **no** dark rectangular plate. Visible band ~**44 CSS px** (M165 40–48). Prefer prepared **SVG** horizontal (`DOGEstonia-logo-horizontal-{light,dark}.svg`) — not PNG dark-backed master as light UI source; placeholder fallback ≠ production. Dark: same geometry · light DOGE + orange stonia on continuous header. Brand home `/next/feed`.

## Surfaces

- `Header.jsx` — theme-aware SVG src · `data-ns10="brand"` · home `/next/feed`
- `Header.css` — `.header-brand-logo { height: 44px }` · transparent · no plate
- `public/assets/DOGEstonia-logo-horizontal-{light,dark}.{svg,png}` — prepared from horizontal master (plate removed)

## Markers

`data-ns10` · `data-ns10-logo` · Path A CAPTURE-META probe heightPx=44 · isSvg · isMasterPng false

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent mascot · no invent CDN · Footer logo (PH-11) OOS.
