# SPA-NF-VL-09-T06 — Docs residual — gap map VL-09 · shell OOS

**Status:** Done · P3 (`2026-10-12T15:53:33Z`)
**Story:** [`../STORY-SPA-NF-VL-09-board-page-layouts.md`](../STORY-SPA-NF-VL-09-board-page-layouts.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-09-board-page-layouts.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-vl-09-t02-ds-layout-modules/README.md`](../task-spa-nf-vl-09-t02-ds-layout-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T15:49:51Z`
**Package:** `pkg-000123`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**@layout-spec:** [`../../../../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §2 BoardLayout / PageContentLayout
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Docs residual — gap map VL-09 · shell OOS

## Arch anchors
- [02 DS surface map → board/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named layouts on `#/next/feed*` content column (AD-VL-01/02).
- Shell rails = next-shell **OOS** (do not rewrite PublicHeader/ProfileRail).
- VL-07/08 Done soft Related — overlays/heading live inside content column.
- When Done: cite gap map VL-09; shell ownership remains next-shell.

## Constraints
- No invent endpoints / metrics APIs.
- No shell chrome rewrite.
- Absent side modules → no empty columns.
- Classic `#/board` OOS mutate beyond next-feed content layouts.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-09
- [x] Anti-mixing: implicit CSS-only ≠ Done without named layout claim
- [x] Shell OOS restated
- [x] No invent endpoints

## Where to change
- `spa-app/src/pages/NextFeedHostPage.jsx`
- Target `spa-app/src/features/feed/board/` (`BoardLayout`, `PageContentLayout`)
- May reuse `useFeedNarrow` / media queries

## Verification
- Grep `BoardLayout` / `PageContentLayout` / `feed-host` after wire
- local-five: 1440 / 768 / 390 · shell not rewritten
- vitest prior waves still meaningful; add VL-09 surface tests at implement
