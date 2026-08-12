# Story acceptance gate — STORY-SPA-SEC-03-remove-debug-instrumentation

- **Story:** STORY-SPA-SEC-03 — Remove debug instrumentation from `src/`
- **Package:** `pkg-000015-20260628-epic-spa-05-sec03-remove-debug-instrumentation.yaml`
- **Result:** PASS
- **Date:** 2026-06-28

## AC checklist (verbatim from pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `grep -r "ingest/4e2a7ee6\|X-Debug-Session-Id" src/` → пусто | PASS | Production `src/` clean after T01; only [`debugIngestGuard.test.js`](../../../../../../../src/auth/__tests__/debugIngestGuard.test.js) contains pattern literals (allowlisted). |
| Поведение login/signup/`fetchMe` не изменилось (тесты зелёные) | PASS | `npm run test:run`: 198 passed, 2 skipped (54 files, 2026-06-28). |
| CI/lint ловит повторное появление debug-ingest | PASS | [`debugIngestGuard.test.js`](../../../../../../../src/auth/__tests__/debugIngestGuard.test.js) in `npm run test:run`. |

## Commands (live verification 2026-06-28)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
grep -rE 'ingest/4e2a7ee6|X-Debug-Session-Id' spa-app/src/ --exclude='debugIngestGuard.test.js'; test $? -ne 0
cd spa-app && npm run test:run
cd spa-app && npm run test:run -- src/auth/__tests__/debugIngestGuard.test.js
```

## Task closure

| Task | Status |
|------|--------|
| T01 purge auth layer | Done |
| T02 guard test | Done |
| T03 auth regression | Done |
| T04 story gate | Done |
