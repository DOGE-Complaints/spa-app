# Mockup 15 Spec — Routing Behavior Sheet

**Source type:** UX behavior sheet (non-visual)  
**Version:** v1.0  
**Status:** active SSOT for navigation behavior  
**Related epic:** `docs/epics/EPIC-03-issue-board-mvp.md`

> **Статус реализации (2026-06-16):** соответствует коду — `?search=` синхронизируется с `SearchInput` в toolbar (STORY-SPA-G3 Done).

---

## 1) Контекст и ограничения MVP

- Routing: hash-based only (`/#/board`, `/#/issue/:id`).
- Backend session state: отсутствует.
- Cookies/session-storage: не обязательны для маршрутизации.
- Цель: предсказуемая навигация между board и details без серверного fallback.

---

## 2) Принятая стратегия URL-state

**Выбранная стратегия:** фильтры board хранятся в hash query-параметрах.

Пример:
- `/#/board?status=NEW,VERIFIED&type=complaint&labels=bureaucracy,infrastructure&search=bridge`

Следствия:
- `Details -> Back to Board` возвращает пользователя с теми же фильтрами.
- Прямое открытие board-link с query восстанавливает состояние фильтров.
- Если query нет, board открывается в unfiltered state.

---

## 3) Сценарии поведения (обязательные)

### Scenario A — Board -> Details

1. Пользователь кликает `IssueCard`.
2. Hash меняется на `/#/issue/:id` (пример: `/#/issue/DE-042`).
3. Рендерится details-страница выбранной issue.

### Scenario B — Details -> Board (Back)

1. Пользователь нажимает `Back to Board`.
2. Если details открыт из board, используется сохраненный board URL (включая query filters).
3. Переход на `/#/board` + восстановление filter query из сохраненного URL.
4. При direct-open details (без сохраненного board URL) переход на `/#/board` без query.

### Scenario C — Direct open Details

1. Пользователь открывает URL `/#/issue/:id` напрямую.
2. Board не рендерится как промежуточный экран.
3. Если ID существует -> details default.
4. Если ID отсутствует -> details `not-found`.
5. Если чтение issue завершилось сетевой ошибкой -> details `load-error` с `Retry`.

### Scenario D — Invalid route

1. Пользователь открывает неизвестный hash path (пример: `/#/unknown`).
2. Выполняется redirect на `/#/board`.
3. Отдельная 404-страница в MVP не используется.

---

## 4) Контракт для реализации

- Parse/serialize filter query должен быть стабильным и обратимым.
- Unknown query-параметры не ломают рендер (игнорируются).
- Входные сценарии должны поддерживать перезагрузку страницы.

---

## 5) Что НЕ фиксируется этим sheet

- SEO behavior.
- History stack optimization за пределами базового `back`.
- Server-side redirects.

---

## 6) Трассировка в задачи EPIC-03

- `task-implement-epic03-routing-behavior-sheet` (основной task).
- `task-implement-epic03-filters-and-query-state` (URL sync filters).
- `task-implement-epic03-issue-details-route` (direct-open + not-found).
