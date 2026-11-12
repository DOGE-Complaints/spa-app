# SPA-CR-01-T01 — Scaffold `features/reactions-mount/` + ReactionSummaryStrip states

**Status:** Done
**Story:** [`../STORY-SPA-CR-01-reactions-mount-strip.md`](../STORY-SPA-CR-01-reactions-mount-strip.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** true
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-14T09:58:29Z`
**Package:** `pkg-000137`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)

## Purpose
Create greenfield package and strip states: empty (no fake zeros) / loading / populated / unavailable (+ retry) scoped to reaction slot (AC-24-01).

## Arch context
- Code home: `src/features/reactions-mount/` (EPIC-23 lock).
- Data plane: reuse `ThreadsSocialClient` / knobs / `reactions.v1` catalog — PRODUCT-BRIEF · CR-api.
- Lab host `#/lab/reactions` (pattern `#/lab/feed`); production next-feed cutover OOS unless operator expands.
- M155 people UI OOS — no implement.

## Implement notes
- Touch: `src/features/reactions-mount/` (new) — strip presentation modules
- Follow backlog FR/AC for CR-01; cite CR-icon / CR-api refs.
- OOS: invent HTTP; people sheets; Gap-8 SVG generate (emoji interim OK per CR-icon).

## Constraints
- No new SocialClient / invent `/threads/*` paths or fields.
- No M155 people UI.
- No mandatory `#/next/feed` cutover in this epic.
- No DS amend / fifth strip between media and actions.
- Hopeful/amused not selectable.
- Lab-first; FixtureAdapter default; LiveAdapter = thin wrap of `ThreadsSocialClient` only.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for CR-01
- [x] No second HTTP client; no invent paths/fields
- [x] M155 people not implemented
- [x] Icons from CR-icon (Reuse `/icons/next-feed/reactions/…` or Gap emoji interim)

## Where to change
`src/features/reactions-mount/` (new) — strip presentation modules

## Verification
```bash
rg -n "ReactionSummaryStrip|reactions-mount" spa-app/src/features/reactions-mount || true
```
