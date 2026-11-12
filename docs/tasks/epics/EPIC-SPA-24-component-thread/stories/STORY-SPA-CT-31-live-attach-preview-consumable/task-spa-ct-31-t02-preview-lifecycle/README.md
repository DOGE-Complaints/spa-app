# SPA-CT-31-T02 — objectURL revoke / loading / error honesty

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

FR-CT-31.1 · 31.2: objectURL revoke / loading / error honesty when bytes/floor deny or URL null.

## Code Facts (verify)

- AS-IS: local File objectURL revoke Present when published Absent
- Target: revoke blob objectURL on unmount/change · loading/error honesty · CT-22 null honesty held

## Constraints

- No invent CDN · no invent OP PASS · CT-22 / CT-30.4 honesty held  
- Path A code lock · Partial=**BLOCK**

## AC / DoD

- [x] Lifecycle revoke / loading / error honesty Present
- [x] Visual Done not claimed without OP eye · Partial=BLOCK held

## Where changed

CommentAttachmentPreview.jsx · loading/error honesty · revoke

## Verification

```bash
cd spa-app && npm test -- --run src/features/thread-mount
```
