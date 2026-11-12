# SPA-CR-02-T04 — Save-error restore previous selection

**Status:** Done
**Story:** [`../STORY-SPA-CR-02-reaction-picker.md`](../STORY-SPA-CR-02-reaction-picker.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-02-reaction-picker.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-02-reaction-picker.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-14T09:58:29Z`
**Package:** `pkg-000138`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)

## Purpose
On save error restore previous `selected[]` — no silent empty (AC-24-04).

## Arch context
- Code home: `src/features/reactions-mount/` (EPIC-23 lock).
- Data plane: reuse `ThreadsSocialClient` / knobs / `reactions.v1` catalog — PRODUCT-BRIEF · CR-api.
- Lab host `#/lab/reactions` (pattern `#/lab/feed`); production next-feed cutover OOS unless operator expands.
- M155 people UI OOS — no implement.

## Implement notes
- Touch: `src/features/reactions-mount/` save/error path · adapter callbacks
- Follow backlog FR/AC for CR-02; cite CR-icon / CR-api refs.
- OOS: invent HTTP; people sheets; Gap-8 SVG generate (emoji interim OK per CR-icon).

## Constraints
- No new SocialClient / invent `/threads/*` paths or fields.
- No M155 people UI.
- No mandatory `#/next/feed` cutover in this epic.
- No DS amend / fifth strip between media and actions.
- Hopeful/amused not selectable.
- Lab-first; FixtureAdapter default; LiveAdapter = thin wrap of `ThreadsSocialClient` only.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for CR-02
- [ ] No second HTTP client; no invent paths/fields
- [ ] M155 people not implemented
- [ ] Icons from CR-icon (Reuse `/icons/next-feed/reactions/…` or Gap emoji interim)

## Where to change
`src/features/reactions-mount/` save/error path · adapter callbacks

## Verification
```bash
rg -n "restore|rollback|saveError|previous" spa-app/src/features/reactions-mount || true
```
