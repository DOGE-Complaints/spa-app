# SPA-PH-07-T05 — Assert no accidental load-error on chrome mode

**Status:** Done — P3 PASS 2026-08-06T13:45:10Z  
**Story:** [`../STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../STORY-SPA-PH-07-board-feed-backdrop-evidence.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-07-board-feed-backdrop-evidence.md) AC #1 · AC #3 · FR-PH-07.1  
**Depends on:** SPA-PH-07-T01 · SPA-PH-07-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T13:24:06Z  
**Package:** `pkg-000052`

## Purpose
Automated check that chrome backdrop mode does **not** leave `board-load-error` in the DOM (or runner fails). Gates must not treat «gateway сегодня жив» as a hidden precondition for chrome evidence.

## Risk
Flaky live-only assert; asserting product empty/error UX incorrectly; weakening PH-04 error tests.

## Code Facts (re-verify at execute)
- After T02, chrome runner should set `results`/`empty` before shot.
- Selector: `[data-testid="board-load-error"]` on BoardPage.
- Vitest Board feed tests exist under `src/pages/__tests__/` (PH-04); helper may be Node-only — prefer runner assert and/or small unit test of helper API.

## AC / DoD
- [x] (P0) Automated assert: chrome mode → no `board-load-error` → backlog AC #1 · AC #3.
- [x] (P0) Failure is explicit when backdrop wrongly shows load-error (runner exit ≠ 0 or vitest fail).
- [x] (P0) Error-mode path (T03) is not broken by this assert.

## Where to change
- Chrome runner assert after backdrop apply (preferred)
- and/or `tests/puppeteer/lib/…` unit test / vitest if helper is testable without browser

## Out of scope
Story gate aggregation (T06); indexer copy (T04).

## Verification
```bash
cd spa-app && npm run test:ui:submit-ph06-full
# plus any new unit test file for helper
npm test -- --run boardFeedBackdrop 2>/dev/null || true
```

Gate Date: 2026-08-06T13:45:10Z.
Gate: [`acceptance-verification-spa-ph-07-t05.md`](./acceptance-verification-spa-ph-07-t05.md)
