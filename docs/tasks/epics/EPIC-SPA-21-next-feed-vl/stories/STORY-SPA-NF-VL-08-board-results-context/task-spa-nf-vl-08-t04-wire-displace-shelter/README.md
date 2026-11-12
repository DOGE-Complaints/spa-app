# SPA-NF-VL-08-T04 — Wire BoardHeading/ResultsContext/StaleResultsNotice into toolbar + list

**Status:** Done · P3 (`2026-10-12T15:43:39Z`)
**Story:** [`../STORY-SPA-NF-VL-08-board-results-context.md`](../STORY-SPA-NF-VL-08-board-results-context.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-08-board-results-context.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-08-board-results-context.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**extends mockup:** [`../task-spa-nf-vl-08-t02-ds-board-modules/README.md`](../task-spa-nf-vl-08-t02-ds-board-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T15:38:36Z`
**Package:** `pkg-000122`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §4 BoardHeading / ResultsContext / StaleResultsNotice / BoardFeedState
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Wire BoardHeading/ResultsContext/StaleResultsNotice into toolbar + list

## Arch anchors
- [02 DS surface map → board/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` toolbar **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-01 Done Related only.
- VL-02 BoardSearchField Related sibling in toolbar (not conflated with ResultsContext).
- Replace toolbar copy with BoardHeading + ResultsContext; replace stale banner with StaleResultsNotice; coord VL-02 BoardSearchField sibling; `#/board` unchanged.

## Constraints
- No invent metrics APIs.
- No mutate classic `#/board` toolbar.
- Closed list fetch retained.
- Shell chrome OOS.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for VL-08
- [ ] Anti-mixing: `(no query)` routing dump ≠ Done ResultsContext
- [ ] `#/board` not regressed
- [ ] No invent metrics APIs

## Where to change
- `spa-app/src/features/feed/FeedToolbar.jsx`
- `spa-app/src/features/feed/FeedListArea.jsx`
- Target `spa-app/src/features/feed/board/`
- Host props: `NextFeedHostPage.jsx` stale/showResults (Closed)

## Verification
- Grep `feed-routing-query` / `feed-stale` after wire
- local-five: happy / stale / empty / error · board smoke
- vitest prior waves still meaningful; add VL-08 surface tests at implement

## Evidence

- Done `2026-10-12T15:43:39Z` · FeedToolbar + FeedListArea wire DS surfaces; BoardSearchField sibling retained (VL-02).
