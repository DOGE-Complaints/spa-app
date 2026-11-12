# SPA-CR-09-T04 — Vitest strip composition + gate/shots

**Status:** Done  
**Story:** [`../STORY-SPA-CR-09-strip-slot-composition.md`](../STORY-SPA-CR-09-strip-slot-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:43:19Z`  
**Package:** `pkg-000145`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.2

## Purpose
FR-09.5 + Path A shots + gate: update nflab07/08/09/10/03 · cr07 · overlay — zones=3; no `feed-post-action-reactions`; mount **in** strip.

## Code Facts (verified at scaffold)
- Tests under `spa-app/src/features/feed-lab/__tests__/` assume 4-zone strip / under-strip mount (CR-07)
- Gate stub PENDING · shots stub planned

## Implement notes
- New or extend `feedLab.cr09.test.jsx` as needed
- Capture 3-zone + zone1 mount + no under-strip duplicate shots
- Gate Result stays **BLOCK** if OP eye Absent — no invent PASS
- OOS: invent HTTP · M155 · `#/next/feed` · CR-10 portal

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- `data-lab-visual-done=false` until OP PASS

## AC / DoD
- [x] Vitest: `data-lab-strip-zones="3"` · no `feed-post-action-reactions` · mount in zone 1
- [x] Screenshots + checklist filled; gate Date from live `--print-utc-now` at P3
- [x] Story visual Done not claimed without OP eye

## Where to change
`spa-app/src/features/feed-lab/__tests__/*` · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npx vitest run src/features/feed-lab
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
