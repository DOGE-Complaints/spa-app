# SPA-NF-15-T03 — Stacked labels · mh 56 at narrow

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

FR-NF-15.4: Narrow ~390 — icon above label · gap **4** · control min-height **56** (never below 44) · four zones retained.

## Code Facts (verify)

- `@media (max-width: 420px)` reuse existing feed narrow token · Present
- stacked `flex-direction: column` · gap **4** · mh **56** · Present
- four-zone `data-action-zones="4"` held

## Constraints

- Path A M162 · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Four zones retained · no invent OP PASS

## AC / DoD

- [x] Narrow stacked · gap 4 · mh 56 applied (420 token reuse)
- [x] Four zones retained
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.css` · `FeedReactionsMount.css` media query

## Verification

```bash
cd spa-app && npm test -- --run src/features/feed
```

P3: narrow probe `flexDir=column` · `gap=4px` · `minH=56px`
