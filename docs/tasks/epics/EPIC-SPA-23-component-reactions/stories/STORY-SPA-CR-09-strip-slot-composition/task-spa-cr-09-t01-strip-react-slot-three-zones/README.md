# SPA-CR-09-T01 — Strip reactSlot + three zones

**Status:** Done  
**Story:** [`../STORY-SPA-CR-09-strip-slot-composition.md`](../STORY-SPA-CR-09-strip-slot-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:43:19Z`  
**Package:** `pkg-000145`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.2

## Purpose
FR-09.1 / FR-09.2: `FeedPostActionStrip` accepts `reactSlot`; ZONES without `reactions`; `data-lab-strip-zones="3"`; CSS 3 columns; zone1 wrapper without plain React button when slot set.

## Code Facts (verified at scaffold)
- Gap: `spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx` — 4 text zones incl. `reactions`
- CSS: `FeedPostActionStrip.css` — `repeat(4, …)`

## Implement notes
- Prop `reactSlot`; when set, zone 1 renders slot (not label button)
- Keep `data-testid="feed-post-action-react"` / `data-zone="react"` on zone1 host
- OOS: card wire (T02) · remove under-strip mount (T03) · portal CR-10

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Do not change production `FeedCivicPost` 4-zone strip

## AC / DoD
- [x] Strip has 3 zones only · no `data-zone="reactions"`
- [x] Zone 1 can host `reactSlot` without plain «React» label
- [x] `data-lab-strip-zones="3"` Present

## Where to change
`spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx` · `FeedPostActionStrip.css`

## Verification
```bash
rg -n "reactSlot|data-lab-strip-zones|reactions" spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx spa-app/src/features/feed-lab/post/FeedPostActionStrip.css
```
