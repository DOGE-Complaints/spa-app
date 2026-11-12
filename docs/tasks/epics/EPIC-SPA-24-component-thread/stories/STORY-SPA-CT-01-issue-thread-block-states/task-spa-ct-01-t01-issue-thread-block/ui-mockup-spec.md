# ui-mockup-spec — CT-01 T01 (Path A)

> **extends mockup:** [M152](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · [OP-UX-MIRROR §4.1](../../../../../../backlog-stories/component-thread/OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
> **NO BRIEF** · Partial visual=**BLOCK** until OP eye  
> Scaffold/P3: `2026-10-18`

## Delta (this task)

| State | Target |
|-------|--------|
| A loading | Discussion · Loading discussion… · skeleton lines only in thread region |
| B empty | No comments yet · invitation · Write a comment if capability |
| C populated-collapsed | Literal M152 bodies · View discussion · no gray bars |
| D unavailable | Discussion unavailable · Try again · no fake comments |
| E narrow | Same C at ~390 · no h-overflow |

## Selectors

- `[data-testid="tm-issue-thread-block"]` · `[data-tm-status]`
- `[data-testid="tm-thread-skeleton"]` · `[data-testid="tm-thread-preview-body"]`
- Civic: `[data-testid^="tm-lab-open-issue-"]` remains enabled

## Baseline

Greenfield `thread-mount` was **Absent** pre-P3 → baseline = M152 artboard + AS-IS tip plane note (LAB-09). Post-implement: story-root `screenshots/full-cycle/`.
