# Story acceptance gate — STORY-SPA-CT-18-depth2-token-chrome

- **Story:** M153b depth-2 token chrome (A–D)
- **Package:** `pkg-000176-20261020-epic-spa-24-ct-18-depth2-token-chrome.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T12:21:04Z
- **Note:** P3 Execute · T01–T05 Done · Depth 2.0 A–D HARD_FAIL=0 · Path A shots Present · no invent OP PASS

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Bubble computedStyle Match vs M153b §3 | Match | `CommentNode.css` · capture 01 · depth2 `m153b-ad` |
| Spine / L-elbow Match vs §4 | Match | capture 02 · spine 1px `#667085` · elbow r 6 · indent 44px |
| React/Reply ≥44px · locked palette Match vs §5 | Match | capture 03 · replyH/reactH ≥44 · `#B54708` · no `#2E90FA` |
| Reply parent marker Match vs §6 | Match | capture 04 · `::before` 3px `#B54708` · fill unchanged |
| No rem-as-16 assumption for these tokens | Match | `--tm-indent-step: 44px` / `24px` · pad/radius in px |
| Depth 2.0 harness A–D PASS | Match | `lab-feed-thread-visual-depth2-audit.mjs` hardFailCount=0 · `m153b-ad` |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct18-capture.mjs
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/tests/puppeteer/lab-feed-thread-visual-depth2-audit.mjs
```

## Visual checklists

[`visual-checklists-depth2-token-chrome.md`](./visual-checklists-depth2-token-chrome.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
