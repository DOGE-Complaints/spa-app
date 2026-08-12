## Task workspace — `task-spa-l10n-02-t06-sync-doc-touchpoints-l10n02`

- Story: [`../STORY-SPA-L10N-02-dynamic-label-filter.md`](../STORY-SPA-L10N-02-dynamic-label-filter.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-02-dynamic-label-filter.md); Documentation touchpoints table in pipeline story
- **Depends on:** T01–T05 Done

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000004`  
**Skill declared:** react-expert  
---

## Task: docs — sync L10N-02 documentation touchpoints

### Цель
Обновить doc touchpoints из backlog story (Documentation touchpoints table): роль `AVAILABLE_LABELS`, динамический фильтр, GL-2 closed.

### Почему это важно (риск)
GL-2 останется open в gap analysis; mockup и architecture расходятся с кодом.

### Факты из кода (Code Facts / SSOT)
Pipeline story Documentation touchpoints:
1. [`i18n-architecture.md`](../../../../../../i18n-architecture.md) §labels — сейчас `AVAILABLE_LABELS` как список меток MVP.
2. [`mockup-12-dashboard-filter-labels-spec.md`](../../../../../../UX/mockups/mockup-12-dashboard-filter-labels-spec.md) — фильтр из фикс. списка.
3. [`localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) — GL-2 open.

### Gap / Проблема
Документация описывает статичный фильтр.

### AC/DoD
- [x] (P0) Story AC #3 (док): i18n-architecture.md — роль ядра + динамический фильтр.
- [x] (P1) mockup-12 — фильтр из данных issue.
- [x] (P1) localization-target gap GL-2 → Done (note: `docs/analysis/**` may be gitignored in spa-app).

### Где менять код
- [`docs/i18n-architecture.md`](../../../../../../i18n-architecture.md)
- [`docs/UX/mockups/mockup-12-dashboard-filter-labels-spec.md`](../../../../../../UX/mockups/mockup-12-dashboard-filter-labels-spec.md)
- [`docs/analysis/localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)

### Out of scope
- Runtime code changes
- L10N-03/04 docs

### Проверка
```bash
rg "AVAILABLE_LABELS|динамическ" spa-app/docs/i18n-architecture.md
rg "данн|dynamic" spa-app/docs/UX/mockups/mockup-12-dashboard-filter-labels-spec.md
```
