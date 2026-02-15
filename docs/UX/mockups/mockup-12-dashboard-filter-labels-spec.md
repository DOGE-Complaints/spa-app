# Mockup 12 Spec — Dashboard Labels Filter Control

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-labels.png`  
**Version:** v1.0  
**Status:** active SSOT for labels-filter control  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Компонент фильтра по тегам (`labels`) в toolbar board:
- множественный выбор категорий;
- поиск по label внутри dropdown;
- состояния контрола (`default`, `hover`, `selected`, `disabled`);
- действие `Clear all`.

---

## 2) Канонические признаки компонента

- Холст: `1536x1024`.
- Контрол расположен рядом с `status/type` фильтрами.
- Базовый режим: `Labels` (без выбранных тегов).
- В selected-состоянии отображается агрегированное значение:
  - пример: `Labels: BUREAUCRACY, HEALTHCARE`.
- Dropdown содержит:
  - поле `Search labels`;
  - список чекбоксов label;
  - action `Clear all`.

---

## 3) State behavior

1. **Default**: label-фильтр пустой.
2. **Hover**: мягкий контрастный акцент.
3. **Selected (multi-select)**:
   - несколько label отмечены чекбоксами;
   - выбранные отражаются в заголовке контрола (в сокращенном виде при необходимости).
4. **Disabled**:
   - читаем визуально;
   - интерактивность отключена;
   - не выглядит как error state.

---

## 4) UX-правила

- `labels` фильтр работает как `OR` между выбранными label в MVP.
- `Clear all` очищает только labels-filter.
- Глобальный `Reset Filters` очищает все фильтры.
- Поиск внутри dropdown фильтрует список доступных label, не сам список issues.

---

## 5) Scope-фокус

- Основной источник требований: toolbar + рабочая область board.
- Декоративные/генеративные неточности вне этого компонента не считаются runtime-требованием.

---

## 6) Что НЕ фиксируется этим мокапом

- Точная стратегия сокращения длинного списка выбранных label.
- Полная keyboard matrix dropdown beyond base accessibility.
- Политика ранжирования label в выдаче.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-filters-and-query-state` (основной scope labels-filter).
- `task-add-epic03-empty-states` (`no-results` при labels constraints).
- `task-implement-epic03-issue-service-integration` (mapping `labels[]` в query options).
