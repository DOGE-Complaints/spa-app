# SPA-CR-06-T02 — Root moderation hint footer

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
FR-06.2: when `target=thread-root`, render `rootModerationHint` **after** layer groups (footer), not under header. Keep `data-testid="rm-picker-root-scope-hint"`. Copy key Present — position only.

## Arch context
- Key: `threadsFeed.reactions.rootModerationHint`
- Comment target: no root hint
- Sheet + popover: footer applies on root

## Implement notes
- Touch: `ReactionPicker.jsx` DOM order · optional footer CSS
- Do not invent new L10N keys
- OOS: CR-07 cutover · M155

## Constraints
- No invent HTTP · Partial visual = BLOCK · no invent OP PASS

## AC / DoD
- [x] Root hint below layers (DOM order after groups)
- [x] testid `rm-picker-root-scope-hint` still Present
- [x] Comment picker has no root hint

## Where to change
`ReactionPicker.jsx` · `ReactionPicker.css`

## Verification
```bash
rg -n "rm-picker-root-scope-hint|rootModerationHint" spa-app/src/features/reactions-mount/picker
```
