# SPA-CT-33-T02 — AttachmentRef / preview fills

**Status:** Done  
**Story:** [`../STORY-SPA-CT-33-composer-dark-residual.md`](../STORY-SPA-CT-33-composer-dark-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-33-composer-dark-residual.md)  
**ui_scope:** `thread-mount` / composer · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:41:36Z`  
**Package:** `pkg-000207`  
**Path A:** Interview T5–6 · ARCHITECTURE §19 · p13UxReady

## Purpose

FR-CT-33.2 · 33.4: Attachment chips / “Selected image” / local preview plates theme-safe (no fixed cream `#fffdf8` as only fill) · Attach control readable on dark.

## Code Facts (verify)

- AS-IS: `AttachmentRef.css` · `CommentAttachmentPreview.css` fixed `#fffdf8`
- Target: theme tokens · Attach control contrast on dark

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · CT-31 policy OOS

## AC / DoD

- [x] Attach plates themed
- [x] Attach control readable on dark (ShellChromeIcon mask)
- [x] Visual Done not claimed without OP eye · gate **BLOCK**

## Where changed

`AttachmentRef.css` · soft `CommentAttachmentPreview.css` · soft Attach control in `ThreadComposer.css`

## Verification

```bash
rg -n "#fffdf8" spa-app/src/features/thread-mount/composer spa-app/src/features/thread-mount/tree/CommentAttachmentPreview.css
```
