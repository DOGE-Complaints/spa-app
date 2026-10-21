# NF-20 — Map cluster leaves reachable (structure Present · visual BLOCKED)

> **UTC:** 2026-10-21T19:52:42Z (P3)  
> **Package:** `pkg-000198` · EPIC-SPA-20  
> **Code home:** `BoardIssuesMap.jsx` · soft `issueGeo.js` · `#/next/feed` map  
> **Normative:** [ARCH-DELTA §8](../../tasks/backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · Interview M4 · Path A  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Cluster | `getClusterLeaves` → list/sheet of all N · open chosen issue |
| Layers | `CLUSTER_LAYER` + `CLUSTER_COUNT_LAYER` same affordance |
| Co-located | unclustered N>1 → multi-path sheet (not `features[0]` only) |
| Markers | `data-nf20-leaves` · `data-testid=board-map-cluster-leaves` |
| Supersedes | “cluster tap = zoom only” as Done for multi-issue |

## Evidence

- Probe note T01 · Path A shots 01–05 · CAPTURE-META `visual_gate: BLOCK` · `op_eye: Absent`
- vitest BoardIssuesMap.nf20 · map suite
- Soft easeTo expansion zoom for context · zoom-only alone ≠ Done
- no invent spiderfy vendor / OP PASS
