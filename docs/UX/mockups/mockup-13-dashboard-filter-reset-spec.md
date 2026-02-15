# Mockup 13 Spec — Dashboard Reset Filters Control

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-reset.png`  
**Version:** v1.0  
**Status:** active SSOT for global `Reset Filters` control  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Глобальный control `Reset Filters` в toolbar board:
- быстро сбрасывает все активные фильтры;
- имеет состояния `default`, `hover`, `disabled`.

Это отдельный элемент управления над списком issues, не часть конкретного dropdown.

---

## 2) Канонические признаки

- Холст: `1536x1024`.
- Позиция: правый сегмент filters toolbar.
- Визуальный стиль secondary control (не конкурирует с primary `Create Issue`).
- `Disabled` состояние визуально читаемо и недоступно для клика.

---

## 3) UX-правила

- `Reset Filters` очищает:
  - status-filter;
  - type-filter;
  - labels-filter;
  - search text.
- После reset:
  - все фильтры возвращаются к default (`Any` / empty);
  - board перезапрашивает/пересчитывает список без фильтров.
- Если фильтры уже в default, control должен быть disabled.

---

## 4) Связь с другими control-ами

- `Clear` внутри status/type/labels очищает только свой фильтр.
- `Reset Filters` очищает все сразу.
- Оба поведения должны существовать параллельно и быть предсказуемыми.

---

## 5) Scope-фокус

- Валидация по toolbar + рабочей области board.
- Декоративные/генеративные отклонения в макете не считаются runtime-требованием.

---

## 6) Что НЕ фиксируется этим мокапом

- Клавиатурные шорткаты для reset.
- Undo после reset.
- Локализация текста `Reset Filters`.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-filters-and-query-state` (основной scope global reset).
- `task-add-epic03-empty-states` (корректный выход из `no-results` после reset).
- `task-implement-epic03-issue-service-integration` (query options reset -> unfiltered fetch).
