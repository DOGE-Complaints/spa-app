# CT-18 — M153b depth-2 token chrome A–D (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T12:27Z (P6 T06)  
> **Package:** `pkg-000176` · EPIC-SPA-24  
> **Code home:** `CommentNode.css` · `CommentNode` · `CommentTree` · `IssueThreadBlock` · `ThreadMount`  
> **Normative:** M153b v1.0 §§3–6 · §8 · OP-UX M153a/b CT-18  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| A bubble | Fill `#F7F6F2` · border 1px `#E7E4DC` · radius 12 · pad 12×16 · px not rem |
| B spine/elbow | Spine 1px `#667085` · elbow r 6 · indent 44px / 24px mobile |
| C pills | Shared group `#FFFDF8` · each ≥44px · text `#B54708` · sep 1×16 · **no** `#2E90FA` |
| D reply parent | Inset left stripe 3px `#B54708` · fill unchanged · via `selectedReplyParentId` |
| §7 E chips | OOS → CT-19 |

## Touchpoints

- `tree/CommentNode.css` · `CommentNode.jsx` · `CommentTree.jsx` · `IssueThreadBlock.jsx` · `ThreadMount.jsx`
- Tests: `threadMount.ct18` · Depth 2.0 `tests/puppeteer/lab-feed-thread-visual-depth2-audit.mjs` · Path A `scripts/tmp-ct18-capture.mjs`

## OOS

AttachmentRef paint (CT-19) · invent hex outside M153b · invent OP PASS · `#/next/feed`

## Evidence

- Vitest thread-mount **82**/82 · ct18 Present  
- Depth 2.0 A–D hardFail=0 · Path A shots 01–05 Present · Partial=**BLOCK**
