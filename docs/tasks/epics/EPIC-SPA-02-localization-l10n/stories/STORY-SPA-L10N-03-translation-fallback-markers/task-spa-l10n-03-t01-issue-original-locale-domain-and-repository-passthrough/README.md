## Task workspace — `task-spa-l10n-03-t01-issue-original-locale-domain-and-repository-passthrough`

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

## Task: implement — Issue `original_locale` domain and repository passthrough

### Цель
Добавить опциональное поле `original_locale?: string[]` в доменную модель `Issue` и обеспечить проброс без потерь через InMemory/Gateway read path; опционально засидить demo issues для MT-маркера в `FAKE-OLD`.

### Почему это важно (риск)
Без поля в `isIssue` InMemory `assertIssue` отбросит gateway/mock issues с `original_locale`; MT-маркер не сможет читать проекцию.

### Факты из кода (Code Facts / SSOT)
1. [`types.js:55-67`](../../../../../../../../src/domain/types.js) — `Issue` typedef без `original_locale`.
2. [`types.js:129-146`](../../../../../../../../src/domain/types.js) — `isIssue` не валидирует `original_locale`.
3. [`InMemoryIssueRepository.js:4-6`](../../../../../../../../src/repositories/InMemoryIssueRepository.js) — `assertIssue` на seed.
4. [`GatewayIssueRepository.js:54-65`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — pass-through JSON без валидации.
5. Backlog: `original_locale` опционально; значения из `["et","ru","en"]`; bridge §7 — пусто/отсутствует → MT-маркер не показываем.

### Gap / Проблема
Поле бэка не моделируется на фронте; моки не демонстрируют MT-сценарий.

### AC/DoD
- [x] (P0) Story AC #1 (часть): `original_locale` читается из проекции issue.
- [x] (P0) Story AC #2: отсутствие/пустой массив — `isIssue` true, рендер не падает (`issue.original_locale ?? []`).
- [x] (P0) `isIssue` принимает `original_locale` как опциональный массив строк из et/ru/en.
- [x] (P1) Опционально: 1–2 issue в [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) с `original_locale` для MT-demo в FAKE-OLD.

### Где менять код
- [`src/domain/types.js`](../../../../../../../../src/domain/types.js)
- [`src/repositories/InMemoryIssueRepository.js`](../../../../../../../../src/repositories/InMemoryIssueRepository.js) (verify passthrough via spread)
- [`src/router/mockIssues.js`](../../../../../../../../src/router/mockIssues.js) (optional seed)

### Out of scope
- `resolveLocalizedText` metadata (T02)
- UI markers (T04–T05)

### Проверка
```bash
cd spa-app
npx vitest run src/domain/__tests__/types.test.js
npx vitest run src/repositories/__tests__/InMemoryIssueRepository.test.js
```
