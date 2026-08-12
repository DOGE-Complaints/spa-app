## Task workspace — `task-spa-l10n-04-t05-sync-doc-touchpoints-l10n04`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) §Documentation touchpoints
- **Depends on:** SPA-L10N-04-T01..T04 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000006`  
**Skill declared:** react-expert  
---

## Task: docs — sync L10N-04 documentation touchpoints

### Цель
Закрыть doc touchpoints: GL-5 в gap-analysis, статус sink в REQ-BE-2, env vars в `.env.example` (`VITE_TELEMETRY_ENABLED`, sink URL).

### Почему это важно (риск)
Операторы и бэк сверяют контракт по REQ-BE; без sync GL-5 остаётся open в индексах.

### Факты из кода (Code Facts / SSOT)
1. [`localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) — GL-5 open.
2. [`REQUIREMENTS-BACKEND-L10N.md`](../../../../../../backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md) — REQ-BE-2 sink.
3. [`.env.example`](../../../../../../../../.env.example) — `VITE_GATEWAY_BASE_URL` precedent; нет telemetry vars.

### Gap / Проблема
Doc touchpoints story не синхронизированы после реализации.

### AC/DoD
- [x] (P0) `localization-target-and-gap-analysis` — GL-5 → Done.
- [x] (P0) `REQUIREMENTS-BACKEND-L10N.md` — sink-контракт согласован (FE consumption documented).
- [x] (P1) `.env.example` — `VITE_TELEMETRY_ENABLED` + комментарий sink URL.

### Где менять код
- [`docs/analysis/localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)
- [`docs/tasks/backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md`](../../../../../../backlog-stories/localization/REQUIREMENTS-BACKEND-L10N.md)
- [`.env.example`](../../../../../../../../.env.example)

### Out of scope
- i18n-architecture §11 (T01)
- Spa_builder.plan.md

### Проверка
```bash
rg "GL-5" spa-app/docs/analysis/localization-target-and-gap-analysis-2026-06-15.md
rg "VITE_TELEMETRY" spa-app/.env.example
```
