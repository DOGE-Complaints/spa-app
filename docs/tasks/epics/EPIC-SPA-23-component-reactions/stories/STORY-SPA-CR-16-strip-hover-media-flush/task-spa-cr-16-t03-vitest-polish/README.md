# SPA-CR-16-T03 — Vitest polish + gate/shots

**Status:** Done · `2026-10-17T13:58:39Z`  
**P3 note:** feedLab.cr16 · 59 PASS · Path A shots · gate BLOCK  
**Story:** [`../STORY-SPA-CR-16-strip-hover-media-flush.md`](../STORY-SPA-CR-16-strip-hover-media-flush.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md)  
**ui_scope:** `feed-lab` · **visual**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-17T13:55:57Z`  
**Package:** `pkg-000152`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §3 (chip hover + media flush)  
**Runtime:** OP go (queueSpec) — story Await «делай» superseded for this wave

## Purpose
AC: chip hover class / layout marker · no full-cell hover regression · Path A shots · gate BLOCK if OP Absent.

## Code Facts (verified at scaffold)
- Gate stub PENDING · Partial visual=BLOCK
- CR-11…15 structure Present · Partial visual BLOCK until OP eye

## Implement notes
- Extend feed-lab tests · no invent OP PASS · no invent HTTP/M155/SVG
- OOS: invent HTTP · M155 people · invent SVG · invent OP PASS · `#/next/feed`

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Chip hover not full-cell · media–strip flush
- Keep 4-zone strip (CR-11) · theme tokens only (CR-08)
- No invent HTTP · no M155 · no invent SVG

## AC / DoD
- [x] Structure for FR AC Present
- [ ] Visual Done not claimed without OP eye

## Where to change
`spa-app/src/features/feed-lab/__tests__/*` · gate/shots

## Verification
```bash
cd spa-app && npm test -- --run src/features/feed-lab
```
