# STORY-SPA-CT-21 — Preview node budget · default expanded · no Discussion heading

## Meta

- **Key:** `STORY-SPA-CT-21-preview-node-budget-default-expanded`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC (this file) · **L1.5** [ARCHITECTURE §13.1](ARCHITECTURE.md) · **L2** technical subtasks below
- **Status:** P3 Execute Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-21-preview-node-budget-default-expanded/STORY-SPA-CT-21-preview-node-budget-default-expanded.md) · `pkg-000179` · `2026-10-20T14:49:17Z`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-01 · CT-03 · CT-08 · CT-15 (heading Present → remove)
- **Blocks:** OP eye first-paint discussion
- **Interview:** [INTERVIEW-CT-21-plus…](INTERVIEW-CT-21-plus-thread-density-share-attach-2026-10-20.md) A1–A4 · C2 · E7
- **Artboard tip:** [M152c written](../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.png)
- **Intake:** [analysis-m152c-m152d-generation-intake-2026-10-20.md](../../../analysis/analysis-m152c-m152d-generation-intake-2026-10-20.md) PASS
- **Code home:** `thread-mount` · `IssueThreadBlock` · `CommentTree` · `threadMountConfig.js`

## Зачем

OP + M152c: feed card opens discussion **expanded**; budget 3 nodes (root+children, DFS); `Show more comments` one-shot; no `Discussion · Issue {id}`. AS-IS: collapsed 2-body preview + heading.

## L1 — FR

- **FR-CT-21.1** Feed-card / default lab mount: discussion starts **expanded** when populated.  
- **FR-CT-21.2** Knob `previewNodeBudget` · `DEFAULT_PREVIEW_NODE_BUDGET = 3` · resolve like `maxDepth` (config + prop · no JSX magic).  
- **FR-CT-21.3** Budget counts **nodes** depth-first: parent → children → next root.  
- **FR-CT-21.4** When total nodes > budget: show first budget nodes + control **`Show more comments`**.  
- **FR-CT-21.5** Show more = **one-shot** reveal of **all** remaining nodes; control then omitted.  
- **FR-CT-21.6** Omit heading `Discussion · Issue {id}` and plain `Discussion` title on all package mounts.  
- **FR-CT-21.7** Empty / loading / unavailable remain honest without Discussion heading.  
- **FR-CT-21.8** Vitest: expanded · budget=3 DFS truncate · show-more one-shot · no heading testid.

## Вне scope

Chunked pagination · Share (CT-24) · attach-in-node (CT-22) · density frames (CT-23) · HOLD reactions · `#/next/feed` · invent OP PASS

## L1 — Acceptance Criteria

- [x] Populated feed card: expanded on first paint  
- [x] `previewNodeBudget` default 3 · configurable  
- [x] DFS truncate · label `Show more comments`  
- [x] One-shot reveal all remaining  
- [x] No `tm-thread-heading` / Discussion · Issue  
- [x] Vitest markers  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§13.1](ARCHITECTURE.md) · P1.3 APPLY `2026-10-20T14:35:27Z`

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-21-t01-knob` | Done | `DEFAULT_PREVIEW_NODE_BUDGET=3` + resolve + prop | `threadMountConfig.js` · ThreadMount | 21.2 |
| `task-spa-ct-21-t02-default-expanded` | Done | Lab/card default expanded populated | FeedLabThreadMount · ThreadMount | 21.1 |
| `task-spa-ct-21-t03-dfs-truncate` | Done | DFS slice by budget + `Show more comments` one-shot | CommentTree / IssueThreadBlock | 21.3–21.5 |
| `task-spa-ct-21-t04-omit-heading` | Done | Remove Discussion heading chrome | IssueThreadBlock.jsx · CSS | 21.6 · 21.7 |
| `task-spa-ct-21-t05-vitest` | Done | expanded · budget · one-shot · no heading | `__tests__` | 21.8 |

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Default expanded discussion with DFS node budget 3, `Show more comments` one-shot, no Discussion heading — per M152c.
