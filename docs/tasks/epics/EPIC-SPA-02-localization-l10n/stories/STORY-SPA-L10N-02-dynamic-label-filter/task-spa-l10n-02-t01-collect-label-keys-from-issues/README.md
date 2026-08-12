## Task workspace — `task-spa-l10n-02-t01-collect-label-keys-from-issues`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Depends on:** —

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** react-expert  
---

## Task: implement — collect label keys from loaded issues

### Цель
Добавить чистую функцию агрегации уникальных меток из массива `issues` (D9); опционально объединять с `AVAILABLE_LABELS` для стабильности UI при пустой/узкой выборке (Story Scope, BoardPage).

### Почему это важно (риск)
Без отдельной утилиты логика union/sort размазана по BoardPage; регрессии D9 и дубликаты ключей не ловятся unit-тестом.

### Факты из кода (Code Facts / SSOT)
1. [`BoardPage.jsx:181`](../../../../../../../../src/pages/BoardPage.jsx) — `availableLabels={AVAILABLE_LABELS}` (статичный источник).
2. [`labelKeys.js:2-13`](../../../../../../../../src/i18n/labelKeys.js) — курируемое ядро из 10 ключей.
3. Issues несут `labels: string[]` (см. [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js), [`InMemoryIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/InMemoryIssueRepository.test.js)).

### Gap / Проблема
Нет функции «множество всех `issue.labels`» для фильтра.

### AC/DoD
- [x] (P0) Story AC #5 (часть): unit-тест на построение списка из набора issue.
- [x] (P0) Функция возвращает отсортированный unique `string[]`.
- [x] (P1) Опция `includeCore: true` добавляет `AVAILABLE_LABELS` в union (стабильность при D9).

### Где менять код
- Новый модуль рядом с SSOT, напр. [`src/i18n/collectLabelKeysFromIssues.js`](../../../../../../../../src/i18n/collectLabelKeysFromIssues.js) или экспорт из [`labelKeys.js`](../../../../../../../../src/i18n/labelKeys.js)
- Unit-тест: [`src/i18n/__tests__/collectLabelKeysFromIssues.test.js`](../../../../../../../../src/i18n/__tests__/collectLabelKeysFromIssues.test.js)

### Out of scope
- BoardPage wire (T02)
- LabelsFilter UX (T03)

### Проверка
```bash
cd spa-app
npx vitest run src/i18n/__tests__/collectLabelKeysFromIssues.test.js
```
