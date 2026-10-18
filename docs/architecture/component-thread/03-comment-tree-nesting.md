# CT-03 — CommentTree nesting · max_depth · Reply (structure Present · visual BLOCKED)

> **UTC:** 2026-10-18T13:21:17Z (P3) · P5 APPLY `2026-10-18T13:23:50Z`  
> **Package:** `pkg-000161` · EPIC-SPA-24  
> **Code home:** `src/features/thread-mount/tree/` · config knobs · `#/lab/thread` stands F–I  
> **Normative:** OP-UX-MIRROR-m152-m153-m157-thread §4.2 T-A/T-cap/T-depth/T-B · M153 A/B  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Config | `DEFAULT_MAX_DEPTH` · `VISUAL_INDENT_CAP` distinct · `canReplyAtDepth` · `visualIndentLevel` |
| CommentTree | nest from parentId/depth · connectors · orphan/cycle → flat fallback |
| CommentNode | literal body · Reply iff depth < maxDepth · max-depth copy |
| Fixtures | M153 A→A1→A1a · depth-vs-cap · orphan sets |
| Lab | `#/lab/thread` stands F–I · Path A shots |

## Touchpoints

- `thread-mount/config/threadMountConfig.js`
- `thread-mount/tree/{CommentTree,CommentNode,buildCommentForest}.*`
- `thread-mount/adapters/FixtureAdapter.js` · `lab/ThreadLabCanvas.jsx`
- `IssueThreadBlock` expanded → CommentTree · `ThreadMount` knobs
- Tests: `threadMount.ct03`
- Lab verify: `#/lab/thread` · OP eye

## OOS

Invent OP PASS · invent HTTP · Composer (CT-04) · attachments · branch invent API · Share on node · comment React (CT-09)

## Evidence

- Vitest feed-lab+thread-mount **81**/81 · ct03 **6**/6
- Path A shots md5: `5d87e39035e0` · `82952be747b6` · `0f8daa9c529d` · `82952be747b6` (≡02) · `5ba9db9d0249`
- P5: TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation none
