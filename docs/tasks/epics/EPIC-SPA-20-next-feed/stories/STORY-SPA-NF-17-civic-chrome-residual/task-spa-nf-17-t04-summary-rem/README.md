# SPA-NF-17-T04 — summary font-size 1rem

**Status:** Done  
**Story:** [`../STORY-SPA-NF-17-civic-chrome-residual.md`](../STORY-SPA-NF-17-civic-chrome-residual.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T17:41:52Z`  
**Done:** `2026-10-21T17:48:06Z`  
**Package:** `pkg-000194`  
**Path A:** [M162](../../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) · [ARCH-DELTA §5](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-17.4: Summary text tip 1rem on `.feed-civic-post-summary`.

## Code Facts (verify)

- `.feed-civic-post-summary` `font-size: 1rem` · Present
- Path A probe `summaryIs1rem=true` (`summaryFs` equals `rootFs` · tip 1rem; root may be 14px)

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent OP PASS · no body/copy invent

## AC / DoD

- [x] Summary ≥ tip 1rem
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/FeedCivicPost.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed
```

P3: probe summary=1rem · shot 05
