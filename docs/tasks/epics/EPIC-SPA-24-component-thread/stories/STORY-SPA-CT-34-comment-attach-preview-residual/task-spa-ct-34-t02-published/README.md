# SPA-CT-34-T02 — Published preview path (CT-31 residual)

**Status:** Done · gate **BLOCK** (OP eye Absent)  

**Story:** [`../STORY-SPA-CT-34-comment-attach-preview-residual.md`](../STORY-SPA-CT-34-comment-attach-preview-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md)  
**ui_scope:** thread-mount / CommentAttachmentPreview · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:50:06Z`  
**Package:** `pkg-000227`  
**Path A:** Interview M11 · CT-31 policy A held

## Purpose

FR-CT-34.1 / 34.2: Close CT-31 residual on published path — image preview Present · hold policy **A** (auth fetch+blob) · honesty when bytes deny.

## Code Facts (verify)

- AS-IS: soft «Selected image» text plate residual (evidence M11 · CT-31 soft)
- Target: published happy-path image · deny honesty · no invent policy B

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **Hold CT-31 policy A** · **no invent B/HTTP-09** · **no invent CDN** · **no invent OP PASS**

## AC / DoD

- [x] Published happy-path image preview Present
- [x] Text-only plate gone on published happy path
- [x] Bytes-deny honesty held (policy A)

## Where to change

`spa-app/src/features/thread-mount/` · soft `CommentAttachmentPreview.jsx` · soft LiveAdapter attach preview

## Verification

```bash
rg -n "policy|blob|Selected image|CommentAttachmentPreview" spa-app/src/features/thread-mount/ -g '*.jsx' -g '*.js' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-thread/34-comment-attach-preview-residual.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave5-2026-10-24/11-comment-attach-selected-image-text.png
```
