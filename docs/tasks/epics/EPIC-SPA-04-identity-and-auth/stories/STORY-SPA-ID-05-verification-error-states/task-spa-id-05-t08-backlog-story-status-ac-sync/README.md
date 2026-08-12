## Task workspace — `task-spa-id-05-t08-backlog-story-status-ac-sync`

- Story: [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-05-execution-2026-06-29.md`](../../../../../../analysis/audit-STORY-SPA-ID-05-execution-2026-06-29.md) §3 F2
- **Depends on:** SPA-ID-05-T07 Done (pkg-000019)
- **activation:** `run_mode=spa_id_05_audit_2026_06_29`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_id_05_audit_2026_06_29` (post-audit; **не** pkg-000019)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:14:37Z  
---

## Task: doc-sync — backlog STORY-SPA-ID-05 Status + AC checkboxes

### Цель
Синхронизировать persistent backlog FR-копию с pipeline/index Done (pkg-000019). Закрыть audit F2 doc-drift.

### Почему это важно (риск)
Операторы читают `backlog-stories/` как intake SSOT; `Status: Todo` и AC `[ ]` при Done в pipeline вводят в заблуждение при triage ID-07+.

### Факты из кода (Code Facts / SSOT)
1. Backlog drift — [STORY-SPA-ID-05 backlog:6,54-58](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md#L6): `Status: Todo (FR-layer)`, AC `- [ ]` (0 отмечено).
2. Pipeline Done — [STORY-SPA-ID-05 pipeline:8,59-63](../STORY-SPA-ID-05-verification-error-states.md): `Status: Done`, AC `[x]`.
3. Index — [bullrun-launch-index.md](../../../../bullrun-launch-index.md): `STORY-SPA-ID-05` `🟢 Done (pkg-000019)`.
4. Audit F2 — [audit-STORY-SPA-ID-05-execution-2026-06-29.md](../../../../../../analysis/audit-STORY-SPA-ID-05-execution-2026-06-29.md) §3 F2.

### Gap / Проблема
Post-audit: backlog FR-копия не отражает закрытие story; pipeline/index уже Done.

### AC/DoD
- [x] (P0) Backlog Meta `Status: Done` (или `Done (pkg-000019)` по стилю соседних stories).
- [x] (P0) Backlog AC #1–#5 → `- [x]`.
- [x] (P1) При необходимости — note в [backlog-stories/INDEX.md](../../../../backlog-stories/INDEX.md) (verified pkg-000019).
- [x] (P1) **Не** менять pipeline story, код, `pkg-000019`, `spa-active-package.current.yaml`.

### Где менять
- `spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md`
- Опционально: `spa-app/docs/tasks/backlog-stories/INDEX.md`

### Out of scope
- Runtime код, identity backend, ID-07 waitlist UI.

### Verification
```bash
grep -n "Status:" spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md
grep -c "\[x\]" spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-05-verification-error-states.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
