## Task workspace — `task-spa-search-03-t03-debounced-search-url-sync`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — Scope §boardQuery debounce
- **Depends on:** [T02](../task-spa-search-03-t02-board-page-cross-locale-filter/README.md) (может параллелить с T04)
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: implement — debounced search URL sync

### Цель
Debounce ввода search (~300ms) перед `applyFilters` → `?search=`; локальный draft для input; мгновенная синхронизация draft из URL при load/back/F5 (Story AC #2).

### Почему это важно (риск)
Сейчас каждый keystroke вызывает `navigate` — лишние history entries и фильтрация на каждую букву.

### Факты из кода (Code Facts / SSOT)
1. Мгновенный apply: [`BoardPage.jsx:197-199`](../../../../../../../../src/pages/BoardPage.jsx) — `onChange` → `applyFilters({...boardFilters, search})`.
2. `applyFilters` → `serializeBoardQuery` + `navigate` replace: [`BoardPage.jsx:116-118`](../../../../../../../../src/pages/BoardPage.jsx).
3. Search param SSOT: [`boardQuery.js:40,67-68`](../../../../../../../../src/router/boardQuery.js).
4. Panel filters — pending draft + batch Apply (SEARCH-02); search **вне** pending draft: [`useBoardFilterDraft.js`](../../../../../../../../src/hooks/useBoardFilterDraft.js).
5. Debounce hook отсутствует в `spa-app/src/hooks/`.

### Gap / Проблема
Нет debounce между UI input и URL update.

### AC/DoD
- [ ] (P0) Story AC #2: ввод обновляет `?search=` с debounce (default **300ms**, зафиксировать в коде/README).
- [ ] (P0) Без полной перезагрузки страницы (client-side navigate only).
- [ ] (P0) URL/back/F5: draft value синхронизируется **сразу** из `boardFilters.search` (без debounce на external change).
- [ ] (P0) Search не смешивается с pending draft FilterPanel (остаётся immediate path относительно panel batch).
- [ ] (P1) Clear button (T04) сбрасывает draft и debounced apply.

### Где менять код
- Новый: [`src/hooks/useDebouncedBoardSearch.js`](../../../../../../../../src/hooks/useDebouncedBoardSearch.js) (или inline в BoardPage если ≤30 строк)
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx) — SearchInput `value`/`onChange` wiring

### Out of scope
- Cross-locale matcher (T01–T02)
- Clear button markup (T04)
- Puppeteer (T07)

### Проверка
```bash
cd spa-app
npx vitest run src/pages/__tests__/BoardPage.search.test.jsx
```
