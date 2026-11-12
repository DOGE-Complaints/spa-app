# SPA-NF-VL-01-T03 — Semantics seam (formatters without classic chrome)

**Status:** Done · P3 (`2026-10-12T12:38:32Z`) (`2026-10-12T12:26:57Z`)
**Story:** [`../STORY-SPA-NF-VL-01-issue-identity-plane.md`](../STORY-SPA-NF-VL-01-issue-identity-plane.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-01-issue-identity-plane.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-01-issue-identity-plane.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**extends mockup:** [`../task-spa-nf-vl-01-t02-ds-identity-modules/README.md`](../task-spa-nf-vl-01-t02-ds-identity-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T12:26:57Z`
**Package:** `pkg-000115`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §5
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Semantics seam (formatters without classic chrome)

## Arch anchors
- [02 DS surface map → identity/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-01…12 Related only — **do not reopen**.
- Pure helpers local or features/feed/semantics/; ban classic IssueCard imports on Done path.

## Constraints
- No invent icons / SVG masters / gateway or threads endpoints or fields.
- No mutate `#/board` identity chrome.
- No invent fake `ISSUE UV-*` / OPEN enum — Closed honesty only.
- M155 people OOS · shell OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-01
- [x] Anti-mixing: unre-skinned classic header ≠ Done
- [x] `#/board` not regressed
- [x] No invent icons/API

## Implement notes

formatIssueDate + formatGeoLabel in features/feed/semantics/; no classic chrome import.

**Closed:** `2026-10-12T12:38:32Z`
