# SPA-CR-19-T01 — People sheet surface

**Status:** Done · `2026-10-18T10:55:57Z`  
**P3 note:** `resolvePeopleSurface` · sheet ≤88dvh · Escape · safe-area  
**Story:** [`../STORY-SPA-CR-19-people-sheet-lab-wire.md`](../STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T10:51:53Z`  
**Package:** `pkg-000155`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.5 · M155 Panel C  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:55:57Z`

## Purpose
FR-19.1–19.2: Narrow people full-distribution UI as bottom sheet (`resolvePeopleSurface`) · ≤88dvh · safe-area · System Back / Escape dismisses topmost · focus returns to trigger.

## Code Facts (verified at scaffold / P3)
- AS-IS→TO-BE: `resolvePeopleSurface` Present · `ReactionsDialog` surface=sheet · `rm-dialog--sheet` max-height 88dvh
- Capture feed 390: computed maxHeight ≈742.72px (=88dvh @844)

## Constraints
- Partial visual = BLOCK · Gap v2 residual OK · no invent OP PASS/SVG
- No invent people HTTP · no dual picker+people on same Reactions click

## AC / DoD
- [x] Structure for FR-19.1–19.2 Present
- [ ] Visual Done not claimed without OP eye

## Where to change
`reactions-mount/people/resolvePeopleSurface.js` · `ReactionsDialog.*` · `ReactionsMount.jsx`

## Verification
```bash
rg -n "resolvePeopleSurface|rm-dialog--sheet|rm-reactions-people-sheet" spa-app/src/features/reactions-mount/
```
