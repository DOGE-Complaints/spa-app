## Task workspace — `task-spa-g2-t00-label-taxonomy-product-workshop`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md`](../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md)

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** feature-forge  
**Blocking:** T01–T07 до operator sign-off  
---

## Task: analyze — label taxonomy product workshop (operator interview)

### Цель
Согласовать с оператором полную таксономию labels: machine keys, display strings et/ru/en, политика fallback для unknown/gateway keys. Зафиксировать в `label-taxonomy-G2-approved.md` как SSOT для T01–T02.

### Почему это важно (риск)
Без утверждённой таблицы T01–T02 будут гадать переводы; gateway `canonical_labels` (free-form) и SPA civic-10 расходятся. Story AC #1.

### Факты из кода (Code Facts / SSOT)
1. [`BoardPage.jsx:17`](../../../../../../../../src/pages/BoardPage.jsx) — `AVAILABLE_LABELS` (10 keys).
2. [`dictionaries.js`](../../../../../../../../src/i18n/dictionaries.js) — секции `labels` нет.
3. [`mockIssues.js`](../../../../../../../../src/router/mockIssues.js) — union keys ⊆ 10 civic keys.
4. [`boardQuery.test.js`](../../../../../../../../src/router/__tests__/boardQuery.test.js) — drift: `road_safety` вне whitelist.
5. Gateway: `canonical_labels` free-form — [API_REFERENCE §intake](../../../../../../../../doge-complaints-gateway/docs/runtime-docs/api-reference/API_REFERENCE.md).

### Gap / Проблема
Нет product-approved taxonomy и переводов; только inline `AVAILABLE_LABELS` без shared module.

### AC/DoD
- [x] (P0) `label-taxonomy-G2-draft.md` и `label-taxonomy-G2-approved.md` существуют.
- [x] (P0) Оператор явный sign-off («утверждаю» / `Approved by:` в approved doc).
- [x] (P0) Все утверждённые ключи имеют et/ru/en в таблице.
- [x] (P1) §Fallback policy для unknown keys зафиксирована.
- [x] (P1) §Gateway relationship (SPA filter taxonomy vs GPT tags) зафиксирована.
- [x] (P1) `acceptance-verification-spa-g2-t00.md` заполнен на P3 close.

### Протокол P3 Execute

1. **Preflight** — выгрузить ключи из кода (факты выше).
2. **Draft** — [`label-taxonomy-G2-draft.md`](../../../../../../../../analysis/label-taxonomy-G2-draft.md) (таблица key | et | ru | en | notes, пометка DRAFT).
3. **Интерактивное интервью** — `AskQuestion` + чат; agenda Q1–Q6 из pipeline story note:
   - Q1 список ключей; Q2 переводы; Q3 unknown keys; Q4 gateway; Q5 test drift; Q6 EN casing.
4. **Approved** — [`label-taxonomy-G2-approved.md`](../../../../../../../../analysis/label-taxonomy-G2-approved.md) после sign-off.
5. **Не переходить к T01** без approved artifact.

### Где менять код
- **Нет runtime changes** на T00 — только `docs/analysis/label-taxonomy-G2-*.md` + task artifacts в этой папке.

### Out of scope
- `dictionaries.js`, компоненты, тесты (T01+)
- Изменение gateway API

### Проверка
```bash
test -f spa-app/docs/analysis/label-taxonomy-G2-approved.md
# + operator sign-off в acceptance-verification-spa-g2-t00.md
```
