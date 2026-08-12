## Task workspace — `task-spa-l10n-04-t07-bullrun-primary-pointer-sync-after-l10n04-close`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-04-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-04-execution-2026-06-16.md) §F1
- **Depends on:** SPA-L10N-04-T01..T06 Done
- **activation:** `run_mode=spa_l10n_04_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_04_audit_2026_06_16` (post-audit; **не** pkg-000006)  
**Skill declared:** react-expert  
---

## Task: docs — sync bullrun Primary pointer after L10N-04 closure

### Цель
Устранить рассинхрон §«Актуальная точка» в `bullrun-launch-index.md`: строка Primary всё ещё помечает L10N-04 как In Progress / T01–T06 Todo, хотя story и код Done. Обновить `Last closed wave` на `pkg-000006` и перенацелить Primary next на doc-gap G3 или SEARCH-01.

### Почему это важно (риск)
Оператор и Builder Queue читают Primary как SSOT «что делать дальше»; устаревший указатель ведёт к повторному P3 по закрытой волне или пропуску следующего intake.

### Факты из кода (Code Facts / SSOT)
1. [bullrun-launch-index.md:5](../../../../bullrun-launch-index.md) — `Primary: L10N-04 In Progress … T01–T06 Todo`.
2. [bullrun-launch-index.md:12](../../../../bullrun-launch-index.md) — `L10N-04 Done (pkg-000006)` в том же блоке.
3. [bullrun-launch-index.md:8](../../../../bullrun-launch-index.md) — `Last closed wave: pkg-000003` (устарело; фактически `pkg-000006`).
4. [bullrun-launch-index.md:82-88](../../../../bullrun-launch-index.md) — Story + T01–T06 `🟢 Done`.
5. Audit [§F1](../../../../../../analysis/audit-STORY-SPA-L10N-04-execution-2026-06-16.md) — State Misassessment / Legacy Accumulation.

### Gap / Проблема
Audit F1: строка-указатель Primary не обновлена при закрытии L10N-04.

### AC/DoD
- [x] (P0) [bullrun-launch-index.md:5](../../../../bullrun-launch-index.md) — Primary отражает `L10N-04 Done (pkg-000006)`; next → doc-gap G3 ([backlog INDEX](../../../../backlog-stories/INDEX.md)) или [SEARCH-01](../../../../backlog-stories/search-and-filters/STORY-SPA-SEARCH-01-vocabulary-alignment.md).
- [x] (P0) [bullrun-launch-index.md:8](../../../../bullrun-launch-index.md) — `Last closed wave` → `pkg-000006` / STORY-SPA-L10N-04.
- [x] (P1) Post-audit L10N-04 bullet в §«Актуальная точка» согласован с итогом P6 (T07–T08 Done после закрытия волны).
- [x] (P0) Артефакт `acceptance-verification-spa-l10n-04-t07.md` в этой task-папке.

### Где менять код
- [bullrun-launch-index.md](../../../../bullrun-launch-index.md) §«Актуальная точка» (lines 5, 8, post-audit bullet)

### Out of scope
- EPIC-SPA-02 header status (T08)
- Runtime / `src/**`
- Новый pkg / смена `spa-active-package.current.yaml`
- F2 telemetry opt-in behavior

### Проверка
```bash
rg -n "Primary:|Last closed wave|Post-audit L10N-04" spa-app/docs/tasks/bullrun-launch-index.md
# Ожидание: Primary = L10N-04 Done; Last closed = pkg-000006; нет In Progress/Todo для T01–T06
```
