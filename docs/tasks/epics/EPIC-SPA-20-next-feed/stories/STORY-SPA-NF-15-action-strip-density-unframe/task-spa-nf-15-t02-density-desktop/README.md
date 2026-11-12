# SPA-NF-15-T02 — 24px icons · 4v/8h · gap 6 · mh 44

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

FR-NF-15.2 · 15.3: Primary glyphs **24×24** · desktop pad **4v/8h** · gap **6** · min-height **44**.

## Code Facts (verify)

- `.feed-civic-post-action > .feed-civic-post-icon` **24×24** · Present
- `.feed-civic-post-action` pad **4px 8px** · gap **6** · mh **44** · Present
- React strip icon override `.rm-icon` **24×24 !important** · Present
- Reuse `/icons/next-feed/actions/{react,comment,share}.svg` · no new pack

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent action SVG / HTTP / OP PASS

## AC / DoD

- [x] Icons 24 CSS px
- [x] Desktop 4v/8h · gap 6 · min-height 44
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.css` · `FeedReactionsMount.css` · `data-nf15-density="m162"`

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed
```

P3: probe icons 24 · pad 4/8 · mh 44
