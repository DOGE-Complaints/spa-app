# Story acceptance gate — STORY-SPA-CT-13-comment-action-chrome

- **Story:** Comment React/Reply action chrome (G-H5)
- **Package:** `pkg-000171-20261019-epic-spa-24-ct-13-comment-action-chrome.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-19T12:39:12Z
- **Note:** P3 structure Done · T01–T04 Done · Path A OP-UX residual §3 G-H5 · M153 React/Reply · Partial visual=**BLOCK** · OP eye Absent · soft CR no rewrite · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **136/136**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Comment node shows pill pair React \| Reply with separator | Structure Pass | `tm-comment-action-pills` · sep · shots 01–02 |
| React still opens comment reactions via plug (not strip DNA full width) | Structure Pass | density wrap · picker open · shot 03 · 05 |
| Reply underline-only chrome gone | Structure Pass | reply.svg pill · shot 04 |
| OP eye | **BLOCK** | Absent · Partial=BLOCK · no invent PASS |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT13_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ct13-capture.mjs
```

## Visual checklists

[`visual-checklists-comment-actions.md`](./visual-checklists-comment-actions.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
