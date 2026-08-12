## Task workspace — `task-spa-search-01-t07-story-acceptance-verification`

- Story: [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md)
- Decision Ref: backlog Acceptance Criteria #1–#7
- **Depends on:** SPA-SEARCH-01-T01..T06 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000008`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-SEARCH-01)

### Цель
Проверить все 7 AC story; GFL-DRIVEN smoke; создать acceptance artifact; обновить pipeline story + bullrun + backlog INDEX → Done.

### Почему это важно (риск)
Без gate SEARCH-02 не может стартовать на реальных данных.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#7 — [`STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md).
2. Precedent gate — [`acceptance-verification-spa-g3.md`](../../STORY-SPA-G3-search-input-toolbar/task-spa-g3-t06-story-acceptance-verification/acceptance-verification-spa-g3.md).
3. GFL-DRIVEN smoke — `.env`: `VITE_LIFE_REALITY_MODE=GFL-DRIVEN` + `VITE_GATEWAY_BASE_URL`; filter `status=NEW`, `type=INCIDENT`, `labels=waste` → non-empty (AC #6).
4. Gateway endpoint — [`GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js) `GET /tallinn/issues`.

### Gap / Проблема
Story не верифицирована end-to-end.

### AC/DoD
- [ ] (P0) Story AC #1–#5 — PASS с путями к evidence.
- [ ] (P0) Story AC #6: GFL-DRIVEN server filter smoke documented (gateway up; non-empty result).
- [ ] (P0) Story AC #7: `npm run test:run` — green.
- [ ] (P0) Артефакт `acceptance-verification-spa-search-01.md` в этой task-папке.
- [ ] (P0) Pipeline story Status → Done; bullrun STORY + T01–T07 → Done; backlog INDEX SEARCH-01 → Done.

### Где менять код
- Этот task: `acceptance-verification-spa-search-01.md`
- [`../STORY-SPA-SEARCH-01-vocabulary-alignment.md`](../STORY-SPA-SEARCH-01-vocabulary-alignment.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

### Out of scope
- SEARCH-02 materialize
- Изменение gateway

### Проверка
```bash
cd spa-app
npm run test:run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
