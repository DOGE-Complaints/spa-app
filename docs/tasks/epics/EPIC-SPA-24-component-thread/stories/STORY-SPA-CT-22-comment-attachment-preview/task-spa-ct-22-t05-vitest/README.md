# SPA-CT-22-T05 — vitest image preview · md allow · honesty

**Status:** Done  
**Story:** [`../STORY-SPA-CT-22-comment-attachment-preview.md`](../STORY-SPA-CT-22-comment-attachment-preview.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:58:07Z`  
**Package:** `pkg-000180`  
**@mockup:** Path A M153/M153a continuity · Partial=**BLOCK**

## Purpose

FR-CT-22.7: Vitest / lab — post with image → node shows preview; `.md` accepted as allow-list family; local honesty markers.

## Constraints

- No invent HTTP/OP PASS · Partial visual=**BLOCK** until OP eye  
- Soft depends T01–T04

## AC / DoD

- [x] Image preview assert Present  
- [x] `.md` allow-list assert Present  
- [x] Honesty / Denied exclusion covered  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/__tests__` · `src/features/feed-lab/__tests__` · Path A capture at P3

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
