## Task workspace — `task-spa-l10n-01-t02-core-resolution-from-registry`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Depends on:** T01 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: refactor — core locale resolution from registry

### Цель
Перевести `normalizeLocale`, `resolveLanguage` (default), `resolveLocalizedText` (fallback-цепочка) и дефолт `I18nProvider` на чтение из реестра T01 (GL-6).

### Почему это важно (риск)
Хардкод et/ru/en в core ломает N-готовность: новый язык потребует правок в нескольких функциях.

### Факты из кода (Code Facts / SSOT)
1. [`core.js:7-9`](../../../../../../../../src/i18n/core.js) — `normalizeLocale` if/startsWith et/ru/en.
2. [`core.js:24`](../../../../../../../../src/i18n/core.js) — `resolveLanguage` default `'et'`.
3. [`core.js:33-35`](../../../../../../../../src/i18n/core.js) — `resolveLocalizedText` fallback et→ru→en.
4. [`I18nProvider.jsx:22`](../../../../../../../../src/i18n/I18nProvider.jsx) — SSR fallback `'et'`.
5. [`core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js) — ожидания на текущее поведение.

### Gap / Проблема
Логика резолва не читает `SUPPORTED_LOCALES` реестр.

### AC/DoD
- [x] (P0) Story AC #1: default locale = первая запись реестра (или явный default из реестра).
- [x] (P0) Story AC #2 (partial): `normalizeLocale` / `resolveLanguage` / `resolveLocalizedText` без хардкод-списков et/ru/en в core.js.
- [x] (P0) `I18nProvider` SSR default из реестра, не литерал `'et'`.
- [x] (P1) [`core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js) обновлён под registry-driven поведение.

### Где менять код
- [`src/i18n/core.js`](../../../../../../../../src/i18n/core.js)
- [`src/i18n/I18nProvider.jsx`](../../../../../../../../src/i18n/I18nProvider.jsx)
- [`src/i18n/__tests__/core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js)

### Out of scope
- BoardPage/IssuePage selector (T03)
- dictionaries `languages.*` (T04)

### Проверка
```bash
cd spa-app
npm run test:run
rg "'et'|'ru'|'en'" src/i18n/core.js src/i18n/I18nProvider.jsx
```
