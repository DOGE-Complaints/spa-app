# SPA-CR-20-T02 — Master react.svg (REPLACE thumbs-up)

**Status:** Done · `2026-10-18T12:07:24Z`
**P3 note:** Gap v2 Write+promote applied  
**Story:** [`../STORY-SPA-CR-20-gap-v2-icon-generate.md`](../STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**ui_scope:** icon-system · **mixed**  
**Skill declared:** `react-expert` (+ SVG handoff)  
**Scaffolded:** `2026-10-18T12:04:08Z`  
**Package:** `pkg-000156`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [CR-icon Gap v2](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md)  
**@mirror:** residual §3 · thumbs-up REPLACE  
**extends:** ui-mockup / T01  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:07:24Z`

## Purpose
FR-20.3: REPLACE master `react.svg` with outline thumbs-up (not smiley) · viewBox 24 · stroke 2 · `currentColor` · round caps.

## Code Facts (verified at scaffold)
- Master + runtime `react.svg` **Present** but **smiley** (wrong glyph)

## Implement notes
- **Do REPLACE** body (constraint flip) · keep path/filename
- Do not Lucide / emoji interim

## Constraints
- Gap v2 chrome only · no invent OP PASS

## AC / DoD
- [x] Master `react.svg` is thumbs-up outline (SVG path inspection)
- [ ] Visual Done not claimed without OP eye

## Where to change
`docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/react.svg`

## Verification
```bash
rg -n "circle|smiley|thumb|path" spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/react.svg | head
```
