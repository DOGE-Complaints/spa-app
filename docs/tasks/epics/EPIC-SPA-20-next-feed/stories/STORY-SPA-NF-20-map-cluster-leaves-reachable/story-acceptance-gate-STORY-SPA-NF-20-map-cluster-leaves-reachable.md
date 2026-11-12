# Story acceptance gate — STORY-SPA-NF-20-map-cluster-leaves-reachable

- **Story:** Map cluster leaves reachable (OP mark 4)
- **Package:** `pkg-000198-20261021-epic-spa-20-nf-20-map-cluster-leaves-reachable.yaml`
- **Result:** **BLOCK** (structure Match · OP eye Absent · Partial visual=BLOCK)
- **Date:** 2026-10-21T19:56:45Z
- **Note:** P3 Execute · T01–T04 Done · Path A shots 01–05 Present · CAPTURE-META `fails: []` · probe leaves sheet N=12 · BoardIssuesMap.nf20 **6/6** · map suite **16/16** · no invent OP PASS / spiderfy vendor

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Cluster N → all N reachable | Match (structure) | getClusterLeaves · sheet · probe leafCount 12 |
| Leaves list/sheet (or locked equivalent) Present | Match | `board-map-cluster-leaves` · shot 03 |
| Count + circle layers clickable | Match | both layers → same handler · vitest |
| Co-located N>1 multi-path held | Match | unclustered multi-hit sheet · vitest |
| Probe note in Apply evidence | Match | `docs/analysis/probe-STORY-SPA-NF-20-getClusterLeaves-2026-10-21.md` |
| Vitest | Match | BoardIssuesMap.nf20 **6/6** · map **16/16** |
| OP eye (Absent = BLOCK · no invent PASS) | **BLOCK** held | Absent until OP |

## Commands (P3 live verify)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/components/map
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" NF20_BASE=http://127.0.0.1:5173 node spa-app/scripts/tmp-nf20-capture.mjs
```

## Visual checklists

[`visual-checklists-map-cluster-leaves-reachable.md`](./visual-checklists-map-cluster-leaves-reachable.md) · [`screenshots/full-cycle/README.md`](./screenshots/full-cycle/README.md)

SSOT дат: `docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md`
