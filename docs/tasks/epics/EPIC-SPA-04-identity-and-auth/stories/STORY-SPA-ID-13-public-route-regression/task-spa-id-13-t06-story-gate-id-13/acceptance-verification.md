# Story acceptance gate — STORY-SPA-ID-13-public-route-regression

- **Story:** Регресс-гарантия публичных роутов (spa)
- **Package:** `pkg-000041-20260801-epic-spa-04-id-13-public-route-regression.yaml`
- **Result:** PASS
- **Date:** 2026-08-01T20:02:31Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| **FR-ID13.1–2:** unit-матрица public/protected (вкл. `/story/submit`, `/issue/*` ≠ protected) зелёная; падает при переносе `/board`/`/issue/:id` в protected. | PASS | T01 `sessionRoutePolicy.test.js` |
| **FR-ID13.3:** cross-test overlay × public (logged_out) зелёный. | PASS | T02 `sessionShellState.test.js` bridge via `isProtectedPath` |
| **FR-ID13.4:** `getIssues` + `getIssue` — `fetch` 1-arg / без `Authorization`. | PASS | T03 `GatewayIssueRepository.test.js` |
| **FR-ID13.5:** `npm run test:ui:board-shell` зелёный; нет ухода на `/login`. | PASS | T04 `board-shell-smoke.mjs` exit 0 |
| `cd spa-app && npm test` (или `test:run`) зелёный; runtime policy/repository **без** необоснованных изменений (FR-ID13.7). | PASS | `vitest run --pool=forks --maxWorkers=2` → 422 passed / 2 skipped; `sessionRoutePolicy.js` + `GatewayIssueRepository.js` unchanged |
| Docs touchpoints + INDEX → Done; mvp-plan M-5 spa half отмечен; railway live — pointer only. | PASS | T05 |

## Commands (live verification 2026-08-01T20:02:31Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && ./node_modules/.bin/vitest run --pool=forks --maxWorkers=2
# Test Files  92 passed (92); Tests  422 passed | 2 skipped (424)
cd spa-app && PUPPETEER_CACHE_DIR="$HOME/.cache/puppeteer" npm run test:ui:board-shell
# exit 0
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

Gate Date: 2026-08-01T20:02:31Z.
