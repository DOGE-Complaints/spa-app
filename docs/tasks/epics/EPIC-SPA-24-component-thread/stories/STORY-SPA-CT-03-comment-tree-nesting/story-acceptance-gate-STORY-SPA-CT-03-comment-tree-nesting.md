# Story acceptance gate — STORY-SPA-CT-03-comment-tree-nesting

- **Story:** CommentTree nesting · max_depth · Reply (M153 A/B)
- **Package:** `pkg-000161-20261018-epic-spa-24-ct-03-comment-tree-nesting.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T13:21:17Z
- **Note:** P3 structure Done · CommentTree nest A→A1→A1a · VISUAL_INDENT_CAP≠maxDepth · Reply gate · max-depth copy · flat fallback · Path A shots 01–05 · vitest feed-lab+thread-mount **81/81** · OP eye **Absent** → Partial visual=**BLOCK** · no invent HTTP/OP PASS · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Fixture nest A→A1→A1a readable | STRUCTURE | shot 01 · FixtureAdapter nest · ct03 tests |
| maxDepth≠visual cap demonstrated | STRUCTURE | shots 02/04 · maxDepth=5 · indent cap 3 · Reply eligible at depth 4 |
| Vitest reply eligibility | PASS | `threadMount.ct03` **6/6** · suite **81/81** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
# 19 files · 81 tests passed
cd spa-app && npm run test:ui:board-shell
CT03_BASE=http://127.0.0.1:5176 node spa-app/scripts/tmp-ct03-capture.mjs
```

## Visual checklists

[`visual-checklists-nesting.md`](./visual-checklists-nesting.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
