## Task workspace — `task-spa-search-05-t08-story-gate-search-05`

- Story: [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-05-geo-filter.md)
- **Depends on:** T01–T07 Todo
- **ui_scope:** `mixed` (§UI verification для geo controls)

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000012`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-SEARCH-05)

### Цель
Проверить все 6 AC story; создать `acceptance-verification-spa-search-05.md`; обновить pipeline story + bullrun + backlog INDEX → Done; EPIC §2 row; подтвердить bbox out-of-scope (Story AC #5).

### Почему это важно (риск)
Без gate нельзя закрыть pkg-000012 и завершить EPIC-SPA-03 search-and-filters track.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#6 — [`STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md).
2. Precedent gate: [`acceptance-verification-spa-search-04.md`](../../STORY-SPA-SEARCH-04-institution-date-filters/task-spa-search-04-t08-story-gate-search-04/acceptance-verification-spa-search-04.md).
3. Puppeteer smoke: [`tests/puppeteer/filters-and-query-state-smoke.mjs`](../../../../../../../../tests/puppeteer/filters-and-query-state-smoke.mjs).
4. Gateway contract — G3 §4.1-4.2 geo admin + drop-without-geo.
5. Dual mode — `REALITY_MODE` GFL-DRIVEN vs FAKE-OLD parity AC #2/#3.

### Gap / Проблема
Story not verified end-to-end.

### AC/DoD
- [ ] (P0) All Story AC #1–#6 — PASS with evidence paths.
- [ ] (P0) Story AC #5: bbox (`geo_lat/lon_*`) documented as future in pipeline + interview doc; not in URL/repo/UI.
- [ ] (P0) `npx vitest run` in `spa-app` — green.
- [ ] (P0) Artifact `acceptance-verification-spa-search-05.md` in this task folder.
- [ ] (P0) Pipeline story Status → Done; bullrun STORY + T01–T08 → Done; backlog INDEX SEARCH-05 → Done with pipeline link.
- [ ] (P0) `python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify` — PASS.
- [ ] (P1) §UI verification: geo panel states (UI-3 checklist); `npm run test:ui:filters` — PASS or documented waiver.
- [ ] (P1) GFL-DRIVEN smoke note: geo_* params visible in fetch URL (test or manual evidence).

### Где менять код
- This task: `acceptance-verification-spa-search-05.md`
- [`../STORY-SPA-SEARCH-05-geo-filter.md`](../STORY-SPA-SEARCH-05-geo-filter.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md) §2

### Out of scope
- EPIC-SPA-03 final close (separate if operator requests)
- Git commits (P8 on operator request)

### Проверка
```bash
cd spa-app && npx vitest run && npm run test:ui:filters
cd /Users/eslinko/Development/DOGEstonia && python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
