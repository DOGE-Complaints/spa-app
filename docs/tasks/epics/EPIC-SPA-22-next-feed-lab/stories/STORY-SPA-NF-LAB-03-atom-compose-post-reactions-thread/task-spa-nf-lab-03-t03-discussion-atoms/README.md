# SPA-NF-LAB-03-T03 — Discussion atoms (M152 / M153)

**Status:** Done · P3 (`2026-10-13T12:42:25Z`)
**Story:** [`../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:29:42Z`
**Package:** `pkg-000129`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
**@mockup-m153:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
**@mockup-m153-png:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK**

## Purpose
Mount discussion atoms on lab cards: collapsed summary in list (expandable), honest LAB-02 fixture comment bodies. Prefer DS/lab header copy — **≠** classic «DISCUSSION» i18n as Done. Ban `FeedDiscussionBlock` as Done host wrapper.

## Atoms to mount (cite)
`DiscussionHeader` · `DiscussionSummaryChrome` / `ThreadSummary` · `CommentPreview` · `ViewDiscussionAction` · `DiscussionLayout` · `CommentTree` · `CommentNode` · composer atoms as needed

## Constraints
- No `FeedDiscussionBlock` as lab Done path host.
- No threads HTTP.
- Fixture comments only (LAB-02).
- Partial visual = BLOCK (T04).

## AC / DoD
- [x] Collapsed discussion summary on each card (expandable)
- [x] Fixture comment bodies used honestly
- [x] Header copy ≠ classic DISCUSSION Done
- [x] Ban product discussion host on lab Done path

## Where to change
- Lab card discussion slot + lab CSS
- Cite `features/feed/comments/` (+ composer if needed)

## Verification
- Grep ban `FeedDiscussionBlock` on lab Done imports
- Path A M152/M153 evidence in T04
