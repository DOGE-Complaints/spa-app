# SPA-NF-18-T03 — One pad level · mh ≥44

**Status:** Done  
**Story:** [`../STORY-SPA-NF-18-strip-react-density-residual.md`](../STORY-SPA-NF-18-strip-react-density-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md)  
**ui_scope:** `feed` · soft `reactions-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T19:15:30Z`  
**Package:** `pkg-000196`  
**P3 Done:** `2026-10-21T19:20:54Z`  
**Path A:** [M162](../../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) soft · [ARCH-DELTA §6](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-18.3 · 18.5: Single pad stack on React path (no 4×8 on both wrapper and `.rm-summary-strip__react`) · min-height **≥44** · focus/pressed/selected held.

## Code Facts (verify)

- AS-IS: dual pad risk on wrapper + `.rm-summary-strip__react`
- Target: one pad level · mh ≥44 · focus chrome visible

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · CR-23 / four-zone held · no invent OP PASS

## AC / DoD

- [x] Single pad level on React path · mh ≥44
- [x] Focus chrome held
- [x] Visual Done not claimed without OP eye

## Where changed

FeedReactionsMount.css sole pad 4×8 · mh ≥44 · focus held

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed
```
