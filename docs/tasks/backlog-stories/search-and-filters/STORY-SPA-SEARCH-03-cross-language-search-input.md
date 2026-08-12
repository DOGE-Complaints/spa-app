# STORY-SPA-SEARCH-03 — SearchInput (кросс-язычный поиск)

## Meta

- **Key:** `STORY-SPA-SEARCH-03-cross-language-search-input`
- **Status:** Done (pkg-000010, 2026-06-18)
- **Решение:** D-S1 (client-side, кросс-язычный) — [search-filters-cto-interview-2026-06-15.md](../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Зависит от:** [SEARCH-02](STORY-SPA-SEARCH-02-filter-panel-shell.md) (место в панели)
- **Поглощает:** исходную [STORY-SPA-G3](STORY-SPA-G3-search-input-toolbar.md) (часть про SearchInput)

## Зачем простыми словами

Поиск по `?search=` уже работает, но: (1) нет поля ввода в интерфейсе; (2) ищет только по текущему языку — на эстонском не найдёшь русское слово. Делаем поле поиска и расширяем поиск на все три языка одновременно.

## Целевое (из интервью)

- Поле поиска в панели/тулбаре доски (иконка, placeholder, очистка).
- **Кросс-язычный (D-S1):** ищем по `title` и `description` во всех локалях (et+ru+en) загруженного набора, а не только в текущей.
- Остаётся **client-side** (бэк не трогаем — серверного поиска на gateway нет).
- **Debounce** ввода (не дёргать фильтрацию/URL на каждую букву).
- Пишет в `?search=` через существующую инфраструктуру; «Сбросить» очищает (уже покрыто).

## Scope (фактические точки)

- Новый `SearchInput` (каталог на усмотрение, напр. `src/components/Filters/SearchInput.jsx`), размещение — в панели SEARCH-02.
- [src/pages/BoardPage.jsx](../../../../src/pages/BoardPage.jsx): `filteredIssues` ([:74-81](../../../../src/pages/BoardPage.jsx#L74)) — сейчас матчит только `resolveLocalizedText(title/description)` текущей локали; расширить на все локали i18n-объекта (`title.et|ru|en` + `description.et|ru|en`).
- Связка с `serializeBoardQuery`/`applyFilters` ([boardQuery.js](../../../../src/router/boardQuery.js)); debounce на вводе.

## Вне scope

- Серверный full-text (D-S1 = client-side; gateway не имеет `search`).
- Поиск по `summary`/`labels`/`institution` (если понадобится — отдельное расширение).
- Поиск на IssuePage.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [ui-mockups-and-states-requirements.md](../../../UX/ui-mockups-and-states-requirements.md) §24.2 | SearchInput planned, по текущему языку | реализован, кросс-язычный |
| [reusable-ui-components-architecture.md](../../../UX/reusable-ui-components-architecture.md) | SearchInput planned | путь к компоненту |
| [STORY-SPA-G3](STORY-SPA-G3-search-input-toolbar.md) | open | поглощён SEARCH-03 |
| [search-filters…md](../../../analysis/search-filters-cto-interview-2026-06-15.md) | D-S1 open | ✅ |

## Acceptance Criteria

- [ ] В панели/тулбаре есть поле поиска с placeholder и очисткой.
- [ ] Ввод обновляет `?search=` (с debounce), без полной перезагрузки.
- [ ] Поиск находит совпадения в любой из локалей `title`/`description` независимо от текущего языка UI.
- [ ] Пустой запрос показывает весь набор; «Сбросить» очищает search.
- [ ] `npx vitest run` — green; тест кросс-язычного матчинга (ищем ru-слово при locale=et).
