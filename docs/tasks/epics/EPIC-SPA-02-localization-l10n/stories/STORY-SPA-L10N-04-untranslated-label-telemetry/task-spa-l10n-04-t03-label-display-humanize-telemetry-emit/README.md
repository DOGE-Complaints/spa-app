## Task workspace — `task-spa-l10n-04-t03-label-display-humanize-telemetry-emit`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) §Scope (labelDisplay humanize)
- **Depends on:** SPA-L10N-04-T02 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000006`  
**Skill declared:** javascript-pro  
---

## Task: implement — emit telemetry on label humanize-miss

### Цель
В ветке humanize [`labelDisplay.js:25`](../../../../../../../../src/i18n/labelDisplay.js) вызвать `reportLabelMiss` через абстракцию T02; протащить `locale` для payload `{label_key, locale}`.

### Почему это важно (риск)
Humanize срабатывает на всех call sites (IssueCard, IssuePage, LabelsFilter); точка эмита должна быть централизована в `formatLabelKeyWithMeta`.

### Факты из кода (Code Facts / SSOT)
1. [`labelDisplay.js:19-25`](../../../../../../../../src/i18n/labelDisplay.js) — `usedHumanize: true` при `t(dictKey) === dictKey`.
2. Сигнатура сейчас `formatLabelKeyWithMeta(t, key)` — **без locale** (P1 fact).
3. Потребители: [`IssueCard.jsx`](../../../../../../../../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx), [`LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx).

### Gap / Проблема
Humanize-miss не эмитит телеметрию.

### AC/DoD
- [x] (P0) Story AC #2: при humanize-miss вызывается `POST /telemetry/label-misses` с `{label_key, locale}` (через T02 client).
- [x] (P0) Dictionary hit (`usedHumanize: false`) — emit не вызывается.
- [x] (P0) Backward-compat: `formatLabelKey(t, key)` → string без поломки call sites.
- [x] (P1) Locale передаётся явно (3-й аргумент или обязательный param) — без hardcode locale в модуле.

### Где менять код
- [`src/i18n/labelDisplay.js`](../../../../../../../../src/i18n/labelDisplay.js)
- Call sites при необходимости: [`IssueCard.jsx`](../../../../../../../../src/components/IssueCard/IssueCard.jsx), [`IssuePage.jsx`](../../../../../../../../src/pages/IssuePage.jsx), [`LabelsFilter.jsx`](../../../../../../../../src/components/Filters/LabelsFilter.jsx)

### Out of scope
- Telemetry client internals (T02)
- Тесты (T04)

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/labelDisplay.test.js
```
