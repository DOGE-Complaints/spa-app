# STORY-UX-MOCKUP-BRIEF — STORY-SPA-SEARCH-04-institution-date-filters

> **Назначение:** вход для **отдельного UX-диалога** (до P3 Execute с UI). Агент-UX пишет mockup spec-файлы; оператор переносит пути в P3 `@mockup:`.
> **Создаётся в:** P1.3 (Plan) при materialize visual/mixed story + pkg.
> **Не путать с:** `ui-mockup-spec.md` в task-folder (UI-1, после baseline в P3).

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-SEARCH-04-institution-date-filters` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md` |
| **Pkg** | `pkg-000011-20260618-epic-spa-03-search04-institution-date-filters.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-04-institution-date-filters/STORY-SPA-SEARCH-04-institution-date-filters.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md` |
| **ui_scope** | `mixed` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/board` |
| **Viewport** | `1536×1024` (desktop канон EPIC-03) |
| **Anchor task (pkg)** | `task-spa-search-04-t02-institution-filter-dynamic-options` (`ui_anchor: true`) |
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

Бэк уже умеет фильтровать по ведомству (institution) и по дате создания (от/до), но SPA это не использует. Добавляем два контрола в панель и прокидываем их в запрос к gateway.

### Scope — что меняется в UI

- Новые контролы **Institution** + **DateRange** в extension zone FilterPanel (`data-slot="institution"`, `data-slot="date"`).
- Institution — single-select; опции из загруженных issue (D-S8), disabled при пустом наборе.
- DateRange — стандартные date inputs «от/до» по `created_at`; batch Apply через панель SEARCH-02.
- ActiveFilterChips — чипы для применённого institution и date bounds.
- URL: `?institution=…&created_after=…&created_before=…` (вместе с существующими status/type/labels/search).

### Вне scope

- Geo (SEARCH-05).
- Полный справочник ведомств с бэка (D-S8 = из данных; справочник — future).
- Виджет-календарь premium-уровня — достаточно стандартного date-range.

### Acceptance Criteria (UI-relevant)

- [ ] В панели есть контролы Institution и Дата (от/до).
- [ ] Варианты Institution собираются из загруженных issue.
- [ ] Параметры сохраняются/восстанавливаются через URL; чипы отображают применённое.

### Решения / decision refs

- D-S2 — institution + date вынесены в отдельную story: [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- D-S8 — dynamic options из данных: precedent L10N-02 / LabelsFilter
- Batch apply (D-S4): institution/date в pending до «Применить», как status/type/labels

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
| FilterPanel extension slots | `spa-app/src/components/Filters/FilterPanel.jsx:40-41` | Пустые `data-slot="institution"` / `data-slot="date"` |
| LabelsFilter (D-S8 precedent) | `spa-app/src/components/Filters/LabelsFilter.jsx` | Dynamic options, panel variant, disabled when empty |
| BoardFilterState future keys | `spa-app/src/router/boardFilterState.js:11-23` | JSDoc only — runtime fields отсутствуют |
| boardQuery forward-compat | `spa-app/src/router/boardQuery.js:7-11` | JSDoc lists institution/created_* — parse no-op |

### Зависимости от других story

- SEARCH-02 Done — FilterPanel shell, batch Apply/Reset, ActiveFilterChips, drawer.
- SEARCH-03 Done — SearchInput в toolbar (immediate), не в панели.

---

## Задание UX-диалога (deliverables)

Создай **1–2** mockup spec-файла(ов) в каталоге:

`spa-app/docs/UX/mockups/epic-03/`

### Обязательные экраны / states

| # | Screen / state | Описание | Приоритет |
|---|----------------|----------|-----------|
| 1 | Institution default empty | Extension slot: trigger «Institution», placeholder value, disabled if no options | must |
| 2 | Institution dropdown open | Single-select list from loaded issues; localized display | must |
| 3 | Institution selected (pending) | Pending value before Apply; dirty state on Apply button | must |
| 4 | Date range empty | Two `<input type="date">` — from / to labels | must |
| 5 | Date range filled (pending) | Both bounds set; validation if from > to (if applicable) | must |
| 6 | Applied chips | ActiveFilterChips show institution + date bounds after Apply | must |
| 7 | Panel mobile drawer | Institution + date in drawer extension zone (responsive) | should |

### На каждый spec-файл

- **Имя:** `mockup-NN-<slug>-spec.md` (следующий свободный NN в epic-03).
- **Секции:** layout-метрики; токены; компонентный состав; states; **selectors** для puppeteer; связь с AC.
- **Extends:** mockup-10 (filter panel extension zone delta).
- **Не включать:** implementation notes, JSX, gateway API contracts.

### Рекомендуемые файлы

1. `mockup-NN-institution-date-filter-states-spec.md` — delta extends mockup-10 §extension zone
2. `mockup-NN-institution-date-chips-spec.md` — chips row delta (опционально)

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

**Gate:** P3 visual implement **не стартовать** на T02/T03, пока оператор не подтвердил mockup specs («принято») или не приложил `@mockup:` в P3.

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
| _(заполнить после UX-диалога)_ | Institution + DateRange extension zone states |
