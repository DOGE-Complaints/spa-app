# SPA-CR-17-T01 — Stop picker on Reactions/aggregate

**Status:** Done · `2026-10-18T10:39:51Z`  
**Story:** [`../STORY-SPA-CR-17-reactors-popover.md`](../STORY-SPA-CR-17-reactors-popover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-17T14:01:53Z`  
**Package:** `pkg-000153`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.1–4.3 · M155 Panel A  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:39:51Z`

## Purpose
FR-17.1–17.2: Split people open from picker open; Reactions/`activateAggregate` → people only.

## Code Facts (verified at scaffold)
- AS-IS: activateAggregate → handleOpen() picker (CR-12 path) · Reactions zone opens picker
- Gap v2 `reactions.svg` Absent · Partial visual BLOCK until OP eye (+ Gap promote)

## Implement notes
- ReactionsMount people API · card/lab onZone · supersede CR-12 picker-on-Reactions
- OOS: invent people HTTP · invent SVG bodies · Connect in compact popover · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact OK · no invent OP PASS
- Reactions/aggregate → people **NOT** picker
- FixtureAdapter people · Live fail-closed · no invent people HTTP
- No Connect in compact popover · no invent SVG bodies

## AC / DoD
- [x] Structure for FR 17.1–17.2 Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`ReactionsMount.jsx` · FeedPostCard / detail onZone

## Verification
```bash
rg -n "activateAggregate|handleOpen|people" spa-app/src/features/reactions-mount/ReactionsMount.jsx
```
