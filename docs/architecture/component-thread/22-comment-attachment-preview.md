# CT-22 — Comment attachment preview (+ `.md` family) (structure Present · visual BLOCKED)

> **UTC:** 2026-10-20T15:07Z (P5 APPLY)  
> **Package:** `pkg-000180` · EPIC-SPA-24  
> **Code home:** `CommentAttachmentPreview` · `CommentNode` · `buildCommentForest` · `threadMountConfig` · `FeedLabThreadMount` · `FeedLabCt22Stands` · `#/lab/feed`  
> **Normative:** [M153a v1.1](../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · M153b §7 AttachmentRef continuity · Arch §13.2  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Persist | Ready attachment intents on post → comment model (lab/fixture) |
| Image | publishedUrl when Present · else local File → objectURL · honesty copy |
| Non-image | PDF / Office / Markdown type cue on node |
| `.md` family | `ATTACHMENT_FAMILY_ALLOWLIST` + extension / text/markdown |
| Denied | Omitted from success node media (composer-side only) |
| Lifecycle | createObjectURL + revoke on unmount |
| Lab | M153a residual stands A–G on `#/lab/feed` · Path A full-cycle 01–07 |

## Touchpoints

- `tree/CommentAttachmentPreview.jsx` · `tree/CommentNode.jsx` · `tree/buildCommentForest.js`
- `config/threadMountConfig.js` · `ThreadMount.jsx` · `adapters/FixtureAdapter.js` · `composer/AttachmentRef.jsx`
- `FeedLabThreadMount.jsx` · `fixtures/labCt22Stands.js` · `FeedLabCt22Stands.jsx` · `pages/FeedLabPage.jsx`
- Tests: `threadMount.ct22` · `feedLab.ct22` · Path A `scripts/tmp-ct22-capture.mjs`

## OOS

Invent upload/CDN/gallery · invent MIME table · Share CT-24 · density CT-23 · invent HTTP · invent OP PASS · `#/next/feed`

## Evidence

- Vitest feed-lab+thread-mount **195**/195 · ct22 **8**/8  
- Path A shots 01–07 Present · Partial=**BLOCK** · F1 WAIVED operator · F2 WAIVED info · TASKED=0 · activation none
