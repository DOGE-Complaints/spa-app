# CR-17 — ReactorsPopover M155 A (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T10:39:51Z (P3) · P5 APPLY `2026-10-18T10:42:46Z`  
> **Package:** `pkg-000153` · EPIC-SPA-23  
> **Code home:** `reactions-mount/people/ReactorsPopover` · `ReactionsMount` · Fixture/Live adapters · feed-lab strip zone  
> **Normative:** OP-UX-MIRROR-strip-polish §4.1–4.3 · M155 Panel A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Gap v2 `reactions.svg` Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Reactions / aggregate | `handleOpenPeople` / `activateAggregate` → people · **not** `ReactionPicker` |
| React affordance | Still opens picker only |
| ReactorsPopover | ~320px · header «People who reacted» · combined list · avatar+badge · **no Connect** · Escape/outside |
| A1 / A2 | Fixture `peopleState` loading/error · Live `listReactors` fail-closed |
| Dark tokens | `[data-theme='dark']` on `.rm-reactors` |
| Gap v2 icon | Runtime URL `/icons/next-feed/actions/reactions.svg` wired · file **Absent** (no invent SVG) |

## Touchpoints

- `reactions-mount/ReactionsMount.jsx` · `people/ReactorsPopover.*`
- `ReactionSummaryStrip.jsx` · `ReactionAggregateRow.jsx`
- `adapters/FixtureAdapter.js` · `LiveAdapter.js`
- `feed-lab/post/FeedPostActionStrip.jsx` (URL) · `FeedLabReactionsMount.jsx`
- Tests: `reactionsMount.cr17` · feed-lab suite
- Lab verify: `#/lab/feed` light/dark

## OOS

Invent OP PASS · invent SVG bodies · invent people HTTP · Connect in compact · CR-18 dialog · CR-19 sheet · `#/next/feed`

## Evidence

- Vitest reactions-mount+feed-lab **120**/120 · cr17 Present
- Path A shots md5: `116934941004` · `116934941004` · `875654d68d7b` · `748179b7b82c` · `8e0ace465b3f`
- P5: TASKED=0 · F1 WAIVED operator (OP eye+Gap v2) · F2–F4 WAIVED info · activation none
