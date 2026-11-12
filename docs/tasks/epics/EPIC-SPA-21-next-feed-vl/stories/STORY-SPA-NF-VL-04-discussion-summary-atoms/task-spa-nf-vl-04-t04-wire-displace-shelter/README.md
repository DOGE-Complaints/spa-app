# SPA-NF-VL-04-T04 — Wire DS summary atoms; displace classic collapsed DISCUSSION chrome

**Status:** Done · P3 (`2026-10-12T14:41:59Z`) · P1.3 (`2026-10-12T14:38:25Z`)
**Story:** [`../STORY-SPA-NF-VL-04-discussion-summary-atoms.md`](../STORY-SPA-NF-VL-04-discussion-summary-atoms.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-04-discussion-summary-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-04-discussion-summary-atoms.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**extends mockup:** [`../task-spa-nf-vl-04-t02-ds-comments-modules/README.md`](../task-spa-nf-vl-04-t02-ds-comments-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T14:38:25Z`
**Package:** `pkg-000118`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §6 DiscussionHeader / ThreadSummary / CommentPreview
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Wire DS summary atoms; displace classic collapsed DISCUSSION chrome

## Arch anchors
- [02 DS surface map → comments/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-08 Done (discussion collapsed) Related only — **do not reopen body**.
- Replace collapsed markup + discussion label with DS composition; keep expand `setExpanded(true)`; compose with VL-03 reaction slot — do not reopen NF-08 body; #/board unchanged.

## Constraints
- No invent threads API / thread fields.
- No mutate `#/board` IssueThreadBlock summary chrome.
- Closed preview `body` literals only (FR-VL-04.2).
- Shell OOS · NF-08 body OOS · VL-05 tree OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-04
- [x] Anti-mixing: classic DISCUSSION / IssueThreadBlock collapsed chrome ≠ Done on `#/next/feed*`
- [x] `#/board` not regressed
- [x] No invent threads API

## Where to change
- `spa-app/src/features/feed/FeedDiscussionBlock.jsx` (collapsed summary chrome)
- Target `spa-app/src/features/feed/comments/` (logical; name ≠ create until P3)
- Semantics: preview body mapping may stay local or move to `features/feed/semantics/` if shared

## Verification
- Grep classic DISCUSSION / IssueThreadBlock Done claims under `features/feed` after wire
- local-five: empty vs populated collapsed · board smoke
- vitest nf08 still meaningful; add VL-04 surface tests at implement

## P3 Done notes (`2026-10-12T14:41:59Z`)
- Claim: FeedDiscussionBlock mounts DiscussionHeader + DiscussionSummaryChrome on collapsed populated · `#/board` untouched.
