## Task workspace — `task-spa-g2-t07-story-acceptance-verification`

- Story: [`../STORY-SPA-G2-labels-i18n-dictionary.md`](../STORY-SPA-G2-labels-i18n-dictionary.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md`](../../../../../../backlog-stories/STORY-SPA-G2-labels-i18n-dictionary.md)

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** done  
**Wave:** `pkg-000002`  
**Skill declared:** javascript-pro  
---

## Task: verify — STORY-SPA-G2 story acceptance gate

### Цель
Закрыть story gate: все AC выполнены, T00–T06 Done, тесты green, артефакты зафиксированы.

### Почему это важно (риск)
Финальная точка pkg-000002; без gate story остаётся Todo в bullrun.

### Факты из кода (Code Facts / SSOT)
Story AC (verbatim):
1. Все `AVAILABLE_LABELS` имеют переводы et/ru/en в `dictionaries.js`.
2. Фильтр, карточка и детали показывают локализованную метку, не UPPERCASE-ключ.
3. Переключение языка мгновенно обновляет labels.
4. Документация touchpoints обновлена.

Зависимости: T00–T06 Done.

### Gap / Проблема
Story не закрыта до end-to-end AC.

### AC/DoD
- [x] (P0) Story AC #1–#4 — все `[x]` в pipeline story.
- [x] (P0) `acceptance-verification-spa-g2-t07.md` заполнен.
- [x] (P0) `BULLRUN-PHASE-LOG.md` — pkg-000002 wave complete.
- [x] (P1) bullrun-launch-index: STORY-SPA-G2 + SPA-G2-T00..T07 → Done.

### Где менять код
- Нет runtime — verification artifacts + bullrun/index

### Out of scope
- Implementation (T01–T06)

### Проверка
```bash
cd spa-app
npm run test:run
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
