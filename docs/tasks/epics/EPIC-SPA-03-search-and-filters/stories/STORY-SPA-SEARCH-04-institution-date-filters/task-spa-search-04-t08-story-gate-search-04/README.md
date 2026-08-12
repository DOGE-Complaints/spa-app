## Task workspace — `task-spa-search-04-t08-story-gate-search-04`

- Story: [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-04-institution-date-filters.md)
- **Depends on:** T01–T07 Done
- **ui_scope:** `mixed` (§UI verification для institution/date controls)

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000011`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-SEARCH-04)

### Цель
Проверить все 6 AC story; создать `acceptance-verification-spa-search-04.md`; обновить pipeline story + bullrun + backlog INDEX → Done; EPIC §2 row.

### Почему это важно (риск)
Без gate нельзя закрыть pkg-000011 и перейти к SEARCH-05.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#6 — [`STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md).
2. Precedent gate: [`acceptance-verification-spa-search-03.md`](../../STORY-SPA-SEARCH-03-cross-language-search-input/task-spa-search-03-t07-story-gate-search-03/acceptance-verification-spa-search-03.md).
3. Puppeteer smoke: [`tests/puppeteer/filters-and-query-state-smoke.mjs`](../../../../../../../../tests/puppeteer/filters-and-query-state-smoke.mjs).
4. Gateway contract — G3 §4.1 institution/date params.
5. Dual mode — `REALITY_MODE` GFL-DRIVEN vs FAKE-OLD parity AC #3/#4.

### Gap / Проблема
Story not verified end-to-end.

### AC/DoD
- [ ] (P0) All Story AC #1–#6 — PASS with evidence paths.
- [ ] (P0) `npx vitest run` in `spa-app` — green.
- [ ] (P0) Artifact `acceptance-verification-spa-search-04.md` in this task folder.
- [ ] (P0) Pipeline story Status → Done; bullrun STORY + T01–T08 → Done; backlog INDEX SEARCH-04 → Done with pipeline link.
- [ ] (P0) `python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify` — PASS.
- [ ] (P1) §UI verification: institution/date panel states (UI-3 checklist); `npm run test:ui:filters` — PASS or documented waiver.
- [ ] (P1) GFL-DRIVEN smoke note: institution param visible in fetch URL (test or manual evidence).

### Где менять код
- This task: `acceptance-verification-spa-search-04.md`
- [`../STORY-SPA-SEARCH-04-institution-date-filters.md`](../STORY-SPA-SEARCH-04-institution-date-filters.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md) §2

### Out of scope
- SEARCH-05 materialize
- Git commits (P8 on operator request)

### Проверка
```bash
cd spa-app && npx vitest run && npm run test:ui:filters
cd /Users/eslinko/Development/DOGEstonia && python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
