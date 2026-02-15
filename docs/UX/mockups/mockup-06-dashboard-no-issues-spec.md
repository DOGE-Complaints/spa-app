# Mockup 06 Spec — Dashboard No-Issues State

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-empty.png`  
**Version:** v1.0  
**Status:** active SSOT for Board `no-issues` state  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Состояние `/#/board`, когда:
- система уже загрузилась;
- ошибок нет;
- список issues пустой.

Экран показывает shell дашборда и централизованный empty-block с нейтральным сообщением.

---

## 2) Канонические признаки no-issues

- Холст: `1536x1024`.
- Header, sidebar, toolbar, status columns остаются видимыми.
- В колонках нет карточек и нет skeleton-блоков.
- В центре board-region:
  - neutral icon (doge marker style);
  - сообщение `No issues recorded.`

---

## 3) UX-правила no-issues

- `no-issues` показывается только после завершенного fetch (`loading=false`).
- Это состояние не равно `no-results`:
  - `no-issues` = в системе нет данных;
  - `no-results` = фильтры скрыли доступные данные.
- Это состояние не равно `load-error`:
  - no-issues без retry-error копирайта.
- В empty-блоке не размещаем дополнительный CTA (по канону); основной `Create Issue` остается в toolbar.

---

## 4) Visual guidelines

- Общий тон dark board сохраняется (`#0b0a0e` .. `#222128`).
- Empty-icon и copy вторичны по визуальному весу относительно заголовка board.
- Copy инженерный, без эмоциональных формулировок.
- Никаких “warning/error” цветов в no-issues состоянии.

---

## 5) Что НЕ фиксируется этим мокапом

- No-results вариант при примененных фильтрах.
- Retry/error сценарий.
- Loading skeleton.
- Нижние пояснительные строки на изображении.

---

## 6) Трассировка в задачи EPIC-03

- `task-add-epic03-empty-states` (основной scope no-issues/no-results/load-error).
- `task-implement-epic03-issue-service-integration` (условия перехода в `no-issues` после fetch).
- `task-implement-epic03-board-main-visual-parity` (позиционирование empty-блока в сетке board).
