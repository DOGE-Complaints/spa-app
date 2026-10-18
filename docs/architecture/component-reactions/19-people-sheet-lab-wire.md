# CR-19 — People sheet + lab wire M155 C (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T10:55:57Z (P3) · P5 APPLY `2026-10-18T10:58:42Z`  
> **Package:** `pkg-000155` · EPIC-SPA-23  
> **Code home:** `resolvePeopleSurface` · `ReactionsDialog` surface=sheet · `ReactionsMount` · lab stands · `FeedLabReactionsMount`  
> **Normative:** OP-UX-MIRROR-strip-polish §4.5 · M155 Panel C  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Gap v2 `reactions.svg` Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| `resolvePeopleSurface` | auto ≤640px → sheet · force popover/sheet |
| Narrow open | Reactions/aggregate → full-distribution **sheet** (≠ picker) |
| Sheet chrome | ≤88dvh · safe-area · header+tabs+list · Escape dismiss |
| Desktop | popover → View all → dialog (CR-17/18 held) |
| Labs | `#/lab/reactions` CR-19 stands · `#/lab/feed` auto/narrow sheet |
| CR-16 polish | held (no polish CSS churn this story) |
| People data | FixtureAdapter · Live fail-closed · no invent people HTTP |
| Gap v2 | Runtime URL wired · file **Absent** (no invent SVG) |

## Touchpoints

- `reactions-mount/people/resolvePeopleSurface.js` · `ReactionsDialog.*` · `ReactionsMount.jsx`
- `lab/ReactionsLabCanvas.jsx` (`rm-lab-cr19-people-*`)
- `feed-lab/post/reactions/FeedLabReactionsMount.jsx`
- Tests: `reactionsMount.cr19` · feed-lab suite
- Lab verify: `#/lab/reactions` · `#/lab/feed` light/dark · ~390

## OOS

Invent OP PASS · invent SVG bodies · invent people HTTP · real Connect · `#/next/feed`

## Evidence

- Vitest reactions-mount+feed-lab **132**/132 · cr19 Present
- Path A shots md5: `12456a4bece2` · `0c39b8abbdec` · `1309161953f8` · `9fd0649c9876` · `357a6b5bb58b`
- P5: TASKED=0 · F1 WAIVED operator (OP eye+Gap v2) · F2–F4 WAIVED info · activation none
