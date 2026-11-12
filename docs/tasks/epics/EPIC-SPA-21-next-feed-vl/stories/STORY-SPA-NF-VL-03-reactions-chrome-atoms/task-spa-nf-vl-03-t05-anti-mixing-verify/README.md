# SPA-NF-VL-03-T05 — Anti-mixing + live verify (AD-VL-03 reactions Partial=block) · story gate home

**Status:** Done · P3 (`2026-10-12T14:24:43Z`) · P1.3 (`2026-10-12T14:08:24Z`)
**Story:** [`../STORY-SPA-NF-VL-03-reactions-chrome-atoms.md`](../STORY-SPA-NF-VL-03-reactions-chrome-atoms.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-03-reactions-chrome-atoms.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-03-reactions-chrome-atoms.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**extends mockup:** [`../task-spa-nf-vl-03-t02-ds-reactions-modules/README.md`](../task-spa-nf-vl-03-t02-ds-reactions-modules/README.md)
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T14:08:24Z`
**Package:** `pkg-000117`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §8 reactions atoms
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02** · **AD-VL-03**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Anti-mixing + live verify (AD-VL-03 reactions Partial=block) · story gate home

## Arch anchors
- [02 DS surface map → reactions/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named surfaces on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` chrome **out of mutate** scope.
- Sibling EPIC-SPA-20 NF-09 Done (reactions wrap) Related only — **do not reopen body**.
- local-five empty/open/capacity; Partial reactions skin ≠ Done; board smoke.

## Constraints
- No invent reaction ids / M155 people UI / SVG masters.
- No mutate `#/board` ReactionControls chrome.
- Closed reactions.v1 / PUT retained.
- Shell OOS · NF-09 body OOS.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for VL-03
- [x] Anti-mixing: unre-skinned ReactionControls ≠ Done on `#/next/feed*`
- [x] `#/board` not regressed
- [x] No invent reaction ids / M155

## Where to change
- `spa-app/src/features/feed/FeedReactionsStrip.jsx` (ReactionControls mount)
- Target `spa-app/src/features/feed/reactions/` (logical; name ≠ create until P3)
- Semantics: extract non-UI catalog/PUT to `features/feed/semantics/` (target)

## Verification
- Grep `ReactionControls` under `features/feed` after wire — Done path must not import classic as Done
- local-five: empty strip / open picker / capacity honesty · board smoke
- vitest nf09 still meaningful; add VL-03 surface tests at implement

## Story gate
Acceptance verification file at implement: `acceptance-verification-spa-nf-vl-03.md` (this folder).

## P3 Done notes (`2026-10-12T14:24:43Z`)
- Gate: [`acceptance-verification-spa-nf-vl-03.md`](./acceptance-verification-spa-nf-vl-03.md) **PASS**.
- Live full-cycle 01–05 · vitest nfvl03/nf09/nf05 PASS · board smoke no VL chrome.
