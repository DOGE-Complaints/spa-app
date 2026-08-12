## Task workspace — `task-spa-search-02-t16-story-gate-search-02`

- Story: [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-02-filter-panel-shell.md)
- **Depends on:** T01–T15 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000009`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-SEARCH-02)

### Цель
Проверить все 7 AC story; создать `acceptance-verification-spa-search-02.md`; обновить pipeline story + bullrun + backlog INDEX → Done; EPIC §2 row.

### Почему это важно (риск)
Без gate нельзя закрыть pkg-000009 и перейти к SEARCH-03.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#7 — [`STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md).
2. Precedent gate: [`acceptance-verification-spa-search-01.md`](../../STORY-SPA-SEARCH-01-vocabulary-alignment/task-spa-search-01-t07-story-acceptance-verification/acceptance-verification-spa-search-01.md).
3. UI checklist UI-0..UI-3 from plan materialize.

### Gap / Проблема
Story not verified end-to-end.

### AC/DoD
- [ ] (P0) All Story AC #1–#7 — PASS with evidence paths.
- [ ] (P0) `npm run test:run` in `spa-app` — green.
- [ ] (P0) Artifact `acceptance-verification-spa-search-02.md` in this task folder.
- [ ] (P0) Pipeline story Status → Done; bullrun STORY + T01–T16 → Done/Todo per actual; backlog INDEX SEARCH-02 → Done with pipeline link.
- [ ] (P0) `builder_resolve_queue.py --project spa --verify` — PASS.
- [ ] (P1) UI-3 narrow/wide checklist recorded in acceptance artifact.

### Где менять код
- This task: `acceptance-verification-spa-search-02.md`
- [`../STORY-SPA-SEARCH-02-filter-panel-shell.md`](../STORY-SPA-SEARCH-02-filter-panel-shell.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md) §2

### Out of scope
- pkg-000010 materialize

### Проверка
```bash
cd spa-app
npm run test:run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
