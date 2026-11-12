# SPA-NF-16-T01 — Gate more render · TODO memo · optional showMore

**Status:** Done  
**Story:** [`../STORY-SPA-NF-16-more-menu-deferred.md`](../STORY-SPA-NF-16-more-menu-deferred.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md)  
**ui_scope:** `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T12:46:48Z`  
**Done:** `2026-10-21T12:53:22Z`  
**Package:** `pkg-000192`  
**Path A:** code lock · [ARCH-DELTA §4](../../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md)

## Purpose

FR-NF-16.1 · 16.2 · 16.3 · 16.8: Gate more render · add TODO memo · optional `showMore` prop.

## Code Facts (verify)

- `FeedCivicPost` `showMore={false}` · `moreOutsideHit` gated `false && (` · TODO Present
- `IssueIdentityHeader` default `showMore=false` · TODO Present · button JSX retained
- `feed-civic-post-more` **Absent** on list + detail

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- No invent menu actions / OP PASS / HTTP · do not delete more.svg

## AC / DoD

- [x] More not visible on live civic card (`feed-civic-post-more` Absent)
- [x] Gated/commented block + TODO Present
- [x] Soft: `showMore` default false for feed civic documented
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.jsx` · `IssueIdentityHeader.jsx`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/feed
```

P3: probe list/detail `moreCount=0` · CAPTURE-META `fails: []`
