# SPA-CR-20-T03 — Promote runtime actions icons

**Status:** Done · `2026-10-18T12:07:24Z`
**P3 note:** Gap v2 Write+promote applied  
**Story:** [`../STORY-SPA-CR-20-gap-v2-icon-generate.md`](../STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md)  
**ui_scope:** `feed-lab` / public icons · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T12:04:08Z`  
**Package:** `pkg-000156`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)  
**@mirror:** residual §3 · promote  
**extends:** T01 · T02  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T12:07:24Z`

## Purpose
FR-20.2–20.5: Copy/promote master → `spa-app/public/icons/next-feed/actions/{react,reactions}.svg` so strip zones resolve glyphs (no broken img · thumbs-up React).

## Code Facts (verified at scaffold)
- Runtime `reactions.svg` **Absent** · `react.svg` Present smiley
- `FEED_POST_ACTION_ICON_URLS.reactions` wired

## Implement notes
- Promote only these two chrome files · no duplicate under `component-reactions/`
- Hold CR-11 URL paths

## Constraints
- No invent multicolor · no invent OP PASS · no `#/next/feed`

## AC / DoD
- [x] Runtime both files Present with correct glyphs
- [x] Strip Reactions/React zones resolve `<img>` / CSS url

## Where to change
`spa-app/public/icons/next-feed/actions/{react,reactions}.svg`

## Verification
```bash
ls spa-app/public/icons/next-feed/actions/{react,reactions}.svg
```
