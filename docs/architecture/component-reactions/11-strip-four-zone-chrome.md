# CR-11 — `#/lab/feed` four-zone strip chrome (structure Present · visual BLOCKED)

> **UTC:** 2026-10-16T10:32:31Z (P3) · P5 APPLY `2026-10-16T10:36:02Z`  
> **Package:** `pkg-000147` · EPIC-SPA-23  
> **Code home:** `src/features/feed-lab/post/FeedPostActionStrip.{jsx,css}`  
> **Normative:** OP-UX-MIRROR-m154 §3.1–3.4 · M154/M160  
> **Status:** structure chrome **Present** · gate **BLOCK** (OP eye Absent · Gap v2 residual · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Zones | `react` · `comment` · `share` · `reactions` · `data-lab-strip-zones="4"` |
| Chrome | icon+label equal weight · Runtime URLs `/icons/next-feed/actions/{id}.svg` |
| React slot | CR-09 `reactSlot` kept · pill neutralized for equal chrome |
| M160 states | `data-rm-react-state` · `--color-accent-*` rest/hover/focus/selected/disabled |
| Narrow | `data-lab-viewport=320` / `text-zoom=200` → CSS 2×2 |
| Gap v2 | `react.svg` Present wrong glyph · `reactions.svg` Absent — URLs wired · **no invent SVG** |
| Visual lock | `data-lab-visual-done=false` until OP eye + Gap promote |

## Touchpoints

- `FeedPostActionStrip.jsx` / `.css` — ZONES×4 · `FEED_POST_ACTION_ICON_URLS`
- Tests: `feedLab.cr11.test.jsx` · cr09/nflab07 zone-count updates
- Lab verify: `http://127.0.0.1:5173/#/lab/feed`

## OOS

Aggregate CR-12 · picker tiles CR-13 · invent SVG · invent OP PASS · M155 · invent HTTP · `#/next/feed`

## Evidence

- Vitest feed-lab **46**/46 · `feedLab.cr11` **3/3**
- Path A shots md5: `b7447368d77a` · `e9ad5305b9f7` · `e9ad5305b9f7` · `168d804c331e` · `f3e8a6bbc3bc`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
