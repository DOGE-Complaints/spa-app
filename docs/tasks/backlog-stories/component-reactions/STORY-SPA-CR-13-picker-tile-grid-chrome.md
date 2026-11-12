# STORY-SPA-CR-13 — Picker tile grid + footer chrome (M154 B/C)

## Meta

- **Key:** `STORY-SPA-CR-13-picker-tile-grid-chrome`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 structure Done · gate **BLOCK** · `pkg-000149` · `2026-10-16T10:53:17Z` · **tip**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-12](STORY-SPA-CR-12-react-always-aggregate-row.md) · CR-02/06 · CR-10 portal
- **Blocks:** CR-14 (soft) · CR-15
- **UX mirror:** [OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4
- **Code home:** `ReactionPicker` · `ReactionPickerOption` · `ReactionPickerLayerGroup` · CSS

## Зачем

Заменить вертикальный список опций на **горизонтальную сетку плиток** (icon + title + description) и добавить footer **Cancel / Add reactions** (mobile **Done**).

## UX SSOT

- M154 panels B/C/D · keep capacity XOR · root no Moderation  
- Portal fixed popover (CR-10) · sheet for narrow  
- Descriptions: catalog / L10N keys (Present or add keys — no invent HTTP)

## FR

- **FR-CR-13.1** Within each layer, options render as **tile grid** (not single-column list rows).  
- **FR-CR-13.2** Tile = icon + bold label + short description.  
- **FR-CR-13.3** Selected tile: soft bg + border + check badge.  
- **FR-CR-13.4** Header: title + capacity subtitle + icon-only close.  
- **FR-CR-13.5** Footer desktop: «N of 3» + Cancel + Add reactions; mobile/sheet: Done.  
- **FR-CR-13.6** Cancel/Done/Add close or commit per Present save semantics (no invent API).  
- **FR-CR-13.7** CR-10 portal positioning retained for popover.  

## Вне scope

Mark accent token map details → CR-14 · strip zones → CR-11/12 · M155 · invent HTTP  

## Acceptance Criteria

- [x] Desktop picker shows horizontal tiles per group  
- [x] Footer Cancel + Add reactions Present on popover  
- [x] Sheet uses Done  
- [x] Selected tile visual matches M154 tone  
- [x] Vitest: grid structure · footer testids · root no moderation  
- [x] Verify: `#/lab/reactions` + `#/lab/feed`  

## Technical subtasks

> P1.3 activated `2026-10-16T10:47:24Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-13](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-13-picker-tile-grid-chrome/STORY-SPA-CR-13-picker-tile-grid-chrome.md) · `pkg-000149`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-13-t01-option-tile-layout` | Done | Refactor option + layer CSS to tile grid; description node | `ReactionPickerOption.*` · `ReactionPickerLayerGroup.*` | 13.1–13.3 |
| `task-spa-cr-13-t02-header-footer-chrome` | Done | Title/subtitle; footer Cancel/Add/Done + capacity line | `ReactionPicker.jsx` + `.css` · L10N keys | 13.4–13.6 |
| `task-spa-cr-13-t03-portal-regression` | Done | Ensure tile/footer still portaled; dismiss intact | `ReactionPicker.jsx` · cr10 tests | 13.7 |
| `task-spa-cr-13-t04-vitest-picker-tiles` | Done | Structure + footer + selected state assertions | `reactionsMount.*.test.jsx` | AC |

### Constraints (all tasks)

- No invent HTTP / M155 / Lucide  
- No remove portal (CR-10)  
- Descriptions from catalog/L10N — no hard-coded EN-only if keys Present  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

Picker chrome matches M154 B/C structure; ready for accent tokens (CR-14).
