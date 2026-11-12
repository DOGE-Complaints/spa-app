# SPA-CR-14-T03 — Summary / aggregate mark accents

**Status:** Done  
**Story:** [`../STORY-SPA-CR-14-mark-accent-tokens.md`](../STORY-SPA-CR-14-mark-accent-tokens.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Completed:** `2026-10-16T11:04:23Z`  
**Scaffolded:** `2026-10-16T11:00:46Z`  
**Package:** `pkg-000150`  
**@mockup:** [`../../../../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md`](../../../../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.5

## Purpose
FR-14.2: apply same accent map on aggregate/summary marks.

## Code Facts (verified at scaffold)
- AS-IS: summary marks inherit strip color · accents Absent
- CR-13 tile grid Present · CR-08 theme Present

## Implement notes
- ReactionSummaryStrip / ReactionAggregateRow CSS · same map as T01
- OOS: multicolor SVG generate · invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No multicolor SVG generate · no invent HTTP · no M155
- Prefer existing CSS variables over hardcoded hex where Present

## AC / DoD
- [x] Structure for FR 14.2 Present
- [x] No new `*-color.svg` mark files

## Where to change
`ReactionSummaryStrip.css` · `ReactionAggregateRow.css`

## Verification
```bash
rg -n "accent|reaction-id|summary" spa-app/src/features/reactions-mount/
```
