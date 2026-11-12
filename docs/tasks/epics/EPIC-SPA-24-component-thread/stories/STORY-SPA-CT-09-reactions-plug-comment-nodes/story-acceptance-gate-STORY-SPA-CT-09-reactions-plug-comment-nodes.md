# Story acceptance gate — STORY-SPA-CT-09-reactions-plug-comment-nodes

- **Story:** Reactions plug on CommentNode (§4.2 T-react · §4.4 R-plug/R-bound)
- **Package:** `pkg-000167-20261018-epic-spa-24-ct-09-reactions-plug-comment-nodes.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T14:42:44Z
- **Note:** P3 structure Done · CommentNode slot + FeedLabReactionsMount `target=comment` · no CR rewrite · no people import in thread-mount · Path A shots 01–05 · vitest feed-lab+thread-mount **118/118** · OP eye **Absent** → Partial visual=**BLOCK** · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Nested comments show React control from reactions-mount | STRUCTURE | shot 01 · TREE slots `data-rm-target=comment` |
| Opening React opens picker · not thread composer steal | STRUCTURE | shot 02 · focus signal held · ct09 |
| Vitest comment target + no people import in thread-mount | PASS | `threadMount.ct09` · `feedLab.ct09` · suite **118/118** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
# 26 files · 118 tests passed
CT09_BASE=http://127.0.0.1:5180 node spa-app/scripts/tmp-ct09-capture.mjs
```

## Visual checklists

[`visual-checklists-reactions-plug.md`](./visual-checklists-reactions-plug.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
