# SPA-CR-10-T03 — Dismiss + z-index on portal

**Status:** Done  
**Story:** [`../STORY-SPA-CR-10-picker-portal-escape.md`](../STORY-SPA-CR-10-picker-portal-escape.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-15T19:54:49Z`  
**Package:** `pkg-000146`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-lab-feed-composition-2026-10-15.md) §3.3

## Purpose
FR-10.4 / 10.5: CR-05 outside/Escape/icon-close on portaled `rootRef`; z-index above feed chrome; CR-06 hug-width / hint footer intent held.

## Code Facts (verified at scaffold)
- CR-05 dismiss paths Present on in-tree picker
- Portal will move host → listeners must target portaled root

## Implement notes
- Keep icon-only close · Escape · outside click
- z-index above feed card / stress chrome
- Do not regress CR-06 capacity header / hint footer

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- Forbidden primary: remove card `overflow: hidden`

## AC / DoD
- [x] Outside / Escape / icon-close dismiss on portal host
- [x] z-index above feed chrome
- [x] CR-06 layout intent unchanged

## Where to change
`ReactionPicker.jsx` (+ CSS z-index if needed)

## Verification
```bash
rg -n "Escape|pointerdown|rm-picker-close|z-index" spa-app/src/features/reactions-mount/picker/ReactionPicker.jsx spa-app/src/features/reactions-mount/picker/ReactionPicker.css
```
