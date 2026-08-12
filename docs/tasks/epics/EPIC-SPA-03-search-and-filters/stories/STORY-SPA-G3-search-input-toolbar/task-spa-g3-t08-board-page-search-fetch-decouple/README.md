## Task workspace — `task-spa-g3-t08-board-page-search-fetch-decouple`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md) §3 F2
- **Depends on:** SPA-G3-T07 рекомендуется (зелёная сюита); не блокер
- **activation:** `run_mode=spa_g3_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** Done  
**Wave:** `run_mode=spa_g3_audit_2026_06_16` (post-audit; **не** pkg-000007)  
**Skill declared:** react-expert  
---

## Task: fix — decouple client-side search from server fetch effect

### Цель
Ввод в SearchInput меняет только client-side `filteredIssues` и `?search=` в URL; **не** триггерит повторный `issueService.getIssues()` на каждую клавишу.

### Почему это важно (риск)
G3 усилил pre-existing связку: `useEffect([location.search])` → `fetchIssues()` на каждое изменение `?search=`; в `GFL-DRIVEN` это сетевой `GET /tallinn/issues` на каждую букву без debounce.

### Факты из кода (Code Facts / SSOT)
1. Fetch effect — [`BoardPage.jsx:66-68`](../../../../../../../../src/pages/BoardPage.jsx): `useEffect(() => fetchIssues(), [location.search])`.
2. Fetch options без `search` — [`BoardPage.jsx:48-51`](../../../../../../../../src/pages/BoardPage.jsx): только `status`/`type`/`labels`.
3. Client-side search — [`BoardPage.jsx:70-77`](../../../../../../../../src/pages/BoardPage.jsx): `filteredIssues` по `boardFilters.search`.
4. SearchInput wire — [`BoardPage.jsx:175`](../../../../../../../../src/pages/BoardPage.jsx): `applyFilters({...boardFilters, search})`.
5. Audit F2 — [audit-STORY-SPA-G3-execution-2026-06-16.md](../../../../../../analysis/audit-STORY-SPA-G3-execution-2026-06-16.md) §3 F2.

### Gap / Проблема
Изменение только `search` в URL инициирует лишний серверный refetch; debounce отложен в SEARCH-03.

### AC/DoD
- [x] (P0) Audit F2: изменение только `?search=` **не** вызывает `issueService.getIssues()` (тест со spy/mock или стабильный server-filter key).
- [x] (P0) Изменение `status`/`type`/`labels` по-прежнему инициирует fetch.
- [x] (P0) `filteredIssues` семантика без изменений (single-locale client-side).
- [x] (P1) G3 search-тесты green — [`BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx).
- [x] (P0) Артефакт `acceptance-verification-spa-g3-t08.md` в этой task-папке.

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — dependency `useEffect` (server-filter key без `search`)
- Опционально: [`src/pages/__tests__/BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) — assert no refetch on search-only

### Out of scope
- Debounce SearchInput (SEARCH-03)
- Кросс-язычный поиск
- Gateway / repository changes
- Новый pkg

### Проверка
```bash
cd spa-app
npm run test:run -- src/pages/__tests__/BoardPage.search.test.jsx src/pages/__tests__/BoardPage.shell.test.jsx
npm run test:run
```
