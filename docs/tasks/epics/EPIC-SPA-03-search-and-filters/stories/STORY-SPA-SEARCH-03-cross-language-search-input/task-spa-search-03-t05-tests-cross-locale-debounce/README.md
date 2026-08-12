## Task workspace — `task-spa-search-03-t05-tests-cross-locale-debounce`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — AC #5
- **Depends on:** [T02](../task-spa-search-03-t02-board-page-cross-locale-filter/README.md), [T03](../task-spa-search-03-t03-debounced-search-url-sync/README.md)
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: tests — cross-locale match and debounced search

### Цель
Vitest coverage: кросс-язычный матч (ru-слово при locale=et) + debounce URL + regression URL/reset (Story AC #5).

### Почему это важно (риск)
Без теста ru-query при et UI регрессия D-S1 незаметна; debounce легко сломать при рефакторе BoardPage.

### Факты из кода (Code Facts / SSOT)
1. Существующие search tests — URL sync only: [`BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx).
2. T01 unit tests — [`issueSearchMatch.test.js`](../../../../../../../../src/router/__tests__/issueSearchMatch.test.js) (после T01).
3. Seed DE-002 ru title: [`mockIssues.js:25`](../../../../../../../../src/router/mockIssues.js) — `Переход на обучение на эстонском`.
4. FAKE-OLD mode — `ROUTING_DEMO_ISSUES` в dev routing.

### Gap / Проблема
Нет теста «ищем ru-слово при locale=et» и debounce behavior.

### AC/DoD
- [ ] (P0) Story AC #5: `npx vitest run` — green.
- [ ] (P0) Тест: query `обучение` (или substring) при UI locale `et` — DE-002 присутствует в отфильтрованном render/markup.
- [ ] (P0) Тест debounce: `vi.useFakeTimers()` — URL/search param не обновляется на каждый intermediate keystroke до flush.
- [ ] (P1) Regression: `?search=` sync с input value; Reset enabled when only search active.

### Где менять код
- [`src/pages/__tests__/BoardPage.search.test.jsx`](../../../../../../../../src/pages/__tests__/BoardPage.search.test.jsx) — расширить
- При необходимости: [`src/hooks/__tests__/useDebouncedBoardSearch.test.js`](../../../../../../../../src/hooks/__tests__/useDebouncedBoardSearch.test.js)

### Out of scope
- Puppeteer smoke (T07)
- Doc touchpoints (T06)

### Проверка
```bash
cd spa-app
npx vitest run
```
