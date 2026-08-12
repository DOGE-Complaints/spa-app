## Task workspace — `task-spa-sec-01-t07-local-env-service-role-guard`

- Story: [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEC-01-execution-2026-06-27.md`](../../../../../../analysis/audit-STORY-SPA-SEC-01-execution-2026-06-27.md) §3 F1
- **Depends on:** SPA-SEC-01-T03 Done
- **activation:** `run_mode=spa_sec_01_audit_2026_06_27`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_sec_01_audit_2026_06_27` (post-audit; **не** pkg-000014)  
**Skill declared:** javascript-pro  
**Scaffolded:** 2026-06-27T19:40:24Z  
**Closed:** 2026-06-27 (`run_mode=spa_sec_01_audit_2026_06_27`)
---

## Task: add — local `.env*` service_role guard

### Цель
Замкнуть исходный вектор утечки: untracked `spa-app/.env`/`.env.*` с `VITE_*SERVICE_ROLE*`. Vitest-гард T03 сканирует только tracked-файлы (`.env.example`, `package.json`, `src/**`).

### Почему это важно (риск)
Повторное добавление `VITE_SUPABASE_SERVICE_ROLE` в локальный `.env` снова встроит ключ в browser bundle при `npm run build`; T03 guard этого не поймает ([audit F1](../../../../../../analysis/audit-STORY-SPA-SEC-01-execution-2026-06-27.md) §3).

### Факты из кода (Code Facts / SSOT)
1. T03 guard — [`serviceRoleEnvGuard.test.js:8`](../../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js) `TRACKED_ROOT_FILES = ['.env.example','package.json']`; `.env` не сканируется.
2. `.env` gitignored — [`spa-app/.gitignore:5-7`](../../../../../../../../.gitignore).
3. Исходный вектор — audit §3 F1; intake `.env:24` (removed T01).

### Gap / Проблема
Post-audit residual: AC2 выполнен для tracked-файлов, но не для gitignored `.env` — реального канала первичной утечки.

### AC/DoD
- [x] (P0) Re-adding `VITE_SUPABASE_SERVICE_ROLE` to local `.env` fails guard locally.
- [x] (P0) Clean tree (post-T01) passes.
- [x] (P1) Verification commands documented in README / task close note.

### Где менять код (P6)
- Extend [`serviceRoleEnvGuard.test.js`](../../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js) **or** new `spa-app/scripts/verify-env-no-service-role.mjs`
- Optional: [`package.json`](../../../../../../../../package.json) — `prebuild` / `test:guard:env` wiring
- Trade-off: CI checkout may lack `.env` — skip gracefully when no files exist

### Out of scope
- SEC-04 rotation (audit F3). Immutable [`pkg-000014`](../../../../../../spa-active-packages/pkg-000014-20260627-epic-spa-05-sec01-remove-service-role.yaml).
- Bundle-level scan — T08.

### Проверка
```bash
cd spa-app
npm run test:run -- src/auth/__tests__/serviceRoleEnvGuard.test.js
# intentional fail: add VITE_SUPABASE_SERVICE_ROLE=... to .env → guard must fail
```
