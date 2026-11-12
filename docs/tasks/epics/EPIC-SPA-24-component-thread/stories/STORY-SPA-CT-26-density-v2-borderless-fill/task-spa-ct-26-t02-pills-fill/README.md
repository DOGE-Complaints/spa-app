# SPA-CT-26-T02 — Action pills borderless fill

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

FR-CT-26.2: Remove action-pills stroke · fill `#FFFDF8` · pad 4v/8h · min-height ≥44 · separator 1×16 `#E7E4DC` retained.

## Constraints

- Path A M153d · supersede CT-23 border-keep · borderless fill · AttachmentRef borders unchanged · no invent HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF · React and Reply remain independent targets · no shadow substitute for outer border

## AC / DoD

- [x] Action-pills outer border Absent
- [x] Fill · 4v/8h · ≥44 CSS px Present
- [x] Separator retained · Visual Done not claimed without OP eye

## Where to change

CommentNode.css

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
