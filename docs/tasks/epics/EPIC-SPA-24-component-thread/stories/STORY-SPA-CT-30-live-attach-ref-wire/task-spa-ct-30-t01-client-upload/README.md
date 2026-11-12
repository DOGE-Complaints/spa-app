# SPA-CT-30-T01 — Add uploadAttachment multipart client

**Status:** Done  
**Closed:** `2026-10-21T13:08:53Z` · P3 · uploadAttachment multipart · locked POST /attachments  

**Story:** [`../STORY-SPA-CT-30-live-attach-ref-wire.md`](../STORY-SPA-CT-30-live-attach-ref-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-30-live-attach-ref-wire.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-30-live-attach-ref-wire.md)  
**ui_scope:** `thread-mount` / `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T13:02:21Z`  
**Package:** `pkg-000193`  
**Path A:** ARCH §16 · CT-22 Present · HTTP-07/08 Done

## Purpose

FR-CT-30.2: Add uploadAttachment multipart client.

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Locked POST `/threads/issues/{issue_id}/attachments` · **no invent URL/CDN** · no invent OP PASS  
- Lab FixtureAdapter held · prefer upload over attachRef-only for Live Ready files

## AC / DoD

- [ ] Purpose delivered for this task
- [ ] Visual Done not claimed without OP eye

## Where to change

ThreadsSocialClient.js

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed src/repositories
```
