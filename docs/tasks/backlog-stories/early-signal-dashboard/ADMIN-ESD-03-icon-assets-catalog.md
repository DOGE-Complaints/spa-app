# ADMIN-ESD-03 — Icon assets catalog (слой 4.2)

## Meta

- **Key:** `ADMIN-ESD-03-icon-assets-catalog`
- **Status:** Todo
- **Depends on:** mockup specs in `docs/UX/mockups/early-signal-dashboard/` (ADMIN-ESD-02)
- **Blocks:** ADMIN-ESD-05 (icon refs in stories)
- **Skill:** analysis + asset catalog (образец [`ADMIN-PH-03`](../public-home/ADMIN-PH-03-icon-assets-catalog.md))
- **Master index:** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md)
- **Deliverable (later):** `STORY-SPA-ES-icon-assets.md`

## Цель

Единый каталог иконок для Early Signal discovery blocks.

## Конвенции

| Param | Value |
|-------|-------|
| Directory | `spa-app/public/icons/early-signal-dashboard/` |
| Runtime | `/icons/early-signal-dashboard/ic-*.png` |
| Format | `ic-<kebab>.png`, PNG RGBA 256×256, ~15% padding |
| Style | thin stroke ~2px, Lucide-like; align PH civic palette |

## Reuse — дедуп по catalog docs

Сверить с: [STORY-SPA-PH-icon-assets.md](../public-home/STORY-SPA-PH-icon-assets.md) (esp. `ic-empty-board`), CAB / ID-12 catalogs via ICON-GENERATION-INDEX. Совпадение смысла → §Reuse; не дублировать PNG plan rows.

## Deliverable

1. `STORY-SPA-ES-icon-assets.md` — table + §Reuse
2. `public/icons/early-signal-dashboard/.gitkeep`
3. Row in ICON-GENERATION-INDEX
4. Link from package INDEX

## Acceptance

- [ ] Catalog covers Pulse / Emerging / Missing / Help / discovery empty-or-forming glyphs as needed
- [ ] Reuse marked vs PH empty-board where applicable
- [ ] No duplicate names vs plan-docs
- [ ] INDEX: ADMIN-ESD-03 → Done

## Как выполнять

«Выполни ADMIN-ESD-03 по мокапам early-signal-dashboard; дедуп против ICON-GENERATION-INDEX / PH catalog».
