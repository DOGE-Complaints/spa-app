## Task workspace — `task-spa-l10n-03-t06-tests-translation-fallback-markers`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** T01–T05

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** react-expert  
---

## Task: tests — translation fallback and MT marker coverage

### Цель
Закрыть Story AC #6: unit/integration tests для MT-маркера по `original_locale` (включая отсутствие поля), resolver resolved locale, humanize flag; полный suite green.

### Почему это важно (риск)
Маркеры — продуктовое обещание честности контента; без тестов регрессия к молчаливому fallback незаметна.

### Факты из кода (Code Facts / SSOT)
1. Story AC #6 — `npx vitest run` green + MT marker + resolver locale tests.
2. Existing: [`core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js), [`labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js), [`IssueCard.test.jsx`](../../../../../../../../src/components/IssueCard/__tests__/IssueCard.test.jsx).

### Gap / Проблема
Нет тестов на MT marker logic и resolver metadata.

### AC/DoD
- [x] (P0) Story AC #6: MT marker — locale in/out of `original_locale`; absent field → no MT marker.
- [x] (P0) Story AC #6: resolver test — «какая локаль использована» при fallback chain.
- [x] (P0) Story AC #6: humanize flag test для dictionary miss.
- [x] (P0) `npx vitest run` — green (no regressions).

### Где менять код
- [`src/i18n/__tests__/core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js)
- [`src/i18n/__tests__/labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js)
- Новые tests для marker helpers / IssueCard (по необходимости)

### Out of scope
- Puppeteer UI smoke
- Doc updates (T07)

### Проверка
```bash
cd spa-app
npx vitest run
```
