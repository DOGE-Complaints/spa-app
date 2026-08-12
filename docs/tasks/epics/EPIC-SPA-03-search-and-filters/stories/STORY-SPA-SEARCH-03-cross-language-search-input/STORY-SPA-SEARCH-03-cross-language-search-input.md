# STORY-SPA-SEARCH-03 — SearchInput (кросс-язычный поиск)

## Meta (pipeline)

- **Key:** `STORY-SPA-SEARCH-03-cross-language-search-input`
- **Parent Epic:** [`../../../../EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md)
- **Status:** Done
- **Wave:** `pkg-000010`
- **source:** [`spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md)
- **Decision Ref:** [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md); [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) (D-S1)
- **Решение:** D-S1 (client-side, кросс-язычный)
- **Зависит от:** [SEARCH-02](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md) (Done, pkg-000009)
- **Поглощает:** исходную [STORY-SPA-G3](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md) (часть про SearchInput)
- **ui_scope:** `mixed` · **ui_complexity:** `standard`

---

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
- [src/pages/BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx): `filteredIssues` ([:74-81](../../../../../../../src/pages/BoardPage.jsx#L74)) — сейчас матчит только `resolveLocalizedText(title/description)` текущей локали; расширить на все локали i18n-объекта (`title.et|ru|en` + `description.et|ru|en`).
- Связка с `serializeBoardQuery`/`applyFilters` ([boardQuery.js](../../../../../../../src/router/boardQuery.js)); debounce на вводе.

## Вне scope

- Серверный full-text (D-S1 = client-side; gateway не имеет `search`).
- Поиск по `summary`/`labels`/`institution` (если понадобится — отдельное расширение).
- Поиск на IssuePage.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [ui-mockups-and-states-requirements.md](../../../../../../UX/ui-mockups-and-states-requirements.md) §24.2 | SearchInput planned, по текущему языку | реализован, кросс-язычный |
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) | SearchInput planned | путь к компоненту |
| [STORY-SPA-G3](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md) | open | поглощён SEARCH-03 |
| [search-filters…md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) | D-S1 open | ✅ |

## Acceptance Criteria

- [x] В панели/тулбаре есть поле поиска с placeholder и очисткой.
- [x] Ввод обновляет `?search=` (с debounce), без полной перезагрузки.
- [x] Поиск находит совпадения в любой из локалей `title`/`description` независимо от текущего языка UI.
- [x] Пустой запрос показывает весь набор; «Сбросить» очищает search.
- [x] `npx vitest run` — green; тест кросс-язычного матчинга (ищем ru-слово при locale=et).

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-search-03-t01-cross-locale-match-helper`](./task-spa-search-03-t01-cross-locale-match-helper/README.md) | pkg-000010 |
| 2 | [`task-spa-search-03-t02-board-page-cross-locale-filter`](./task-spa-search-03-t02-board-page-cross-locale-filter/README.md) | pkg-000010 |
| 3 | [`task-spa-search-03-t03-debounced-search-url-sync`](./task-spa-search-03-t03-debounced-search-url-sync/README.md) | pkg-000010 |
| 4 | [`task-spa-search-03-t04-search-input-clear-affordance`](./task-spa-search-03-t04-search-input-clear-affordance/README.md) | pkg-000010 |
| 5 | [`task-spa-search-03-t05-tests-cross-locale-debounce`](./task-spa-search-03-t05-tests-cross-locale-debounce/README.md) | pkg-000010 |
| 6 | [`task-spa-search-03-t06-documentation-touchpoints`](./task-spa-search-03-t06-documentation-touchpoints/README.md) | pkg-000010 |
| 7 | [`task-spa-search-03-t07-story-gate-search-03`](./task-spa-search-03-t07-story-gate-search-03/README.md) | pkg-000010 |
