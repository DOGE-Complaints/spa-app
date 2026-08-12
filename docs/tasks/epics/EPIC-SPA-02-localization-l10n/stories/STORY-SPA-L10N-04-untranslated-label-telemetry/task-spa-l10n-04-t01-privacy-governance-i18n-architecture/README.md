## Task workspace — `task-spa-l10n-04-t01-privacy-governance-i18n-architecture`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../../../../../../backlog-stories/localization/STORY-SPA-L10N-04-untranslated-label-telemetry.md) §Предусловие, D11
- **Depends on:** —

---
**Приоритет:** P0  
**Сложность:** S  
**Статус:** Done  
**Wave:** `pkg-000006`  
**Skill declared:** react-expert  
---

## Task: docs — privacy governance gate (i18n-architecture §Security/Privacy)

### Цель
Переписать раздел Security/Privacy в `i18n-architecture.md` под решение D11: анонимная телеметрия humanize-miss (`label_key` + `locale`), без PII/cookies; явно что собираем и что нет. Governance gate — без этого T02+ не стартуют.

### Почему это важно (риск)
Текущий канон «No analytics» блокирует L10N-04; без осознанного пересмотра privacy телеметрия противоречит архитектуре.

### Факты из кода (Code Facts / SSOT)
1. [`i18n-architecture.md:244-249`](../../../../../../i18n-architecture.md) — «No cookies / No analytics».
2. Backlog §Предусловие — стори не стартует без переписанного §11.
3. Bridge §2 — sink без PII; фронт не добавляет cookies/ID.

### Gap / Проблема
Privacy-политика не описывает разрешённую анонимную телеметрию humanize-miss.

### AC/DoD
- [x] (P0) Story AC #1: §Security/Privacy описывает что собирается (анонимно) и что — нет.
- [x] (P0) Упомянуты: humanize-miss only, `label_key`+`locale`, без PII, env-тумблер `VITE_TELEMETRY_ENABLED`.
- [x] (P1) Связь с eID/верификацией — без расширения scope за пределы label-miss.

### Где менять код
- [`docs/i18n-architecture.md`](../../../../../../i18n-architecture.md) §11 Security/Privacy

### Out of scope
- Runtime telemetry client (T02)
- labelDisplay wire (T03)
- Gap-analysis GL-5 closure (T05)

### Проверка
```bash
# Doc review: §11 не содержит противоречия «no analytics» без оговорки humanize-miss
rg -n "telemetry|label.miss|humanize" docs/i18n-architecture.md
```
