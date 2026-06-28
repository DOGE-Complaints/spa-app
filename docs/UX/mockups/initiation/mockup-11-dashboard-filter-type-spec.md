# Mockup 11 Spec — Dashboard Type Filter Control

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-type.png`  
**Version:** v1.0  
**Status:** active SSOT for type-filter control  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Компонент фильтра по типу issue в toolbar board:
- выбор одного типа issue для отображения;
- состояния контрола (`default`, `hover`, `selected`, `disabled`);
- clear/reset поведение.

---

## 2) Канонические признаки компонента

- Холст: `1536x1024`.
- Контрол расположен в toolbar рядом со status/labels/search.
- Базовый режим: `Type: Any`.
- Dropdown содержит значения:
  - `complaint`
  - `observation`
  - `absurdity`
  - `system_bug`
- Выбор в MVP трактуется как single-select (`one-of`), не multi-select.

---

## 3) State behavior

1. **Default**: `Type: Any`.
2. **Hover**: легкий акцент рамки/контраста.
3. **Selected**:
   - отображается выбранный тип (`Type: Complaint`, etc.);
   - в списке отмечен один пункт.
4. **Disabled**:
   - визуально читаем;
   - недоступен для интеракции;
   - не выглядит как error state.

---

## 4) UX-правила

- `Any` эквивалентен отсутствию type-фильтра.
- `Clear` очищает только type-filter.
- `Reset Filters` очищает все активные фильтры.
- Type-filter должен работать совместно со status/labels/search без конфликтов query-state.

---

## 5) Scope-фокус

- Основной источник требований: toolbar + рабочая область board.
- Вариативность декоративной части генеративного мокапа не считается runtime-требованием.

---

## 6) Что НЕ фиксируется этим мокапом

- Реализация dropdown на уровне конкретной UI-библиотеки.
- Полная keyboard matrix beyond baseline accessibility.
- Локализация названий типов.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-filters-and-query-state` (основной scope type-filter control).
- `task-add-epic03-empty-states` (`no-results` при type-filter constraints).
- `task-implement-epic03-issue-service-integration` (mapping выбранного `type` в query options).
