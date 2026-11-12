# SPA-CT-22-T01 — persist attachment intents on post

**Status:** Done  
**Story:** [`../STORY-SPA-CT-22-comment-attachment-preview.md`](../STORY-SPA-CT-22-comment-attachment-preview.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-22-comment-attachment-preview.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T14:58:07Z`  
**Package:** `pkg-000180`  
**@mockup:** [M153a v1.1](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · AttachmentRef continuity

## Purpose

FR-CT-22.1: On successful post/reply, comment model carries attachment intents (lab/fixture path) — not body-only.

## Constraints

- Lab host path · no invent upload/bind HTTP/OP PASS · Partial=**BLOCK**  
- Soft depends ThreadMount / FeedLabThreadMount write-owner

## AC / DoD

- [x] Posted comment retains attachment intents  
- [x] Body-only comments unchanged when no attach  
- [x] Visual Done not claimed without OP eye

## Where to change

`FeedLabThreadMount.jsx` · `ThreadMount.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
