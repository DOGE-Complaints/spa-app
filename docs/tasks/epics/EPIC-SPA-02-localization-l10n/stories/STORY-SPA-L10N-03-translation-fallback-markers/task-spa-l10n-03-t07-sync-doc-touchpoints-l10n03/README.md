## Task workspace — `task-spa-l10n-03-t07-sync-doc-touchpoints-l10n03`

- Story: [`../STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-03-translation-fallback-markers.md)
- **Depends on:** T01–T06

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000005`  
**Skill declared:** react-expert  
---

## Task: docs — sync L10N-03 documentation touchpoints

### Цель
Обновить SSOT-документы из Story §Documentation touchpoints: fallback + видимые маркеры, mockup-17 states, gap analysis GL-3/GL-4.

### Почему это важно (риск)
Без doc sync GL-3 остаётся open в gap report; mockup-17 не отражает runtime marker UX.

### Факты из кода (Code Facts / SSOT)
1. Story touchpoints table — [`STORY-SPA-L10N-03-translation-fallback-markers.md`](../STORY-SPA-L10N-03-translation-fallback-markers.md) §Documentation touchpoints.
2. [`i18n-architecture.md`](../../../../../../../i18n-architecture.md) — §fallback: молчаливый откат (pre-L10N-03).
3. [`mockup-17-i18n-language-and-content-spec.md`](../../../../../../../UX/mockups/mockup-17-i18n-language-and-content-spec.md) — нет marker states.
4. [`localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md) — GL-3 open.

### Gap / Проблема
Документация не описывает видимые маркеры MT/fallback/humanize.

### AC/DoD
- [x] (P0) `i18n-architecture.md` §fallback — откат + видимая пометка; описание индикаторов.
- [x] (P0) `mockup-17` — состояние «маркер языка/перевода».
- [x] (P0) `localization-target…md` — GL-3 ✅; GL-4 closed (backend `original_locale` delivered).
- [x] (P1) Статус-блоки с датой 2026-06-16.

### Где менять код
- [`docs/i18n-architecture.md`](../../../../../../../i18n-architecture.md)
- [`docs/UX/mockups/mockup-17-i18n-language-and-content-spec.md`](../../../../../../../UX/mockups/mockup-17-i18n-language-and-content-spec.md)
- [`docs/analysis/localization-target-and-gap-analysis-2026-06-15.md`](../../../../../../../analysis/localization-target-and-gap-analysis-2026-06-15.md)

### Out of scope
- Runtime code changes
- L10N-04 telemetry docs

### Проверка
Doc review only (no vitest required for this task).
