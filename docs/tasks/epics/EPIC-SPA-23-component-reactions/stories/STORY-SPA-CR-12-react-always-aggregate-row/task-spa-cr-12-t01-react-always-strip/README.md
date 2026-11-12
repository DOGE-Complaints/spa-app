# SPA-CR-12-T01 — React-always on strip

**Status:** Done · `2026-10-16T10:42:46Z`  
**Story:** [`../STORY-SPA-CR-12-react-always-aggregate-row.md`](../STORY-SPA-CR-12-react-always-aggregate-row.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md)  
**ui_scope:** `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:37:39Z`  
**Package:** `pkg-000148`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.2

## Purpose
FR-12.1–12.2: React zone always Present (empty and populated); click opens `ReactionPicker`. Supersedes CR-05 hide-React **for strip chrome**.

## Code Facts (verified at scaffold)
- AS-IS: `ReactionSummaryStrip` hides React when populated (`isEmpty ? react button : null`)
- CR-11 four-zone strip Present · `reactSlot` hosts mount
- Dismiss CR-05/CR-10 keep outside this task

## Implement notes
- Keep React affordance when `stripStatus` populated / selected marks Present
- Strip React → `onOpen` only (aggregate moves to T02)
- OOS: aggregate DOM placement (T02) · Reactions zone wire (T03)

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No dual React under strip · keep portal dismiss
- No M155 · no invent HTTP · no `#/next/feed`

## AC / DoD
- [x] Populated: React control still visible in strip
- [x] Empty + populated: React opens picker
- [x] No reintroduce under-strip root React mount

## Where to change
`spa-app/src/features/reactions-mount/ReactionSummaryStrip.jsx` · `.css` · optional `ReactionsMount.jsx` wire

## Verification
```bash
rg -n "reaction-summary-react|isEmpty|populated" spa-app/src/features/reactions-mount/ReactionSummaryStrip.jsx
```
