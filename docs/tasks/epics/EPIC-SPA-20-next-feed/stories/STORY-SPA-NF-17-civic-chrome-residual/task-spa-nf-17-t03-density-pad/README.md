# SPA-NF-17-T03 — pad-top 4 · margin-top 0 · mh ≥44

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

FR-NF-17.3 · 17.5: Strip vertical density tip · focus chrome held · four-zone held.

## Code Facts (verify)

- `.feed-civic-post-actions` `padding-top: 4px` · `margin-top: 0` · `min-height: 44px`
- `:focus-visible` on `.feed-civic-post-action` Present
- Path A probe `paddingTop=4px` · `marginTop=0px` · `minH=44px`

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Four-zone grammar held (NF-07) · no invent OP PASS

## AC / DoD

- [x] Strip pad/margin tip applied · touch ≥44
- [x] Focus chrome held
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/FeedCivicPost.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed
```

P3: probe pad/margin/mh · shot 04
