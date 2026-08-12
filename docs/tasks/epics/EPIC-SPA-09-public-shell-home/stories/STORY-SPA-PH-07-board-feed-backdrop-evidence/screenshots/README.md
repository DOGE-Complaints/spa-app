# STORY-SPA-PH-07 — screenshots (story root)

**Viewport:** 1536×1024  
**Captured UTC:** 2026-08-06T18:10:54Z (P6 T07 recapture via `npm run test:ui:submit-ph06-full`)  
**Canonical evidence for PH-07** — intentional board feed **backdrop** for chrome/CTA (helper mock results, not live gateway UUID feed; not accidental load-error).

## Live / mock status

| Check | Result |
|-------|--------|
| Intentional chrome backdrop (`results`) | **PASS** — H1/H2 show `ISSUE-PH07-1` / «Mock feed item one» via `installBoardFeedBackdrop('results')` + remount (`/#/how-it-works` → `/#/board`) + `assertBoardMockResults` |
| Accidental `board-load-error` on chrome shots | **Absent** (`assertNoBoardLoadError`) |
| Labeled M132 load-error (goal = error) | **PASS** — E1 `03-edge-mock-load-error-labeled-*.png` |

```bash
cd spa-app && npm run test:ui:submit-ph06-full
```

## Happy / chrome flow

| ID | State | File | Backdrop |
|----|-------|------|----------|
| H1 | live auth → chrome/CTA on **helper mock** results | [full-cycle/01-chrome-live-board-results-backdrop-1536x1024.png](./full-cycle/01-chrome-live-board-results-backdrop-1536x1024.png) | **results** = `DEFAULT_MOCK_ISSUES` (proven visual) |
| H2 | mock identity → chrome/CTA on **helper mock** results | [full-cycle/02-chrome-mock-board-results-backdrop-1536x1024.png](./full-cycle/02-chrome-mock-board-results-backdrop-1536x1024.png) | **results** = same mock |
| E1 | mock load-error (M132 error goal) | [full-cycle/03-edge-mock-load-error-labeled-1536x1024.png](./full-cycle/03-edge-mock-load-error-labeled-1536x1024.png) | **error** — explicitly labeled |

## Related

- Helper: [`tests/puppeteer/lib/boardFeedBackdrop.mjs`](../../../../../../tests/puppeteer/lib/boardFeedBackdrop.mjs) (`assertBoardMockResults`)
- PH-06 Submit chrome (same runner dual-write): [`../../STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/README.md`](../../STORY-SPA-PH-06-submit-story-gpt-cta/screenshots/README.md)
- PH-04 feed states: [`../../STORY-SPA-PH-04-board-feed-home/screenshots/README.md`](../../STORY-SPA-PH-04-board-feed-home/screenshots/README.md)

Secrets: never commit `.env`.
