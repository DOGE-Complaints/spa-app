# SPA-CR-10-T02 — Anchor measure + reposition

**Status:** Done  
**Story:** [`../STORY-SPA-CR-10-picker-portal-escape.md`](../STORY-SPA-CR-10-picker-portal-escape.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:54:49Z`  
**Package:** `pkg-000146`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.3

## Purpose
FR-10.2 / 10.3: ref on strip/anchor (optional `forwardRef` SummaryStrip); `getBoundingClientRect` → `top=bottom+8`, `left`; scroll(capture)+resize; viewport clamp.

## Code Facts (verified at scaffold)
- Anchor after CR-09: zone-1 `ReactionSummaryStrip` via strip `reactSlot`
- Popover currently absolute under card clip

## Implement notes
- Prefer measure from zone-1 host / summary strip
- Reposition on window scroll (capture) + resize while open
- Clamp within viewport-safe max-height — list scroll only when content exceeds

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Forbidden primary: remove card `overflow: hidden`

## AC / DoD
- [x] Coords derived from zone-1 bounding rect
- [x] Repositions on scroll/resize while open
- [x] Viewport clamp Present

## Where to change
`ReactionsMount.jsx` · optional `ReactionSummaryStrip.jsx`

## Verification
```bash
rg -n "getBoundingClientRect|scroll|resize|forwardRef" spa-app/src/features/reactions-mount/ReactionsMount.jsx spa-app/src/features/reactions-mount/ReactionSummaryStrip.jsx
```
