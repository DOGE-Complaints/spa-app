## Task workspace — `task-spa-search-01-t03-status-badge-board-columns`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: backlog Scope — `StatusBadge.jsx`; derived board columns
- **Depends on:** SPA-SEARCH-01-T02

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** react-expert  
---

## Task: implement — StatusBadge + board status columns for gateway set

### Цель
Обновить `StatusBadge` под статусы `NEW`/`IN_REVIEW`/`PUBLISHED` (включая `PUBLISHED`) и привести колонки доски к 3-column gateway layout.

### Почему это важно (риск)
После смены enum UI всё ещё рендерит 4 колонки (`VERIFIED`, `ARCHIVED`) — расхождение с данными и shell-тестами.

### Факты из кода (Code Facts / SSOT)
1. `STATUS_CLASS` — [`StatusBadge.jsx:5-10`](../../../../../../../../src/components/StatusBadge.jsx): `VERIFIED`/`ARCHIVED` + verified icon L32-34.
2. Board columns — [`BoardPage.jsx:270-333`](../../../../../../../../src/pages/BoardPage.jsx): 4 columns NEW/VERIFIED/IN_REVIEW/ARCHIVED.
3. Shell test expects 4 columns — [`BoardPage.shell.test.jsx:35-39`](../../../../../../../../src/pages/__tests__/BoardPage.shell.test.jsx).
4. `StatusFilter` — [`StatusFilter.jsx:5`](../../../../../../../../src/components/Filters/StatusFilter.jsx): `Object.values(ISSUE_STATUS)` — auto after T01.
5. Safe fallback — [`StatusBadge.jsx:10,13-14`](../../../../../../../../src/components/StatusBadge.jsx): `UNKNOWN` path.

### Gap / Проблема
Story AC #3; enum migration follow-on для BoardPage (не в backlog Scope, но обязателен для AC #1/#3).

### AC/DoD
- [ ] (P0) Story AC #3: StatusBadge рендерит `NEW`, `IN_REVIEW`, `PUBLISHED`; fallback для unknown.
- [ ] (P0) BoardPage: 3 status columns под gateway set (убрать VERIFIED/ARCHIVED columns).
- [ ] (P1) `StatusBadge.css` — стиль для `PUBLISHED` (заменить `verified` icon logic при необходимости).

### Где менять код
- [`src/components/StatusBadge.jsx`](../../../../../../../../src/components/StatusBadge.jsx)
- [`src/components/StatusBadge.css`](../../../../../../../../src/components/StatusBadge.css)
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — status columns

### Out of scope
- SEARCH-02 filter panel shell
- TypeFilter changes (auto via types.js)

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/__tests__/StatusBadge.test.jsx src/pages/__tests__/BoardPage.shell.test.jsx
```
