## Task workspace — `task-spa-l10n-01-t05-tests-n-locale-extensibility`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Depends on:** T02, T03, T04 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: tests — N-locale extensibility and grep guards

### Цель
Закрепить Story AC #2, #5, #6: тест гипотетической 4-й локали (реестр + словарь only), grep-guard от хардкода, green suite.

### Почему это важно (риск)
Без extensibility-теста N-готовность остаётся декларацией; grep AC #2 регрессирует незаметно.

### Факты из кода (Code Facts / SSOT)
1. Story AC #5: 4-я локаль — правки только реестр + dictionaries.
2. Story AC #2: grep `src/` — исключение «только данные/тесты» (StatusBadge и test fixtures допустимы).
3. [`core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js) — базовые helpers.

### Gap / Проблема
Нет automated guard на AC #2/#5.

### AC/DoD
- [x] (P0) Story AC #5: тест/ревью-документ — добавление mock 4-й локали в реестр + UI_DICTIONARY не требует правок Board/Issue/core logic.
- [x] (P0) Story AC #2: verification script или test-doc с `rg` и списком допустимых исключений.
- [x] (P0) Story AC #6: `npx vitest run` — green.

### Где менять код
- [`src/i18n/__tests__/core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js) и/или новый `localeRegistry.test.js`

### Out of scope
- Production 4-й язык
- E2E puppeteer

### Проверка
```bash
cd spa-app
npx vitest run
rg "'et'|'ru'|'en'" src/ --glob '!**/__tests__/**'
```
