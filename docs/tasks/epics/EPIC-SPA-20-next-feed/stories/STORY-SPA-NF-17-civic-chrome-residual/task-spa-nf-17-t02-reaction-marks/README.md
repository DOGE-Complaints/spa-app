# SPA-NF-17-T02 — Reaction-mark size tip 20

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

FR-NF-17.2: Reaction-mark size tip 20 · primary glyphs 24 held.

## Code Facts (verify)

- `.feed-civic-post-reaction-mark` **20×20** · Present
- primary `.feed-civic-post-action > .feed-civic-post-icon` **24×24** held
- Path A probe `markW=20px` · `commentIconW=24px`

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No picker redesign · no invent OP PASS

## AC / DoD

- [x] Reaction marks ≥ tip 20 CSS px · primary 24 held
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/FeedCivicPost.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/reactions-mount
```

P3: probe marks 20 · primary 24 · shot 03
