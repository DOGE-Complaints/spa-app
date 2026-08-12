## Task workspace — `task-dash-g1-t05-story-acceptance-verification`

- Story: [`../STORY-SPA-G1-gateway-endpoint-alignment.md`](../STORY-SPA-G1-gateway-endpoint-alignment.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md)

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** done (2026-06-12)  
**Wave:** `pkg-000001`  
**Skill declared:** javascript-pro  
---

## Task: verify — STORY-SPA-G1 story acceptance gate

### Цель
Закрыть story gate: все AC STORY-SPA-G1 выполнены, тесты green, артефакты acceptance зафиксированы.

### Почему это важно (риск)
Финальная точка pkg-000001; без gate story остаётся Todo в bullrun.

### Факты из кода (Code Facts / SSOT)
Story AC (verbatim):
1. `GatewayIssueRepository` → `GET /tallinn/issues` и `GET /tallinn/issues/{id}` относительно `VITE_GATEWAY_BASE_URL`.
2. Unit-тесты с новым путём.
3. Documentation touchpoints обновлены.
4. `npm test` в `spa-app` — green.

Зависимости: t01–t04 Done.

### Gap / Проблема
Story не закрыта до прохождения end-to-end AC.

### AC/DoD
- [x] (P0) Story AC #1–#4 — все пункты `[x]` в pipeline story и backlog INDEX.
- [x] (P0) `acceptance-verification-dash-g1-t05.md` заполнен с командами и результатами.
- [x] (P0) `BULLRUN-PHASE-LOG.md` — story closed, pkg-000001 wave complete.
- [x] (P1) bullrun-launch-index: STORY-SPA-G1 + DASH-G1-T01..T05 → Done.

### Где менять код
- Нет runtime changes — только verification artifacts в этой папке + bullrun/index sync

### Out of scope
- Реализация кода (t01–t03)
- Doc edits (t04)

### Проверка
```bash
cd spa-app
npm test
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
