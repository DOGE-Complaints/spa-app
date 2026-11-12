# SPA-CR-05-T02 — Aggregate hover highlight + open picker

**Status:** Done
**Story:** [`../STORY-SPA-CR-05-strip-open-dismiss.md`](../STORY-SPA-CR-05-strip-open-dismiss.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-15T10:10:34Z`
**Package:** `pkg-000141`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.1

## Purpose
FR-05.3 / FR-05.7: populated aggregate — hover → highlight + open picker; click → open (touch/a11y). Primary job = open picker (people/M155 remain OOS; not only `onAggregateActivate`).

## Arch context
- Host: `ReactionsMount` · strip aggregate class `rm-summary-strip__aggregate`
- Highlight on hover / open state — no invent new mark set
- Lab verify `#/lab/reactions`

## Implement notes
- Touch: `ReactionsMount.jsx` · strip aggregate handlers · CSS highlight
- Wire aggregate → open picker (hover + click)
- Retain Escape / existing open state machine where possible
- OOS: M155 people sheet · CR-06 layout

## Constraints
- No invent HTTP · no M155 · no `#/next/feed` cutover
- Partial visual = BLOCK · no invent OP PASS

## AC / DoD
- [x] Aggregate hover highlights + opens picker
- [x] Aggregate click opens picker
- [x] React remains hidden when populated (T01)

## Where to change
`ReactionsMount.jsx` · `ReactionSummaryStrip.jsx` · strip CSS

## Verification
```bash
rg -n "onAggregateActivate|rm-summary-strip__aggregate|openPicker|setPickerOpen" spa-app/src/features/reactions-mount
```
