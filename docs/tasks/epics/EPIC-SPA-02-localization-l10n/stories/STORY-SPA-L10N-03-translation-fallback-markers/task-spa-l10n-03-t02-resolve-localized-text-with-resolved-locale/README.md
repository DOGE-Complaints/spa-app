## Task workspace — `task-spa-l10n-03-t02-resolve-localized-text-with-resolved-locale`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** —

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** javascript-pro  
---

## Task: implement — resolveLocalizedText with resolved locale metadata

### Цель
Расширить i18n core так, чтобы вызывающий мог узнать **какая локаль фактически использована** при откате контента (requested vs resolved), без поломки существующего `resolveLocalizedText` API.

### Почему это важно (риск)
Сейчас fallback et→ru→en молчаливый ([`core.js:53-56`](../../../../../../../../src/i18n/core.js)); fallback-маркер «показано на ⟨язык⟩» невозможен без метаданных.

### Факты из кода (Code Facts / SSOT)
1. [`core.js:48-57`](../../../../../../../../src/i18n/core.js) — `resolveLocalizedText` возвращает только `string`.
2. [`I18nProvider.jsx:79`](../../../../../../../../src/i18n/I18nProvider.jsx) — context exposes `resolveLocalizedText(field)`.
3. [`core.test.js:53-57`](../../../../../../../../src/i18n/__tests__/core.test.js) — existing fallback chain tests.

### Gap / Проблема
Нет API для «какая локаль использована» в резолвере контента.

### AC/DoD
- [x] (P0) Story AC #3: при откате на нерасзапрошенную локаль доступен признак resolved locale.
- [x] (P0) Story AC #6 (часть): unit-тест «какая локаль использована» в резолвере.
- [x] (P0) Существующий `resolveLocalizedText` API и все call sites работают без регрессии.
- [x] (P1) При необходимости — expose meta helper через `I18nProvider` context.

### Где менять код
- [`src/i18n/core.js`](../../../../../../../../src/i18n/core.js) (напр. `resolveLocalizedTextWithMeta`)
- [`src/i18n/I18nProvider.jsx`](../../../../../../../../src/i18n/I18nProvider.jsx)
- [`src/i18n/__tests__/core.test.js`](../../../../../../../../src/i18n/__tests__/core.test.js)

### Out of scope
- UI marker rendering (T04–T05)
- Label humanize metadata (T03)

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/core.test.js
```
