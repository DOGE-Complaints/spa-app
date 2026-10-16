# CR-13 — Picker tile grid + footer chrome (structure Present · visual BLOCKED)

> **UTC:** 2026-10-16T10:53:17Z (P3) · P5 APPLY `2026-10-16T10:58:19Z`  
> **Package:** `pkg-000149` · EPIC-SPA-23  
> **Code home:** `ReactionPicker` · `ReactionPickerOption` · `ReactionPickerLayerGroup` · L10N `desc.*`  
> **Normative:** OP-UX-MIRROR-m154 §4 · M154 B/C/D  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Option layout | Horizontal **tile grid** per layer · icon + bold label + short description |
| Selected | Soft bg + accent border + check badge on icon cell |
| Header | Title + capacity subtitle + icon-only close |
| Footer popover | «N of 3 selected» · Cancel · Add reactions |
| Footer sheet | «N of 3» · Done |
| Portal | CR-10 `createPortal`→body held · dismiss intact |
| Save | Optimistic select (Present) · footer chrome closes picker |
| Visual lock | Partial=**BLOCK** until OP eye |

## Touchpoints

- `ReactionPicker.jsx` / `.css` — header · footer · portal
- `ReactionPickerOption.jsx` / `.css` — `data-rm-tile` · desc · check
- `ReactionPickerLayerGroup.jsx` / `.css` — CSS grid
- `threadsFeedDictionary.js` · `labI18n.js` — title/cancel/add/done/`desc.*`
- Tests: `reactionsMount.cr13`
- Lab verify: `#/lab/reactions` · `#/lab/feed`

## OOS

Mark accent tokens CR-14 · invent OP PASS · M155 · invent HTTP · Lucide · `#/next/feed`

## Evidence

- Vitest feed-lab+rm **94**/94 · cr13 Present
- Path A shots md5: `2b794d08195d` · `f6e8289cdca2` · `8c31985944f0` · `04ee1282312a` · `8fa6a85b4b2d`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
