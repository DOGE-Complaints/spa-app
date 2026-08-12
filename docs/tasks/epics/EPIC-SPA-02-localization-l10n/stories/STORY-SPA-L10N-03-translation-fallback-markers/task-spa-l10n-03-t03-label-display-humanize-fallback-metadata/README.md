## Task workspace — `task-spa-l10n-03-t03-label-display-humanize-fallback-metadata`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** —

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** javascript-pro  
---

## Task: implement — label humanize fallback metadata

### Цель
Дать вызывающему признак «использован humanize-fallback» когда `formatLabelKey` не находит перевод в словаре и откатывается на `humanizeLabelSlug`.

### Почему это важно (риск)
Метки вне `AVAILABLE_LABELS` уже humanize ([`labelDisplay.js:19-26`](../../../../../../../../src/i18n/labelDisplay.js)); без флага UI не может показать мягкий маркер «нет перевода».

### Факты из кода (Code Facts / SSOT)
1. [`labelDisplay.js:19-26`](../../../../../../../../src/i18n/labelDisplay.js) — `t(dictKey) === dictKey` → humanize.
2. Потребители: [`LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx), [`IssueCard.jsx:47`](../../../../../../../../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx:105`](../../../../../../../../src/pages/IssuePage.jsx).

### Gap / Проблема
Humanize-ветка не экспортирует метаданные для маркера.

### AC/DoD
- [x] (P0) Story AC #4: вызывающий может определить humanize-fallback для label key.
- [x] (P0) Backward-compat: существующий `formatLabelKey(t, key)` → `string` без поломки call sites.
- [x] (P1) Unit-тест на `usedHumanize` / `isUntranslated` для dictionary miss.

### Где менять код
- [`src/i18n/labelDisplay.js`](../../../../../../../../src/i18n/labelDisplay.js)
- [`src/i18n/__tests__/labelDisplay.test.js`](../../../../../../../../src/i18n/__tests__/labelDisplay.test.js)

### Out of scope
- Marker UI component (T04)
- IssueCard/IssuePage wire (T05)

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/labelDisplay.test.js
```
