# SPA-CT-31-T04 — Mock fetch/blob · Lab held

**Status:** Done  
**Story:** [`../STORY-SPA-CT-31-live-attach-preview-consumable.md`](../STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md)  
**ui_scope:** `thread-mount` / `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T17:56:40Z`  
**Package:** `pkg-000195`  
**P3 Done:** `2026-10-21T18:04:58Z`  
**Path A:** ARCH §17 · CT-22 Present · policy **A** locked

## Purpose

FR-CT-31.3 · 31.4: Vitest happy path for policy **A** (mock fetch/blob) · Lab Fixture held · no invent counts.

## Constraints

- Path A code lock · Partial=**BLOCK** · no invent OP PASS / CDN / HTTP-09

## AC / DoD

- [x] Vitest covers A happy path
- [x] Lab held assert
- [x] Visual Done not claimed without OP eye · Partial=BLOCK held

## Where changed

threadMount.ct31.test.jsx · feed.ct31.test.jsx

## Verification

```bash
cd spa-app && npm test -- --run src/features/thread-mount src/features/feed src/features/feed-lab
```
