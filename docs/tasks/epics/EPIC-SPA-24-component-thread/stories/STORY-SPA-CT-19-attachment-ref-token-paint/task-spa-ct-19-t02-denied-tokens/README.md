# SPA-CT-19-T02 — Denied chip tokens (M153b §7)

**Status:** Done  
**Story:** [`../STORY-SPA-CT-19-attachment-ref-token-paint.md`](../STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:32:12Z`  
**Package:** `pkg-000177`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · §7 Denied

## Purpose

FR-CT-19.2: Apply Denied fill `#F7F6F2` · border 1px `#B54708` · title `#B54708` 600 · **no** pink/red wash.

## Constraints

- Paint SSOT = M153b §7  
- No invent green/red status palette  
- Partial visual=**BLOCK** · no invent OP PASS · no invent MIME/HTTP

## AC / DoD

- [x] Denied fill/border/title Match M153b §7  
- [x] No pink/red wash  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/AttachmentRef.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
