# SPA-CR-12-T03 — Reactions zone wire

**Status:** Done · `2026-10-16T10:42:46Z`  
**Story:** [`../STORY-SPA-CR-12-react-always-aggregate-row.md`](../STORY-SPA-CR-12-react-always-aggregate-row.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:37:39Z`  
**Package:** `pkg-000148`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.3

## Purpose
FR-12.5: Zone `reactions` is distinct affordance → activate aggregate/summary (hover/click). Not a second React label. M155 people **OOS**.

## Code Facts (verified at scaffold)
- CR-11: `feed-post-action-reactions` zone Present · `onZone` from card
- Aggregate open may reuse picker open path without inventing people UI

## Implement notes
- Wire `onZone('reactions')` → aggregate activate / summary focus (product wire per mirror)
- Keep React zone as sole primary open-picker chrome
- OOS: M155 · invent HTTP · picker tile chrome CR-13

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Keep portal dismiss CR-10
- No M155 people list

## AC / DoD
- [x] Reactions zone handler Present · not duplicate React label
- [x] Activate aggregate/summary without inventing people UI
- [x] React zone still opens picker

## Where to change
`FeedPostActionStrip.jsx` · `FeedPostCard.jsx` / `FeedIssueDetailBody.jsx` `onZone` · optional mount hooks

## Verification
```bash
rg -n "reactions|onZone|onAggregate" spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx spa-app/src/features/feed-lab/post/FeedPostCard.jsx
```
