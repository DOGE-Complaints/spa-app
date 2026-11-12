# STORY-SPA-CT-03 — CommentTree nesting · max_depth · Reply (M153 A/B)

## Meta

- **Key:** `STORY-SPA-CT-03-comment-tree-nesting`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3 Done · gate BLOCK · tip · `pkg-000161` · `2026-10-18T13:21:17Z` · Await P4
- **Depends on:** CT-01
- **Pipeline:** [STORY-SPA-CT-03-comment-tree-nesting](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-03-comment-tree-nesting/STORY-SPA-CT-03-comment-tree-nesting.md)
- **UX mirror:** §4.2 T-A/T-cap/T-depth/T-B
- **Arch:** §4.2 config · CommentTree
- **Artboard:** M153 A/B

## Зачем

Вложенное дерево с literal bodies; визуальный cap 3 ≠ reply `max_depth` из конфига/knobs.

## FR

- **FR-CT-03.1** Tree from `parentId`/`depth` · literal selectable bodies.  
- **FR-CT-03.2** Visual indent levels capped at `VISUAL_INDENT_CAP` (3).  
- **FR-CT-03.3** Reply shown iff `depth < maxDepth` (prop/config/knobs).  
- **FR-CT-03.4** At max depth: no Reply · «Maximum reply depth reached».  
- **FR-CT-03.5** Connectors / a11y parent context without fake avatars.  
- **FR-CT-03.6** Tombstones labelled future-contract only (no prod inference).  
- **FR-CT-03.7** Orphans/cycles → safe flat fallback · no invent ancestry.

## Вне scope

Composer detail (CT-04) · attachments · branch load invent API · Share on node

## Acceptance Criteria

- [ ] Fixture nest A→A1→A1a readable  
- [ ] maxDepth≠visual cap demonstrated  
- [ ] Vitest reply eligibility  
- [ ] OP eye  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-03-t01-config-depth` | Todo | `DEFAULT_MAX_DEPTH` · `VISUAL_INDENT_CAP` in config module | `thread-mount/config/threadMountConfig.js` | 03.2–03.3 |
| `task-spa-ct-03-t02-comment-tree` | Todo | Build/render nest · connectors · flat fallback | `tree/CommentTree.jsx` | 03.1 · 03.5 · 03.7 |
| `task-spa-ct-03-t03-comment-node` | Todo | Body · Reply gate · max-depth copy · child slot | `tree/CommentNode.jsx` | 03.3–03.4 |
| `task-spa-ct-03-t04-fixture-tree` | Todo | M153 literal fixture bodies | FixtureAdapter | 03.1 |
| `task-spa-ct-03-t05-vitest-nest` | Todo | depth vs maxDepth · indent cap | tests | AC |

### Constraints

- No hardcode depth checks outside config/props  
- No fake author chrome  

## DoD

Nested discussion matches M153 A/B rules with configurable depth.
