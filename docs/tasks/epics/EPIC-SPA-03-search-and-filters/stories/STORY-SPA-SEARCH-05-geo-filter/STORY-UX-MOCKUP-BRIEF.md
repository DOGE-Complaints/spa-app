# STORY-UX-MOCKUP-BRIEF — STORY-SPA-SEARCH-05-geo-filter

> **Назначение:** вход для **отдельного UX-диалога** (до P3 Execute с UI). Агент-UX пишет mockup spec-файлы; оператор переносит пути в P3 `@mockup:`.
> **Создаётся в:** P1.3 (Plan) при materialize visual/mixed story + pkg.
> **Не путать с:** `ui-mockup-spec.md` в task-folder (UI-1, после baseline в P3).

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-SEARCH-05-geo-filter` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md` |
| **Pkg** | `pkg-000012-20260618-epic-spa-03-search05-geo-filter.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-05-geo-filter/STORY-SPA-SEARCH-05-geo-filter.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md` |
| **ui_scope** | `mixed` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/board` |
| **Viewport** | `1536×1024` (desktop канон EPIC-03) |
| **Anchor task (pkg)** | `task-spa-search-05-t02-geo-filter-dynamic-options` (`ui_anchor: true`) |
| **puppeteer_gate (ожидаемый)** | `test:ui:filters` (расширение smoke) |

---

## Роль агента (UX-диалог)

Ты **UX/UI специалист** для spa-app. Твоя задача — **не писать код**, а подготовить **target mockup specifications** для последующей реализации в Builder Queue P3 (UI Visual Pipeline).

**Принципы:**

- Опирайся только на факты из этого brief, pipeline story и перечисленных code/mockup refs (**analysis.mdc**).
- Каждый экран/state — отдельный `mockup-NN-<slug>-spec.md` (или delta-spec, если extends глобальный mockup).
- Структура spec — как эталон [mockup-01-dashboard-main-spec.md](../../../../../../UX/mockups/initiation/mockup-01-dashboard-main-spec.md): layout-метрики, токены, компоненты, states, selectors для puppeteer.
- Если зона UI уже покрыта глобальным mockup — укажи **extends** и опиши только **дельту** story.

---

## Контекст story (verbatim из pipeline)

### Зачем (1–3 предложения)

Бэк умеет фильтровать по географии (район, населённый пункт, регион, страна). Добавляем гео-контрол в панель. Это сложнее обычного фильтра: у issue без гео-данных особое поведение, и есть тонкость с написанием (диакритика).

### Scope — что меняется в UI

- Новый **Geo**-контрол в extension zone FilterPanel (`data-slot="geo"`).
- Admin-единицы: `district` / `settlement` / `region` / `country` / `postal_code` (по мере наличия в загруженных issue).
- Опции — из `issue.geo` загруженного набора (D-S8); disabled при пустом наборе по измерению.
- Multi-value OR per dimension; batch Apply через панель SEARCH-02.
- ActiveFilterChips — чипы для применённых geo-фильтров.
- URL: `?geo_district=…&geo_settlement=…` (CSV per key, вместе с status/type/labels/search/institution/dates).

### Вне scope

- **Geo bbox** (`geo_lat/lon_min/max`) — future, не в этой стори.
- Карта/визуализация на карте.
- Полный гео-справочник с бэка (D-S8 = из данных).

### Acceptance Criteria (UI-relevant)

- [ ] В панели есть Geo-контрол по admin-единицам; варианты — из загруженных issue.
- [ ] Варианты берутся из данных (исключает промахи по диакритике свободного ввода).

### Решения / decision refs

- D-S2 — geo вынесен в отдельную story: [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- D-S8 — dynamic options из данных: precedent InstitutionFilter / LabelsFilter
- Batch apply (D-S4): geo в pending до «Применить», как institution/date

---

## Что уже есть (не выдумывать заново)

### Глобальные mockup SSOT (extends кандидаты)

| Mockup | Путь | Что покрывает |
|--------|------|---------------|
| mockup-01 | `spa-app/docs/UX/mockups/initiation/mockup-01-dashboard-main-spec.md` | Board shell, toolbar, kanban |
| mockup-10 | `spa-app/docs/UX/mockups/initiation/mockup-10-dashboard-filter-status-spec.md` | Filter panel + extension zones |
| mockup-12 | `spa-app/docs/UX/mockups/initiation/mockup-12-dashboard-filter-labels-spec.md` | Dynamic dropdown filter pattern |

### Текущая реализация (code facts)

| Компонент / зона | Файл | Что сейчас на экране |
|------------------|------|----------------------|
| FilterPanel geo slot | `spa-app/src/components/Filters/FilterPanel.jsx:57-58` | Пустой `data-slot="geo"`; `extensionSlot` prop |
| InstitutionFilter (D-S8 precedent) | `spa-app/src/components/Filters/InstitutionFilter.jsx` | Single-select, panel variant, disabled when empty |
| LabelsFilter (multi precedent) | `spa-app/src/components/Filters/LabelsFilter.jsx` | Multi-select OR pattern |
| BoardFilterState future keys | `spa-app/src/router/boardFilterState.js:14-23` | JSDoc only — runtime geo fields отсутствуют |
| boardQuery forward-compat | `spa-app/src/router/boardQuery.js:7-9` | JSDoc lists geo_* — parse no-op |

### Зависимости от других story

- SEARCH-02 Done — FilterPanel shell, batch Apply/Reset, ActiveFilterChips, drawer.
- SEARCH-04 Done — institution/date slots occupied; geo slot reserved.

---

## Задание UX-диалога (deliverables)

Создай **1–2** mockup spec-файла(ов) в каталоге:

`spa-app/docs/UX/mockups/epic-03/`

### Обязательные экраны / states

| # | Screen / state | Описание | Приоритет |
|---|----------------|----------|-----------|
| 1 | Geo default empty | Extension slot: geo controls hidden or disabled when no geo in loaded issues | must |
| 2 | District dropdown open | Multi-select list from loaded issues; diacritics preserved in labels | must |
| 3 | Settlement/region/country | Per-dimension controls shown only when options exist | must |
| 4 | Geo selected (pending) | Pending values before Apply; dirty state on Apply button | must |
| 5 | Applied chips | ActiveFilterChips show geo filters after Apply | must |
| 6 | Panel mobile drawer | Geo controls in drawer extension zone (responsive) | should |

### На каждый spec-файл

- **Имя:** `mockup-NN-<slug>-spec.md` (следующий свободный NN в epic-03).
- **Секции:** layout-метрики; токены; компонентный состав; states; **selectors** для puppeteer; связь с AC.
- **Extends:** mockup-10 (filter panel extension zone delta).
- **Не включать:** implementation notes, JSX, gateway API contracts.

### Рекомендуемые файлы

1. `mockup-NN-geo-filter-states-spec.md` — delta extends mockup-10 §extension zone (geo slot)
2. `mockup-NN-geo-filter-chips-spec.md` — chips row delta (опционально)

---

## Handoff → P3 Execute (spa UI appendix)

После UX-диалога оператор фиксирует пути в P3:

```text
@mockup: spa-app/docs/UX/mockups/epic-03/mockup-NN-....md
```

И в anchor task README (materialize / update):

```markdown
- **extends mockup:** mockup-NN-<slug>-spec.md [, …]
```

**Gate:** P3 visual implement **не стартовать** на T02, пока оператор не подтвердил mockup specs («принято») или не приложил `@mockup:` в P3.

---

## Checklist UX-диалога (Definition of Done)

- [ ] Каждый UI-relevant AC покрыт хотя бы одним state в spec(s)
- [ ] Layout-метрики и viewport согласованы с EPIC-03 (`1536×1024`)
- [ ] Selectors перечислены для будущего `puppeteer_gate`
- [ ] Нет противоречий с «Вне scope» pipeline story
- [ ] Пути к созданным spec-файлам перечислены в §Handoff ниже

### Созданные файлы (заполнить по итогу UX-диалога)

| Файл | Покрывает |
|------|-----------|
| _(заполнить после UX-диалога)_ | Geo filter extension zone states |
