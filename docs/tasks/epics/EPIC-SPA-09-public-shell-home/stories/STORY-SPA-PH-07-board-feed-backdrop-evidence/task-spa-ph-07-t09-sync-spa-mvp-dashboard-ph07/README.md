# SPA-PH-07-T09 — Sync spa-mvp-dashboard PH-07 Done (F6)

**Status:** Done — P6 PASS 2026-08-06T18:13:08Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [audit-STORY-SPA-PH-07-execution-2026-08-06.md](../../../../../../analysis/audit-STORY-SPA-PH-07-execution-2026-08-06.md) §F6  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_07_audit_2026_08_06`  
**Scaffolded:** 2026-08-06T17:39:08Z  
**Package:** `pkg-000052` (unchanged)

## Purpose
Update [`spa-mvp-dashboard.md`](../../../../../../spa-mvp-dashboard.md) Remaining / progress so PH-07 matches public-home INDEX + bullrun: **Done** (`pkg-000052`, P3 gate PASS) — not «PA.3 · pipeline not materialized».

## Risk
Inventing new stories in dashboard; recounting unrelated HL/EPIC-SPA-11 incorrectly; committing secrets.

## Code Facts (re-verify at execute)
- [public-home/INDEX.md](../../../../../../backlog-stories/public-home/INDEX.md) = PH-07 Done · 7/9 product.
- Dashboard Remaining no longer lists PH-07; public-home row Done 7 / Todo 2; overall ~80% (49/61).

## AC / DoD
- [x] (P0) `spa-mvp-dashboard.md` PH-07 row / Remaining / progress reflect Done (`pkg-000052`) from INDEX facts.
- [x] (P0) No contradiction with public-home INDEX or bullrun story row.
- [x] (P0) Gate Date from `--print-utc-now` at close (P6).

## Where to change
- `spa-app/docs/tasks/spa-mvp-dashboard.md`

## Out of scope
Intercept/gate fixes (T07/T08); HL-01…08 / EPIC-SPA-11 scope changes beyond recount consistency.

## Verification
```bash
rg -n "PH-07|pkg-000052|PA\.3|Remaining" spa-app/docs/tasks/spa-mvp-dashboard.md
rg -n "PH-07" spa-app/docs/tasks/backlog-stories/public-home/INDEX.md
```

Gate Date: 2026-08-06T18:13:08Z.
Gate: [`acceptance-verification-spa-ph-07-t09.md`](./acceptance-verification-spa-ph-07-t09.md)
