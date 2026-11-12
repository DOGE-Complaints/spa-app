# SPA-CR-09-T02 — Card/detail wire reactSlot

**Status:** Done  
**Story:** [`../STORY-SPA-CR-09-strip-slot-composition.md`](../STORY-SPA-CR-09-strip-slot-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:43:19Z`  
**Package:** `pkg-000145`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.2

## Purpose
FR-09.2–09.4: wire root `reactSlot={<FeedLabReactionsMount target="thread-root" …/>}`; remove strip text toggle of `reactionsOpen`; same pattern in detail body if Present.

## Code Facts (verified at scaffold)
- `FeedPostCard.jsx` — strip then discussion; strip toggles `reactionsOpen` on zone react/reactions
- Locked wire from backlog Technical subtasks

## Implement notes
- Pass `t` / `locale` into mount if Present from CR-08
- Comment / Share `onZone` intent unchanged
- OOS: remove under-strip duplicate (T03) · portal CR-10

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No invent HTTP · no `#/next/feed` · no production FeedCivicPost

## AC / DoD
- [x] Root strip zone 1 hosts `FeedLabReactionsMount`
- [x] No reliance on Reactions text zone to open picker
- [x] Detail body wire if it uses same strip (when Present)

## Where to change
`FeedPostCard.jsx` · `FeedIssueDetailBody.jsx` (if applicable)

## Verification
```bash
rg -n "reactSlot|FeedLabReactionsMount|reactionsOpen" spa-app/src/features/feed-lab/post/FeedPostCard.jsx spa-app/src/features/feed-lab/post/FeedIssueDetailBody.jsx
```
