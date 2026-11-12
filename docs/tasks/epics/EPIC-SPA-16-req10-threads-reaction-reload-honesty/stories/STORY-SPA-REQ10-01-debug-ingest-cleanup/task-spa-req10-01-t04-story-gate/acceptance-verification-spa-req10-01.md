# Story acceptance gate — STORY-SPA-REQ10-01-debug-ingest-cleanup

- **Story:** Remove Cursor debug ingest (spa H1)
- **Package:** `pkg-000087-20260928-epic-spa-16-req10-01-debug-ingest-cleanup.yaml`
- **Result:** PASS
- **Date:** 2026-09-28T18:05:35Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| AC-SPA-REQ1001-01 (H1) | PASS | `rg '7840/ingest' spa-app/src` → **0** (pre-P3: 2 files / 10 matches) |
| AC-SPA-REQ1001-02 | PASS | Diff only removed ingest `#region agent log` blocks; no new threads HTTP path added in `ThreadsSocialClient.js` / `LiveIssueThreadMount.jsx` |
| AC-SPA-REQ1001-03 | PASS | Closed knobs/tree/react call shape unchanged; `ThreadsSocialClient.test.js` **25/25** passed |

## Commands (live verification 2026-09-28T18:05:35Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# ok 4 paths · pkg-000087
rg -n '7840/ingest' spa-app/src || true
# → 0
cd spa-app && npx vitest run src/repositories/__tests__/ThreadsSocialClient.test.js
# 25 passed
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
# ok date-check
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
