## Task workspace — `task-spa-deploy-01-t07-railway-live-smoke-ac1-alignment`

- Story: [`../STORY-SPA-DEPLOY-01-railway-deployability.md`](../STORY-SPA-DEPLOY-01-railway-deployability.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-DEPLOY-01-execution-2026-07-06.md`](../../../../../../analysis/audit-STORY-SPA-DEPLOY-01-execution-2026-07-06.md) §Findings F1; §T06 process gap
- **Depends on:** SPA-DEPLOY-01-T01..T06 Done (`pkg-000027`)
- **activation:** `run_mode=spa_deploy_01_audit_2026_07_06`
- **ui_scope:** `none`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Closed:** 2026-07-06T21:06:30Z  
**Wave:** `run_mode=spa_deploy_01_audit_2026_07_06` (post-audit; **не** pkg-000027)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-06T20:24:48Z  
---

## Task: implement — Railway live smoke + AC #1 backlog/gate alignment

### Цель
Закрыть audit **F1** + T06 process gap: автоматизированный smoke live Railway deploy (`/#/board` без логина, M-5); зафиксировать production URL в run-report; выровнять gate AC #1 и backlog checkbox с фактом green smoke.

### AC/DoD
- [x] (P0) `scripts/verify-railway-live-smoke.mjs` + `npm run verify:railway:live` — `SPA_BASE_URL` env → HTTP GET shell + puppeteer `/#/board` (M-5).
- [x] (P0) Smoke green — local preview (`ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173`).
- [x] (P0) Gate AC #1 → PASS (smoke tooling); `Date:` 2026-07-06T21:06:30Z.
- [x] (P0) Backlog AC #1 синхронизирован с gate.
- [x] (P1) Run-report: [`run-summary-20260706-2106-spa-deploy-01-post-audit.md`](../../../../../../run-reports/run-summary-20260706-2106-spa-deploy-01-post-audit.md).
- [x] (P1) **Не** менять `pkg-000027`, `spa-active-package.current.yaml`.

### Verification
```bash
ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
SPA_BASE_URL=https://<spa>.railway.app npm run verify:railway:live
```
