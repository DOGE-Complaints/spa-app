# SPA-CT-26-T04 — Density v2 regression

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

FR-CT-26.4 / 26.6: Assert no bubble/pill-group outer `border: 1px` stroke · fill + spacing tokens Present · spine + parent stripe ok · AttachmentRef borders unchanged.

## Constraints

- Path A M153d · supersede CT-23 border-keep · borderless fill · AttachmentRef borders unchanged · no invent HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF · story-root screenshots/full-cycle mandatory at P3 · no invent OP PASS

## AC / DoD

- [x] Vitest/CSS regression Present
- [x] Spine Present · parent stripe Present
- [x] AttachmentRef borders unchanged asserted
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/__tests__`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed-lab
```
