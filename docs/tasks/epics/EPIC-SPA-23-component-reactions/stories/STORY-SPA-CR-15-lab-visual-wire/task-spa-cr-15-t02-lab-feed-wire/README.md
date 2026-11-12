# SPA-CR-15-T02 — Lab feed strip+aggregate+picker

**Status:** Done · `2026-10-16T11:13:45Z`  
**P3 note:** FeedPostCard/detail/FeedLabReactionsMount · data-lab-cr15-wire · 4-zone+aggregate+picker held  
**Story:** [`../STORY-SPA-CR-15-lab-visual-wire.md`](../STORY-SPA-CR-15-lab-visual-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T11:09:16Z`  
**Package:** `pkg-000151`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)  
**@mirror:** OP-UX-MIRROR-m154 (full strip+picker visual)  
**Runtime:** OP go (queueSpec) — story Await «делай» superseded for this wave

## Purpose
FR-15.2–15.3: `#/lab/feed` cards/detail show 4-zone strip + aggregate row + tile picker (portal).

## Code Facts (verified at scaffold)
- AS-IS: CR-11…14 structure Present on feed-lab path · wire gaps possible
- CR-11…14 structure Present · Gap v2 residual · Partial visual BLOCK

## Implement notes
- FeedPostCard / detail / FeedLabReactionsMount path · keep portal CR-10
- OOS: invent HTTP · M155 · `#/next/feed` · invent OP PASS · invent Gap v2 SVG

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed`
- FixtureAdapter default · no dual live planes

## AC / DoD
- [x] Structure for FR 15.2–15.3 Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`FeedPostCard` · detail · `FeedLabReactionsMount`

## Verification
```bash
rg -n "data-lab-strip-zones|aggregate|rm-picker|createPortal" spa-app/src/features/feed-lab/
```
