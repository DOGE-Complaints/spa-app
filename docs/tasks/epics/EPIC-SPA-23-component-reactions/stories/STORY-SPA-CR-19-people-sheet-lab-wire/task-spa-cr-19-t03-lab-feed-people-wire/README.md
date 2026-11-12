# SPA-CR-19-T03 — Lab feed people wire

**Status:** Done · `2026-10-18T10:55:57Z`  
**P3 note:** FeedLabReactionsMount forcePeopleSurface · auto narrow sheet · CR-16 polish held  
**Story:** [`../STORY-SPA-CR-19-people-sheet-lab-wire.md`](../STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T10:51:53Z`  
**Package:** `pkg-000155`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.5 · M155 Panel C  
**extends:** ui-mockup / T01 sheet · CR-16 polish held  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:55:57Z`

## Purpose
FR-19.4: `#/lab/feed` cards/detail — same people triggers · CR-16 polish held · narrow sheet path.

## Code Facts
- `FeedLabReactionsMount` passes `forcePeopleSurface` · `data-lab-cr19-people` · FixtureAdapter held
- Path A shots 03–05 @390 · no polish CSS edits this story

## AC / DoD
- [x] Feed lab cards/detail open people (sheet when narrow) without picker from Reactions
- [x] CR-16 polish still Present (untouched)

## Where to change
`feed-lab/post/reactions/FeedLabReactionsMount.jsx` · mount people surface

## Verification
```bash
rg -n "forcePeopleSurface|data-lab-cr19-people|data-m155-sheet" spa-app/src/features/feed-lab/
```
