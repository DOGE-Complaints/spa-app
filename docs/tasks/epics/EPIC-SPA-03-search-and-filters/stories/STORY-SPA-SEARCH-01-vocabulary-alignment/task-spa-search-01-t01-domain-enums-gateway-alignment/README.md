## Task workspace — `task-spa-search-01-t01-domain-enums-gateway-alignment`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md) — Scope `types.js`
- **Depends on:** G1, G3 Done

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** javascript-pro  
---

## Task: implement — align domain enums to gateway canon

### Цель
Привести `ISSUE_STATUS` и `ISSUE_TYPE` в [`types.js`](../../../../../../../../src/domain/types.js) к канону gateway (`enums.py`).

### Почему это важно (риск)
Без выравнивания enum серверные фильтры в `GFL-DRIVEN` возвращают пусто — блокёр SEARCH-02/04/05.

### Факты из кода (Code Facts / SSOT)
1. SPA сейчас — [`types.js:3-15`](../../../../../../../../src/domain/types.js): `NEW/VERIFIED/IN_REVIEW/ARCHIVED`; `complaint/observation/absurdity/system_bug`.
2. Gateway canon — [`enums.py:6-19`](../../../../../../../../../doge-complaints-gateway/src/core/projection/enums.py): `NEW/IN_REVIEW/PUBLISHED`; `IMPROVEMENT/SERVICE_REQUEST/INCIDENT`.
3. JSDoc `@typedef IssueStatus`/`IssueType` — [`types.js:52-54`](../../../../../../../../src/domain/types.js) — обновить вместе с enum.
4. `isIssue` / `isCreateIssueCommand` валидируют через `Object.values(ISSUE_*)` — автоматически подхватят новые значения.

### Gap / Проблема
Расхождение SPA vs gateway (story §Целевое; G3 contract §5).

### AC/DoD
- [ ] (P0) Story AC #1: `ISSUE_STATUS` = `{NEW, IN_REVIEW, PUBLISHED}`; `ISSUE_TYPE` = `{IMPROVEMENT, SERVICE_REQUEST, INCIDENT}`.
- [ ] (P0) JSDoc typedefs синхронизированы с enum.
- [ ] (P1) `npm run test:run -- src/domain/__tests__/types.test.js` — green после обновления ожиданий (или делегировать fallout в T05).

### Где менять код
- [`src/domain/types.js`](../../../../../../../../src/domain/types.js)

### Out of scope
- i18n dictionaries (T02)
- StatusBadge / BoardPage (T03)
- boardQuery / mocks (T04)

### Проверка
```bash
cd spa-app
npm run test:run -- src/domain/__tests__/types.test.js
```
