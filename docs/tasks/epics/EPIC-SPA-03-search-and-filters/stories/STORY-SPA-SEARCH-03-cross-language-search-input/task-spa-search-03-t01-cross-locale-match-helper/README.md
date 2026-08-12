## Task workspace — `task-spa-search-03-t01-cross-locale-match-helper`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md) — Scope §BoardPage filteredIssues; [search-filters-cto-interview D-S1](../../../../../../analysis/search-filters-cto-interview-2026-06-15.md)
- **Depends on:** SEARCH-02 Done (pkg-000009)
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: implement — cross-locale issue search match helper

### Цель
Вынести pure helper для матчинга `title`/`description` по **всем** локалям (`et`, `ru`, `en`) загруженного issue; foundation для `filteredIssues` в BoardPage (Story AC #3).

### Почему это важно (риск)
Сейчас поиск использует только `resolveLocalizedText` текущей UI-локали — ru-текст не находится при `locale=et`.

### Факты из кода (Code Facts / SSOT)
1. Текущий filter — только текущая локаль: [`BoardPage.jsx:94-100`](../../../../../../../../src/pages/BoardPage.jsx).
2. `resolveLocalizedText` — single locale: [`core.js:76-78`](../../../../../../../../src/i18n/core.js).
3. `LOCALE_CODES` — `['et','ru','en']`: [`core.js:8`](../../../../../../../../src/i18n/core.js).
4. Issue shape — `title`/`description` как `LocalizedText` object: [`mockIssues.js` DE-002](../../../../../../../../src/router/mockIssues.js).
5. Helper отсутствует — grep `issueMatchesSearch` / `issueSearchMatch` в `spa-app/src/**` → 0.

### Gap / Проблема
Нет переиспользуемой функции кросс-язычного substring-match по всем полям title+description.

### AC/DoD
- [ ] (P0) Story AC #3: `issueMatchesSearchQuery(issue, query)` матчит подстроку в **любой** локали `title`/`description`.
- [ ] (P0) Пустой/whitespace `query` → helper возвращает `true` (caller показывает полный набор).
- [ ] (P0) Поддержка transitional `string` и `{et,ru,en}` object на полях.
- [ ] (P0) Case-insensitive match (`toLowerCase` на query и собранном тексте).
- [ ] (P1) Unit tests: DE-002 ru `обучение` матчится независимо от UI locale.

### Где менять код
- Новый: [`src/router/issueSearchMatch.js`](../../../../../../../../src/router/issueSearchMatch.js) (или `src/i18n/issueSearchMatch.js`)
- Новый: [`src/router/__tests__/issueSearchMatch.test.js`](../../../../../../../../src/router/__tests__/issueSearchMatch.test.js)

### Out of scope
- BoardPage wiring (T02)
- Debounce / SearchInput UI (T03, T04)

### Проверка
```bash
cd spa-app
npx vitest run src/router/__tests__/issueSearchMatch.test.js
```
