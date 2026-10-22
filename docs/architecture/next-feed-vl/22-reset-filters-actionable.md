# Arch note — NF-22 Reset Filters actionable + cursor

> P8 local close `2026-10-22T14:20:42Z` · `pkg-000205` · structure Present · visual BLOCK (OP eye)

## Pattern

Reset Filters is actionable when `isDirty || hasActiveFilters`. Disabled only when neither. Pointer cursor when actionable; not-allowed when disabled. Reset clears applied filters and pending panel dirty (existing draft hook).

## Surfaces

- `ResetFiltersControl.jsx` — `actionable` · class `board-filter-reset`
- `FeedToolbar.jsx` · `BoardToolbar.jsx` — pass `isDirty` + `hasActiveFilters`
- `Filters.css` — `.board-filter-reset` pointer / not-allowed

## Markers

Filters.nf22 · ResetFiltersControl tests · Path A CAPTURE-META `fails: []`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent new filter fields · NF-21 date color-scheme OOS.
