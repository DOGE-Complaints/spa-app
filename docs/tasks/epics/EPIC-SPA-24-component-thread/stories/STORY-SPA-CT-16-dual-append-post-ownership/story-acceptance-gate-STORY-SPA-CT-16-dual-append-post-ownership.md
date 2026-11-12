# Story acceptance gate — STORY-SPA-CT-16-dual-append-post-ownership

- **Story:** Dual-append post ownership (BUG-1)
- **Package:** `pkg-000174-20261020-epic-spa-24-ct-16-dual-append-post-ownership.yaml`
- **Result:** **BLOCK**
- **Date:** 2026-10-20T11:42:13Z
- **Note:** P3 structure Done · T01–T04 Done · Path A OP-UX M153a/b BUG-1 · Artboard Meta=— · Partial visual=**BLOCK** · OP eye Absent · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **158/158** · puppeteer dual-append HARD_FAIL cleared (nest/root unique · forest=tree)

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| `#/lab/feed` Reply post → no duplicate comment ids in DOM | Structure Pass | shot 01 · `dup=[]` · owner=host |
| `#/lab/feed` root Post → no duplicate comment ids in DOM | Structure Pass | shot 02 · `dup=[]` |
| Nested reply keeps hierarchy forest (not `flat` from duplicate-id) | Structure Pass | shot 03 · `forest=tree` · fallback≠duplicate-id |
| Vitest covers single-owner post path | PASS | `threadMount.ct16` · `feedLab.ct16` · suite **158/158** |
| Puppeteer dual-append asserts green (or equivalent harness) | PASS | `lab-feed-thread-ct16-dual-append.mjs` / `tmp-ct16-capture.mjs` exit 0 |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** | Absent · Partial=BLOCK · no invent PASS |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
CT16_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct16-capture.mjs
```

## Visual checklists

[`visual-checklists-dual-append.md`](./visual-checklists-dual-append.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
