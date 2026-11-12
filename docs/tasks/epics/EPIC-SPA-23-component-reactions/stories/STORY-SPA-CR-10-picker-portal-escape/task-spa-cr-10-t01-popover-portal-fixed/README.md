# SPA-CR-10-T01 — Popover portal + fixed position

**Status:** Done  
**Story:** [`../STORY-SPA-CR-10-picker-portal-escape.md`](../STORY-SPA-CR-10-picker-portal-escape.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:54:49Z`  
**Package:** `pkg-000146`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.3

## Purpose
FR-10.1 / 10.2 / 10.6: desktop popover open → `createPortal` → `document.body`; CSS `--popover` → `position: fixed` + coords; sheet path untouched.

## Code Facts (verified at scaffold)
- Gap: `createPortal` Absent in `spa-app/src`
- `ReactionPicker.css` `--popover`: `position: absolute`
- Card `FeedPostCard.css` `overflow: hidden` — keep (forbidden primary fix)

## Implement notes
- Portal only desktop popover mode; narrow sheet may stay in-flow
- Coords wired from T02 measure
- OOS: remove card overflow · theme · strip zones

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Forbidden primary: change `FeedPostCard` `overflow: hidden`

## AC / DoD
- [x] Desktop open mounts under `document.body`
- [x] `--popover` uses `position: fixed` (or equivalent)
- [x] Sheet / narrow path not broken

## Where to change
`spa-app/src/features/reactions-mount/picker/ReactionPicker.jsx` · `ReactionPicker.css`

## Verification
```bash
rg -n "createPortal|position:\\s*fixed|--popover" spa-app/src/features/reactions-mount/picker/ReactionPicker.jsx spa-app/src/features/reactions-mount/picker/ReactionPicker.css
```
