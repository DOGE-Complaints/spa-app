# CR-15 — Lab visual wire both labs (structure Present · visual BLOCKED)

> **UTC:** 2026-10-16T11:13:45Z (P3) · P5 APPLY `2026-10-16T11:17:35Z`  
> **Package:** `pkg-000151` · EPIC-SPA-23  
> **Code home:** `ReactionsLabCanvas` · `FeedPostCard` / `FeedIssueDetailBody` · `FeedLabReactionsMount` · `FeedLabPage`  
> **Normative:** OP-UX-MIRROR-m154 (CR-11…14 composition) · M160 stress  
> **Status:** structure wire **Present** · gate **BLOCK** (OP eye Absent · Gap v2 residual · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Lab reactions | `Cr15CompositionStand` — 4-zone `FeedPostActionStrip` · React-always · aggregate-below · picker tiles+accents |
| Lab feed | Cards/detail keep 4-zone + aggregate-below + portal picker · `data-lab-cr15-wire=true` |
| Stress | CR-08 M160 knobs held under wire · light/dark/320 |
| Adapter | FixtureAdapter default · no dual live planes · M155 OOS |
| Visual lock | Partial=**BLOCK** until OP eye + Gap v2 glyph promote |

## Touchpoints

- `lab/ReactionsLabCanvas.jsx` · `ReactionsLabCanvas.css`
- `feed-lab/post/FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` · `reactions/FeedLabReactionsMount.jsx`
- `pages/FeedLabPage.jsx`
- Tests: `reactionsLab.cr15` · `feedLab.cr15`
- Lab verify: `#/lab/reactions` · `#/lab/feed` · light/dark

## OOS

Invent OP PASS · invent Gap v2 SVG · M155 · invent HTTP · `#/next/feed`

## Evidence

- Vitest feed-lab+rm **108**/108 · cr15 Present
- Path A shots md5: `d33258b2fe4f` · `b9127eaf67fa` · `12fe48fef3a7` · `1a3102aa9b84` · `449b90262284`
- P5: TASKED=0 · F1 WAIVED operator (OP eye+Gap v2) · F2–F4 WAIVED info · activation none
