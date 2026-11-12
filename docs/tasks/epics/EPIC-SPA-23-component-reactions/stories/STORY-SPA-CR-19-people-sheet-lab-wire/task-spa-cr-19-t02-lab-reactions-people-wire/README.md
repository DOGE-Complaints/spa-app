# SPA-CR-19-T02 — Lab reactions people wire

**Status:** Done · `2026-10-18T10:55:57Z`  
**P3 note:** CR-19 people stands · Reactions≠picker · stress viewport→sheet  
**Story:** [`../STORY-SPA-CR-19-people-sheet-lab-wire.md`](../STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**ui_scope:** `reactions-mount` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T10:51:53Z`  
**Package:** `pkg-000155`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.5 · M155 Panel C  
**extends:** ui-mockup / T01 sheet  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:55:57Z`

## Purpose
FR-19.3 · 19.5: `#/lab/reactions` stands demonstrate people open from Reactions/aggregate · stress theme/locale · dark parity.

## Code Facts
- `rm-lab-cr19-people-popover` · `rm-lab-cr19-people-sheet` Present · hosts wired `onAggregateActivate`
- Viewport 320 forces people sheet on demo/hosts

## AC / DoD
- [x] Lab reactions stands open people from Reactions/aggregate without picker
- [x] Stress theme/locale still works (controls unchanged)

## Where to change
`reactions-mount/lab/ReactionsLabCanvas.jsx`

## Verification
```bash
rg -n "rm-lab-cr19-people|forcePeopleSurface" spa-app/src/features/reactions-mount/lab/
```
