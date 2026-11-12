# SPA-CT-22-T03 — CommentNode attachment preview chrome

**Status:** Done  
**Story:** [`../STORY-SPA-CT-22-comment-attachment-preview.md`](../STORY-SPA-CT-22-comment-attachment-preview.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:58:07Z`  
**Package:** `pkg-000180`  
**@mockup:** [M153b §7 AttachmentRef](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · node preview continuity

## Purpose

FR-CT-22.2–22.4 · 22.6: `CommentNode` renders attachments — image visual preview; non-image type-honest cue; prefer published URL when Present; local preview when Absent with honesty; Denied not shown as successful media in node.

## Constraints

- No invent gallery lightbox · no invent CDN/HTTP/OP PASS · Partial=**BLOCK**  
- Continuity CT-19 AttachmentRef tokens · composer Denied stays composer-side

## AC / DoD

- [x] Image → node preview  
- [x] Local honesty when no URL  
- [x] PDF/Office/`.md` type cue  
- [x] Denied excluded from success media in node  
- [x] Visual Done not claimed without OP eye

## Where to change

`CommentNode.jsx` · related CSS · AttachmentRef reuse

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
