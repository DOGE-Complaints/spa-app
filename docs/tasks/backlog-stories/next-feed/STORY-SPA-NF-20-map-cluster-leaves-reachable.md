# STORY-SPA-NF-20 — Map cluster leaves reachable (OP mark 4)

## Meta

- **Key:** `STORY-SPA-NF-20-map-cluster-leaves-reachable`
- **Package:** [next-feed](INDEX.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCH-DELTA…](ARCH-DELTA-live-civic-residual-2026-10-21.md) §8 · **L2** tech subtasks
- **Status:** P5 APPLY Done · T01–T04 **Done** · structure **Present** · visual **BLOCK** · gate **BLOCK** · `pkg-000198` · activation **none** · Await **P8** · P6 not needed · no invent OP PASS · [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-20-map-cluster-leaves-reachable/STORY-SPA-NF-20-map-cluster-leaves-reachable.md) · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-20-2026-10-21.md)
- **Depends on:** soft **NF-19** (same map host) · BoardIssuesMap cluster Present
- **Interview:** [INTERVIEW-NF-18-plus…](INTERVIEW-NF-18-plus-op-residual-map-dark-2026-10-21.md) **M4**
- **Evidence:** [evidence/op-residual-wave2…](../../../analysis/evidence/op-residual-wave2-2026-10-21/) `02-…` · `03-…`
- **Code home:** `src/components/map/BoardIssuesMap.jsx` · soft `issueGeo.js` · feed preview host

## Зачем

Клик по кластеру с числом **12** приводит к одной issue. Код сейчас только `getClusterExpansionZoom`; **Absent** `getClusterLeaves` / spiderfy. Citizen must reach **all** issues in the cluster.

## L1 — FR

- **FR-NF-20.1** Tap on a cluster of N (circle or count label) lets citizen reach **all N** member issues — not only `features[0]` of a single pin.  
- **FR-NF-20.2** Default Apply path: `getClusterLeaves` → list/sheet of leaves (title/id) → open chosen issue; zoom-only alone is not Done.  
- **FR-NF-20.3** Both cluster circle and cluster-count layers participate in the same affordance (no dead click on the number).  
- **FR-NF-20.4** Co-located pins after max zoom still expose a multi-select path (list/sheet or equivalent) — no silent single popup as Done for N>1.  
- **FR-NF-20.5** L2 t01 documents probe evidence (leaves API · current zoom-only) before implement — analysis.mdc.  
- **FR-NF-20.6** Vitest for leaves path · OP eye — no invent PASS.

## Вне scope

Basemap theme (**NF-19**) · strip chrome · dark icons · invent spiderfy library vendor without need · invent OP PASS

## L1 — Acceptance Criteria

- [x] Cluster N → all N reachable  
- [x] Leaves list/sheet (or locked equivalent) Present  
- [x] Count + circle layers clickable  
- [x] Co-located N>1 multi-path held  
- [x] Probe note in Apply evidence  
- [x] Vitest  
- [ ] OP eye

## L1.5 — Arch locks

Cite [ARCH-DELTA §8](ARCH-DELTA-live-civic-residual-2026-10-21.md). **Supersedes** BoardIssuesMap JSDoc “cluster tap = zoom only” as Done for citizen multi-issue.

## L2 — Technical subtasks

> Skill: `react-expert`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-nf-20-t01-probe-leaves` | Done | Evidence: getClusterLeaves · zoom-only gap | BoardIssuesMap · short analysis note | 20.5 |
| `task-spa-nf-20-t02-leaves-ui` | Done | List/sheet of cluster leaves → open issue | BoardIssuesMap · soft feed preview | 20.1 · 20.2 · 20.4 |
| `task-spa-nf-20-t03-count-layer` | Done | Wire CLUSTER_COUNT + CLUSTER click | BoardIssuesMap.jsx | 20.3 |
| `task-spa-nf-20-t04-vitest` | Done | Leaves / multi-issue honesty | tests | 20.6 |

### Order

`t01` → `t02` → `t03` → `t04` (after soft NF-19 if same Apply wave)

## DoD

Citizen tapping cluster N can open any of the N issues; zoom-only not claimed Done; no invent OP PASS.
