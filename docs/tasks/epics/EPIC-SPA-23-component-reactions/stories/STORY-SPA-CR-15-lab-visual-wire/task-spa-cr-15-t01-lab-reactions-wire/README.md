# SPA-CR-15-T01 — Lab reactions wire CR-11…14

**Status:** Done · `2026-10-16T11:13:45Z`  
**P3 note:** Cr15CompositionStand · FeedPostActionStrip · picker stand · data-lab-cr15-wire  
**Story:** [`../STORY-SPA-CR-15-lab-visual-wire.md`](../STORY-SPA-CR-15-lab-visual-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T11:09:16Z`  
**Package:** `pkg-000151`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md)  
**@mirror:** OP-UX-MIRROR-m154 (full strip+picker visual)  
**Runtime:** OP go (queueSpec) — story Await «делай» superseded for this wave

## Purpose
FR-15.1: `#/lab/reactions` stands show tile picker + accents + React-always strip chrome where applicable.

## Code Facts (verified at scaffold)
- AS-IS: CR-11…14 Present in reactions-mount · lab may need stand composition sync
- CR-11…14 structure Present · Gap v2 residual · Partial visual BLOCK

## Implement notes
- Ensure ReactionsLabCanvas / lab page surfaces use CR-11…14 chrome · FixtureAdapter default
- OOS: invent HTTP · M155 · `#/next/feed` · invent OP PASS · invent Gap v2 SVG

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed`
- FixtureAdapter default · no dual live planes

## AC / DoD
- [x] Structure for FR 15.1 Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`ReactionsLabCanvas.jsx` · lab page

## Verification
```bash
rg -n "tile-grid|rm-mark-accent|react-always|data-lab-strip" spa-app/src/features/reactions-mount/lab/
```
