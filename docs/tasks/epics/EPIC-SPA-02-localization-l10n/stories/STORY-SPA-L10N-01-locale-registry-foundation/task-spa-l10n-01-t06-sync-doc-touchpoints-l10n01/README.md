## Task workspace — `task-spa-l10n-01-t06-sync-doc-touchpoints-l10n01`

- Story: [`../STORY-SPA-L10N-01-locale-registry-foundation.md`](../STORY-SPA-L10N-01-locale-registry-foundation.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-01-locale-registry-foundation.md); Documentation touchpoints table in pipeline story
- **Depends on:** T01–T05 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000003`  
**Skill declared:** react-expert  
---

## Task: docs — sync L10N-01 documentation touchpoints

### Цель
Обновить doc touchpoints из backlog story (Documentation touchpoints table).

### Почему это важно (риск)
GL-1/GL-6 останутся open в gap analysis без doc sync.

### Факты из кода (Code Facts / SSOT)
Pipeline story Documentation touchpoints:
1. [`i18n-architecture.md`](../../../../../../i18n-architecture.md) — реестр как SSOT.
2. [`STORY-SPA-HK01`](../../../../../../backlog-stories/STORY-SPA-HK01-housekeeping-cleanup-sweep.md) — HK-001 closed via L10N-01.
3. [`localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) — GL-1/GL-6 ✅.

### Gap / Проблема
Доки описывают хардкод-список языков.

### AC/DoD
- [x] (P0) i18n-architecture.md — реестр локалей как источник истины.
- [x] (P1) HK-001 — пометка closed in L10N-01.
- [x] (P1) localization-target gap GL-1/GL-6 → Done (note: `docs/analysis/**` gitignored in spa-app).

### Где менять код
- [`docs/i18n-architecture.md`](../../../../../../i18n-architecture.md)
- [`docs/tasks/backlog-stories/STORY-SPA-HK01-housekeeping-cleanup-sweep.md`](../../../../../../backlog-stories/STORY-SPA-HK01-housekeeping-cleanup-sweep.md)
- [`docs/analysis/localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)

### Out of scope
- Runtime code changes
- L10N-02..04 docs

### Проверка
```bash
rg "SUPPORTED_LOCALES|реестр" spa-app/docs/i18n-architecture.md
```
