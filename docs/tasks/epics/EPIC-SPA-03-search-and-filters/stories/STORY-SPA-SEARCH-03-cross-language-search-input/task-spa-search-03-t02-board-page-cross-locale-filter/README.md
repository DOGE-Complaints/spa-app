## Task workspace — `task-spa-search-03-t02-board-page-cross-locale-filter`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — Scope §BoardPage filteredIssues
- **Depends on:** [T01](../task-spa-search-03-t01-cross-locale-match-helper/README.md)
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: implement — BoardPage cross-locale filteredIssues

### Цель
Заменить inline `filteredIssues` в BoardPage на helper из T01; пустой search → полный `issues` (Story AC #3, #4).

### Почему это важно (риск)
Без wiring helper остаётся мёртвым кодом; доска продолжит искать только по текущей локали.

### Факты из кода (Code Facts / SSOT)
1. Inline filter: [`BoardPage.jsx:94-100`](../../../../../../../../src/pages/BoardPage.jsx) — `resolveLocalizedText(issue.title)` + description.
2. `boardFilters.search` из URL: [`boardQuery.js:40,67-68`](../../../../../../../../src/router/boardQuery.js).
3. `serverFilterKey` **не** включает search — client-side only: [`boardQuery.js:64-74`](../../../../../../../../src/router/boardQuery.js).
4. T01 helper — `issueMatchesSearchQuery` (после T01 Done).

### Gap / Проблема
BoardPage не использует кросс-язычный matcher.

### AC/DoD
- [ ] (P0) Story AC #3: при `?search=` доска показывает issues с совпадением в любой локали title/description.
- [ ] (P0) Story AC #4: пустой/отсутствующий `search` → `filteredIssues === issues` (весь загруженный набор).
- [ ] (P0) Импорт и вызов T01 helper; удалить дублирующую логику `resolveLocalizedText` в filter path.
- [ ] (P1) Не менять `fetchIssues` / `serverFilterKey` семантику.

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — `filteredIssues` IIFE (~94-100)

### Out of scope
- Debounce URL (T03)
- SearchInput clear UI (T04)
- Integration tests (T05)

### Проверка
```bash
cd spa-app
npx vitest run src/router/__tests__/issueSearchMatch.test.js
npm run test:run -- src/pages/__tests__/BoardPage.search.test.jsx
```
