## Task workspace — `task-spa-g3-t06-story-acceptance-verification`

- Story: [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md)
- Decision Ref: [`../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md`](../../../../../../backlog-stories/search-and-filters/STORY-SPA-G3-search-input-toolbar.md)
- **Depends on:** SPA-G3-T01..T05 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000007`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-G3)

### Цель
Проверить все 5 AC story; создать `acceptance-verification-spa-g3.md`; обновить pipeline story + bullrun + backlog INDEX → Done.

### Почему это важно (риск)
Без gate нельзя закрыть gap G3 и EPIC-SPA-03 wave pkg-000007.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#5 в [`STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md).
2. Precedent gate: [`acceptance-verification-spa-l10n-04.md`](../../../../EPIC-SPA-02-localization-l10n/stories/STORY-SPA-L10N-04-untranslated-label-telemetry/task-spa-l10n-04-t06-story-acceptance-verification/acceptance-verification-spa-l10n-04.md).
3. Contract §8 integration checklist — verify SearchInput uses `serializeBoardQuery` only.

### Gap / Проблема
Story не верифицирована end-to-end.

### AC/DoD
- [x] (P0) Все Story AC #1–#5 — PASS с путями к evidence.
- [x] (P0) `npm run test:run` в `spa-app` — green.
- [x] (P0) Артефакт `acceptance-verification-spa-g3.md` в этой task-папке.
- [x] (P0) Pipeline story Status → Done; bullrun STORY + T01–T06 → Done; backlog INDEX G3 → Done.
- [x] (P1) Contract §8 checklist items для SearchInput — отмечены в acceptance artifact.

### Где менять код
- Этот task: `acceptance-verification-spa-g3.md`
- [`../STORY-SPA-G3-search-input-toolbar.md`](../STORY-SPA-G3-search-input-toolbar.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)
- [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

### Out of scope
- Новый pkg
- SEARCH-01 materialize

### Проверка
```bash
cd spa-app
npm run test:run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
