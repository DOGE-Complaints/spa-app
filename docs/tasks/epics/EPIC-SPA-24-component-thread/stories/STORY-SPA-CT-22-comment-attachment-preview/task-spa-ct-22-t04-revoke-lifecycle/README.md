# SPA-CT-22-T04 — object URL create/revoke lifecycle

**Status:** Done  
**Story:** [`../STORY-SPA-CT-22-comment-attachment-preview.md`](../STORY-SPA-CT-22-comment-attachment-preview.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:58:07Z`  
**Package:** `pkg-000180`  
**@mockup:** local preview honesty · no invent CDN

## Purpose

FR-CT-22.3: Safe object URL lifecycle (create/revoke) · no leak when using local preview without published URL.

## Constraints

- Create/revoke paired · no invent HTTP/OP PASS  
- Soft depends T03 node preview

## AC / DoD

- [x] object URL created for local image preview when needed  
- [x] revoke on unmount / intent change  
- [x] Visual Done not claimed without OP eye

## Where to change

`CommentNode` / host helpers

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
