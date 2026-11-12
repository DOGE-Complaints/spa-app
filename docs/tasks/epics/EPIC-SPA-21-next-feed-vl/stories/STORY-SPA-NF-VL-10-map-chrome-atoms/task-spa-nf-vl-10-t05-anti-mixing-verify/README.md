# SPA-NF-VL-10-T05 — Anti-mixing + live verify · story gate home

**Status:** Done · P3 (`2026-10-12T16:14:56Z`)
**Story:** [`../STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../STORY-SPA-NF-VL-10-map-chrome-atoms.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-10-map-chrome-atoms.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**extends mockup:** [`../task-spa-nf-vl-10-t02-ds-map-modules/README.md`](../task-spa-nf-vl-10-t02-ds-map-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T16:03:53Z`
**Package:** `pkg-000124`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §9 map chrome
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Anti-mixing + live verify · story gate home

## Arch anchors
- [02 DS surface map → map/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named map chrome on `#/next/feed*` map view (AD-VL-01/02).
- Classic `#/board` map chrome **OOS mutate**.
- VL-01…09 Done soft Related — board layouts/heading live; map concern = `features/feed/map/`.
- local-five M151; required notice/preview Present; classic #/board map smoke unchanged (AD-VL-01/02).

## Constraints
- No invent geo fields / map API / search HTTP.
- No mutate classic `#/board` map.
- Same result set as List (FR-VL-10.4).
- Do not invent pin SVG assets.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-10
- [x] Anti-mixing: classic map chrome ≠ Done without DS notice/preview when required
- [x] `#/board` map not regressed
- [x] No invent map API

## Where to change
- `spa-app/src/features/feed/FeedMapArea.jsx`
- Target `spa-app/src/features/feed/map/`
- May reuse `map/issueGeo.js` / `listPinCapableIssues`

## Verification
- Grep `MapSubsetNotice` / `MapIssuePreview` / `feed-map-partial` after wire
- local-five: map toggle · partial · pin preview · board smoke
- vitest prior waves still meaningful; add VL-10 surface tests at implement

## Story gate
Acceptance verification file at implement: `acceptance-verification-spa-nf-vl-10.md` (this folder).
