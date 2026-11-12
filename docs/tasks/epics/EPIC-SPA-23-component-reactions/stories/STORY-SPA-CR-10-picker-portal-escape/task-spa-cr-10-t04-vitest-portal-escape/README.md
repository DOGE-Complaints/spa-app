# SPA-CR-10-T04 — Vitest portal escape + gate/shots

**Status:** Done  
**Story:** [`../STORY-SPA-CR-10-picker-portal-escape.md`](../STORY-SPA-CR-10-picker-portal-escape.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:54:49Z`  
**Package:** `pkg-000146`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.3

## Purpose
AC vitest + Path A shots + gate: assert picker parent = `document.body` (or not under `.feed-post-card`); cr05 dismiss still green.

## Code Facts (verified at scaffold)
- Gate stub PENDING · shots stub planned
- `reactionsMount.cr05` covers dismiss — must stay green

## Implement notes
- New `reactionsMount.cr10.test.jsx` (and feed-lab smoke if needed)
- Capture portal-open + overflow-kept shots
- Gate Result stays **BLOCK** if OP eye Absent — no invent PASS

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- `data-lab-visual-done=false` until OP PASS

## AC / DoD
- [x] Vitest: portal host Present when open · not under `.feed-post-card`
- [x] Screenshots + checklist filled; gate Date from live `--print-utc-now` at P3
- [x] Story visual Done not claimed without OP eye

## Where to change
`spa-app/src/features/reactions-mount/__tests__/*` · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npx vitest run src/features/reactions-mount src/features/feed-lab
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
