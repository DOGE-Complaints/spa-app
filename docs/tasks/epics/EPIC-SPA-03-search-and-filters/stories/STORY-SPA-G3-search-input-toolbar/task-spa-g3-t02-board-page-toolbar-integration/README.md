## Task workspace — `task-spa-g3-t02-board-page-toolbar-integration`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: Scope §2–3; contract §3 URL-контракт
- **Depends on:** T01 Done; T03 Done (placeholder key)

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000007`  
**Skill declared:** react-expert  
---

## Task: implement — BoardPage toolbar SearchInput + applyFilters wiring

### Цель
Вставить `SearchInput` в `board-filters-row` перед `StatusFilter`; связать ввод с `applyFilters({ ...boardFilters, search })` через существующий `serializeBoardQuery` (Story AC #1, #2, #3).

### Почему это важно (риск)
Компонент без интеграции не обновляет hash-URL и не влияет на `filteredIssues`.

### Факты из кода (Code Facts / SSOT)
1. Тулбар без SearchInput — [`BoardPage.jsx:171-195`](../../../../../../../../src/pages/BoardPage.jsx).
2. `boardFilters = parseBoardQuery(location.search)` — [`BoardPage.jsx:39`](../../../../../../../../src/pages/BoardPage.jsx).
3. `applyFilters` → `serializeBoardQuery` + `navigate` replace — [`BoardPage.jsx:93-96`](../../../../../../../../src/pages/BoardPage.jsx).
4. `filteredIssues` уже фильтрует по `boardFilters.search` — [`BoardPage.jsx:69-76`](../../../../../../../../src/pages/BoardPage.jsx); семантику не менять.
5. Barrel export — [`Filters/index.js`](../../../../../../../../src/components/Filters/index.js) — добавить `SearchInput`.

### Gap / Проблема
Пользователь не может ввести поиск в UI; URL-параметр `search` меняется только вручную.

### AC/DoD
- [x] (P0) Story AC #1: на `/#/board` поле поиска видно в тулбаре рядом с фильтрами.
- [x] (P0) Story AC #2: ввод вызывает `applyFilters` → `?search=` в hash-URL без full page reload.
- [x] (P0) Story AC #3: список issues фильтруется как до UI (логика `filteredIssues` без изменений).
- [x] (P1) `SearchInput` value = `boardFilters.search`; export из `Filters/index.js`.

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — import, toolbar JSX, `onChange` handler
- [`src/components/Filters/index.js`](../../../../../../../../src/components/Filters/index.js) — export `SearchInput`

### Out of scope
- Изменение `boardQuery.js` / `filteredIssues` алгоритма
- IssuePage search
- Gateway `search` param (client-only per contract §0)

### Проверка
```bash
cd spa-app
npm run dev
# /#/board — ввод текста → URL ?search=... ; список сужается
```
