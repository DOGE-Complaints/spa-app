# Story acceptance gate — STORY-SPA-CT-21-preview-node-budget-default-expanded

- **Story:** Preview node budget · default expanded · no Discussion heading (M152c)
- **Package:** `pkg-000179-20261020-epic-spa-24-ct-21-preview-node-budget-default-expanded.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-20T14:49:17Z
- **Note:** P3 Execute · T01–T05 Done · Path A shots Present · no invent HTTP/OP PASS · vitest feed-lab+thread-mount **187/187**

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Populated feed card: expanded on first paint | Match | FeedLabThreadMount auto · CT-21 stands A/B/E · shot 01/02/05 |
| `previewNodeBudget` default 3 · configurable | Match | `DEFAULT_PREVIEW_NODE_BUDGET` · ThreadMount prop · shot 01 |
| DFS truncate · label `Show more comments` | Match | CommentTree DFS · shot 02 |
| One-shot reveal all remaining | Match | Show more click · shot 03 |
| No `tm-thread-heading` / Discussion · Issue | Match | IssueThreadBlock omit · shots 01–05 |
| Vitest markers | Match | threadMount.ct21 + feedLab.ct21 · **187/187** |
| OP eye gate (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
CT21_BASE=http://127.0.0.1:5173 PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node spa-app/scripts/tmp-ct21-capture.mjs
```

## Visual checklists

[`visual-checklists-preview-node-budget-default-expanded.md`](./visual-checklists-preview-node-budget-default-expanded.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
