# UI-1 mockup-spec — STORY-SPA-NF-VL-04 discussion summary atoms

**Date:** `2026-10-12T14:41:59Z` · **Path A** · ui_gate: auto (no AskQuestion)  
**@mockup:** M152 md/png  
**DS SSOT:** §6 DiscussionHeader / ThreadSummary / CommentPreview / ViewDiscussionAction

## Must-states

| Claim | Source | Implement |
|-------|--------|-----------|
| Section DiscussionHeader | M152 / DS §6 | `DiscussionHeader` · `data-ds-surface="DiscussionHeader"` |
| Collapsed ThreadSummary + CommentPreview | M152 THR-P-C | `ThreadSummary` + `CommentPreview` literal bodies |
| ViewDiscussionAction expands | M152 | `ViewDiscussionAction` · keep expand behavior |
| Classic DISCUSSION chrome ≠ Done | AD-VL-01/02 | `DiscussionSummaryChrome` · `data-vl-done-surface` |
| Closed body only | FR-VL-04.2 | `selectPreviewBodies` |

## Out

Invent threads API · mutate `#/board` · reopen NF-08 · VL-05 tree plane
