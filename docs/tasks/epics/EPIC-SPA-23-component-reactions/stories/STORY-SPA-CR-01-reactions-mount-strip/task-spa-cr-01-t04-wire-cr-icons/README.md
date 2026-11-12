# SPA-CR-01-T04 — Wire CR-icon mark + chrome Runtime URLs

**Status:** Done
**Story:** [`../STORY-SPA-CR-01-reactions-mount-strip.md`](../STORY-SPA-CR-01-reactions-mount-strip.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-14T09:58:29Z`
**Package:** `pkg-000137`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)

## Purpose
Wire all selectable marks to `/icons/next-feed/reactions/<kebab>.svg` per [CR-icon §Reuse](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md) (13 Present, Gap-8 promoted). Chrome: NF actions/status + NS close. No emoji interim.

## Arch context
- Code home: `src/features/reactions-mount/` (EPIC-23 lock).
- Data plane: reuse `ThreadsSocialClient` / knobs / `reactions.v1` catalog — PRODUCT-BRIEF · CR-api.
- Lab host `#/lab/reactions` (pattern `#/lab/feed`); production next-feed cutover OOS unless operator expands.
- M155 people UI OOS — no implement.

## Implement notes
- Touch: `src/features/reactions-mount/` icon mapping · cite CR-icon catalog Runtime URLs
- Follow backlog FR/AC for CR-01; cite CR-icon / CR-api refs.
- OOS: invent HTTP; people sheets; invent filenames; Lucide `ic-*`.

## Constraints
- No new SocialClient / invent `/threads/*` paths or fields.
- No M155 people UI.
- No mandatory `#/next/feed` cutover in this epic.
- No DS amend / fifth strip between media and actions.
- Hopeful/amused not selectable.
- Lab-first; FixtureAdapter default; LiveAdapter = thin wrap of `ThreadsSocialClient` only.
- Do not copy SVG into `public/icons/component-reactions/` — reuse NF URLs.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for CR-01
- [x] No second HTTP client; no invent paths/fields
- [x] M155 people not implemented
- [x] Icons from CR-icon §Reuse Runtime URLs (`/icons/next-feed/reactions/…` + chrome); no emoji interim for selectable marks

## Where to change
`src/features/reactions-mount/` icon mapping · cite CR-icon catalog

## Verification
```bash
ls spa-app/public/icons/next-feed/reactions/*.svg | wc -l   # expect 13
rg -n "/icons/next-feed/reactions" spa-app/src/features/reactions-mount || true
```
