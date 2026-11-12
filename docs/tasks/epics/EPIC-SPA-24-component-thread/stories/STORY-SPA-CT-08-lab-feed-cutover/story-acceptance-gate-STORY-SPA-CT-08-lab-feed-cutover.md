# Story acceptance gate — STORY-SPA-CT-08-lab-feed-cutover

- **Story:** Lab feed cutover → ThreadMount (§4.4 L-cut/L-fix)
- **Package:** `pkg-000166-20261018-epic-spa-24-ct-08-lab-feed-cutover.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-18T14:06:35Z
- **Note:** P3 structure Done · FeedLabThreadMount + FixtureAdapter · plane thin-wrap · stands A–E/TREE/GATE · Path A shots 01–08 · vitest feed-lab+thread-mount **111/111** · OP eye **Absent** → Partial visual=**BLOCK** · Await P4

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| `#/lab/feed` shows ThreadMount under strip | STRUCTURE | shot 08 · cards `data-lab-thread-mount` |
| Comment zone still expands/focuses | STRUCTURE | shot 08 · ct08 + ct02 |
| Vitest cutover · no banned product block | PASS | `feedLab.ct08` **6/6** · suite **111/111** |
| OP eye | **BLOCK** | shots Present · OP eye Absent · Partial=BLOCK |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
# 24 files · 111 tests passed
CT08_BASE=http://127.0.0.1:5180 node spa-app/scripts/tmp-ct08-capture.mjs
```

## Visual checklists

[`visual-checklists-lab-cutover.md`](./visual-checklists-lab-cutover.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
