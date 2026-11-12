# STORY-SPA-CR-14 — Mark accent tokens (no colored SVG generate)

## Meta

- **Key:** `STORY-SPA-CR-14-mark-accent-tokens`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 structure Done · gate **BLOCK** · `pkg-000150` · `2026-10-16T11:04:23Z` · **tip**
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-13](STORY-SPA-CR-13-picker-tile-grid-chrome.md) · [CR-icon](STORY-SPA-CR-icon-assets.md) · CR-08 theme
- **Blocks:** CR-15
- **UX mirror:** [OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §4.5
- **Code home:** picker/summary CSS · `CrReactionIcon` · optional mark→token map module

## Зачем

Цветные плитки M154 без генерации multicolor SVG: accent через **CSS** на `currentColor` mask ([token map](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md)).

## Locked approach

- Keep 13 mark SVG as stroke/`currentColor`.  
- Per `data-reaction-id` (or class) set `color` + soft background from semantic / catalog aliases.  
- Theme via `data-theme` (CR-08).  
- **Forbidden:** bake brand hex into SVG files; invent second icon pack.

## FR

- **FR-CR-14.1** Each selectable mark in picker tile uses a distinct accent color token (readable in light+dark).  
- **FR-CR-14.2** Aggregate / summary marks use the same accent map.  
- **FR-CR-14.3** Selected tile soft bg derives from mark accent (or shared selection token).  
- **FR-CR-14.4** No new SVG files for color; Gap v2 chrome glyphs unchanged by this story.  

## Вне scope

Generate `/icons/next-feed/reactions/*-color.svg` · M155 · invent HTTP · strip zone chrome (CR-11)  

## Acceptance Criteria

- [x] Picker tiles show per-mark color (not all monochrome grey)  
- [x] Dark theme still readable  
- [x] Summary marks tinted consistently  
- [x] Vitest: `data-reaction-id` + computed style or class map Present  
- [x] Verify labs under light/dark stress  

## Technical subtasks

> P1.3 activated `2026-10-16T11:00:46Z` · Skill: `react-expert` · pipeline [STORY-SPA-CR-14](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-14-mark-accent-tokens/STORY-SPA-CR-14-mark-accent-tokens.md) · `pkg-000150`

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-14-t01-mark-accent-map` | Done | Define mark-id → CSS variable / token alias (reuse Present design tokens if any) | new small map next to `crReactionIcons` or CSS `:root` | 14.1 |
| `task-spa-cr-14-t02-picker-tile-color` | Done | Apply accent + soft bg on option tiles | `ReactionPickerOption.css` | 14.1 · 14.3 |
| `task-spa-cr-14-t03-summary-mark-color` | Done | Apply same accents on aggregate marks | `ReactionSummaryStrip.css` | 14.2 |
| `task-spa-cr-14-t04-vitest-accents` | Done | Assert class/attr map for sample marks under light/dark | tests | AC |

### Constraints (all tasks)

- No multicolor SVG generate  
- No invent HTTP / M155  
- Prefer existing CSS variables in `tokens.css` over hardcoded hex where Present  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04`

## DoD

M154 “цветные иконки” достигнуты токенами; OP icon dialog only for Gap v2 chrome glyphs.
