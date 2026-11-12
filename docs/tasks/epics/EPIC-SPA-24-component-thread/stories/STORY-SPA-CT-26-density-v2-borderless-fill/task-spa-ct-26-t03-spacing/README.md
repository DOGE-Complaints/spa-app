# SPA-CT-26-T03 — Density v2 gaps

**Status:** Done  
**Story:** [`../STORY-SPA-CT-26-density-v2-borderless-fill.md`](../STORY-SPA-CT-26-density-v2-borderless-fill.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-26-density-v2-borderless-fill.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-26-density-v2-borderless-fill.md)  
**ui_scope:** `thread-mount`/`feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T19:38:25Z`
**Executed:** `2026-10-20T19:43:18Z`
**Package:** `pkg-000184`  
**@mockup:** [M153d v1.0](../../../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) (+ PNG)

## Purpose

FR-CT-26.3: Apply gap bubble→actions **4 px** · node→next bubble **8 px** (no doubled margins). Spine/elbow offsets follow compact geometry.

## Constraints

- Path A M153d · supersede CT-23 border-keep · borderless fill · AttachmentRef borders unchanged · no invent HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF · no invent denser-than-sheet spacing

## AC / DoD

- [x] Gaps 4 / 8 Match M153d
- [x] No doubled margins from nested wrappers
- [x] Visual Done not claimed without OP eye

## Where to change

CommentNode.css · tree CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
