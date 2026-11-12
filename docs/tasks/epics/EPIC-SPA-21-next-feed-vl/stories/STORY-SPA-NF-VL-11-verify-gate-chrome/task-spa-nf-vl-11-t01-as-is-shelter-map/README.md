# SPA-NF-VL-11-T01 — As-is / shelter map (classic gate chrome reaches next via composer)

**Status:** Done · P3 (`2026-10-12T16:30:40Z`)
**Story:** [`../STORY-SPA-NF-VL-11-verify-gate-chrome.md`](../STORY-SPA-NF-VL-11-verify-gate-chrome.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-11-verify-gate-chrome.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-11-verify-gate-chrome.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T16:24:27Z`
**Package:** `pkg-000125`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §10 verify chrome
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
As-is / shelter map (classic gate chrome reaches next via composer)

## Arch anchors
- [02 DS surface map → verify/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named verify chrome on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` VerifyWriteGate chrome **OOS mutate**.
- VL-06 Done soft Related — composer slots host gate chrome.
- Cite threads/VerifyWriteGate + CommentComposer / verifyWriteGate.js; ban unre-skinned classic as next-feed Done.

## Constraints
- No invent verify / identity API fields.
- No mutate classic `#/board` gate chrome.
- No auto-send after verify return (FR-VL-11.2).
- Unknown deny ≠ false «unverified» (FR-VL-11.3).

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-11
- [x] Anti-mixing: unre-skinned classic gate ≠ next-feed Done
- [x] `#/board` gate not regressed
- [x] No invent verify API

## Where to change
- `spa-app/src/components/threads/VerifyWriteGate.jsx` (classic cite only)
- Target `spa-app/src/features/feed/verify/`
- Composer: `features/feed/composer/` VL-06 slots
- Policy: `verifyWriteGate.js` / semantics

## Verification
- Grep `VerifyWriteGate` / `VerifyReturnFeedback` / `WriteDeniedNotice` after wire
- local-five: unverified write · return feedback · board smoke
- vitest prior waves still meaningful; add VL-11 surface tests at implement
