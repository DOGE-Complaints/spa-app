## Task workspace — `task-spa-l10n-01-t01-locale-registry-data-model`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Depends on:** —

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: implement — locale registry data model (SUPPORTED_LOCALES SSOT)

### Цель
Расширить `SUPPORTED_LOCALES` до реестра объектов `{ code, endonym, flag, dir }` и экспортировать как единственный источник метаданных локалей (Story AC #1).

### Почему это важно (риск)
Без структурированного реестра дублирование `LANGUAGE_OPTIONS` и хардкод et/ru/en в core продолжит drift (GL-1).

### Факты из кода (Code Facts / SSOT)
1. [`core.js:1`](../../../../../../../../src/i18n/core.js) — `SUPPORTED_LOCALES = ['et','ru','en']` (плоский массив).
2. [`BoardPage.jsx:28-31`](../../../../../../../../src/pages/BoardPage.jsx) — `LANGUAGE_OPTIONS` с `nativeLabel` + `flagSrc` (дубль метаданных).
3. Story Scope: endonym + `dir: 'ltr'` для et/ru/en; флаги `/assets/ET.svg`, `RU.svg`, `US.svg`.

### Gap / Проблема
Нет единого реестра с метаданными; плоский массив кодов не используется потребителями.

### AC/DoD
- [x] (P0) Story AC #1: `SUPPORTED_LOCALES` — массив `{code, endonym, flag, dir}`; единственный SSOT экспорт.
- [x] (P0) Три локали et/ru/en с `dir: 'ltr'` и endonym из текущего `LANGUAGE_OPTIONS`.
- [x] (P1) Экспорт вспомогательного селектора (напр. `LOCALE_SELECTOR_OPTIONS`: `value`←`code`, label←`endonym`, `flagSrc`←`flag`) — для T03.

### Где менять код
- [`src/i18n/core.js`](../../../../../../../../src/i18n/core.js) (предпочтительно per Scope)

### Out of scope
- `normalizeLocale` / `resolveLanguage` refactor (T02)
- UI pages (T03)
- `languages.*` removal (T04)

### Проверка
```bash
cd spa-app
node -e "import('./src/i18n/core.js').then(m=>console.log(m.SUPPORTED_LOCALES))"
npm run test:run
```
