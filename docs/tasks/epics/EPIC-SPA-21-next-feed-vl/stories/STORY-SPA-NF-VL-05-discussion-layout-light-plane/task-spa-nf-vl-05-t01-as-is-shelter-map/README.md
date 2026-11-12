# SPA-NF-VL-05-T01 — As-is / shelter map (classic CommentTree on next expanded ≠ VL Done)

**Status:** Done · P3 (`2026-10-12T14:57:13Z`)
**Story:** [`../STORY-SPA-NF-VL-05-discussion-layout-light-plane.md`](../STORY-SPA-NF-VL-05-discussion-layout-light-plane.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-05-discussion-layout-light-plane.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T14:51:33Z`
**Package:** `pkg-000119`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
**@mockup-secondary:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
**@mockup-secondary-png:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §2 DiscussionLayout · §6 CommentTree / CommentNode / ThreadConnector / ReplyDepthNotice
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
As-is / shelter map (classic CommentTree on next expanded ≠ VL Done)

## Arch anchors
- [02 DS surface map → comments/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-08 Done Related only — **do not reopen body**.
- VL-04 summary atoms Related; composer DS → VL-06.
- Cite FeedDiscussionBlock.jsx imports classic CommentTree and mounts it in expanded block; ban classic CommentTree dark board skin as next Done.

## Constraints
- No invent threads API / max_depth fields.
- No mutate `#/board` CommentTree chrome.
- Closed threads contracts retained.
- Shell OOS · NF-08 body OOS · VL-06 composer OOS as Done claim.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for VL-05
- [ ] Anti-mixing: classic CommentTree skin ≠ Done on `#/next/feed*`
- [ ] `#/board` not regressed
- [ ] No invent threads API

## Where to change
- `spa-app/src/features/feed/FeedDiscussionBlock.jsx` (expanded region / CommentTree import)
- Target `spa-app/src/features/feed/comments/` (DiscussionLayout + light tree atoms)
- Semantics: tree/depth helpers may move to `features/feed/semantics/`

## Verification
- Grep classic `CommentTree` Done claims under `features/feed` after wire
- local-five: expand / deep reply · board smoke
- vitest nf08 still meaningful; add VL-05 surface tests at implement

## Completion

Done P3 `2026-10-12T14:57:13Z` · gate PASS · pkg-000119.
