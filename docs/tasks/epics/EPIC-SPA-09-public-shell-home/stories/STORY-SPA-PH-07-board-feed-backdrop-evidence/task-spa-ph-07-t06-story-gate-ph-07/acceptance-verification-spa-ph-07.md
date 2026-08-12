# Acceptance verification — STORY-SPA-PH-07

- **Story:** Board feed backdrop for chrome evidence
- **Package:** `pkg-000052-20260806-epic-spa-09-ph-07-board-feed-backdrop.yaml`
- **Result:** PASS
- **Date:** 2026-08-06T13:45:10Z (P3) · **AC#3 evidence realigned:** 2026-08-06T18:12:17Z (P6 T08 / post-T07)

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Есть зафиксированный способ получить board chrome evidence **без** случайного load-error backdrop, когда цель — не error-state. | PASS | `installBoardFeedBackdrop('results')` + remount + `assertNoBoardLoadError` · H1/H2 |
| Load-error evidence остаётся возможным и помеченным, когда цель — M132 error. | PASS | E1 `03-edge-mock-load-error-labeled-*.png` · indexer named **error** |
| Chrome/CTA story gates больше не зависят от «gateway сегодня жив» как скрытого условия фона. | PASS | **Proven post-T07:** H1/H2 show helper mock `ISSUE-PH07-1` / «Mock feed item one» (not live UUID feed); `assertBoardMockResults` fails if mock absent; remount `how-it-works`→`board` after install so intercept re-feeds UI. PNGs: [`../screenshots/full-cycle/01-chrome-live-board-results-backdrop-1536x1024.png`](../screenshots/full-cycle/01-chrome-live-board-results-backdrop-1536x1024.png), [`02-chrome-mock-board-results-backdrop-1536x1024.png`](../screenshots/full-cycle/02-chrome-mock-board-results-backdrop-1536x1024.png). Runner: `public-submit-ph06-full-cycle.mjs` `captureBoardChrome`. |

## Commands (live verification)

```bash
# P3 gate: 2026-08-06T13:45:10Z
# P6 T07/T08 evidence: 2026-08-06T18:10:54Z / 18:12:17Z
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run boardFeedBackdrop
cd spa-app && npm run test:ui:submit-ph06-full
# Visual AC#3: H1/H2 = ISSUE-PH07-1 / Mock feed item one (not live PUBLISHED UUID cards)
```

Screenshots: [`../screenshots/README.md`](../screenshots/README.md) · T07 gate: [`../task-spa-ph-07-t07-prove-results-intercept-recapture/acceptance-verification-spa-ph-07-t07.md`](../task-spa-ph-07-t07-prove-results-intercept-recapture/acceptance-verification-spa-ph-07-t07.md)
