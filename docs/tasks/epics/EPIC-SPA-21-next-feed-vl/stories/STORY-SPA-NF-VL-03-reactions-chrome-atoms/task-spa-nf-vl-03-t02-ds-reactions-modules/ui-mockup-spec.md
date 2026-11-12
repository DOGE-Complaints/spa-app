# UI-1 mockup-spec — STORY-SPA-NF-VL-03 reactions chrome atoms

**Date:** `2026-10-12T14:24:43Z` · **Path A** · ui_gate: auto (no AskQuestion)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**DS SSOT:** §8 reactions atoms

## Must-states (reactions chrome)

| Claim | Source | Implement |
|-------|--------|-----------|
| Compact aggregate strip + React | M154 THR-R-A · DS §8 | `ReactionAggregateStrip` · `data-testid="reaction-aggregate-strip"` |
| Desktop picker · labelled layers | M154 THR-R-B · DS §8 | `ReactionPicker` + `ReactionLayerGroup` + `ReactionOption` |
| Selection footer / capacity | M154 capacity · DS §8 | `ReactionSelectionFooter` |
| Scope hint (root / comment) | M154 THREAD-ROOT-SCOPE | `ReactionScopeHint` |
| Mobile sheet | M154 THR-R-E · 390 | `pickerVariant="sheet"` / harness `mobile` |
| Classic ReactionControls ≠ Done | AD-VL-01/02/03 | `ReactionChrome` · `data-vl-done-surface="ReactionChrome"` |
| Icon lock | Absent/collapse · no invent SVG | `THREADS_FEED_THREAD_ICONS` + catalog; promote only Present paths |

## Out

Invent reaction ids · M155 people · mutate `#/board` · reopen NF-09 body · invent SVG masters
