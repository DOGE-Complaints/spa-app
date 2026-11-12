# UI-1 mockup-spec — STORY-SPA-NF-VL-02 BoardSearchField

**Date:** `2026-10-12T13:59:07Z` · **Path A** · ui_gate: auto (no AskQuestion)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)  
**DS SSOT:** §4 `BoardSearchField`

## Must-states (search control)

| Claim | Source | Implement |
|-------|--------|-----------|
| Named search field with value echo | M149 BoardToolbar query · DS §4 | `BoardSearchField` · `data-search-surface="BoardSearchField"` |
| Clear action Present when non-empty | M149 / DS §4 clear | `data-testid="board-search-field-clear"` |
| Desktop ≥ ~280×40 control | M149 layout | CSS min-height 40px · live width ≥280 |
| Narrow 390 · 44px control | M149 mobile | `@media max-width 767` height 44px |
| Catalog search glyph only | no invent icons | `/icons/next-shell/navigation/search.svg` |
| Filters `SearchInput` / `board-search-*` ≠ Done | AD-VL-01/02 ban | own `board-search-field-*` classes |

## Out

Invent search param · mutate `#/board` · reopen NF-12 body · invent SVG
