# CR-14 — Mark accent tokens CSS currentColor (structure Present · visual BLOCKED)

> **UTC:** 2026-10-16T11:04:23Z (P3) · P5 APPLY `2026-10-16T11:08:03Z`  
> **Package:** `pkg-000150` · EPIC-SPA-23  
> **Code home:** `tokens.css` · `crReactionAccentMap.js` · `ReactionMarkAccents.css` · picker/summary/aggregate CSS  
> **Normative:** OP-UX-MIRROR-m154 §4.5 · icon-token-map · design-tokens package §6  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Accent SSOT | `--rm-mark-accent-*` / `--rm-mark-soft-*` in `tokens.css` (light + dark) |
| Wire | `data-reaction-id` → `--rm-mark-accent` / `--rm-mark-soft` |
| Picker tiles | Icon `currentColor` = accent · selected soft bg + border from mark |
| Summary / aggregate | Same accent map on mark chips |
| SVG | Stroke/`currentColor` only · **no** multicolor `*-color.svg` generate |
| Visual lock | Partial=**BLOCK** until OP eye |

## Touchpoints

- `src/styles/tokens.css` — mark accent vars
- `icons/crReactionAccentMap.js` · `ReactionMarkAccents.css`
- `ReactionPickerOption.css` · `ReactionSummaryStrip.css` · `ReactionAggregateRow.css`
- Tests: `reactionsMount.cr14`
- Lab verify: `#/lab/reactions` · `#/lab/feed` · light/dark

## OOS

Invent OP PASS · invent multicolor SVG · Gap v2 chrome glyphs · M155 · invent HTTP · `#/next/feed`

## Evidence

- Vitest feed-lab+rm **99**/99 · cr14 Present
- Path A shots md5: `b7702f0023ac` · `160471ac3f50` · `06d90d978bcd` · `b9127eaf67fa` · `279e9b9a9c63`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
