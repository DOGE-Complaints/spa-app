# STORY-UX-MOCKUP-BRIEF — STORY-SPA-SEARCH-03-cross-language-search-input

> **Назначение:** вход для **отдельного UX-диалога** (до P3 Execute с UI). Агент-UX пишет mockup spec-файлы; оператор переносит пути в P3 `@mockup:`.
> **Создаётся в:** P1.3 (Plan) при materialize visual/mixed story + pkg.
> **Не путать с:** `ui-mockup-spec.md` в task-folder (UI-1, после baseline в P3).

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-SEARCH-03-cross-language-search-input` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md` |
| **Pkg** | `pkg-000010-20260617-epic-spa-03-search03-cross-language-search-input.yaml` |
| **Pipeline story** | `spa-app/docs/tasks/epics/EPIC-SPA-03-search-and-filters/stories/STORY-SPA-SEARCH-03-cross-language-search-input/STORY-SPA-SEARCH-03-cross-language-search-input.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md` |
| **ui_scope** | `mixed` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/board` |
| **Viewport** | `1536×1024` (desktop канон EPIC-03) |
| **Anchor task (pkg)** | `task-spa-search-03-t04-search-input-clear-affordance` (`ui_anchor: true`) |
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

Поиск по `?search=` уже работает, но: (1) нет поля ввода в интерфейсе; (2) ищет только по текущему языку — на эстонском не найдёшь русское слово. Делаем поле поиска и расширяем поиск на все три языка одновременно.

### Scope — что меняется в UI

- `SearchInput` ([`src/components/Filters/SearchInput.jsx`](../../../../../../../src/components/Filters/SearchInput.jsx)) — enhance: placeholder, **кнопка очистки**; размещение в toolbar доски (рядом с FilterPanel, не внутри панели).
- `BoardPage` toolbar — debounced ввод search (поведение, не layout FilterPanel).
- Кросс-язычный матч — логика `filteredIssues`, визуально меняется только набор видимых карточек на доске.

### Вне scope

- Серверный full-text (D-S1 = client-side; gateway не имеет `search`).
- Поиск по `summary`/`labels`/`institution` (если понадобится — отдельное расширение).
- Поиск на IssuePage.
- Изменение layout FilterPanel / drawer (SEARCH-02 Done).

### Acceptance Criteria (UI-relevant)

- [ ] В панели/тулбаре есть поле поиска с placeholder и очисткой.
- [ ] Ввод обновляет `?search=` (с debounce), без полной перезагрузки.
- [ ] Поиск находит совпадения в любой из локалей `title`/`description` независимо от текущего языка UI.
- [ ] Пустой запрос показывает весь набор; «Сбросить» очищает search.

### Решения / decision refs

- D-S1 — client-side кросс-язычный поиск: [search-filters-cto-interview-2026-06-15.md](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- Размещение search в toolbar (не batch pending): SEARCH-02 Done — search immediate, panel filters batch Apply

---

## Что уже есть (не выдумывать заново)

### Глобальные mockup SSOT (extends кандидаты)

| Mockup | Путь | Что покрывает |
|--------|------|---------------|
| mockup-01 | `spa-app/docs/UX/mockups/initiation/mockup-01-dashboard-main-spec.md` | Board shell, toolbar SearchInput + FilterPanel, kanban |
| mockup-10 | `spa-app/docs/UX/mockups/initiation/mockup-10-dashboard-filter-status-spec.md` | Filter panel + toolbar row |
| mockup-15 | `spa-app/docs/UX/mockups/initiation/mockup-15-routing-behavior-sheet-spec.md` | `?search=` routing behavior |

### Текущая реализация (code facts)

| Компонент / зона | Файл | Что сейчас на экране |
|------------------|------|----------------------|
| SearchInput | `spa-app/src/components/Filters/SearchInput.jsx` | Иконка + `<input type="search">`, без кнопки × |
| Toolbar placement | `spa-app/src/pages/BoardPage.jsx:197-201` | SearchInput в `.board-filters-row` слева от FilterPanel |
| Стили | `spa-app/src/components/Filters/Filters.css` | `.board-search-input-wrap`, `.board-search-input` |
| Фильтрация | `spa-app/src/pages/BoardPage.jsx:94-100` | Только текущая локаль UI |

### Зависимости от других story

- SEARCH-02 Done — FilterPanel, ActiveFilterChips, ResetFiltersControl; SearchInput остаётся в toolbar.
- G3 Done — базовый SearchInput + URL sync без debounce.

---

## Задание UX-диалога (deliverables)

Создай **1–2** mockup spec-файла(ов) в каталоге:

`spa-app/docs/UX/mockups/epic-03/`

(продолжение EPIC-03 board; initiation mockup-01 остаётся SSOT shell)

### Обязательные экраны / states

| # | Screen / state | Описание | Приоритет |
|---|----------------|----------|-----------|
| 1 | Search default empty | Toolbar: иконка + placeholder, без clear | must |
| 2 | Search focused | Focus ring / border state на input | must |
| 3 | Search with text + clear visible | Кнопка × справа внутри wrap при `value.length > 0` | must |
| 4 | After clear | Пустой input, clear скрыт | must |
| 5 | Cross-locale match (behavior sheet) | locale=et UI, query ru-текст → DE-002 в колонке NEW | should |
| 6 | No-results with active search | Пустая доска / empty state при ненулевом search | should |

### На каждый spec-файл

- **Имя:** `mockup-NN-<slug>-spec.md` (следующий свободный NN в epic-03).
- **Секции:** что фиксирует; layout-метрики; токены; компонентный состав; states; **selectors** (`data-testid` / role / aria для puppeteer); связь с AC.
- **Extends:** mockup-01 (toolbar delta) для visual states; mockup-15 для routing/search behavior.
- **Не включать:** implementation notes, JSX, API-контракты gateway.

### Рекомендуемые файлы

1. `mockup-NN-search-input-states-spec.md` — delta extends mockup-01 §Toolbar SearchInput
2. `mockup-NN-search-cross-locale-behavior-sheet-spec.md` — behavior-only (опционально, если не вмещается в states spec)

### Вопросы оператору (если блокер)

Задай **1–2 раунда** AskQuestion только если Scope не покрывает: placement, mobile behavior, empty states, copy/i18n placeholders.

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

**Gate:** P3 visual implement **не стартовать** на T04, пока оператор не подтвердил mockup specs («принято») или не приложил `@mockup:` в P3.

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
| `task-spa-search-03-t04-search-input-clear-affordance/ui-mockup-spec.md` | SearchInput clear states (extends mockup-01) |
