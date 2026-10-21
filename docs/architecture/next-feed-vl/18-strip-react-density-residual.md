# NF-18 — Strip React density residual (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T19:19Z (P3)  
> **Package:** `pkg-000196` · EPIC-SPA-20  
> **Code home:** `FeedCivicPost.css` · `FeedReactionsMount.css` · `#/next/feed`  
> **Normative:** [ARCH-DELTA §6](../../tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · M162 soft · Path A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Flatten | react-slot padding 0 · no outer hover · sole chrome on `.rm-summary-strip__react` |
| Glyphs | primary tip **28 CSS px** (Comment/Share/React) |
| Pad / touch | single pad `4px 8px` · mh **≥44** |
| Host | CR-23 Live · four-zone · focus held · `data-nf18-density=residual` |

## Evidence

- Path A shots 01–05 · CAPTURE-META `fails: []` · `visual_gate: BLOCK`
- vitest feed+feed-lab+reactions-mount+thread-mount+i18n **542/542** · feed.nf18 **2/2**
- probe: slotPad `0px` · reactPad `4px 8px` · icons `28px` · hostLive true
