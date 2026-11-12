# SPA-NF-14-T02 — Wrap content+media · exclude actions · a11y name

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

FR-NF-14.2…14.5 · 14.7: Wrap content+media · exclude actions · a11y name.

## Code Facts (verify)

- One `Link.feed-civic-post-hit` · `data-testid="feed-civic-post-hit"` wraps identity+title+summary+labels+media
- Strip `data-action-zones="4"` · **sibling outside** hit
- More button outside hit (no nested interactive) · `IssueIdentityHeader showMore={false}` when list `to`
- `aria-label` = title || summary || localized Open issue · focus-visible on hit

## Constraints

- Path A code lock · NO BRIEF · no UX gen · Partial=**BLOCK**  
- Named hit · keyboard · strip focus held · no invent OP PASS

## AC / DoD

- [x] Header+meta+title+summary+media navigate via shared `to`
- [x] Action strip excluded from hit
- [x] A11y name · keyboard focus-visible
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost.jsx` · `FeedCivicPost.css` · `IssueIdentityHeader.jsx` (`showMore`)

## Verification

P3: feed.nf14 · probe listHit · actionsInsideHit=false · shots 02/03/05
