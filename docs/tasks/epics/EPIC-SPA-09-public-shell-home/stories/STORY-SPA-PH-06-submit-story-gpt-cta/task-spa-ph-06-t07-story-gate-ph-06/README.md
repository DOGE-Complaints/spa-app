# SPA-PH-06-T07 — Story gate PH-06

**Status:** Done — P3 2026-08-05T10:31:01Z  
**Story:** [`../STORY-SPA-PH-06-submit-story-gpt-cta.md`](../STORY-SPA-PH-06-submit-story-gpt-cta.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-06-submit-story-gpt-cta.md) Acceptance Criteria  
**Depends on:** T01…T06  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-05T10:15:57Z  
**Package:** `pkg-000051`

## Purpose
Rollup story acceptance: fill `acceptance-verification-spa-ph-06.md` from [story-acceptance-gate-template.md](../../../../../../../../docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md). Include §UI for T02 Path A if visual evidence required by pipeline.

## Risk
Marking Done with Board hardcode still present; inventing AC.

## Code Facts (re-verify at execute)
- Template: `docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md`
- PH-05 gate pattern under `task-spa-ph-05-t07-…/acceptance-verification-spa-ph-05.md`

## AC / DoD
- [x] (P0) Gate lists all backlog AC with PASS/FAIL + evidence paths.
- [x] (P0) Evidence: helper + Header + HowItWorks + Board; `rg` no `g-RkVU9xLWN` on Submit paths; vitest T06.
- [x] (P0) §UI links T02 mockup / any story screenshots if captured in P3.
- [x] (P0) Date from `--print-utc-now` at gate close; backlog + INDEX Status → Done only after PASS.

## Where to change
- `…/task-spa-ph-06-t07-story-gate-ph-06/acceptance-verification-spa-ph-06.md` (create at P3)
- Backlog + pipeline Status → Done after PASS

## Out of scope
Product implement (T01–T06).

## Verification
```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run storyGpt Header.publicNav HowItWorks Board
rg -n "g-RkVU9xLWN" spa-app/src/pages/BoardPage.jsx spa-app/src/components/AppShell/Header.jsx spa-app/src/pages/HowItWorksPage.jsx
```
