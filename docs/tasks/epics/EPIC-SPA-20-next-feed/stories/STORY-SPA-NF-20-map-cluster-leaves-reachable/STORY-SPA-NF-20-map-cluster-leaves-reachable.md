# STORY-SPA-NF-20-map-cluster-leaves-reachable — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md)  
> **Status:** P5 APPLY Done · structure **Present** · gate **BLOCK** · `2026-10-21T20:00:40Z` · tip · activation **none** · Await **P8** · P6 not needed  
> **Package:** `pkg-000198` · next-feed · REQ-22 · ARCH-DELTA §8 · Interview M4  
> **ui_scope:** `map` · soft `feed` · **mixed** · Path A code lock · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** soft **NF-19** (same map host) · BoardIssuesMap cluster Present  
> **Runtime:** T01–T04 **Done** · BoardIssuesMap.nf20 **6/6** · map suite **16/16** · Path A shots 01–05 Present · probe leaves N=12 · no invent OP PASS

## Purpose

Cluster tap with count **N** currently zooms only (`getClusterExpansionZoom`). Citizen must reach **all N** member issues via `getClusterLeaves` → list/sheet.

## L1 — FR (backlog verbatim)

- **FR-NF-20.1** Tap on a cluster of N (circle or count label) lets citizen reach **all N** member issues — not only `features[0]` of a single pin.  
- **FR-NF-20.2** Default Apply path: `getClusterLeaves` → list/sheet of leaves (title/id) → open chosen issue; zoom-only alone is not Done.  
- **FR-NF-20.3** Both cluster circle and cluster-count layers participate in the same affordance (no dead click on the number).  
- **FR-NF-20.4** Co-located pins after max zoom still expose a multi-select path (list/sheet or equivalent) — no silent single popup as Done for N>1.  
- **FR-NF-20.5** L2 t01 documents probe evidence (leaves API · current zoom-only) before implement — analysis.mdc.  
- **FR-NF-20.6** Vitest for leaves path · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Cluster N → all N reachable  
- [x] Leaves list/sheet (or locked equivalent) Present  
- [x] Count + circle layers clickable  
- [x] Co-located N>1 multi-path held  
- [x] Probe note in Apply evidence  
- [x] Vitest  
- [ ] OP eye

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-20-map-cluster-leaves-reachable.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-20-t01-probe-leaves](task-spa-nf-20-t01-probe-leaves/README.md) | Evidence: getClusterLeaves · zoom-only gap | **Done** |
| T02 | [task-spa-nf-20-t02-leaves-ui](task-spa-nf-20-t02-leaves-ui/README.md) | List/sheet of cluster leaves → open issue | **Done** |
| T03 | [task-spa-nf-20-t03-count-layer](task-spa-nf-20-t03-count-layer/README.md) | Wire CLUSTER_COUNT + CLUSTER click | **Done** |
| T04 | [task-spa-nf-20-t04-vitest](task-spa-nf-20-t04-vitest/README.md) | Leaves / multi-issue honesty | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Basemap theme (**NF-19**) · strip chrome · dark icons · invent spiderfy library vendor without need · invent OP PASS

## DoD (backlog verbatim)

Citizen tapping cluster N can open any of the N issues; zoom-only not claimed Done; no invent OP PASS.

## @mockup handoff

- Continuity: [ARCH-DELTA §8](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · evidence wave2 · Interview **M4**
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-map-cluster-leaves-reachable.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
