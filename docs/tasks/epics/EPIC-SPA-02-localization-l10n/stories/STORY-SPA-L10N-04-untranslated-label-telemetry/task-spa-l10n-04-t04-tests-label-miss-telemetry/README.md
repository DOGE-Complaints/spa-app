## Task workspace — `task-spa-l10n-04-t04-tests-label-miss-telemetry`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) AC #6
- **Depends on:** SPA-L10N-04-T02, T03 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000006`  
**Skill declared:** javascript-pro  
---

## Task: tests — label-miss telemetry coverage

### Цель
Покрыть AC #6: событие на humanize-ветке; нет события при попадании в словарь; нет при выключенном `VITE_TELEMETRY_ENABLED`; dedup повторного `{label_key, locale}`.

### Почему это важно (риск)
Телеметрия — некритичный путь; без тестов регрессии (silent no-op или лишние fetch) незаметны.

### Факты из кода (Code Facts / SSOT)
1. Существующие: [`labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js) — `usedHumanize` cases.
2. Новый модуль T02: `labelMissTelemetry.js` — unit-testable с mock `fetch`.
3. Story AC #6 — явный список сценариев.

### Gap / Проблема
Нет тестов телеметрии humanize-miss.

### AC/DoD
- [x] (P0) Story AC #6: тест emit на humanize-miss.
- [x] (P0) Story AC #6: нет emit при dictionary hit.
- [x] (P0) Story AC #6: нет emit при `VITE_TELEMETRY_ENABLED=false`.
- [x] (P1) Dedup: второй вызов same `{label_key, locale}` — один fetch.
- [x] (P0) `npx vitest run` — green.

### Где менять код
- Новый/расширить: [`src/i18n/__tests__/labelMissTelemetry.test.js`](../../../../../../../../src/i18n/__tests__/labelMissTelemetry.test.js)
- Расширить: [`src/i18n/__tests__/labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js)

### Out of scope
- E2E browser tests
- Gateway integration tests

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/labelMissTelemetry.test.js
npx vitest run src/i18n/__tests__/labelDisplay.test.js
npx vitest run
```
