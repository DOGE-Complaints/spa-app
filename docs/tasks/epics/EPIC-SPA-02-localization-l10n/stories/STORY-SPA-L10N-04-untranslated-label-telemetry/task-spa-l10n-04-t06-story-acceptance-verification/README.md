## Task workspace — `task-spa-l10n-04-t06-story-acceptance-verification`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- **Depends on:** SPA-L10N-04-T01..T05 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000006`  
**Skill declared:** react-expert  
---

## Task: verify — story acceptance gate (STORY-SPA-L10N-04)

### Цель
Проверить все 6 AC story; создать `acceptance-verification-spa-l10n-04.md`; обновить pipeline story + bullrun + backlog INDEX → Done.

### Почему это важно (риск)
Без gate нельзя закрыть GL-5 и EPIC-SPA-02 L10N track.

### Факты из кода (Code Facts / SSOT)
1. Story AC #1–#6 в [`STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md).
2. Precedent gate: L10N-03 [`acceptance-verification-spa-l10n-03.md`](../../STORY-SPA-L10N-03-translation-fallback-markers/task-spa-l10n-03-t08-story-acceptance-verification/acceptance-verification-spa-l10n-03.md).

### Gap / Проблема
Story не верифицирована end-to-end.

### AC/DoD
- [x] (P0) Все Story AC #1–#6 — PASS с путями к evidence.
- [x] (P0) `npx vitest run` — green (воспроизводимо).
- [x] (P0) Артефакт `acceptance-verification-spa-l10n-04.md` в этой task-папке.
- [x] (P0) Pipeline story Status → Done; bullrun STORY + T01–T06 → Done; backlog INDEX L10N-04 → Done.

### Где менять код
- Этот task: `acceptance-verification-spa-l10n-04.md`
- [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md) — AC checkboxes
- [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md)

### Out of scope
- Новый pkg
- Post-audit waves

### Проверка
```bash
cd spa-app
npx vitest run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
