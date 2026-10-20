# CT-23 — Thread density · artboard frames only (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T15:14Z (P3)  
> **Package:** `pkg-000181` · EPIC-SPA-24  
> **Code home:** `IssueThreadBlock.css` · `FeedPostCard.css` thread-host · `ThreadComposer.css` · `CommentTree.css` · `#/lab/feed`  
> **Normative:** [M153b](../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · [M153](../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) · [M152](../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) · Arch §13.3  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Extra plates | Thread-host / IssueThreadBlock · no L/R/B border · no box-shadow · no nested card |
| Hairline | Strip → discussion `border-top` 1px only |
| Keep | M153b bubble 1px `#E7E4DC` · spine · pills · composer top hairline |
| Spacing | 12px / 8px artboard rhythm · no invent denser rem gaps |
| Composer | Transparent flush bg (sticky keyboard may elevate) |

## Touchpoints

- `IssueThreadBlock.css` · `FeedPostCard.css` · `ThreadComposer.css` · `CommentTree.css` · `FeedDiscussionPlane.css`
- Audit: pipeline `task-spa-ct-23-t01-frame-audit/FRAME-AUDIT.md`
- Tests: `threadMount.ct23` · `feedLab.ct23` · Path A `scripts/tmp-ct23-capture.mjs`

## OOS

Invent denser-than-artboard · Share CT-24 · invent HTTP · invent OP PASS · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **201**/201 · ct23 **6**/6  
- Path A shots 01–05 Present · Partial=**BLOCK**
