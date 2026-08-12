# Acceptance verification — SPA-PH-07-T07

- **Task:** Prove results intercept + recapture (F1 / F3 / F4)
- **run_mode:** `spa_ph_07_audit_2026_08_06`
- **Result:** PASS
- **Date:** 2026-08-06T18:10:54Z
- **Package:** `pkg-000052` (unchanged)

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Mock results proven on chrome path | PASS | `assertBoardMockResults` + remount `how-it-works`→`board` in `captureBoardChrome` |
| H1/H2 show `ISSUE-PH07-1` / «Mock feed item one» | PASS | PH-07 `01-chrome-live-…` / `02-chrome-mock-…` visual (not live UUID PUBLISHED) |
| Dual-write PH-06 | PASS | MD5 H1 PH-07 == PH-06 H1 (`fdbc2fd1…`) |
| Indexer no live-feed overclaim | PASS | PH-07 (+ PH-06) `screenshots/README.md` state helper mock results |
| E1 load-error intact | PASS | `03-edge-mock-load-error-labeled-*.png` — Unable To Load The Board |
| Vitest helper markers | PASS | `npm test -- --run boardFeedBackdrop` **4/4** |

## Commands

```bash
cd spa-app && npm test -- --run boardFeedBackdrop   # 4/4
cd spa-app && npm run test:ui:submit-ph06-full      # exit 0 · 2026-08-06T18:10Z
```

## Root cause (closed)

Same-hash `/#/board` after `clearAuth`/login left live React feed state; intercept installed but UI never re-fetched. Fix: remount via `/#/how-it-works` then `/#/board` (PH-04 pattern) + positive assert.
