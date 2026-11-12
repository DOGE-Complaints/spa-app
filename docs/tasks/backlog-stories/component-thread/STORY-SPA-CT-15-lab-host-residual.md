# STORY-SPA-CT-15 — Lab host residual (G-M2 · G-M3 · G-M4 · G-L5)

## Meta

- **Key:** `STORY-SPA-CT-15-lab-host-residual`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P6 T06 Done · gate BLOCK · `2026-10-20T09:00:37Z` · `pkg-000173` · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-15-lab-host-residual/STORY-SPA-CT-15-lab-host-residual.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-01 · CT-06 · CT-08 · soft CR aggregate
- **Blocks:** OP eye lab host completeness
- **UX mirror:** [OP-UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-M2 · G-M3 · G-M4 · G-L5
- **Analysis:** [ux-gaps 2026-10-19](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) G-M2 · G-M3 · G-M4 · G-L5
- **Artboard:** [M152-C/E](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [M153 branch / G](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
- **Code home:** `FeedLabThreadMount.jsx` · `FeedPostCard.jsx` · `IssueThreadBlock.jsx`

## Зачем

Props `narrow` / `branchDisclosure` Present but lab card defaults hide them. Collapsed «Reactions from residents» Absent. Expanded heading omits issue id on card.

## FR

- **FR-CT-15.1** Lab card/stands wire `narrow` for M152-E / M153-G stress (or dedicated always-visible 390 stand on feed).  
- **FR-CT-15.2** When fixture has collapsed branches needing disclosure: lab passes `branchDisclosure={true}` (CT-06 code Present).  
- **FR-CT-15.3** Collapsed populated: «Reactions from residents» row **only if** aggregate confirmed via existing reactions aggregate contract — **no invent** counts/names.  
- **FR-CT-15.4** If aggregate unavailable: omit row (honest) · do not fake.  
- **FR-CT-15.5** Expanded heading may show `Discussion · Issue {id}` when fixture/host provides issue id (G-L5).  
- **FR-CT-15.6** Sticky keyboard composer prop remains available on narrow stands (CT-04).

## Вне scope

Invent aggregate API · people inside thread-mount · `#/next/feed` · invent OP PASS · spine (CT-14)

## Acceptance Criteria

- [x] Narrow / branch disclosure reachable on lab without only CT08 canvas  
- [x] Residents row absent unless aggregate confirmed  
- [x] Issue id in heading when fixture supplies it  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§11.6](ARCHITECTURE.md) · P6 T06 Done · Await P7/P8 · F1 OP held

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-15-t01-narrow-wire` | Done | Pass `narrow` / sticky stands on lab card or always-on 390 stand | `FeedLabThreadMount.jsx` · `FeedPostCard.jsx` | 15.1 · 15.6 |
| `task-spa-ct-15-t02-branch-disclosure-lab` | Done | Enable `branchDisclosure` when fixture needs it | FeedLabThreadMount · fixtures | 15.2 |
| `task-spa-ct-15-t03-residents-row` | Done | Collapsed «Reactions from residents» only if aggregate confirmed | `IssueThreadBlock.jsx` · soft CR | 15.3 · 15.4 |
| `task-spa-ct-15-t04-heading-issue-id` | Done | `Discussion · Issue {id}` when fixture/host provides id | IssueThreadBlock · host | 15.5 |
| `task-spa-ct-15-t05-vitest-host` | Done | Markers for narrow/branch/omit-residents-without-aggregate | `__tests__` · feed-lab | 15.1–15.5 |
| `task-spa-ct-15-t06-screenshots-root-readme` | Done | Story-root `screenshots/README.md` indexer (audit F2) | story-root screenshots | P5 F2 |

### Constraints

- No invent aggregate/people HTTP  
- Soft dep CR — if aggregate not confirmed, omit row · Arch §11.6  

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Lab host surfaces M152-E / branch / optional residents / issue heading without inventing data.
