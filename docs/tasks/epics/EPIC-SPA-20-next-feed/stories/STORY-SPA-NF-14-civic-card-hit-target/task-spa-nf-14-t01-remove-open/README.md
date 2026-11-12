# SPA-NF-14-T01 — Remove open Link block · keep `to` prop for hit wrapper

**Status:** Done  
**Story:** [`../STORY-SPA-NF-14-civic-card-hit-target.md`](../STORY-SPA-NF-14-civic-card-hit-target.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:43:47Z`  
**Done:** `2026-10-21T11:51:32Z`  
**Package:** `pkg-000190`  
**Path A:** code lock · [ARCH-DELTA §2](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-14.1 · 14.6 · 14.9: Remove open Link block · keep `to` prop for hit wrapper.

## Code Facts (verify)

- `FeedCivicPost.jsx` dedicated `feed-civic-post-open` · **Absent** (retired)
- `to` prop retained · drives NF-14 hit Link
- Soft: `public/icons/next-feed/actions/open-issue.svg` · remains on disk unused

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Detail (no `to`) unchanged · no invent OP PASS · no invent HTTP

## AC / DoD

- [x] Open issue row gone on list (`feed-civic-post-open` Absent)
- [x] Detail unchanged (no dead Open link)
- [x] `to` prop retained for T02 hit wrapper
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/FeedCivicPost.jsx` · `FeedCivicPost.css` (open styles → hit)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed
```

P3: feed.nf14 · nf02 · CAPTURE-META `fails: []`
