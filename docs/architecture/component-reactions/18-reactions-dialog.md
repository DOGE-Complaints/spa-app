# CR-18 — ReactionsDialog M155 B (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T10:47:25Z (P3) · P5 APPLY `2026-10-18T10:50:15Z`  
> **Package:** `pkg-000154` · EPIC-SPA-23  
> **Code home:** `reactions-mount/people/ReactionsDialog` · `ReactionsMount` · `ReactorsPopover` View all · FixtureAdapter people  
> **Normative:** OP-UX-MIRROR-strip-polish §4.4 · M155 Panel B  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| View all | ReactorsPopover footer → `handleOpenDialog` · closes popover |
| ReactionsDialog | ~560px portal · header «Reactions» · close · Escape + Tab focus trap |
| Tabs | All + types from `summaryMarks` · underline active · filter by `reaction_id` |
| Rows | avatar+badge · Connect stub / You (no Connect) / unavailable |
| Connect stub | honest «not available yet» · no relationship create |
| Empty / loading / error | B2 empty tab · loading · error (no View all on error popover) |
| No picker | `data-rm-picker=absent` inside dialog |
| People data | FixtureAdapter only · Live fail-closed held · no invent people HTTP |

## Touchpoints

- `reactions-mount/ReactionsMount.jsx` · `people/ReactionsDialog.*` · `people/ReactorsPopover.*`
- `adapters/FixtureAdapter.js` (Member C unavailable)
- `labI18n.js` · `threadsFeedDictionary.js`
- Tests: `reactionsMount.cr18` · feed-lab suite
- Lab verify: `#/lab/feed` light/dark

## OOS

Invent OP PASS · invent people HTTP · real Connect · picker in dialog · CR-19 sheet · `#/next/feed`

## Evidence

- Vitest reactions-mount+feed-lab **125**/125 · cr18 Present
- Path A shots md5: `f2241c910223` · `c888b6fe1288` · `05597244405d` · `f2241c910223` · `e75115b2291c`
- P5: TASKED=0 · F1 WAIVED operator (OP eye) · F2–F4 WAIVED info · activation none
