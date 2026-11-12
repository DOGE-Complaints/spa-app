# SPA-NF-VL-02-T04 — Wire BoardSearchField; displace Filters SearchInput on next toolbar

**Status:** Done · P3 (`2026-10-12T13:59:07Z`) (`2026-10-12T13:06:20Z`)
**Story:** [`../STORY-SPA-NF-VL-02-board-search-field.md`](../STORY-SPA-NF-VL-02-board-search-field.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-02-board-search-field.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-02-board-search-field.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**extends mockup:** [`../task-spa-nf-vl-02-t02-ds-search-modules/README.md`](../task-spa-nf-vl-02-t02-ds-search-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T13:06:20Z`
**Package:** `pkg-000116`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §4 `BoardSearchField`
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Wire BoardSearchField; displace Filters SearchInput on next toolbar

## Arch anchors
- [02 DS surface map → search/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-12 Done (search wire) Related only — **do not reopen body**.
- Replace FeedToolbar SearchInput with BoardSearchField; `#/board` Filters search untouched.

## Constraints
- No invent search param / gateway endpoint / icons.
- No mutate `#/board` Filters search chrome.
- Closed param remains `search` (REQ-56 / NF-12).
- Shell OOS · M155 OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-02
- [x] Anti-mixing: unre-skinned Filters SearchInput ≠ Done on `#/next/feed*`
- [x] `#/board` not regressed
- [x] No invent search param/API

## Where to change
- `spa-app/src/features/feed/FeedToolbar.jsx` (SearchInput mount)
- Target `spa-app/src/features/feed/search/BoardSearchField.jsx` (logical; name ≠ create until P3)
- Semantics: existing NF-12 query builders — Closed `search`

## Verification
- Grep `SearchInput` under `features/feed` after wire — Done path must not import Filters SearchInput
- local-five: type / clear / empty honesty
- vitest nf12 still meaningful; add VL-02 surface tests at implement

## Implement notes

FeedToolbar: SearchInput import removed; BoardSearchField wired; FeedHost.css targets .board-search-field; #/board untouched.

**Closed:** `2026-10-12T13:59:07Z`
