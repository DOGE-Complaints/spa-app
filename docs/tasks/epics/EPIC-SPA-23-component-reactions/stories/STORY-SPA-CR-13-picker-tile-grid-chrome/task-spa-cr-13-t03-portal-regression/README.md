# SPA-CR-13-T03 — Portal + dismiss regression

**Status:** Done  
**Story:** [`../STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
**ui_scope:** `reactions-mount` · **mixed**  
**Skill declared:** `react-expert`  
**Completed:** `2026-10-16T10:53:17Z`  
**Scaffolded:** `2026-10-16T10:47:24Z`  
**Package:** `pkg-000149`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.1

## Purpose
FR-13.7: after tile/footer chrome, desktop popover still `createPortal`→body + fixed anchor (CR-10); sheet inline; outside/Escape/X dismiss intact.

## Code Facts (verified at scaffold)
- CR-10: `data-rm-portal=body` · fixed from zone-1 · card overflow kept
- Dismiss CR-05/CR-10 Present

## Implement notes
- Re-verify portal host + measurePopoverPosition with taller tile chrome
- Do **not** remove portal as clip fix
- OOS: invent HTTP · M155

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No remove portal (CR-10)
- No invent HTTP / Lucide

## AC / DoD
- [x] Popover still portals to body with fixed position
- [x] Sheet remains inline
- [x] Outside / Escape / X dismiss still close picker

## Where to change
`ReactionPicker.jsx` · `ReactionsMount.jsx` (only if measure needs nudge) · cr10 tests

## Verification
```bash
rg -n "createPortal|data-rm-portal|measurePopoverPosition" spa-app/src/features/reactions-mount/
```
