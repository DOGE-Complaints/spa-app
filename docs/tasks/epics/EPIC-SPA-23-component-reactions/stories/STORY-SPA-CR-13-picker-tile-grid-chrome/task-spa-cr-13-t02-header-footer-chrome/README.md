# SPA-CR-13-T02 — Header + footer Cancel/Add/Done

**Status:** Done  
**Story:** [`../STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
**ui_scope:** `reactions-mount` · **mixed**  
**Skill declared:** `react-expert`  
**Completed:** `2026-10-16T10:53:17Z`  
**Scaffolded:** `2026-10-16T10:47:24Z`  
**Package:** `pkg-000149`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.2 · §4.4

## Purpose
FR-13.4–13.6: header title + capacity subtitle + icon-only close; footer desktop «N of 3» + Cancel + Add reactions; sheet/mobile Done; close/commit per Present save semantics.

## Code Facts (verified at scaffold)
- AS-IS: capacity + icon-only X Present · **no** Cancel/Add footer (mirror gap)
- Save-error banner may already Exist (retain)
- L10N keys: add if Absent — no invent HTTP

## Implement notes
- Popover footer: Cancel + Add reactions (yellow primary token)
- Sheet footer: Done
- Wire Cancel/Done/Add to existing close/commit paths — no invent API
- OOS: tile layout (T01) · accents CR-14

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No invent HTTP · no M155 · no Lucide
- Keep portal CR-10

## AC / DoD
- [x] Header title + capacity subtitle + icon-only close
- [x] Popover footer Cancel + Add reactions + N of 3
- [x] Sheet footer Done Present

## Where to change
`ReactionPicker.jsx` · `.css` · `threadsFeedDictionary` / L10N keys

## Verification
```bash
rg -n "Cancel|Add reactions|Done|footer|rm-picker" spa-app/src/features/reactions-mount/picker/ spa-app/src/i18n/
```
