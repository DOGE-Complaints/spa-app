# SPA-CT-19-T01 — Ready chip tokens (M153b §7)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-19-attachment-ref-token-paint.md`](../STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:32:12Z`  
**Package:** `pkg-000177`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §7 Ready

## Purpose

FR-CT-19.1 · 19.6: Apply Ready chip tokens + status/title `Ready to post` · **no** green Ready badge.

## Constraints

- Paint SSOT = M153b §7 (precedence over M153a raster)  
- No invent MIME/HTTP · no invent OP PASS  
- Partial visual=**BLOCK** until OP eye  
- Type cues without inventing new icon packages

## AC / DoD

- [x] Ready label `Ready to post` · no green wash  
- [x] Fill/border/radius/pad Match §7 Ready column  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/AttachmentRef.css` · `AttachmentRef.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
