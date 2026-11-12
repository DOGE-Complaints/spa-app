# Story acceptance gate — STORY-SPA-CT-10-empty-entry-chrome

- **Story:** Empty entry-only + speech empty icon (G-H1 · G-M1)
- **Package:** `pkg-000168-20261019-epic-spa-24-ct-10-empty-entry-chrome.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-19T12:04:28Z
- **Note:** P3 structure Done · empty entry-only · speech icon · entry activate · Path A shots 01–05 · vitest feed-lab+thread-mount **123/123** · OP eye **Absent** → Partial visual=**BLOCK** · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| `#/lab/feed` empty stand: entry only · no full composer until activate | STRUCTURE | shot 01 · `data-tm-empty-entry=true` · stand B |
| Speech empty icon Present | STRUCTURE | shot 02 · `tm-thread-empty-icon` · comment.svg |
| Vitest empty → entry marker · composer absent until activate | PASS | `threadMount.ct10` · suite **123/123** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
# 27 files · 123 tests passed
CT10_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ct10-capture.mjs
```

## Visual checklists

[`visual-checklists-empty-entry.md`](./visual-checklists-empty-entry.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
