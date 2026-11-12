# SPA-CR-17-T02 — ReactorsPopover UI (M155 A)

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
FR-17.3 · 17.7: Compact ReactorsPopover · header · combined list · avatar+badge · no Connect · Escape/outside.

## Code Facts (verified at scaffold)
- AS-IS: people surface Absent · M155 A normative in mirror §4.3
- Gap v2 `reactions.svg` Absent · Partial visual BLOCK until OP eye (+ Gap promote)

## Implement notes
- New reactions-mount/people/ · portal/fixed ok · ~320px · scroll ~440px · NS close
- OOS: invent people HTTP · invent SVG bodies · Connect in compact popover · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact OK · no invent OP PASS
- Reactions/aggregate → people **NOT** picker
- FixtureAdapter people · Live fail-closed · no invent people HTTP
- No Connect in compact popover · no invent SVG bodies

## AC / DoD
- [x] Structure for FR 17.3 · 17.7 Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`reactions-mount/people/ReactorsPopover.*`

## Verification
```bash
rg -n "ReactorsPopover|rm-reactors" spa-app/src/features/reactions-mount/
```
