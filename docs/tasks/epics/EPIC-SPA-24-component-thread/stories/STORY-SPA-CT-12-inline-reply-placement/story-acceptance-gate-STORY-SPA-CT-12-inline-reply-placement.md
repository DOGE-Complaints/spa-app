# Story acceptance gate — STORY-SPA-CT-12-inline-reply-placement

- **Story:** Inline reply under parent (G-H4)
- **Package:** `pkg-000170-20261019-epic-spa-24-ct-12-inline-reply-placement.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-19T12:27:25Z
- **Note:** P3 structure Done · T01–T05 Done · Path A OP-UX residual §3 G-H4 · M153-C · Partial visual=**BLOCK** · OP eye Absent · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **132/132**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Reply on nested comment → composer under that parent · not below entire thread | Structure Pass | `data-tm-reply-inline=true` · composer in `tm-comment-node-*` · shots 01–02 |
| Root Write a comment still usable at root position | Structure Pass | root after IssueThreadBlock · shot 04 |
| Cancel reply restores prior layout | Structure Pass | cancel clears target · shot 03 |
| OP eye | **BLOCK** | Absent · Partial=BLOCK · no invent PASS |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT12_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-ct12-capture.mjs
```

## Visual checklists

[`visual-checklists-inline-reply.md`](./visual-checklists-inline-reply.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
