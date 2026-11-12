# Story acceptance gate — STORY-SPA-CT-05-attachments-max-config

- **Story:** AttachmentRef · maxAttachments config (M153 D/E)
- **Package:** `pkg-000163-20261018-epic-spa-24-ct-05-attachments-max-config.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T13:39:15Z
- **Note:** P3 structure Done · maxAttachments clamp · AttachmentRef D/E · Attach unavailable honesty · Path A shots 01–05 · vitest feed-lab+thread-mount **93/93** · OP eye **Absent** → Partial visual=**BLOCK** · no invent HTTP/OP PASS · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Changing maxAttachments changes clamp without JSX magic | STRUCTURE | `clampAttachmentIntents` · shot 03 · ct05 tests |
| D/E fixtures | STRUCTURE | shots 01/02 · stands N/O |
| Vitest clamp | PASS | `threadMount.ct05` **6/6** · suite **93/93** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
# 21 files · 93 tests passed
cd spa-app && npm run test:ui:board-shell
CT05_BASE=http://127.0.0.1:5178 node spa-app/scripts/tmp-ct05-capture.mjs
```

## Visual checklists

[`visual-checklists-attachments.md`](./visual-checklists-attachments.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
