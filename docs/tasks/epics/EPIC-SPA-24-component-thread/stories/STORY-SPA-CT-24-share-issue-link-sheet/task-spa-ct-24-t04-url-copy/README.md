# SPA-CT-24-T04 — Resolve Issue URL · copy · Link copied · unavailable

**Status:** Done  
**Story:** [`../STORY-SPA-CT-24-share-issue-link-sheet.md`](../STORY-SPA-CT-24-share-issue-link-sheet.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-24-share-issue-link-sheet.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-24-share-issue-link-sheet.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T15:19:51Z`
**Executed:** `2026-10-20T15:26:53Z`  
**Package:** `pkg-000182`  
**@mockup:** [M152d v1.0](../../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) (+ PNG) · icons `/icons/next-feed/share/*`

## Purpose

FR-CT-24.5 · FR-CT-24.6: Resolve Issue URL · copy · Link copied · unavailable.

## Constraints

- Path A M152d · popover desktop / bottom sheet 390 · no invent HTTP/OP PASS · Partial=**BLOCK**  
- NO STORY-UX-MOCKUP-BRIEF · no invent private Instagram API · no OS share hybrid

## AC / DoD

- [x] Canonical public Issue URL when available
- [x] Lab missing URL → honesty copy
- [x] Link copied on copy success

## Where to change

helpers + host props

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
