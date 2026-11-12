# SPA-CR-12-T04 — Vitest React-always + aggregate + gate/shots

**Status:** Done · `2026-10-16T10:42:46Z`  
**Story:** [`../STORY-SPA-CR-12-react-always-aggregate-row.md`](../STORY-SPA-CR-12-react-always-aggregate-row.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:37:39Z`  
**Package:** `pkg-000148`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.2–3.3

## Purpose
AC vitest + Path A shots + gate: React present when populated · aggregate DOM under strip · empty hides row · no dual React · update CR-05 hide-React assumptions if any.

## Code Facts (verified at scaffold)
- Gate stub PENDING · Partial visual=BLOCK
- Prior CR-05 tests may assert hide-React when populated — must update for strip chrome

## Implement notes
- New or extend `feedLab.cr12` / `reactionsMount.cr12` as needed
- Gate Result stays **BLOCK** if OP eye Absent — no invent PASS
- Document Gap v2 residual if still visible (not this story’s invent-SVG)

## Constraints
- Partial visual = BLOCK · no invent OP PASS · no invent SVG
- `data-lab-visual-done=false` until OP PASS
- Keep portal dismiss coverage intact

## AC / DoD
- [x] Vitest: React present when populated · aggregate under strip · empty no row
- [x] Screenshots + checklist filled; gate Date from live `--print-utc-now` at P3
- [x] Story visual Done not claimed without OP eye

## Where to change
`spa-app/src/features/feed-lab/__tests__/*` · `reactions-mount/__tests__/*` · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npm test -- --run src/features/feed-lab src/features/reactions-mount
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
