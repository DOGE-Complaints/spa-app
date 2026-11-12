# SPA-CR-13-T01 — Option tile grid layout

**Status:** Done  
**Story:** [`../STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md)  
**ui_scope:** `reactions-mount` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Completed:** `2026-10-16T10:53:17Z`  
**Scaffolded:** `2026-10-16T10:47:24Z`  
**Package:** `pkg-000149`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.3

## Purpose
FR-13.1–13.3: within each layer, options as **tile grid** (not single-column list); tile = icon + bold label + short description; selected = soft bg + border + check badge.

## Code Facts (verified at scaffold)
- AS-IS: vertical list option rows in `ReactionPickerOption` / layer group CSS
- Capacity XOR · root no Moderation Present (CR-02)
- Mark accents detail → CR-14 (structure only here)

## Implement notes
- Horizontal CSS grid per layer group
- Description from catalog / L10N keys (no invent HTTP · no hard-coded EN-only if keys Present)
- OOS: footer chrome (T02) · portal regression (T03) · Lucide

## Constraints
- Partial visual = BLOCK · no invent OP PASS
- No invent HTTP · no M155 · no Lucide
- Keep portal CR-10

## AC / DoD
- [x] Layer options render as tile grid
- [x] Tile shows icon + label + description
- [x] Selected tile soft bg + border + check badge Present

## Where to change
`spa-app/src/features/reactions-mount/picker/ReactionPickerOption.*` · `ReactionPickerLayerGroup.*` · related CSS

## Verification
```bash
rg -n "tile|grid|description|selected" spa-app/src/features/reactions-mount/picker/
```
