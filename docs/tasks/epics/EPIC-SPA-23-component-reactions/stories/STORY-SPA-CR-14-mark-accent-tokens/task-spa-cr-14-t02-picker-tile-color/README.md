# SPA-CR-14-T02 — Picker tile accent + soft bg

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
FR-14.1 · 14.3: apply accent + soft bg on option tiles via data-reaction-id / class.

## Code Facts (verified at scaffold)
- AS-IS: selected soft yellow shared · no per-mark accent
- CR-13 tile grid Present · CR-08 theme Present

## Implement notes
- Wire map into ReactionPickerOption CSS · selected soft from mark accent or shared selection token
- OOS: multicolor SVG generate · invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No multicolor SVG generate · no invent HTTP · no M155
- Prefer existing CSS variables over hardcoded hex where Present

## AC / DoD
- [x] Structure for FR 14.1 · 14.3 Present
- [x] No new `*-color.svg` mark files

## Where to change
`ReactionPickerOption.css` · option JSX attrs if needed

## Verification
```bash
rg -n "data-reaction-id|accent|--rm-" spa-app/src/features/reactions-mount/picker/
```
