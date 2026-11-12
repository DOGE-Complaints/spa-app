# SPA-NF-14-T03 — FeedListArea still passes `to` into hit wrapper

**Status:** Done  
**Story:** [`../STORY-SPA-NF-14-civic-card-hit-target.md`](../STORY-SPA-NF-14-civic-card-hit-target.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T11:43:47Z`  
**Done:** `2026-10-21T11:51:32Z`  
**Package:** `pkg-000190`  
**Path A:** code lock · [ARCH-DELTA §2](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-14.2: FeedListArea still passes `to` (or navigate href) into hit wrapper.

## Code Facts (verify)

- `FeedListArea.jsx` `to={`/next/feed/issue/${item.id}?from=…`}` · **Present** (held · comment NF-14)
- Route shape unchanged

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent OP PASS · no invent HTTP · no change issue route shape

## AC / DoD

- [x] List still supplies identical `to` into hit wrapper
- [x] Route shape `/next/feed/issue/:id?from=…` held
- [x] Visual Done not claimed without OP eye

## Where changed

`src/features/feed/FeedListArea.jsx` (wire comment only)

## Verification

P3: list wire held · feed.nf14 href Match
