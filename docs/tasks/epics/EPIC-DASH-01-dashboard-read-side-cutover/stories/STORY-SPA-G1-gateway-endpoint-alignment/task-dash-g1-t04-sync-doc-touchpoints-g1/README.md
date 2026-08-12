## Task workspace — `task-dash-g1-t04-sync-doc-touchpoints-g1`

- Story: [`../STORY-SPA-G1-gateway-endpoint-alignment.md`](../STORY-SPA-G1-gateway-endpoint-alignment.md)
- Decision Ref: [`../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md`](../../../../../../backlog-stories/STORY-SPA-G1-gateway-endpoint-alignment.md) Documentation touchpoints

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** done (2026-06-12)  
**Wave:** `pkg-000001`  
**Skill declared:** javascript-pro  
---

## Task: docs — sync G1 documentation touchpoints after code fix

### Цель
Снять пометки «не выполнено — gap G1» и синхронизировать документацию с фактическим путём `/tallinn/issues`.

### Почему это важно (риск)
Story AC #3; doc drift вводит в заблуждение при следующих backlog stories.

### Факты из кода (Code Facts / SSOT)
Touchpoints из Story (текущие пометки G1 open):
1. [`technical-architecture.md`](../../../../../../../../technical-architecture.md) — блок статуса G1.
2. [`domain-facade-contract.md`](../../../../../../../../domain-facade-contract.md) — блок статуса G1.
3. [`reality-mode-data-source-switch.md`](../../../../../../../../analysis/reality-mode-data-source-switch.md) — блок статуса G1.
4. [`spa-app-doc-code-gap-report.md`](../../../../../../../../analysis/spa-app-doc-code-gap-report.md) §5 — G1 Open.
5. [`backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md) — G1 Status Todo.

### Gap / Проблема
Доки помечены как open G1; после t01/t02 код соответствует канону gateway.

### AC/DoD
- [x] (P0) Story AC #3: убраны пометки «не выполнено — gap G1» в touchpoint-файлах.
- [x] (P0) Story AC #3: подтверждён `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues` в technical-architecture, domain-facade-contract, reality-mode.
- [x] (P0) Story AC #3: reality-mode ссылается на gateway API_REFERENCE §7.
- [x] (P1) gap-report §5: G1 → Closed/Done; INDEX G1 → Done.

### Где менять код
- [`docs/technical-architecture.md`](../../../../../../../../technical-architecture.md)
- [`docs/domain-facade-contract.md`](../../../../../../../../domain-facade-contract.md)
- [`docs/analysis/reality-mode-data-source-switch.md`](../../../../../../../../analysis/reality-mode-data-source-switch.md)
- [`docs/analysis/spa-app-doc-code-gap-report.md`](../../../../../../../../analysis/spa-app-doc-code-gap-report.md)
- [`docs/tasks/backlog-stories/INDEX.md`](../../../../../../backlog-stories/INDEX.md)

### Out of scope
- Doc-gap G2–G8 touchpoints
- Изменение gateway docs

### Проверка
```bash
rg "gap G1|demo-tallinn" spa-app/docs/technical-architecture.md spa-app/docs/domain-facade-contract.md spa-app/docs/analysis/
```
