# SPA-NF-15-T01 — Remove React border/pill in post-strip host only

**Status:** Done  
**Story:** [`../STORY-SPA-NF-15-action-strip-density-unframe.md`](../STORY-SPA-NF-15-action-strip-density-unframe.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:59:57Z`  
**Done:** `2026-10-21T12:34:30Z`  
**Package:** `pkg-000191`  
**Path A:** [M162](../../../../../UX/next/feed/artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md)

## Purpose

FR-NF-15.1 · 15.6 · 15.7: Remove React border/pill in post-strip host only.

## Code Facts (verify)

- `.feed-civic-post-actions .rm-summary-strip__react` · border none · transparent · Present
- CR-23 Live `FeedReactionsMount` · **Present** · host held
- Comment-node / feed-lab strip hosts · untouched (post-strip host selector only)

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Focus/pressed/selected remain visible · no invent OP PASS · no picker redesign

## AC / DoD

- [x] React flat like Comment/Share on civic strip
- [x] Comment-node React chrome not broken
- [x] Focus chrome held
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/FeedReactionsMount.css` · post-strip host unframe

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed src/features/reactions-mount
```

P3: probe `reactBorder=0px` · CAPTURE-META `fails: []`
