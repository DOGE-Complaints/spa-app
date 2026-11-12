# SPA-CR-19-T04 — Vitest lab people + Path A gate

**Status:** Done · `2026-10-18T10:55:57Z`  
**P3 note:** vitest 132/132 · Path A shots 01–05 · gate BLOCK  
**Story:** [`../STORY-SPA-CR-19-people-sheet-lab-wire.md`](../STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md)  
**ui_scope:** `reactions-mount` / `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T10:51:53Z`  
**Package:** `pkg-000155`  
**@mockup:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [M155 artboard](../../../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md)  
**@mirror:** OP-UX-MIRROR-strip-polish §4.5 · M155 Panel C  
**extends:** mockup · story-acceptance gate  
**Runtime:** P3 Done · gate BLOCK · `2026-10-18T10:55:57Z`

## Purpose
FR-19.6 · AC: Vitest both labs · Reactions≠picker · sheet/popover smoke · Path A shots + story gate (Partial=BLOCK if OP/Gap Absent).

## Code Facts
- `reactionsMount.cr19.test.jsx` Present · suite **132**/132
- Shots md5 prefixes: `12456a4bece2` · `0c39b8abbdec` · `1309161953f8` · `9fd0649c9876` · `357a6b5bb58b`

## AC / DoD
- [x] Vitest cross-lab smoke Present
- [x] Path A shots inventoried · gate Result **BLOCK** (OP eye Absent)

## Where to change
`reactions-mount/__tests__/reactionsMount.cr19.test.jsx` · story `screenshots/` · gate

## Verification
```bash
cd spa-app && npm test -- --run src/features/reactions-mount src/features/feed-lab
```
