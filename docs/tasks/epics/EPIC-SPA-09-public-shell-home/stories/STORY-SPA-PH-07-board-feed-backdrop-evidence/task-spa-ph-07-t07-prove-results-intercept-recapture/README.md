# SPA-PH-07-T07 — Prove results intercept + recapture (F1 / F3 / F4)

**Status:** Done — P6 PASS 2026-08-06T18:10:54Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [audit-STORY-SPA-PH-07-execution-2026-08-06.md](../../../../../../analysis/audit-STORY-SPA-PH-07-execution-2026-08-06.md) §F1 · §F3 · §F4  
**Depends on:** —  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_07_audit_2026_08_06`  
**Scaffolded:** 2026-08-06T17:39:08Z  
**Package:** `pkg-000052` (unchanged)

## Purpose
Prove chrome H1/H2 use **helper-forced** `results` backdrop (`DEFAULT_MOCK_ISSUES` / `ISSUE-PH07-1` / «Mock feed item one»), not live gateway UUID feed. Add **positive** results marker assert (not only `assertNoBoardLoadError`). Re-capture PNGs; align PH-07 (+ PH-06) screenshot indexer wording with proven source.

## Risk
Rewriting product Board UX; weakening E1 load-error path; inventing new AC instead of fixing intercept evidence.

## Code Facts (re-verify at execute)
- Helper: [`tests/puppeteer/lib/boardFeedBackdrop.mjs`](../../../../../../../tests/puppeteer/lib/boardFeedBackdrop.mjs) — `DEFAULT_MOCK_ISSUES` `ISSUE-PH07-1`; `installBoardFeedBackdrop`; `assertBoardMockResults`; respond failures logged + abort.
- Chrome path: [`public-submit-ph06-full-cycle.mjs`](../../../../../../../tests/puppeteer/public-submit-ph06-full-cycle.mjs) `captureBoardChrome` — remount via `/#/how-it-works` → `/#/board` after install (fixes same-hash live React state).
- Root cause (P6): after `clearAuth`/login, page already on `/#/board` with live feed; same-hash `goto` did not remount → intercept never fed UI.
- E1 error-mode interception still works after H2.
- Indexer: [`../screenshots/README.md`](../screenshots/README.md) states proven helper mock results.

## AC / DoD
- [x] (P0) Chrome capture path proves mock results (visible mock title and/or card count / id assert) → F1 · F4.
- [x] (P0) H1/H2 re-captured under PH-07 `screenshots/full-cycle/`; dual-write PH-06 if still shared.
- [x] (P0) Indexer states proven backdrop source (mock helper results) without live-feed overclaim → F3.
- [x] (P0) E1 labeled load-error path still works.
- [x] (P0) Gate Date from `--print-utc-now` at close (P6).

## Where to change
- `spa-app/tests/puppeteer/lib/boardFeedBackdrop.mjs` (diagnose/fix results respond)
- `spa-app/tests/puppeteer/public-submit-ph06-full-cycle.mjs` (`captureBoardChrome` positive assert)
- PH-07 (+ PH-06) `screenshots/README.md` + full-cycle PNGs

## Out of scope
PH-01 board chrome wiring (F2 WAIVED); spa-mvp-dashboard (T09); gate AC#3 prose (T08); product Board UX.

## Verification
```bash
cd spa-app && npm run test:ui:submit-ph06-full
# Visual: H1/H2 show Mock feed item one / ISSUE-PH07-1 — not live UUID PUBLISHED feed
rg -n "Mock feed|ISSUE-PH07|assertNoBoardLoadError|assertBoardMockResults" spa-app/tests/puppeteer/
```

Gate Date: 2026-08-06T18:10:54Z.
Gate: [`acceptance-verification-spa-ph-07-t07.md`](./acceptance-verification-spa-ph-07-t07.md)
