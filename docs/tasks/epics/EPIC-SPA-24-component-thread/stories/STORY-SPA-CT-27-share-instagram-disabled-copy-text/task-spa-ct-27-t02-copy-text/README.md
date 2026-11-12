# SPA-CT-27-T02 — Copy link text-only

**Status:** Done  
**Closed:** `2026-10-20T19:53:14Z` · P3 · Copy `textOnly` · no icon/⎘  

**Story:** [`../STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-27-share-instagram-disabled-copy-text.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T19:49:22Z`  
**Package:** `pkg-000185`  
**@mockup:** [M152d](../../../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) (list order)

## Purpose

FR-CT-27.5: Copy link row is text-only — no icon / no `⎘` glyph. Copy remains available via this row.

## Constraints

- Path A M152d · NO BRIEF · Partial=**BLOCK**  
- Copy link text-only · no invent HTTP/OP PASS · other networks unchanged

## AC / DoD

- [x] Copy link works without icon
- [x] No `⎘` / icon node on Copy row
- [x] Visual Done not claimed without OP eye

## Where to change

FeedPostShareSurface.jsx · CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed-lab
```
