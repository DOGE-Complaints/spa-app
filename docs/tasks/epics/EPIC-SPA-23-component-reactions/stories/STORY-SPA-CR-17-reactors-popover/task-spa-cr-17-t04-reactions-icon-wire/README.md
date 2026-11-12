# SPA-CR-17-T04 — Wire reactions.svg Runtime URL

**Status:** Done · `2026-10-18T10:39:51Z`  
**Story:** [`../STORY-SPA-CR-17-reactors-popover.md`](../STORY-SPA-CR-17-reactors-popover.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-17T14:01:53Z`  
**Package:** `pkg-000153`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.1–4.3 · M155 Panel A  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:39:51Z`

## Purpose
FR-17.6: Wire Gap v2 Runtime URL `/icons/next-feed/actions/reactions.svg` · no invent SVG bodies · Absent → visual BLOCK residual OK.

## Code Facts (verified at scaffold)
- FACT: reactions.svg Absent on disk · strip already references Runtime URL
- Gap v2 `reactions.svg` Absent · Partial visual BLOCK until OP eye (+ Gap promote)

## Implement notes
- Confirm strip src URL · document Gap residual · no invent SVG file contents
- OOS: invent people HTTP · invent SVG bodies · Connect in compact popover · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact OK · no invent OP PASS
- Reactions/aggregate → people **NOT** picker
- FixtureAdapter people · Live fail-closed · no invent people HTTP
- No Connect in compact popover · no invent SVG bodies

## AC / DoD
- [x] Structure for FR 17.6 Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`FeedPostActionStrip.jsx` · public icons path note

## Verification
```bash
rg -n "reactions.svg" spa-app/src/features/feed-lab/post/FeedPostActionStrip.jsx; test -f spa-app/public/icons/next-feed/actions/reactions.svg || echo ABSENT
```
