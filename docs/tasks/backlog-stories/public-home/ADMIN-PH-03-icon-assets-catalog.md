# ADMIN-PH-03 — Icon assets catalog (слой 4.2)

## Meta

- **Key:** `ADMIN-PH-03-icon-assets-catalog`
- **Status:** Done (2026-08-01)
- **Depends on:** mockup specs in [`docs/UX/mockups/home/`](../../../UX/mockups/home/README.md) (M129–M133)
- **Blocks:** ADMIN-PH-05 (icon refs in stories)
- **Skill:** analysis + asset catalog (образец cabinet)
- **Master index (все icon-plan docs):** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md)
- **Deliverable:** [`STORY-SPA-PH-icon-assets.md`](STORY-SPA-PH-icon-assets.md)

## Цель

Единый каталог иконок по **всем** итоговым артбордам PH — формат [`STORY-SPA-CAB-icon-assets.md`](../cabinet/STORY-SPA-CAB-icon-assets.md).

## Конвенции (зафиксировать в каталоге)

| Param | Value |
|-------|-------|
| Directory | `spa-app/public/icons/public-home/` |
| Runtime | `/icons/public-home/ic-*.png` |
| Format | `ic-<kebab>.png`, PNG RGBA 256×256, ~15% padding |
| Style | thin stroke ~2px, Lucide-like; `#f5c542` / `#f5f7fa` |

## Reuse — дедуп по документам-планам (не по диску PNG)

Перед добавлением NEW сверить **имя файла** и **смысл** с каталогами ниже. Совпадение → §Reuse + путь из того каталога; **не** генерировать повторно.

| # | Catalog (SSOT для дедупа) | Scope |
|---|---------------------------|--------|
| 1 | [STORY-SPA-ID-12-icon-assets.md](../identity-auth/STORY-SPA-ID-12-icon-assets.md) | M128 / `story-handoff/` |
| 2 | [STORY-SPA-CAB-icon-assets.md](../cabinet/STORY-SPA-CAB-icon-assets.md) | CAB / `user-cabinet/` |
| 3 | [EPIC-SPA-04-icon-assets.md](../icons/EPIC-SPA-04-icon-assets.md) | epic-04 identity / `identity/` |
| — | [STORY-SPA-CAB-07-cabinet-page-states.md](../cabinet/STORY-SPA-CAB-07-cabinet-page-states.md) | consumer: M22/M23 только reuse (своих NEW нет) — не добавлять дубликаты под PH |

Полный список plan-docs для генератора: [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md).

**Не** делать первичную сверку с `public/icons/*` на диске — каталоги могут опережать загрузку PNG. Logo/flags (`public/assets/DOGEstonia-logo-*`, `ET.svg`) — всегда reuse.

## Deliverable

1. [`STORY-SPA-PH-icon-assets.md`](STORY-SPA-PH-icon-assets.md) — таблица `# | смысл | mockup | файл | цвет | промпт` + **§Reuse** (ссылки на строки из каталогов 1–3)  
2. `public/icons/public-home/.gitkeep`  
3. Ссылка в [README.md](README.md) § Icon assets  
4. Строка PH catalog в [`ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) → Status Done

## Acceptance

- [x] Каталог покрывает header account, nav (если glyphs), feed empty/error, tutorial steps, footer (если icons)
- [x] Reuse помечен явно после сверки с ID-12 / CAB / EPIC-SPA-04 catalogs (не с диском)
- [x] Нет дубликатов имён/смысла против plan-docs выше
- [x] Derived-from-spec disclaimer (PNG артбордов M129–M133 pending)
- [x] INDEX: ADMIN-PH-03 → Done
- [x] ICON-GENERATION-INDEX обновлён

## Как выполнять

«Выполни ADMIN-PH-03 по мокапам `docs/UX/mockups/home/` (M129–M133); дедуп только против catalog docs из ICON-GENERATION-INDEX (#1–#3); формат как CAB-icon-assets».
