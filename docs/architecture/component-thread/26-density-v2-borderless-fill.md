# CT-26 — Density v2 borderless fill (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T19:46Z (P5 APPLY)  
> **Package:** `pkg-000184` · EPIC-SPA-24  
> **Code home:** `CommentNode.css` · `CommentTree.css` · `IssueThreadBlock` · `#/lab/feed`  
> **Normative:** [M153d](../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) · AttachmentRef borders held (M153b §7 / M153c)  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Bubble | Outer border **0** · fill `#F7F6F2` · radius 12 · pad **8v / 12h** |
| React/Reply group | Outer border **0** · fill `#FFFDF8` · pad **4v / 8h** · min-height **44** · sep 1×16 held |
| Gaps | Bubble→actions **4 px** · node→next **8 px** |
| Spine / parent | Spine 1px `#667085` · reply-parent 3px inset `#B54708` |
| AttachmentRef | Chip borders **unchanged** (not in density-v2 change set) |
| Supersede | CT-23 / ARCH §13.3 “keep M153b bubble/pill border” |

## Touchpoints

- `tree/CommentNode.css` · `tree/CommentTree.css` · `IssueThreadBlock.jsx` (`data-tm-density=m153d`)
- Tests: `threadMount.ct26` · Path A `scripts/tmp-ct26-capture.mjs`
- Artboard: `docs/UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.{md,png}`

## OOS

Share (CT-27) · invent denser-than-M153d · HOLD reactions · invent HTTP · invent OP PASS · `#/next/feed` · global border removal on composer/chip

## Evidence

- Path A shots 01–05 Present (story pipeline full-cycle) · CAPTURE-META `fails: []`
- vitest feed-lab+thread-mount **221/221** · ct26 **7/7**
- P5: F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none · Await P8
