# SPA-CT-34-T01 — Local ready thumb / objectURL

**Status:** Done · gate **BLOCK** (OP eye Absent)  

**Story:** [`../STORY-SPA-CT-34-comment-attach-preview-residual.md`](../STORY-SPA-CT-34-comment-attach-preview-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-34-comment-attach-preview-residual.md)  
**ui_scope:** thread-mount / CommentAttachmentPreview · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T10:50:06Z`  
**Package:** `pkg-000227`  
**Path A:** Interview M11 · arch Present · soft CT-22/CT-25

## Purpose

FR-CT-34.1 / 34.3: Local composer ready files show objectURL / thumb image — not sole «Local preview · not published» text plate.

## Code Facts (verify)

- AS-IS: soft text plate residual on local ready (arch / evidence M11)
- Target: local thumb / objectURL Present on happy path

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · **no invent CDN** · hold CT-31 policy A · no invent B/HTTP-09

## AC / DoD

- [x] Local ready image preview Present
- [x] Text-only plate gone on local happy path
- [x] Visual Done not claimed without OP eye · gate **BLOCK** when OP Absent

## Where to change

`spa-app/src/features/thread-mount/` · soft `CommentAttachmentPreview.jsx` · soft composer local preview

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "Selected image|Local preview|objectURL|CommentAttachmentPreview" spa-app/src/features/thread-mount/ -g '*.jsx' -g '*.js' | head
```

## @mockup

```text
@mockup: spa-app/docs/architecture/component-thread/34-comment-attach-preview-residual.md
```
