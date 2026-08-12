## Task workspace — `task-spa-sec-01-t08-bundle-service-role-verify-script`

- Story: [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-SEC-01-execution-2026-06-27.md`](../../../../../../analysis/audit-STORY-SPA-SEC-01-execution-2026-06-27.md) §3 F2
- **Depends on:** SPA-SEC-01-T07
- **activation:** `run_mode=spa_sec_01_audit_2026_06_27`
- **ui_scope:** `none`

---
**Приоритет:** P2  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_sec_01_audit_2026_06_27` (post-audit; **не** pkg-000014)  
**Skill declared:** javascript-pro  
**Scaffolded:** 2026-06-27T19:40:24Z  
**Closed:** 2026-06-27 (`run_mode=spa_sec_01_audit_2026_06_27`)
---

## Task: add — automated bundle service_role verify script

### Цель
Автоматизировать T04: post-`npm run build` scan `dist/assets/*.js` на `service_role` / JWT `"role":"service_role"`. Регрессионный контроль на уровне bundle (complements F1 / T07).

### Почему это важно (риск)
T04 выполнен разово вручную ([task-completion.md](../task-spa-sec-01-t04-bundle-no-service-role-verification/task-completion.md)); будущий билд с утёкшим ключом не будет пойман автоматически ([audit F2](../../../../../../analysis/audit-STORY-SPA-SEC-01-execution-2026-06-27.md) §3).

### Факты из кода (Code Facts / SSOT)
1. [`package.json:6-24`](../../../../../../../../package.json) — нет `verify:bundle` / bundle guard script.
2. T04 manual verify — [`task-spa-sec-01-t04/.../task-completion.md`](../task-spa-sec-01-t04-bundle-no-service-role-verification/task-completion.md).
3. `scripts/` — только [`deploy-arweave.mjs`](../../../../../../../../scripts/deploy-arweave.mjs).

### Gap / Проблема
Post-audit: нет автоматизированного post-build контроля; vitest guard не сканирует `dist/`.

### AC/DoD
- [x] (P0) Script fails if `service_role` appears in `dist/assets/*.js` after build with leaked env.
- [x] (P0) Passes on current clean tree.
- [x] (P1) False-positive handling documented (expect empty after T01).

### Где менять код (P6)
- New npm script e.g. `verify:bundle:no-service-role` in [`package.json`](../../../../../../../../package.json)
- Optional: `spa-app/scripts/verify-bundle-no-service-role.mjs`
- Optional: wire via `test:guard:bundle` or extend `test:run` (no new GitHub Actions unless repo already has CI — check at P6)

### Out of scope
- Prod deploy rotation (F3 / SEC-04). New pkg.

### Проверка
```bash
cd spa-app
npm run build
grep -r service_role dist/assets/*.js && exit 1 || echo "ok: bundle clean"
# after P6: npm run verify:bundle:no-service-role
```
