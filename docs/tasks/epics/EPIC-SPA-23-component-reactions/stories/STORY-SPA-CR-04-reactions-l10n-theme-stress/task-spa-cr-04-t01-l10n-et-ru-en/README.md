# SPA-CR-04-T01 — ET/RU/EN on lab reactions surfaces

**Status:** Done
**Story:** [`../STORY-SPA-CR-04-reactions-l10n-theme-stress.md`](../STORY-SPA-CR-04-reactions-l10n-theme-stress.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-04-reactions-l10n-theme-stress.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-04-reactions-l10n-theme-stress.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** true
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-14T09:58:29Z`
**Package:** `pkg-000140`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png)

## Purpose
Prove strip + picker + lab chrome under ET/RU/EN; reuse Present keys; wrap long ET/RU.

## Arch context
- Code home: `src/features/reactions-mount/` (EPIC-23 lock).
- Data plane: reuse `ThreadsSocialClient` / knobs / `reactions.v1` catalog — PRODUCT-BRIEF · CR-api.
- Lab host `#/lab/reactions` (pattern `#/lab/feed`); production next-feed cutover OOS unless operator expands.
- M155 people UI OOS — no implement.

## Implement notes
- Touch: lab surfaces + i18n keys from CR-01/02/03
- Follow backlog FR/AC for CR-04; cite CR-icon / CR-api refs.
- OOS: invent HTTP; people sheets; Gap-8 SVG generate (emoji interim OK per CR-icon).

## Constraints
- No new SocialClient / invent `/threads/*` paths or fields.
- No M155 people UI.
- No mandatory `#/next/feed` cutover in this epic.
- No DS amend / fifth strip between media and actions.
- Hopeful/amused not selectable.
- Lab-first; FixtureAdapter default; LiveAdapter = thin wrap of `ThreadsSocialClient` only.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for CR-04
- [ ] No second HTTP client; no invent paths/fields
- [ ] M155 people not implemented
- [ ] Icons from CR-icon (Reuse `/icons/next-feed/reactions/…` or Gap emoji interim)

## Where to change
lab surfaces + i18n keys from CR-01/02/03

## Verification
```bash
rg -n "reactions\.|threadsFeed.reactions" spa-app/src/i18n | head
```
