# Mockup 09 Spec — Issue Details Main (Read-Only)

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Issue-main.png`  
**Version:** v1.0  
**Status:** active SSOT for Issue details default state  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

---

## 1) Что фиксирует этот мокап

Default экран одной issue по маршруту `/#/issue/:id`:
- подробный read-only просмотр данных;
- возврат к board;
- метаданные issue в основной рабочей области.

Изменение данных на экране отсутствует (никаких edit/update controls).

---

## 2) Канонические признаки details main

- Холст: `1536x1024`.
- В основной области:
  - back affordance `Back to Board`;
  - header with `Issue.id` + `status badge` + `title`;
  - body с описанием (если есть);
  - metadata block (`labels`, `created_at`, `arweave_txid`, `image_txid`, `image_hash`).
- Экран read-only: нет кнопок изменения статуса/контента.

---

## 3) UX-правила

- `Back to Board` всегда доступен и возвращает на `/#/board`.
- Все optional поля показываются по правилу `if present`.
- Если optional отсутствуют — без ошибок верстки и без ложных заглушек.
- Дублирующий status-badge в header допустим, если это часть иерархии состояния.
- Детальная матрица optional metadata вариантов определяется в `M14`.

---

## 4) Фокус области и shell-правило

- Источник требований: основная content area details-экрана.
- Header/sidebar могут быть общими с board-shell (Jira-подобный pattern) и берутся из layout-SSOT.
- Вариативность декоративных нижних строк на мокапе не учитывается как runtime-требование.

---

## 5) Visual guidelines

- Dark-mode палитра консистентна board-экрану (`#0e0d12` .. `#25232c`).
- `Issue.title` — главный визуальный акцент; badges/labels вторичны.
- Metadata читаемая, но не доминирует над описанием.
- Нет warning/error тональности в default details state.

---

## 6) Что НЕ фиксируется этим мокапом

- Details loading/not-found/load-error состояния.
- Edit/workflow controls (в MVP вне scope).
- Поведение live-refresh.

---

## 7) Трассировка в задачи EPIC-03

- `task-implement-epic03-issue-details-route` (основной scope details main).
- `task-implement-epic03-issue-service-integration` (данные `getIssue(id)` + lifecycle).
- `task-implement-epic03-status-badge-system` (badge в details header).
