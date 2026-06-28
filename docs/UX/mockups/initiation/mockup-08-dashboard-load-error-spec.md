# Mockup 08 Spec — Dashboard Load-Error State

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Dashboard-loading-error.png`  
**Version:** v1.0  
**Status:** active SSOT for Board `load-error` state  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Состояние `/#/board`, когда загрузка issues завершилась ошибкой:
- shell дашборда остается видимым;
- в рабочей области показан error-block;
- пользователю доступно действие повтора (`Retry`).

Фокус требований — рабочая область board.
Вариативность шапки/брендинга в генеративном мокапе не используем как SSOT.

---

## 2) Канонические признаки load-error

- Холст: `1536x1024`.
- Колонки и структура board остаются на месте (без layout shift).
- В центре рабочей области:
  - заголовок ошибки (`Unable to load issues.`);
  - поясняющая строка (`Data source is currently unavailable.`);
  - кнопка `Retry`.
- Нет skeleton-блоков (это не loading).
- Нет `no-issues/no-results` сообщений (это не empty).

---

## 3) UX-правила load-error

- `load-error` отображается только при `fetch` failure.
- `Retry` повторяет запрос данных в рамках того же экрана.
- После успешного retry:
  - переход в `default` / `no-issues` / `no-results` в зависимости от данных.
- Error-copy инженерный, без эмоциональных формулировок.

---

## 4) Visual guidelines

- Dark-тональность board сохраняется (`#0e0d12` .. `#25232c`).
- Error-block визуально вторичный относительно board-title и CTA.
- `Retry` — secondary action, не конкурирует с `Create Issue`.
- Проверка parity делается по рабочей области; вариации header игнорируются.

---

## 5) Что НЕ фиксируется этим мокапом

- Тексты системных ошибок по кодам (timeout, 5xx и т.д.).
- Глобальные toast/notification паттерны.
- Поведение details-route при ошибке.
- Нижние пояснительные строки на изображении.

---

## 6) Трассировка в задачи EPIC-03

- `task-add-epic03-empty-states` (load-error визуал + retry affordance).
- `task-implement-epic03-issue-service-integration` (error branch + retry lifecycle).
- `task-implement-epic03-board-main-visual-parity` (центрирование/ритм error-block в board grid).
