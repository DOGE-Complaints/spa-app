## Task workspace — `task-spa-l10n-02-t05-tests-dynamic-label-filter`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Depends on:** T01, T02 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** javascript-pro  
---

## Task: tests — dynamic label filter and outside-core label

### Цель
Закрепить Story AC #1, #2, #5: тест построения списка из mock issues; метка вне `AVAILABLE_LABELS` в `availableLabels` и корректная фильтрация через repository.

### Почему это важно (риск)
Без интеграционного теста регрессия к хардкоду `AVAILABLE_LABELS` не ловится CI.

### Факты из кода (Code Facts / SSOT)
1. [`AVAILABLE_LABELS`](../../../../../../../../src/i18n/labelKeys.js) — 10 ключей; `cluster_transport` и подобные отсутствуют.
2. [`InMemoryIssueRepository.test.js:60-66`](../../../../../../../../src/repositories/__tests__/InMemoryIssueRepository.test.js) — фильтрация по `labels` в repo.
3. T01 — `collectLabelKeysFromIssues` (unit baseline).

### Gap / Проблема
Нет теста «метка вне ядра → в списке фильтра → фильтрует issues».

### AC/DoD
- [x] (P0) Story AC #5: тест на построение списка из набора issue (если не полностью в T01 — дополнить здесь).
- [x] (P0) Story AC #1: список содержит метки из issues, не только 10 ядровых.
- [x] (P0) Story AC #2: issue с `labels: ['cluster_transport']` → ключ в aggregated list; `getIssues({ labels: ['cluster_transport'] })` возвращает ожидаемый issue.
- [x] (P0) Story AC #6 (suite): `npx vitest run` green.

### Где менять код
- [`src/i18n/__tests__/collectLabelKeysFromIssues.test.js`](../../../../../../../../src/i18n/__tests__/collectLabelKeysFromIssues.test.js) и/или
- [`src/repositories/__tests__/InMemoryIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/InMemoryIssueRepository.test.js)

### Out of scope
- E2E browser tests
- L10N-03 fallback marker tests

### Проверка
```bash
cd spa-app
npx vitest run
```
