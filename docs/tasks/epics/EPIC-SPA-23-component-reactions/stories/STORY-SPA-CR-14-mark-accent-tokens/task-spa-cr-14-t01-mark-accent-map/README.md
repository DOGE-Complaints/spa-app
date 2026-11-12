# SPA-CR-14-T01 — Mark accent token map

**Status:** Done  
**Story:** [`../STORY-SPA-CR-14-mark-accent-tokens.md`](../STORY-SPA-CR-14-mark-accent-tokens.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Completed:** `2026-10-16T11:04:23Z`  
**Scaffolded:** `2026-10-16T11:00:46Z`  
**Package:** `pkg-000150`  
**@mockup:** [`../../../../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md`](../../../../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.5 · token map

## Purpose
FR-14.1: define mark-id → CSS variable / token alias (reuse Present design tokens if any).

## Code Facts (verified at scaffold)
- AS-IS: tiles/summary mostly monochrome currentColor · token map normative Present
- CR-13 tile grid Present · CR-08 theme Present

## Implement notes
- New small map next to `crReactionIcons` or CSS `:root` aliases · no invent HTTP
- OOS: multicolor SVG generate · invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No multicolor SVG generate · no invent HTTP · no M155
- Prefer existing CSS variables over hardcoded hex where Present

## AC / DoD
- [x] Structure for FR 14.1 Present
- [x] No new `*-color.svg` mark files

## Where to change
`spa-app/src/features/reactions-mount/icons/` or tokens CSS · related map module

## Verification
```bash
rg -n "accent|reaction-id|soft" spa-app/src/features/reactions-mount/ spa-app/src/theme/
```
