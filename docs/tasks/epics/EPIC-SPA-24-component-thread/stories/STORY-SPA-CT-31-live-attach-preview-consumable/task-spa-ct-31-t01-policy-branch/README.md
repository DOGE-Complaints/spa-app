# SPA-CT-31-T01 — Implement tip A auth fetch+blob→objectURL

**Status:** Done  
**Story:** [`../STORY-SPA-CT-31-live-attach-preview-consumable.md`](../STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**ui_scope:** `thread-mount` / `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T17:56:40Z`  
**Package:** `pkg-000195`  
**P3 Done:** `2026-10-21T18:04:58Z`  
**Path A:** ARCH §17 · CT-22 Present · policy **A** locked

## Purpose

FR-CT-31.1 · 31.4 · 31.5: Implement tip **A** (authenticated fetch + blob → objectURL) — not policy B / HTTP-09.

## Code Facts (verify)

- AS-IS: `CommentImagePreview` uses bare `publishedUrl` as `<img src>`
- Target: auth-bearing fetch of published URL → blob → objectURL for paint

## Constraints

- Policy **A** only · **no invent B** · **no invent HTTP-09** · no invent CDN / OP PASS  
- Path A code lock · NO BRIEF · Partial=**BLOCK**

## AC / DoD

- [x] Auth fetch+blob→objectURL path Present for image publishedUrl
- [x] Visual Done not claimed without OP eye · Partial=BLOCK held

## Where changed

CommentAttachmentPreview.jsx · fetchPublishedAttachmentObjectUrl.js

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
