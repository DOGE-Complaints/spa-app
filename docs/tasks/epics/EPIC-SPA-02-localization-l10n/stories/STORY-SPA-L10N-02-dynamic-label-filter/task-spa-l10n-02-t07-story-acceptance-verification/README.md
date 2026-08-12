## Task workspace — `task-spa-l10n-02-t07-story-acceptance-verification`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md)
- **Depends on:** T01–T06 Done

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** react-expert  
---

## Task: verify — STORY-SPA-L10N-02 story acceptance gate

### Цель
Закрыть story gate: все 5 AC из backlog выполнены; T01–T06 Done; артефакты зафиксированы.

### Почему это важно (риск)
Финальная точка pkg-000004; без gate story остаётся Todo в bullrun.

### Факты из кода (Code Facts / SSOT)
Story AC (verbatim):
1. Дропдаун меток содержит метки из загруженных issue (не только 10 ядровых).
2. Метка вне `AVAILABLE_LABELS` доступна в фильтре и корректно фильтрует.
3. Роль `AVAILABLE_LABELS` = «гарантированно переведённое ядро».
4. Пустая выборка — фильтр пуст/disabled, без падений.
5. `npx vitest run` green + тест построения списка из issue.

### Gap / Проблема
Story не закрыта до end-to-end AC.

### AC/DoD
- [x] (P0) Story AC #1–#5 — все `[x]` в pipeline story.
- [x] (P0) `acceptance-verification-spa-l10n-02-t07.md` заполнен в этой task-папке.
- [x] (P0) task acceptance artifacts T01..T07 созданы.
- [x] (P1) bullrun-launch-index: STORY-SPA-L10N-02 + SPA-L10N-02-T01..T07 → Done.

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
