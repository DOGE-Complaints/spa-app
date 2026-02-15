# Mockup 10 Spec — Dashboard Status Filter Control

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filter-status.png`  
**Version:** v1.0  
**Status:** active SSOT for status-filter control  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Компонент фильтра по статусу в toolbar board:
- выбор статусов для отображения issues;
- multi-select поведение (например, `NEW` + `VERIFIED`);
- состояния контрола (`default`, `hover`, `selected`, `disabled`).

---

## 2) Канонические признаки компонента

- Холст: `1536x1024`.
- Блок расположен в toolbar над рабочей областью board.
- Контрол поддерживает:
  - `Status: Any` (без фильтра);
  - раскрытие списка со статусами;
  - множественный выбор;
  - отображение выбранных значений chip-ами внутри контрола;
  - clear/reset.

---

## 3) State behavior

1. **Default**: `Status: Any`.
2. **Hover**: легкий контрастный акцент рамки/текста.
3. **Selected (multi-select)**:
   - внутри контрола отображаются выбранные chips;
   - dropdown содержит чекнутые статусы;
   - доступно действие `Clear`.
4. **Disabled**:
   - визуально читаем;
   - недоступен для интеракции;
   - не выглядит как ошибка.

---

## 4) UX-правила

- Контрол фильтрует board по `Issue.status`.
- `Any` эквивалентен отсутствию status-фильтра.
- `Clear` очищает только status-filter, не все фильтры целиком.
- Глобальный `Reset Filters` очищает все активные фильтры.

---

## 5) Scope-фокус

- Оцениваем в первую очередь toolbar + рабочую область board.
- Вариативность декоративной части мокапа (текст внизу, неточности генерации) не является runtime-требованием.

---

## 6) Что НЕ фиксируется этим мокапом

- Точная реализация dropdown (popover/select/custom listbox).
- Keyboard shortcut схема (кроме базовой доступности).
- Backend query syntax для фильтрации.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-filters-and-query-state` (основной scope).
- `task-add-epic03-empty-states` (`no-results` при активных фильтрах).
- `task-implement-epic03-issue-service-integration` (mapping selected statuses -> query options).
