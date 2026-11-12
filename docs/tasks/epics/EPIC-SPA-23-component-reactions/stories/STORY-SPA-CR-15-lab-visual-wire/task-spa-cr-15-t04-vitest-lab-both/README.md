# SPA-CR-15-T04 — Vitest both labs + gate/shots

**Status:** Done · `2026-10-16T11:13:45Z`  
**P3 note:** reactionsLab.cr15 + feedLab.cr15 · 108 PASS · Path A shots · gate BLOCK  
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
FR-15.4–15.5 + AC: cross-lab smoke · Path A shots · gate BLOCK if OP/Gap v2 Absent.

## Code Facts (verified at scaffold)
- Gate stub PENDING · Partial visual=BLOCK · Gap v2 residual fact
- CR-11…14 structure Present · Gap v2 residual · Partial visual BLOCK

## Implement notes
- Extend feed-lab + reactions-mount tests · no invent OP PASS
- OOS: invent HTTP · M155 · `#/next/feed` · invent OP PASS · invent Gap v2 SVG

## Constraints
- Partial visual = BLOCK · Gap v2 residual = BLOCK fact · no invent OP PASS
- No invent HTTP · no M155 · no `#/next/feed`
- FixtureAdapter default · no dual live planes

## AC / DoD
- [x] Structure for FR 15.4–15.5 · AC Present
- [ ] Visual Done not claimed without OP eye (+ Gap v2 promote)

## Where to change
`spa-app/src/features/feed-lab/__tests__/*` · `reactions-mount/__tests__/*` · gate/shots

## Verification
```bash
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
```
