# STORY-SPA-CT-14 — Thread spine · bubbles · nest fixtures (G-H7 · G-H8 · G-L2)

## Meta

- **Key:** `STORY-SPA-CT-14-spine-bubbles-fixtures`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P3/P5 Done · gate BLOCK · `2026-10-19T12:55:29Z` · `pkg-000172` · activation none · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-14-spine-bubbles-fixtures/STORY-SPA-CT-14-spine-bubbles-fixtures.md)
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-03 · CT-08
- **Blocks:** OP eye nest readability
- **UX mirror:** [OP-UX residual 10-19](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) §3 G-H7 · G-H8 · G-L2
- **Analysis:** [ux-gaps 2026-10-19](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) G-H7 · G-H8 · G-L2
- **Artboard:** [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) nest tone
- **Code home:** `CommentTree.css` · `CommentNode.css` · `labFeedFixtures.js`

## Зачем

Mockup: continuous left grey spine + L-elbows; light blue-grey bubbles. Lab: connector only if `indent > 0` (most cards depth-0 → zero lines); white elevated bubble `#e7e4dc`.

## FR

- **FR-CT-14.1** Continuous vertical spine + L-elbows into bubbles at visual nest levels (not only tiny fragment when indent>0).  
- **FR-CT-14.2** Spine readable on nested stands and default feed cards with nest.  
- **FR-CT-14.3** Bubble fill/border/padding match M153 light blue-grey wash (tokens in thread-mount CSS).  
- **FR-CT-14.4** Action row spacing denser per mockup rhythm (with CT-13 chrome).  
- **FR-CT-14.5** Default `#/lab/feed` fixtures include at least one card with nest depth ≥1 (G-L2).  
- **FR-CT-14.6** `VISUAL_INDENT_CAP` / `maxDepth` rules unchanged (CT-03).

## Вне scope

Branch disclosure wire (CT-15) · invent HTTP · invent OP PASS · tombstones

## Acceptance Criteria

- [ ] Nested thread shows continuous spine + elbows  
- [ ] Bubble color/spacing closer to M153 wash than white card  
- [ ] At least one default lab feed fixture nests ≥1  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§11.5](ARCHITECTURE.md) · P3 Done · Await P4/P5

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-14-t01-continuous-spine` | Done | Continuous rail + L-elbows beyond indent>0 fragment | `CommentTree.css` · `CommentNode.css` · JSX | 14.1 · 14.2 |
| `task-spa-ct-14-t02-bubble-tokens` | Done | Light blue-grey wash · padding/gaps denser | `CommentNode.css` | 14.3 · 14.4 |
| `task-spa-ct-14-t03-nest-fixtures` | Done | Default lab feed fixtures nest depth ≥1 | `labFeedFixtures.js` · FixtureAdapter | 14.5 |
| `task-spa-ct-14-t04-vitest-spine` | Done | Nest fixture Present · indent cap ≠ maxDepth hold | `__tests__` · CT-03 | 14.6 |

### Constraints

- No invent HTTP · hold indent cap ≠ maxDepth · Arch §11.5  

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Nest logic visually readable on lab; bubbles/spine match M153 tone.
