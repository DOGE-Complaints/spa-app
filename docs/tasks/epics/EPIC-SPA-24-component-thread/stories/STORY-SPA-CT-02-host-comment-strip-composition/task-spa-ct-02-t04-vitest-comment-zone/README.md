# SPA-CT-02-T04 — Vitest Comment zone + Path A gate

**Status:** Done  
**Story:** [`../STORY-SPA-CT-02-host-comment-strip-composition.md`](../STORY-SPA-CT-02-host-comment-strip-composition.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-02-host-comment-strip-composition.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-18T13:07:07Z`  
**Package:** `pkg-000160`  
**@mockup:** OP-UX-MIRROR §4.1 · Path A shots  
**Runtime:** P3 Done · Await P4 · final task · depends T01–T03

## Purpose

AC: Vitest Comment ≠ picker · expand markers · no ThreadMount import in strip · Path A shots · update story gate. Partial visual=**BLOCK** until OP eye.

## Constraints

- No invent OP PASS · gate BLOCK if OP eye Absent  
- Strip dumb assertion required

## AC / DoD

- [x] Vitest Comment zone Present
- [x] Path A shots Present · OP column Absent → gate BLOCK OK
- [x] Gate file updated after live verify

## Where to change

`src/features/feed-lab/__tests__/*` · story-root screenshots · gate

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab src/features/thread-mount
```
