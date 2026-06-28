# Mockup 13 Spec — Dashboard Reset Filters Control

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-reset.png`  
**Version:** v2.0 (SEARCH-02 FilterPanel)  
**Status:** active SSOT for global `Reset Filters` control  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`  
**Implementation:** [`ResetFiltersControl.jsx`](../../../src/components/Filters/ResetFiltersControl.jsx), [`BoardPage.jsx`](../../../src/pages/BoardPage.jsx)

---

## 1) Что фиксирует этот мокап

Глобальный control `Reset Filters` (`.board-filter-reset`):

- быстро сбрасывает все активные фильтры и search;
- состояния `default`, `hover`, `disabled`;
- **три контекста размещения** (SEARCH-02):
  1. **Toolbar** — правый сегмент `.board-filters-row` (рядом с Search + «Фильтры»);
  2. **Panel footer** — внутри `.board-filter-panel-footer` (рядом с «Применить»);
  3. **No-results block** — внутри `.board-no-results` при пустом списке с активными фильтрами.

Это отдельный элемент, не часть per-filter dropdown.

---

## 2) Канонические признаки

- Холст: `1536x1024`.
- Toolbar instance: `.board-toolbar .board-filter-reset`.
- Panel footer instance: `.board-filter-panel-footer .board-filter-reset`.
- Визуальный стиль secondary control.
- `Disabled` когда нет активных фильтров и search пуст.

---

## 3) UX-правила

- `Reset Filters` очищает:
  - status-filter (applied + pending);
  - type-filter;
  - labels-filter;
  - search text.
- После reset:
  - все фильтры → default (`Any` / empty);
  - URL hash без filter params;
  - board перезапрашивает/пересчитывает список без фильтров.
- Если фильтры уже в default и search пуст — control **disabled** во всех контекстах.

---

## 4) Связь с другими control-ами

- `Clear` внутри status/type/labels dropdown очищает только свой фильтр в **черновике** панели.
- `Apply` (`.board-filter-apply`) фиксирует черновик → applied + URL.
- `Reset Filters` очищает всё сразу (applied + pending + search).
- Оба поведения (`Clear` per-filter vs global Reset) сосуществуют предсказуемо.

---

## 5) Selectors (runtime)

| Context | Selector |
|---------|----------|
| Toolbar | `.board-toolbar .board-filter-reset` |
| Panel footer | `.board-filter-panel-footer .board-filter-reset` |
| No-results | `.board-no-results .board-filter-reset` |

---

## 6) Scope-фокус

- Toolbar + панель + no-results + рабочая область board.

---

## 7) Что НЕ фиксируется этим мокапом

- Клавиатурные шорткаты для reset.
- Undo после reset.
- Локализация текста (i18n `resetFilters`).

---

## 8) Трассировка

- STORY-SPA-SEARCH-02: batch apply + dual Reset placement.
- `task-spa-search-02-t09-batch-apply-reset`.
- Puppeteer: `npm run test:ui:filters` (toolbar Reset path).
