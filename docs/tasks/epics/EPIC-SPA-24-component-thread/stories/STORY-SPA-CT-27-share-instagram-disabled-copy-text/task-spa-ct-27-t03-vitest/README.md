# SPA-CT-27-T03 — Vitest IG disabled · Copy text-only

**Status:** Done  
**Closed:** `2026-10-20T19:53:14Z` · P3 · ct27 **4/4** · suite **225/225** · Path A shots Present  

**Story:** [`../STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T19:49:22Z`  
**Package:** `pkg-000185`  
**@mockup:** [M152d](../../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md)

## Purpose

FR-CT-27.6: Vitest — Instagram `disabled` / aria · click no clipboard · Copy link has no icon node · other networks held. Prefer `feedLab.ct27` and/or update ct24 asserts.

## Constraints

- Path A M152d · NO BRIEF · Partial=**BLOCK**  
- Story-root screenshots/full-cycle mandatory at P3 · no invent OP PASS / HTTP / Graph API

## AC / DoD

- [x] Vitest Present
- [x] Other networks unchanged asserted
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/feed-lab/__tests__`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
