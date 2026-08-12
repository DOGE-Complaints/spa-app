## Task workspace — `task-spa-l10n-02-t08-board-filter-strict-data-only`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-02-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-02-execution-2026-06-16.md) §F1
- **Depends on:** SPA-L10N-02-T01..T07 Done
- **activation:** `run_mode=spa_l10n_02_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_02_audit_2026_06_16` (post-audit; **не** pkg-000004)  
**Skill declared:** react-expert  
---

## Task: fix — BoardPage strict data-only label filter (`includeCore: false`)

### Цель
Вызвать `collectLabelKeysFromIssues(issues, { includeCore: false })` на BoardPage: фильтр строго из загруженных `issue.labels`; ветка `LabelsFilter` disabled при пустой выборке становится достижимой. Закрывает audit F1.

### Почему это важно (риск)
Сейчас default `includeCore: true` всегда добавляет 10 core-меток → AC#4 disabled-путь не срабатывает в BoardPage; дропдаун шире буквальной формулировки «из загруженных issue».

### Факты из кода (Code Facts / SSOT)
1. [`BoardPage.jsx:77`](../../../../../../../../src/pages/BoardPage.jsx) — `collectLabelKeysFromIssues(issues)` без options.
2. [`collectLabelKeysFromIssues.js:13`](../../../../../../../../src/i18n/collectLabelKeysFromIssues.js) — `includeCore = options.includeCore !== false` (default true).
3. [`LabelsFilter.jsx:11,42-45`](../../../../../../../../src/components/Filters/LabelsFilter.jsx) — `hasAvailableLabels` + `disabled={!hasAvailableLabels}`.
4. [`collectLabelKeysFromIssues.test.js:18-22`](../../../../../../../../src/i18n/__tests__/collectLabelKeysFromIssues.test.js) — `includeCore: false` уже покрыт unit-тестом.

### Gap / Проблема
Audit F1: union ядро∪данные делает disabled-ветку недостижимой в BoardPage; оператор выбрал strict data-only для post-audit closure.

### AC/DoD
- [x] (P0) BoardPage: `collectLabelKeysFromIssues(issues, { includeCore: false })`.
- [x] (P0) При `issues=[]` или без labels → `availableLabels=[]` → LabelsFilter disabled (AC#4 достижим в runtime).
- [x] (P1) Тест/регрессия: не ломать existing `collectLabelKeysFromIssues` unit tests.
- [x] (P0) `npx vitest run` — green.

### Где менять код
- [`src/pages/BoardPage.jsx`](../../../../../../../../src/pages/BoardPage.jsx)
- [`src/components/Filters/__tests__/LabelsFilter.test.jsx`](../../../../../../../../src/components/Filters/__tests__/LabelsFilter.test.jsx) и/или BoardPage-level test

### Out of scope
- Изменение helper default `includeCore` (остаётся true для других call sites)
- F2 mock seed (T09)
- F3 SEARCH-01 / L10N-03
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
cd spa-app
npx vitest run src/components/Filters/__tests__/LabelsFilter.test.jsx
npx vitest run src/i18n/__tests__/collectLabelKeysFromIssues.test.js
npx vitest run
```
