# SPA-CR-06-T01 — Icon-only close chrome

**Status:** Done
**Story:** [`../STORY-SPA-CR-06-picker-chrome-layout.md`](../STORY-SPA-CR-06-picker-chrome-layout.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** true
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-15T10:45:11Z`
**Package:** `pkg-000142`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.3

## Purpose
FR-06.1 / FR-06.4: capacity left in header; dismiss = icon-only NS close top-right; no visible «Close» label (retain/assert CR-05).

## Arch context
- Code: `ReactionPicker.jsx` · close control `rm-picker-close`
- Icon: `/icons/next-shell/actions/close.svg` · a11y via `threadsFeed.reactions.close`
- Lab: `#/lab/reactions`

## Implement notes
- Touch: picker header chrome / CSS if residual labeled Close remains
- Keep CR-02 capacity / XOR / layers AC
- OOS: invent close SVG · invent L10N

## Constraints
- No invent HTTP · no M155 · no `#/next/feed` cutover
- Partial visual = BLOCK · no invent OP PASS

## AC / DoD
- [x] No labeled Close button; icon-only dismiss Present
- [x] Capacity line remains header-left; dismiss top-right
- [x] CR-02 capacity/XOR still hold

## Where to change
`spa-app/src/features/reactions-mount/picker/ReactionPicker.jsx` · `ReactionPicker.css`

## Verification
```bash
rg -n "rm-picker-close|threadsFeed\.reactions\.close|close\.svg" spa-app/src/features/reactions-mount/picker
```
