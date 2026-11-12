# SPA-CR-15-T03 — Stress regression CR-08

**Status:** Done · `2026-10-16T11:13:45Z`  
**P3 note:** M160 stress attrs held under CR-15 wire · light/dark/320 · pageTheme=dark facts  
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
FR-15.3: Stress controls still drive theme/locale/viewport for visual eye.

## Code Facts (verified at scaffold)
- AS-IS: CR-08 stress Present · must not regress with CR-11…14 chrome
- CR-11…14 structure Present · Gap v2 residual · Partial visual BLOCK

## Implement notes
- FeedLabPage · ReactionsLabCanvas stress knobs · light/dark/320
- OOS: invent HTTP · M155 · `#/next/feed` · invent OP PASS · invent Gap v2 SVG

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed`
- FixtureAdapter default · no dual live planes

## AC / DoD
- [x] Structure for FR 15.3 Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`FeedLabPage` · `ReactionsLabCanvas`

## Verification
```bash
rg -n "data-theme|stress|viewport|locale" spa-app/src/features/feed-lab/ spa-app/src/features/reactions-mount/lab/
```
