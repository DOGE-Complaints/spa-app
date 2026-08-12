# SPA-PH-07-T08 — Realign gate AC#3 with proven evidence (F5)

**Status:** Done — P6 PASS 2026-08-06T18:12:17Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [audit-STORY-SPA-PH-07-execution-2026-08-06.md](../../../../../../analysis/audit-STORY-SPA-PH-07-execution-2026-08-06.md) §F5  
**Depends on:** SPA-PH-07-T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_07_audit_2026_08_06`  
**Scaffolded:** 2026-08-06T17:39:08Z  
**Package:** `pkg-000052` (unchanged)

## Purpose
Amend story gate (and pipeline/backlog AC#3 evidence notes if needed) so claims match **proven** post-T07 behavior: chrome gates do not depend on «gateway сегодня жив» **when** helper mock results + positive assert pass — not overclaim from P3 gate text alone.

## Risk
Rewriting backlog AC verbatim without evidence; marking Done without T07 proof; inventing new FR.

## Code Facts (re-verify at execute)
- Gate: [`../task-spa-ph-07-t06-story-gate-ph-07/acceptance-verification-spa-ph-07.md`](../task-spa-ph-07-t06-story-gate-ph-07/acceptance-verification-spa-ph-07.md) — AC#3 evidence cites post-T07 mock PNGs + `assertBoardMockResults`.
- T07: H1/H2 show `ISSUE-PH07-1` / «Mock feed item one».

## AC / DoD
- [x] (P0) Gate AC#3 evidence aligned with post-T07 proven helper mock results (paths + commands).
- [x] (P0) No silent keep of overclaim wording; Date from `--print-utc-now` on gate amend.
- [x] (P0) Pipeline/backlog AC checkbox notes only if needed for consistency (no new AC invented).

## Where to change
- `…/task-spa-ph-07-t06-story-gate-ph-07/acceptance-verification-spa-ph-07.md`
- Optional: pipeline story §состояние / backlog Meta note only if gate text requires cross-link

## Out of scope
Intercept implementation (T07); dashboard (T09); PH-01 wiring (F2 WAIVED).

## Verification
```bash
rg -n "AC#3|gateway|installBoardFeedBackdrop|Mock feed|assertBoardMockResults" \
  spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-07-board-feed-backdrop-evidence/task-spa-ph-07-t06-story-gate-ph-07/acceptance-verification-spa-ph-07.md
```

Gate Date: 2026-08-06T18:12:17Z.
Gate: [`acceptance-verification-spa-ph-07-t08.md`](./acceptance-verification-spa-ph-07-t08.md)
