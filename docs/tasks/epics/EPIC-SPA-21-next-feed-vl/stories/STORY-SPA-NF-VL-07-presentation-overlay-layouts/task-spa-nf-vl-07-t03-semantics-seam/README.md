# SPA-NF-VL-07-T03 — Semantics seam — Closed getIssue / navigation without classic modal UI

**Status:** Done · P3 (`2026-10-12T15:28:13Z`)
**Story:** [`../STORY-SPA-NF-VL-07-presentation-overlay-layouts.md`](../STORY-SPA-NF-VL-07-presentation-overlay-layouts.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-vl-07-t02-ds-presentation-modules/README.md`](../task-spa-nf-vl-07-t02-ds-presentation-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T15:23:50Z`
**Package:** `pkg-000121`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)
**@mockup-secondary:** [`../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md)
**@mockup-secondary-png:** [`../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §2 IssuePresentationLayout / OverlayLayout / OverlayHost / KeyboardComposerLayout
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Semantics seam — Closed getIssue / navigation without classic modal UI

## Arch anchors
- [02 DS surface map → presentation/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-06 Done Related only.
- VL-06 composer Related for KeyboardComposerLayout coord.
- Keep Closed issueService.getIssue; move shared helpers to semantics/ if needed; no invent issue HTTP; presentation modules do not import classic board modal chrome.

## Constraints
- No invent routes / mounts API / issue HTTP.
- No mutate `#/board` mounts.
- Closed getIssue retained.
- Shell chrome OOS.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for VL-07
- [ ] Anti-mixing: ad-hoc CSS-only ≠ Done without named layout contract
- [ ] `#/board` not regressed
- [ ] No invent routes

## Where to change
- `spa-app/src/features/feed/FeedIssueMount.jsx`
- Target `spa-app/src/features/feed/presentation/`
- Semantics: getIssue helpers may move to `features/feed/semantics/`

## Verification
- Grep ad-hoc mount Done claims under `features/feed` after wire
- local-five: modal / sheet / route + Escape · board smoke
- vitest prior waves still meaningful; add VL-07 surface tests at implement

## Evidence

- Done `2026-10-12T15:28:13Z` · Closed issueService.getIssue retained in FeedIssueMount; presentation modules import no classic board modal chrome.
