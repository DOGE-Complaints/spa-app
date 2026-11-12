# SPA-CR-05-T03 — Outside dismiss + icon-only close + Escape

**Status:** Done
**Story:** [`../STORY-SPA-CR-05-strip-open-dismiss.md`](../STORY-SPA-CR-05-strip-open-dismiss.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-15T10:10:34Z`
**Package:** `pkg-000141`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.2

## Purpose
FR-05.4 / FR-05.5 / FR-05.6: dismiss via pointer/click outside `rm-reaction-picker`; light icon-only X top-right (`/icons/next-shell/actions/close.svg`); Escape retained.

## Arch context
- Picker: `ReactionPicker` · `data-testid="rm-reaction-picker"`
- Close icon SSOT: CR-icon logical id `close` · NS Runtime URL Present
- a11y name: `t('threadsFeed.reactions.close')` or equivalent — **no** visible «Close» label
- Hug-width / hint footer → CR-06 (OOS here); icon-only close chrome starts here per mirror §3.2

## Implement notes
- Touch: `ReactionPicker.jsx` · mount outside listener (pointerdown/click)
- Replace heavy text Close with icon-only NS close
- Keep Escape handler Present
- OOS: invent new close SVG · CR-06 hint footer / hug-width

## Constraints
- No invent HTTP · no M155 · no `#/next/feed` cutover
- Partial visual = BLOCK · no invent OP PASS

## AC / DoD
- [x] Outside click closes picker
- [x] Top-right icon-only close uses NS close SVG
- [x] Escape closes
- [x] No visible «Close» label beside icon

## Where to change
`ReactionPicker.jsx` · picker CSS · optional mount outside listener in `ReactionsMount.jsx`

## Verification
```bash
rg -n "rm-reaction-picker|close\.svg|threadsFeed\.reactions\.close|Escape" spa-app/src/features/reactions-mount
```
