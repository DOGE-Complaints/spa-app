# SPA-CR-17-T03 — Fixture listReactors · Live fail-closed

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
FR-17.4 + §4.1: FixtureAdapter people ready/loading/error · LiveAdapter people fail-closed · no invent Live from counts.

## Code Facts (verified at scaffold)
- AS-IS: FixtureAdapter onAggregateActivate → { oos: 'M155' }
- Gap v2 `reactions.svg` Absent · Partial visual BLOCK until OP eye (+ Gap promote)

## Implement notes
- listReactors / people fixture states · never fabricate Live people HTTP
- OOS: invent people HTTP · invent SVG bodies · Connect in compact popover · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact OK · no invent OP PASS
- Reactions/aggregate → people **NOT** picker
- FixtureAdapter people · Live fail-closed · no invent people HTTP
- No Connect in compact popover · no invent SVG bodies

## AC / DoD
- [x] Structure for FR 17.4 · data Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`FixtureAdapter.js` · `LiveAdapter.js`

## Verification
```bash
rg -n "listReactors|onAggregateActivate|people" spa-app/src/features/reactions-mount/adapters/
```
