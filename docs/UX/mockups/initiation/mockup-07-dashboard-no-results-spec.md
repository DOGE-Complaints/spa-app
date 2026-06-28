# Mockup 07 Spec — Dashboard No-Results (Filters Applied)

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-filters-empty.png`  
**Version:** v1.0  
**Status:** active SSOT for Board `no-results` state  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Состояние `/#/board`, когда:
- данные в системе есть;
- пользователь применил фильтры;
- по текущему набору фильтров совпадений нет.

Фокус — рабочая область board (columns + empty message + filters context).
Вариативность шапки в генерации не является источником требований.

---

## 2) Канонические признаки no-results

- Холст: `1536x1024`.
- Board shell остается стабильным (без layout shift).
- В toolbar видны активные filter chips/criteria.
- В рабочей области колонок нет карточек.
- В центре board-region отображается neutral сообщение:
  - `No issues match current filters.`
- Есть affordance на сброс фильтров (`Reset Filters`).

---

## 3) UX-правила no-results

- `no-results` показывается только если:
  - fetch завершен успешно,
  - фильтры активны,
  - filtered list пустой.
- `no-results` != `no-issues`:
  - `no-results` объясняет, что проблема в текущем фильтре;
  - `no-issues` — в системе действительно нет данных.
- `no-results` != `load-error`:
  - нет error-маркеров, нет retry-error copy.

---

## 4) Visual guidelines

- Общий dark board стиль сохраняется (`#0e0d12` .. `#292831`).
- Empty copy нейтральная, инженерная, без эмоционального тона.
- `Reset Filters` читаем как secondary action, не конкурирует с `Create Issue`.
- Валидация макета выполняется по рабочей области; вариативность header-брендинга игнорируется.

---

## 5) Что НЕ фиксируется этим мокапом

- Логика конкретного синтаксиса filter chips.
- Поведение no-results на details route.
- Full error copy и retry.
- Нижние пояснительные строки в мокапе.

---

## 6) Трассировка в задачи EPIC-03

- `task-implement-epic03-filters-and-query-state` (активные фильтры + clear/reset action).
- `task-add-epic03-empty-states` (визуальный сценарий no-results).
- `task-implement-epic03-issue-service-integration` (разграничение `success-empty` и `success-filtered-empty`).
