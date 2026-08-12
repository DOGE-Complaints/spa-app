# STORY-SPA-G8 — AppShell: вынести Header/Sidebar/LocaleSelector

## Meta

- **Key:** `STORY-SPA-G8-app-shell-refactor`
- **Status:** Done
- **Gap:** G8 (Low) — closed `pkg-000040` (2026-07-29T08:27:15Z)
- **Источник:** [spa-app-doc-code-gap-report.md](../../analysis/spa-app-doc-code-gap-report.md) §G8
- **Зависит от:** желательно после G2/G3 (стабильный тулбар)

## Зачем простыми словами

Header, sidebar и переключатель языка продублированы в BoardPage и IssuePage. Документация описывает отдельные компоненты. Нужен общий AppShell, чтобы убрать копипасту и совпасть с архитектурной картой.

## Scope

- `src/components/AppShell/` (или эквивалент): `AppShell.jsx`, `Header.jsx`, `Sidebar.jsx`, `LanguageSelector.jsx`.
- [BoardPage.jsx](../../../src/pages/BoardPage.jsx) и [IssuePage.jsx](../../../src/pages/IssuePage.jsx) используют shell; убрать дублированную разметку.
- Сохранить поведение: навигация, locale switch с флагами (канон G6), active route highlight.
- Обновить/добавить тесты shell при необходимости.

## Вне scope

- Новые маршруты identity.
- Полная реализация всех компонентов из reusable-ui-architecture (BoardColumns как отдельные файлы — опционально).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [design-system.md](../../UX/design-system.md) §1.5 | interim «inline в pages» | Реальные пути `src/components/AppShell/…` |
| [reusable-ui-components-architecture.md](../../UX/reusable-ui-components-architecture.md) | Пометка G8 interim | Карта компонентов = фактические файлы |
| [gap-report](../../analysis/spa-app-doc-code-gap-report.md) §5 | G8 open | G8 ✅ |
| [INDEX.md](../INDEX.md) | Todo | Done |

## Acceptance Criteria

- [x] Header/Sidebar/LocaleSelector не дублируются между BoardPage и IssuePage.
- [x] Визуальный и навигационный паритет с текущим UI.
- [x] `npm test` — green.
- [x] Документация touchpoints обновлена.

## Post-audit wave (P5 scaffold-only)

- **run_mode:** `spa_g8_audit_2026_07_29`
- **activation:** run_mode override in `.cursor/plans/Spa_builder.plan.md` (active pkg unchanged)
- **Task:** [SPA-G8-T07](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G8-app-shell-refactor/task-spa-g8-t07-deduplicate-language-selector/README.md)
- **Scope:** audit G-1 only (G-3/G-4 temporary working docs ignored in this wave)
- **Status:** ✅ Closed in P6 (gate 2026-07-29T09:39:05Z)
