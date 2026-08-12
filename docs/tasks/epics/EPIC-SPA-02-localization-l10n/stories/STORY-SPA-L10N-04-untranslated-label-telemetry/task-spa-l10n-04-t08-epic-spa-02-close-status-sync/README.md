## Task workspace — `task-spa-l10n-04-t08-epic-spa-02-close-status-sync`

- Story: [`../STORY-SPA-L10N-04-untranslated-label-telemetry.md`](../STORY-SPA-L10N-04-untranslated-label-telemetry.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-L10N-04-execution-2026-06-16.md`](../../../../../../analysis/audit-STORY-SPA-L10N-04-execution-2026-06-16.md) §5
- **Depends on:** SPA-L10N-04-T07 Done (рекомендуется; можно параллельно при согласовании оператора)
- **activation:** `run_mode=spa_l10n_04_audit_2026_06_16`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_l10n_04_audit_2026_06_16` (post-audit; **не** pkg-000006)  
**Skill declared:** react-expert  
---

## Task: docs — close EPIC-SPA-02 status when all L10N stories Done

### Цель
Синхронизировать статус эпика EPIC-SPA-02 с фактом: все 4 pipeline stories (L10N-01..04) Done. Обновить header эпика и строку Epic Registry в bullrun.

### Почему это важно (риск)
Эпик `In Progress` при закрытых stories создаёт ложное ожидание новых L10N-волн в том же эпике и мешает оператору переключиться на doc-gap / SEARCH треки.

### Факты из кода (Code Facts / SSOT)
1. [EPIC-SPA-02-localization-l10n.md:4](../../../../EPIC-SPA-02-localization-l10n.md) — `Статус: In Progress`.
2. [EPIC-SPA-02-localization-l10n.md:22-25](../../../../EPIC-SPA-02-localization-l10n.md) — все 4 stories в таблице §2 — `Done`.
3. [bullrun-launch-index.md:28](../../../../bullrun-launch-index.md) — `EPIC-SPA-02 | In Progress`.
4. Audit [§5](../../../../../../analysis/audit-STORY-SPA-L10N-04-execution-2026-06-16.md) — «EPIC-SPA-02 завершён по коду».

### Gap / Проблема
Epic status misassessment: header/registry не отражают закрытие L10N track.

### AC/DoD
- [x] (P0) [EPIC-SPA-02-localization-l10n.md](../../../../EPIC-SPA-02-localization-l10n.md) header → `Done` (или `Done (L10N track closed 2026-06-16)`).
- [x] (P0) [bullrun-launch-index.md:28](../../../../bullrun-launch-index.md) Epic Registry row → `Done`.
- [x] (P1) Без добавления новых stories/tasks в эпик.
- [x] (P0) Артефакт `acceptance-verification-spa-l10n-04-t08.md` в этой task-папке.

### Где менять код
- [EPIC-SPA-02-localization-l10n.md](../../../../EPIC-SPA-02-localization-l10n.md) — header status
- [bullrun-launch-index.md](../../../../bullrun-launch-index.md) — Epic Registry §28

### Out of scope
- bullrun Primary pointer (T07)
- Новые backlog stories в EPIC-SPA-02
- Runtime / `src/**`
- Новый pkg / смена `spa-active-package.current.yaml`

### Проверка
```bash
rg -n "EPIC-SPA-02" spa-app/docs/tasks/bullrun-launch-index.md
rg -n "Статус:" spa-app/docs/tasks/epics/EPIC-SPA-02-localization-l10n/EPIC-SPA-02-localization-l10n.md
# Ожидание: Done в обоих местах
```
