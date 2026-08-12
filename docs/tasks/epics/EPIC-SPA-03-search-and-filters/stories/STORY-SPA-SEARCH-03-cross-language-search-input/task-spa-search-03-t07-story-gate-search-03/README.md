## Task workspace — `task-spa-search-03-t07-story-gate-search-03`

- Story: [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-03-cross-language-search-input.md)
- **Depends on:** T01–T06 Done
- **ui_scope:** `mixed` (§UI verification для clear button)

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000010`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-SEARCH-03)

### Цель
Проверить все 5 AC story; создать `acceptance-verification-spa-search-03.md`; обновить pipeline story + bullrun + backlog INDEX → Done; EPIC §2 row.

### Почему это важно (риск)
Без gate нельзя закрыть pkg-000010 и перейти к SEARCH-04.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#5 — [`STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md).
2. Precedent gate: [`acceptance-verification-spa-search-02.md`](../../STORY-SPA-SEARCH-02-filter-panel-shell/task-spa-search-02-t16-story-gate-search-02/acceptance-verification-spa-search-02.md).
3. Puppeteer smoke: [`tests/puppeteer/filters-and-query-state-smoke.mjs`](../../../../../../../../tests/puppeteer/filters-and-query-state-smoke.mjs).
4. Reset clears search — SEARCH-02 Done: [`ResetFiltersControl`](../../../../../../../../src/components/Filters/ResetFiltersControl.jsx).

### Gap / Проблема
Story not verified end-to-end.

### AC/DoD
- [ ] (P0) All Story AC #1–#5 — PASS with evidence paths.
- [ ] (P0) `npx vitest run` in `spa-app` — green.
- [ ] (P0) Artifact `acceptance-verification-spa-search-03.md` in this task folder.
- [ ] (P0) Pipeline story Status → Done; bullrun STORY + T01–T07 → Done; backlog INDEX SEARCH-03 → Done with pipeline link.
- [ ] (P0) `python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify` — PASS.
- [ ] (P1) §UI verification: clear button states (UI-3 checklist); `npm run test:ui:filters` — PASS or documented waiver.
- [ ] (P1) Cross-locale smoke note: locale=et + ru query в puppeteer или manual evidence.

### Где менять код
- This task: `acceptance-verification-spa-search-03.md`
- [`../STORY-SPA-SEARCH-03-cross-language-search-input.md`](../STORY-SPA-SEARCH-03-cross-language-search-input.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)
- [`EPIC-SPA-03-search-and-filters.md`](../../../../EPIC-SPA-03-search-and-filters.md) §2

### Out of scope
- SEARCH-04 materialize

### Проверка
```bash
cd spa-app && npx vitest run && npm run test:ui:filters
cd /Users/eslinko/Development/DOGEstonia && python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
