# SPA-NF-18-T04 — Markers / honesty

**Status:** Done  
**Story:** [`../STORY-SPA-NF-18-strip-react-density-residual.md`](../STORY-SPA-NF-18-strip-react-density-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md)  
**ui_scope:** `feed` · soft `reactions-mount` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T19:15:30Z`  
**Package:** `pkg-000196`  
**P3 Done:** `2026-10-21T19:20:54Z`  
**Path A:** [M162](../../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) soft · [ARCH-DELTA §6](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-18.4 · 18.6: Vitest / CSS markers · CR-23 / four-zone honesty · no invent OP PASS counts.

## Constraints

- Path A · Partial=**BLOCK** · no invent OP PASS · CR-23 host held

## AC / DoD

- [x] Vitest / markers Present for flatten · glyphs 28 · pad stack
- [x] CR-23 / four-zone held assert
- [x] Visual Done not claimed without OP eye

## Where changed

feed.nf18.test.jsx · nf15/nf17 tip locks adjusted

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/reactions-mount src/features/feed-lab
```
