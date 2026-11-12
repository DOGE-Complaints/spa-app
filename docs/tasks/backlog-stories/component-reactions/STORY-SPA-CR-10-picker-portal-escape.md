# STORY-SPA-CR-10 — Picker portal escape (P1)

## Meta

- **Key:** `STORY-SPA-CR-10-picker-portal-escape`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P5 TASKED=0 · gate **BLOCK** · `pkg-000146` · `2026-10-15T20:01:22Z`
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-09](STORY-SPA-CR-09-strip-slot-composition.md) · [CR-05](STORY-SPA-CR-05-strip-open-dismiss.md) · [CR-06](STORY-SPA-CR-06-picker-chrome-layout.md)
- **Blocks:** —
- **UX mirror:** [OP-UX-MIRROR-lab-feed-composition-2026-10-15.md](OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.3
- **Code home:** `ReactionPicker` / `ReactionsMount` popover host · portal to `document.body` · position from zone-1 caret

## Зачем

На `#/lab/feed` desktop popover клипится `FeedPostCard` (`overflow: hidden`) и скроллится внутри карточки. **P1:** portal + fixed (или equivalent) от якоря strip — не снимать `overflow: hidden` с карточки как primary fix.

## Current (verified)

| Piece | Fact |
|-------|------|
| Card clip | [`FeedPostCard.css`](../../../../src/features/feed-lab/post/FeedPostCard.css) `overflow: hidden` |
| Picker surface | [`ReactionPicker.css`](../../../../src/features/reactions-mount/picker/ReactionPicker.css) `--popover`: `position: absolute` · `max-height` · `overflow: auto` |
| Anchor after CR-09 | Zone 1 `ReactionSummaryStrip` (A+C) |

## UX SSOT

- Mirror §3.3 · CR-05 dismiss · CR-06 hug-width / footer hint  
- Narrow viewport: sheet grammar (CR-02) остаётся допустимой  
- **Forbidden primary:** only remove card `overflow: hidden` (P2)

## FR

- **FR-CR-10.1** Desktop popover mounts via portal (e.g. `createPortal` → `document.body`), not clipped by card overflow.  
- **FR-CR-10.2** Position: `fixed` (or equivalent) from zone-1 caret / strip bounding rect; stays readable when card scrolls under.  
- **FR-CR-10.3** Internal list scroll only when content exceeds viewport-safe max-height — not because card clips the popover.  
- **FR-CR-10.4** Click-outside / Escape / icon-only close (CR-05) work with portal host.  
- **FR-CR-10.5** CR-06 layout (hug-width, hint footer, capacity header) unchanged in intent.  
- **FR-CR-10.6** Mobile / narrow: sheet path may remain in-flow; portal primary for desktop popover.  

## Вне scope

Theme stress (CR-08) · strip zone count (CR-09) · `#/next/feed` · M155 · invent HTTP · redesign card overflow as sole fix  

## Acceptance Criteria

- [ ] Open picker on `#/lab/feed` root post — full popover visible outside card clip  
- [ ] No reliance on removing `FeedPostCard` `overflow: hidden` as the fix  
- [ ] Outside click / Escape / light X still dismiss  
- [ ] Vitest: portal host present when open (or position not under clipped ancestor)  
- [ ] Verify: `http://127.0.0.1:5173/#/lab/feed`  

## Technical subtasks

> P1.3 activated `2026-10-15T19:54:49Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-10](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-10-picker-portal-escape/STORY-SPA-CR-10-picker-portal-escape.md) · `pkg-000146`  

> Verified: popover `position: absolute` in `ReactionPicker.css`; card `overflow: hidden`; `createPortal` Absent in spa-app.

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-10-t01-popover-portal-fixed` | Done | Desktop popover open → `createPortal` → `document.body`; CSS `--popover` → `position: fixed` + coords; sheet path untouched | `ReactionPicker.jsx` + `.css` | 10.1–10.2 · 10.6 |
| `task-spa-cr-10-t02-anchor-measure-reposition` | Done | ref on strip/anchor (optional `forwardRef` SummaryStrip); `getBoundingClientRect` → `top=bottom+8`, `left`; scroll(capture)+resize; viewport clamp | `ReactionsMount.jsx` · optional `ReactionSummaryStrip.jsx` | 10.2–10.3 |
| `task-spa-cr-10-t03-dismiss-zindex-portal` | Done | CR-05 outside/Escape/icon-close on portaled `rootRef`; z-index above feed chrome | `ReactionPicker.jsx` | 10.4–10.5 |
| `task-spa-cr-10-t04-vitest-portal-escape` | Done | Assert picker parent = `document.body` (or not under `.feed-post-card`); cr05 dismiss still green | `reactionsMount.cr10.test.jsx` (+ cr05) | AC |

### Constraints (all tasks)

- No invent HTTP / second client / M155 / `#/next/feed` cutover  
- **Forbidden primary:** change `FeedPostCard` `overflow: hidden` as the fix (P2)  
- Theme stress → CR-08 · strip zone count → CR-09  
- Keep CR-06 hug-width / hint footer intent  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

OP eye: picker floats over feed card; scroll/clip artifact gone on desktop.
