# SPA-CR-08-T04 — Vitest feed-lab stress + gate/shots

**Status:** Done  
**Story:** [`../STORY-SPA-CR-08-lab-feed-theme-stress.md`](../STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:27:28Z`  
**Package:** `pkg-000144`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.1

## Purpose
Story AC vitest + Path A shots + gate fill: toggle → `data-theme`; stress controls Present; mirror `reactionsLab.cr04.test.jsx` grammar.

## Code Facts (verified at scaffold)
- Pattern tests: `spa-app/src/features/reactions-mount/__tests__/reactionsLab.cr04.test.jsx`
- Gate stub: [`../story-acceptance-gate-STORY-SPA-CR-08-lab-feed-theme-stress.md`](../story-acceptance-gate-STORY-SPA-CR-08-lab-feed-theme-stress.md) PENDING
- Shots stub: [`../screenshots/full-cycle/README.md`](../screenshots/full-cycle/README.md)

## Implement notes
- New `feedLab.cr08.test.jsx` (or equivalent under feed-lab `__tests__`)
- Capture light/dark (+ optional locale/320) shots; md5 in checklist
- Gate Result stays **BLOCK** if OP eye Absent — no invent PASS
- OOS: invent HTTP · M155 · `#/next/feed` · CR-09/10

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- `data-lab-visual-done=false` until OP PASS

## AC / DoD
- [x] Vitest covers theme toggle → `data-theme` + stress testids
- [x] Screenshots + checklist filled; gate Date from live `--print-utc-now` at P3
- [x] Story visual Done not claimed without OP eye

## Where to change
`spa-app/src/features/feed-lab/__tests__/feedLab.cr08.test.jsx` (new) · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npx vitest run src/features/feed-lab
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
