# NF-15 — `#/next/feed` action strip density · React unframe (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T12:42Z (P5 APPLY)  
> **Package:** `pkg-000191` · EPIC-SPA-20  
> **Code home:** `FeedCivicPost` · `FeedReactionsMount` CSS · `FeedLabNf15Stand` · `#/next/feed`  
> **Normative:** Path A [M162](../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · ARCH-DELTA §3  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Unframe | Post-strip host only: `.feed-civic-post-actions .rm-summary-strip__react` · border none · transparent · peers flat |
| Icons | Primary glyphs **24×24** CSS px · reuse `/icons/next-feed/actions/{react,comment,share}.svg` |
| Desktop | pad **4v/8h** · gap **6** · mh **44** · `data-nf15-density="m162"` |
| Narrow | `@media (max-width: 420px)` reuse · stacked · gap **4** · mh **56** · four zones held |
| CR-23 | Live `FeedReactionsMount` host held · comment-node / feed-lab strip chrome untouched |
| Focus | `:focus-visible` held after unframe |

## Touchpoints

- `FeedCivicPost.css` · `FeedCivicPost.jsx` · `FeedReactionsMount.css`
- Lab: `FeedLabNf15Stand.jsx` · `FeedLabPage.jsx`
- Tests: `feed.nf15` · `feedLab.nf15` · Path A `scripts/tmp-nf15-capture.mjs`

## OOS

Picker redesign · Comment/Share onClick wiring · invent OP PASS · invent HTTP · new action SVG pack · reaction summary HOLD

## Evidence

- Path A shots 01–05 Present · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+i18n+reactions-mount+thread-mount **525/525** · feed.nf15 **2/2** · feedLab.nf15 **1/1**
- P5: F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none`
