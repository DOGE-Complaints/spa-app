# SPA-CR-06-T03 — Hug-width desktop popover

**Status:** Done
**Story:** [`../STORY-SPA-CR-06-picker-chrome-layout.md`](../STORY-SPA-CR-06-picker-chrome-layout.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-15T10:45:11Z`
**Package:** `pkg-000142`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.3

## Purpose
FR-06.3 / FR-06.5: desktop `rm-picker--popover` width hugs longest option label + symmetric horizontal padding; no large empty gutter. Mobile sheet keeps full-bleed / sheet grammar.

## Arch context
- Classes: `rm-picker--popover` · `rm-picker--sheet` · option rows
- Anchor: `reactions-mount__anchor` positioning
- Lab scenes: comment-desktop / mobile-sheet

## Implement notes
- Touch: `ReactionPicker.css` · option row width · remove fixed over-wide min-width / left-right stretch if Present
- Popover: `width: max-content` / fit-content patterns OK; avoid inventing new tokens
- Sheet: do not break mobile AC
- OOS: invent HTTP · CR-07

## Constraints
- Partial visual = BLOCK · no invent OP PASS · no M155

## AC / DoD
- [x] Popover content-hug (visual + CSS)
- [x] No large empty gutter right of labels
- [x] Sheet full-bleed retained

## Where to change
`ReactionPicker.css` · option CSS · maybe anchor layout in `ReactionsMount.css`

## Verification
```bash
rg -n "rm-picker--popover|min-width|max-content|fit-content|left:\s*0;\s*right:\s*0" spa-app/src/features/reactions-mount
```
