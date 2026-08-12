# STORY-SPA-SEARCH-02 — Панель фильтров (Jira-like): раскрытие + чипы + батч-применение + URL + адаптив

## Meta (pipeline)

- **Key:** `STORY-SPA-SEARCH-02-filter-panel-shell`
- **Parent Epic:** [`../../../../EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md)
- **Status:** Done
- **Wave:** `pkg-000009`
- **Тип:** UX-контейнер фильтров (фундамент UI для контролов 03/04/05)
- **source:** [`spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md)
- **Decision Ref:** [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md); [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) (D-S3, D-S4, D-S6, D-S7)
- **Решения:** D-S3 (раскрывающаяся панель + чипы), D-S4 (батч «Применить»), D-S6 (URL-состояние), D-S7 (адаптив/мобайл)
- **Зависит от:** [SEARCH-01](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) (Done, pkg-000008)
- **ui_scope:** `visual` (UI-0 baseline → UI-3 checklist)

---

## Зачем простыми словами

Сейчас фильтры — ряд дропдаунов прямо в тулбаре; при росте числа фильтров это перегружает шапку. Делаем как в Jira: кнопка «Фильтры» раскрывает область со всеми контролами; применённые фильтры показываются «таблетками»-чипами с крестиком; применяются одной кнопкой; состояние — в URL (ссылку можно расшарить); на узких экранах панель — выезжающая.

## Целевое (из интервью)

- **Раскрывающаяся панель** «Фильтры» (collapse/expand) над доской; внутри — слоты под контролы (Status/Type/Labels сейчас; Institution/Date/Geo добавят SEARCH-04/05).
- **Pending vs applied:** в панели набирается «черновик» фильтров; кнопка **«Применить»** фиксирует (один проход/запрос); **«Сбросить»** очищает всё (включая search).
- **Чипы активных фильтров** над доской: каждый применённый фильтр — удаляемая «таблетка» (`Status: NEW ×`), удаление чипа сразу применяет изменение.
- **URL-состояние (D-S6):** применённые фильтры/поиск пишутся в hash-URL (формат CSV, как сейчас в [boardQuery.js](../../../../../../../src/router/boardQuery.js)); обновление URL — по «Применить»/удалению чипа; F5/Back восстанавливают.
- **Адаптив (D-S7):** на узких экранах панель — полноэкранная/нижняя (drawer/bottom-sheet); на десктопе — раскрытие в потоке.

## Scope (фактические точки)

- [src/pages/BoardPage.jsx](../../../../../../../src/pages/BoardPage.jsx): вынести фильтр-ряд ([:173-196](../../../../../../../src/pages/BoardPage.jsx#L173)) в панель; ввести pending-состояние + «Применить»/«Сбросить».
- Новые компоненты (каталог на усмотрение, напр. `src/components/Filters/`): панель-контейнер, строка активных чипов, адаптив-обёртка.
- Существующие [StatusFilter/TypeFilter/LabelsFilter/ResetFiltersControl](../../../../../../../src/components/Filters/) — встроить в панель (контролы переиспользуются).
- [src/router/boardQuery.js](../../../../../../../src/router/boardQuery.js): сериализация/парсинг остаются SSOT; учесть батч-обновление (URL меняется по «Применить», а не на каждый тогл).

## Вне scope

- Сам SearchInput (SEARCH-03), новые фильтры Institution/Date/Geo (SEARCH-04/05) — здесь только слоты/каркас.
- Серверный проброс новых параметров (в репозитории) — в соответствующих стори.

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| [reusable-ui-components-architecture.md](../../../../../../UX/reusable-ui-components-architecture.md) | фильтры = инлайн-дропдауны | панель + чипы + батч; пути компонентов |
| [mockup-01](../../../../../../UX/mockups/mockup-01-dashboard-main-spec.md) / mockup-10..13 | тулбар-дропдауны | раскрывающаяся панель + чипы |
| [search-filters…md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md) | D-S3/4/6/7 open | ✅ |

## Acceptance Criteria

- [x] Кнопка «Фильтры» раскрывает/сворачивает панель; контролы Status/Type/Labels внутри.
- [x] Изменения в панели — «черновик»; применяются по кнопке «Применить» (батч), не мгновенно.
- [x] Применённые фильтры показаны чипами с удалением; удаление чипа сразу применяет.
- [x] «Сбросить» очищает все фильтры и search; кнопка disabled, если фильтров нет.
- [x] Состояние пишется в hash-URL по «Применить»; перезагрузка/Back восстанавливают точно.
- [x] На узком экране панель открывается адаптивно (drawer/bottom-sheet), контролы доступны.
- [x] `npx vitest run` — green; тесты на батч-применение и сериализацию.

## Nested tasks

| Order | Task folder | Wave |
|---|---|---|
| 1 | [`task-spa-search-02-t01-filter-contract-matrix`](./task-spa-search-02-t01-filter-contract-matrix/README.md) | pkg-000009 |
| 2 | [`task-spa-search-02-t02-use-board-filter-draft`](./task-spa-search-02-t02-use-board-filter-draft/README.md) | pkg-000009 |
| 3 | [`task-spa-search-02-t03-filter-panel-shell`](./task-spa-search-02-t03-filter-panel-shell/README.md) | pkg-000009 |
| 4 | [`task-spa-search-02-t04-status-filter-panel-mode`](./task-spa-search-02-t04-status-filter-panel-mode/README.md) | pkg-000009 |
| 5 | [`task-spa-search-02-t05-type-filter-panel-mode`](./task-spa-search-02-t05-type-filter-panel-mode/README.md) | pkg-000009 |
| 6 | [`task-spa-search-02-t06-labels-filter-panel-mode`](./task-spa-search-02-t06-labels-filter-panel-mode/README.md) | pkg-000009 |
| 7 | [`task-spa-search-02-t07-board-page-wiring`](./task-spa-search-02-t07-board-page-wiring/README.md) | pkg-000009 |
| 8 | [`task-spa-search-02-t08-active-filter-chips`](./task-spa-search-02-t08-active-filter-chips/README.md) | pkg-000009 |
| 9 | [`task-spa-search-02-t09-batch-apply-reset`](./task-spa-search-02-t09-batch-apply-reset/README.md) | pkg-000009 |
| 10 | [`task-spa-search-02-t10-responsive-filter-drawer`](./task-spa-search-02-t10-responsive-filter-drawer/README.md) | pkg-000009 |
| 11 | [`task-spa-search-02-t11-tests-pending-applied-url`](./task-spa-search-02-t11-tests-pending-applied-url/README.md) | pkg-000009 |
| 12 | [`task-spa-search-02-t12-tests-per-filter-chips`](./task-spa-search-02-t12-tests-per-filter-chips/README.md) | pkg-000009 |
| 13 | [`task-spa-search-02-t13-tests-server-filter-key`](./task-spa-search-02-t13-tests-server-filter-key/README.md) | pkg-000009 |
| 14 | [`task-spa-search-02-t14-forward-compat-board-query`](./task-spa-search-02-t14-forward-compat-board-query/README.md) | pkg-000009 |
| 15 | [`task-spa-search-02-t15-documentation-touchpoints`](./task-spa-search-02-t15-documentation-touchpoints/README.md) | pkg-000009 |
| 16 | [`task-spa-search-02-t16-story-gate-search-02`](./task-spa-search-02-t16-story-gate-search-02/README.md) | pkg-000009 |
