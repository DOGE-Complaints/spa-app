# Mockup 10 Spec — Dashboard Status Filter Control

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-status.png`  
**Version:** v2.0 (SEARCH-02 FilterPanel)  
**Status:** active SSOT for status-filter control inside FilterPanel  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`  
**Implementation:** [`FilterPanel.jsx`](../../../src/components/Filters/FilterPanel.jsx), [`StatusFilter.jsx`](../../../src/components/Filters/StatusFilter.jsx) (`variant="panel"`)

---

## 1) Что фиксирует этот мокап

Компонент фильтра по статусу **внутри раскрытой панели «Фильтры»** (не inline в toolbar):

- выбор статусов для отображения issues;
- multi-select (например, `NEW` + `PUBLISHED`);
- состояния контрола (`default`, `hover`, `selected`, `disabled`);
- канон enum gateway: `NEW`, `IN_REVIEW`, `PUBLISHED` ([`types.js`](../../../src/domain/types.js)).

---

## 2) Канонические признаки компонента

- Холст: `1536x1024`.
- Toolbar: кнопка «Фильтры» (`.board-filter-panel-toggle`) + `SearchInput` + глобальный `Reset Filters`.
- Статус-контрол — **внутри** `.board-filter-panel-body` (после раскрытия панели).
- Контрол поддерживает:
  - `Status: Any` (без фильтра);
  - раскрытие списка (`.board-filter-trigger` → `.board-filter-dropdown`);
  - множественный выбор (`.board-filter-option`);
  - `Clear` — только status-filter;
  - **не** меняет URL до нажатия «Применить» (`.board-filter-apply`) в footer панели.
- Применённые статусы дублируются в **чипах** над доской (`.board-active-filter-chips`).

---

## 3) State behavior

1. **Panel closed:** видна только кнопка «Фильтры»; status-контрол скрыт.
2. **Panel open, default:** `Status: Any` внутри панели; Apply disabled если черновик = applied.
3. **Pending selection:** toggles в dropdown меняют **черновик** (`pending`); URL и fetch не меняются.
4. **After Apply:** applied status → URL hash (`status=NEW,PUBLISHED` CSV); чипы; один server fetch (batch).
5. **Selected (multi-select):** chips внутри trigger label; dropdown с отмеченными опциями; `Clear` в dropdown.
6. **Disabled:** визуально читаем; недоступен для интеракции.

---

## 4) UX-правила

- Контрол фильтрует board по `Issue.status` (канон gateway).
- `Any` = отсутствие status-фильтра.
- `Clear` в dropdown очищает только status в **черновике** панели.
- Глобальный `Reset Filters` (toolbar или footer панели) очищает все фильтры + search.
- Удаление чипа статуса — **немедленное** применение (без повторного Apply).

---

## 5) Selectors (runtime)

| Element | Selector |
|---------|----------|
| Panel toggle | `.board-filter-panel-toggle` |
| Panel body | `.board-filter-panel-body` |
| Status trigger | `.board-filter-panel-primary .board-filter-trigger` (first) |
| Dropdown | `.board-filter-dropdown` |
| Option | `.board-filter-option` |
| Apply | `.board-filter-apply` |
| Active chips | `.board-active-filter-chips .board-filter-chip` |

---

## 6) Scope-фокус

- Панель + toolbar + чипы + рабочая область board.
- Декоративные отклонения PNG-мокапа (inline dropdown в toolbar) — **legacy**; runtime = панель.

---

## 7) Что НЕ фиксируется этим мокапом

- Точная реализация dropdown (popover/custom listbox).
- Keyboard shortcut схема (кроме базовой доступности).
- Backend query syntax.

---

## 8) Трассировка

- STORY-SPA-SEARCH-02 (pkg-000009): FilterPanel + StatusFilter panel mode.
- `task-spa-search-02-t03-filter-panel-shell`, `task-spa-search-02-t04-status-filter-panel-mode`.
- Puppeteer: `npm run test:ui:filters`.
