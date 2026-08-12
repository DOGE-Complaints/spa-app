## Task workspace — `task-spa-l10n-01-t07-story-acceptance-verification`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md)
- **Depends on:** T01–T06 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: verify — STORY-SPA-L10N-01 story acceptance gate

### Цель
Закрыть story gate: все 6 AC из backlog выполнены; T01–T06 Done; артефакты зафиксированы.

### Почему это важно (риск)
Финальная точка pkg-000003; без gate story остаётся Todo в bullrun.

### Факты из кода (Code Facts / SSOT)
Story AC (verbatim):
1. Единый `SUPPORTED_LOCALES` с `{code, endonym, flag, dir}`.
2. grep — нет хардкод-списков в логике резолва/селектора.
3. Селектор Board/Issue из реестра; нет `LANGUAGE_OPTIONS`.
4. `languages.*` удалена из dictionaries.js.
5. 4-я локаль — только реестр + словари.
6. `npx vitest run` green.

### Gap / Проблема
Story не закрыта до end-to-end AC.

### AC/DoD
- [x] (P0) Story AC #1–#6 — все `[x]` в pipeline story.
- [x] (P0) `acceptance-verification-spa-l10n-01-t07.md` заполнен.
- [x] (P0) `BULLRUN-PHASE-LOG.md` — pkg-000003 wave complete.
- [x] (P1) bullrun-launch-index: STORY-SPA-L10N-01 + SPA-L10N-01-T01..T07 → Done.

### Где менять код
- Нет runtime — verification artifacts + bullrun/index

### Out of scope
- Implementation (T01–T06)

### Проверка
```bash
cd spa-app
npx vitest run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
