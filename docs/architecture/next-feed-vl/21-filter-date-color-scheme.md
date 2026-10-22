# Arch note — NF-21 Filter date color-scheme follows theme

> P8 local close `2026-10-22T14:04:42Z` · `pkg-000204` · structure Present · visual BLOCK (OP eye)

## Pattern

`.board-filter-date-native` `color-scheme` follows `data-theme` (light→light, dark→dark). Retire hardcoded `color-scheme: dark` as the sole rule on the base selector. No custom calendar widget.

## Surfaces

- `Filters.css` — `[data-theme=light|dark] .board-filter-date-native` · fallback dark when theme unset
- Soft `LocalizedDateInput.jsx` class held

## Markers

Filters.nf21 CSS asserts · Path A CAPTURE-META probe nativeCount · schemes light/dark

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent custom calendar · Reset Filters (NF-22) OOS.
