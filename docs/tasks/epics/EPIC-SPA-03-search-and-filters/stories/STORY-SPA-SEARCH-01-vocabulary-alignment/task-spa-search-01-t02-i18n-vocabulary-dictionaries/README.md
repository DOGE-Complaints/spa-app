## Task workspace — `task-spa-search-01-t02-i18n-vocabulary-dictionaries`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: backlog Scope — `labelKeys.js`, `dictionaries.js`
- **Depends on:** SPA-SEARCH-01-T01

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** javascript-pro  
---

## Task: implement — gateway label keys and i18n dictionaries

### Цель
Заменить `AVAILABLE_LABELS` на gateway governed-набор и обновить переводы `status.*`, `issueType.*`, `labels.*` (et/ru/en).

### Почему это важно (риск)
Фильтры и UI показывают human-readable labels через dictionaries; старые ключи (`bureaucracy`, `complaint`) не соответствуют данным gateway.

### Факты из кода (Code Facts / SSOT)
1. `AVAILABLE_LABELS` — [`labelKeys.js:6-19`](../../../../../../../../src/i18n/labelKeys.js): 10 SPA keys.
2. Target labels — [`enums.py:22-29`](../../../../../../../../../doge-complaints-gateway/src/core/projection/enums.py): `waste`, `district`, `infrastructure`, `safety`.
3. Dictionaries — [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js): `status.*`, `issueType.*`, `labels.*` под старые ключи.
4. Completeness guard — [`labelDisplay.test.js:41`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js): `AVAILABLE_LABELS` et/ru/en.
5. L10N-02: board filter options from loaded issues; `AVAILABLE_LABELS` = curated core only ([`labelKeys.js:3-5`](../../../../../../../../src/i18n/labelKeys.js) JSDoc).

### Gap / Проблема
Story AC #1 (labels) и AC #2 — переводы отсутствуют/устарели для gateway keys.

### AC/DoD
- [ ] (P0) Story AC #1: `AVAILABLE_LABELS` = `{waste, district, infrastructure, safety}`.
- [ ] (P0) Story AC #2: `status.*`/`issueType.*`/`labels.*` для всех новых ключей в et/ru/en.
- [ ] (P1) Completeness guard (`labelDisplay.test.js`) — green.

### Где менять код
- [`src/i18n/labelKeys.js`](../../../../../../../../src/i18n/labelKeys.js)
- [`src/i18n/dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js)

### Out of scope
- StatusBadge CSS (T03)
- Удаление старых ключей из gap-report docs (T06)

### Проверка
```bash
cd spa-app
npm run test:run -- src/i18n/__tests__/labelDisplay.test.js
```
