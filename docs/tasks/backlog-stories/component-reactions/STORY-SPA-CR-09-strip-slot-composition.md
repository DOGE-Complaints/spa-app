# STORY-SPA-CR-09 — Strip slot composition (A+C+B)

## Meta

- **Key:** `STORY-SPA-CR-09-strip-slot-composition`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P5 TASKED=0 · gate **BLOCK** · `pkg-000145` · `2026-10-15T19:52:23Z`
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-07](STORY-SPA-CR-07-lab-feed-cutover.md) · [CR-05](STORY-SPA-CR-05-strip-open-dismiss.md) · [CR-08](STORY-SPA-CR-08-lab-feed-theme-stress.md)
- **Blocks:** CR-10
- **UX mirror:** [OP-UX-MIRROR-lab-feed-composition-2026-10-15.md](OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.2
- **Code home:** `FeedPostActionStrip` · `FeedPostCard` · `FeedLabReactionsMount` / `ReactionsMount` slot into zone 1

## Зачем

Убрать двойной React и текстовую зону. **A+C+B:** живой strip в первой зоне · picker от этой зоны · зона **Reactions** удалена → **3 зоны**.

## Locked composition

| Zone | Content |
|------|---------|
| 1 · React slot | `ReactionSummaryStrip` (CR-05: empty→React · populated→aggregate) |
| 2 · Comment | text/control as today |
| 3 · Share | text/control as today |
| ~~Reactions~~ | **Removed (B)** |

- **C:** open picker from zone 1 (portal positioning → CR-10).  
- Root post: **no** second `ReactionsMount` / React pill under the strip.  
- Comment nodes: keep per-comment mount (compact); not required to use 3-zone strip.

## Current (verified)

- [`FeedPostActionStrip.jsx`](../../../../src/features/feed-lab/post/FeedPostActionStrip.jsx) — 4 text zones  
- [`FeedPostCard.jsx`](../../../../src/features/feed-lab/post/FeedPostCard.jsx) — strip then discussion with `FeedLabReactionsMount`  
- PRODUCT-BRIEF: slot inside PostActionStrip (no fifth strip between media and actions)

## FR

- **FR-CR-09.1** Root card action strip has **3** zones only (no `data-zone="reactions"`).  
- **FR-CR-09.2** Zone 1 renders live `ReactionSummaryStrip` (via `ReactionsMount` or equivalent), not plain label «React».  
- **FR-CR-09.3** No duplicate root React affordance below strip.  
- **FR-CR-09.4** Comment / Share zone behavior unchanged in intent.  
- **FR-CR-09.5** Tests updated: strip zone count · no `feed-post-action-reactions` · mount in zone 1.  

## Вне scope

Portal implementation details → [CR-10](STORY-SPA-CR-10-picker-portal-escape.md)  
Theme stress → CR-08 · M155 · `#/next/feed` · invent HTTP  

## Acceptance Criteria

- [ ] Strip shows 3 zones; Reactions text zone gone  
- [ ] Zone 1 = summary strip (empty/populated per CR-05)  
- [ ] No second React under strip on root post  
- [ ] `#/lab/feed` still opens discussion/comment flows  
- [ ] Vitest / lab smoke updated  
- [ ] Verify: `http://127.0.0.1:5173/#/lab/feed`  

## Technical subtasks

> P1.3 activated `2026-10-15T19:43:19Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-09](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-09-strip-slot-composition/STORY-SPA-CR-09-strip-slot-composition.md) · `pkg-000145`  

> Verified: `FeedPostActionStrip` = 4 text zones, no slot; root `FeedLabReactionsMount` lives under strip in `FeedDiscussionPlane`.

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-09-t01-strip-react-slot-three-zones` | Done | Prop `reactSlot`; ZONES without `reactions`; `data-lab-strip-zones="3"`; CSS 3 columns; zone1 wrapper (`data-zone="react"` / `feed-post-action-react`) without plain React button when slot set | `FeedPostActionStrip.jsx` + `.css` | 09.1–09.2 |
| `task-spa-cr-09-t02-card-detail-wire-slot` | Done | Root `reactSlot={FeedLabReactionsMount}`; remove strip text toggle of `reactionsOpen`; same in detail body | `FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` | 09.2–09.4 |
| `task-spa-cr-09-t03-remove-root-duplicate-mount` | Done | Remove root mount / `feed-post-discussion-reaction-slot`; **keep** comment mounts in `FeedCommentNode` | `FeedDiscussionPlane.jsx` | 09.3 |
| `task-spa-cr-09-t04-vitest-strip-composition` | Done | Update nflab07/08/09/10/03 · cr07 · overlay: zones=3; no `feed-post-action-reactions`; mount **in** strip | `feed-lab/__tests__/*` | 09.5 |

### Locked wire

```jsx
<FeedPostActionStrip
  onZone={handleZone}
  reactSlot={<FeedLabReactionsMount target="thread-root" initialState="empty" />}
/>
```

### Constraints (all tasks)

- No invent HTTP / second client / M155 / `#/next/feed` cutover  
- Do not change production `FeedCivicPost` 4-zone strip  
- Portal positioning details → CR-10  
- Theme stress → CR-08  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

One React entry on root card strip; ready for portal eye (CR-10).
