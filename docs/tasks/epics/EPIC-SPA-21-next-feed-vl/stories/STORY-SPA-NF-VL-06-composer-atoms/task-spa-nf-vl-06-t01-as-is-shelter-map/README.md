# SPA-NF-VL-06-T01 — As-is / shelter map (classic CommentComposer on next ≠ VL Done)

**Status:** Done · P3 (`2026-10-12T15:13:32Z`)
**Story:** [`../STORY-SPA-NF-VL-06-composer-atoms.md`](../STORY-SPA-NF-VL-06-composer-atoms.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-06-composer-atoms.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T15:08:28Z`
**Package:** `pkg-000120`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §7 ComposerEntry / ThreadComposer / ReplyContext / CommentTextInput / ComposerActionRow / SubmitCommentAction / ComposerFeedback / DraftDiscardDialog
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
As-is / shelter map (classic CommentComposer on next ≠ VL Done)

## Arch anchors
- [02 DS surface map → composer/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-08 Done Related only — **do not reopen oval as body**.
- VL-05 DiscussionLayout Related; verify DS chrome → VL-11.
- Cite FeedDiscussionBlock imports classic CommentComposer; ban classic alone as Done; VerifyWriteGate inside classic = VL-11 boundary (do not claim verify Done).

## Constraints
- No invent POST / threads fields.
- No mutate `#/board` CommentComposer chrome.
- Closed submit/feedback contracts retained.
- Attachments production OOS · NF-08 oval body OOS · VL-11 verify chrome OOS as Done claim.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for VL-06
- [ ] Anti-mixing: classic CommentComposer alone ≠ Done on `#/next/feed*`
- [ ] `#/board` not regressed
- [ ] No invent POST fields

## Where to change
- `spa-app/src/features/feed/FeedDiscussionBlock.jsx` (composer slot / CommentComposer import)
- Target `spa-app/src/features/feed/composer/` (DS atoms)
- Semantics: submit/feedback helpers may move to `features/feed/semantics/`

## Verification
- Grep classic `CommentComposer` Done claims under `features/feed` after wire
- local-five: root compose / reply / discard · board smoke
- vitest prior nfvl05/nf08 still meaningful; add VL-06 surface tests at implement

## Completion

Done P3 `2026-10-12T15:13:32Z` · gate PASS · pkg-000120.
