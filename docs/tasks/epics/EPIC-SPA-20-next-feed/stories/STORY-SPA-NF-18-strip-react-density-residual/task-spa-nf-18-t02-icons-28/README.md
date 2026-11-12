# SPA-NF-18-T02 — Primary glyphs 28 · align CrReactionIcon size

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

FR-NF-18.2: Primary action glyphs tip **28×28 CSS px** (Comment/Share/React) · align `CrReactionIcon` size.

## Code Facts (verify)

- AS-IS: primary tip 24 (NF-15/17 held)
- Target: tip **28** CSS px · touch mh ≥44 held elsewhere (T03)

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK** · CR-23 host held · no invent OP PASS  
- Supersedes NF-17 tip eye for glyph size where OP residual rejects

## AC / DoD

- [x] Glyphs tip ≥ 28 CSS px
- [x] Visual Done not claimed without OP eye

## Where changed

FeedCivicPost.css · FeedReactionsMount.css · glyphs 28

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed src/features/reactions-mount
```
