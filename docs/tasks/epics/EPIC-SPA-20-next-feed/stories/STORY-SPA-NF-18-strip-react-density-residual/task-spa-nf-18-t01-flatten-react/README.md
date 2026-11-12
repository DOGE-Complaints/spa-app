# SPA-NF-18-T01 — Remove nested gray pad/hover on react-slot

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

FR-NF-18.1 · 18.3: Remove nested gray pad/hover on react-slot — one chrome layer vs Comment/Share.

## Code Facts (verify)

- AS-IS: nested pad/hover on react-slot wrapper vs flat Comment/Share
- Target: flatten / neutralize inner+outer double gray background

## Constraints

- Path A M162 soft · ARCH-DELTA §6 · NO BRIEF · Partial=**BLOCK**  
- CR-23 host held · four-zone held · no invent OP PASS · no picker redesign

## AC / DoD

- [x] No double gray underlay on React vs Comment/Share
- [x] Visual Done not claimed without OP eye

## Where changed

FeedCivicPost.css · FeedReactionsMount.css · react-slot padding 0

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed
```
