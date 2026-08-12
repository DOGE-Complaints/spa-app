## Task workspace — `task-spa-cab-02-t09-remove-dead-allowed-profile-keys-export`

- Story: [`../STORY-SPA-CAB-02-account-summary-block.md`](../STORY-SPA-CAB-02-account-summary-block.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-CAB-02-execution-2026-07-12.md`](../../../../../../analysis/audit-STORY-SPA-CAB-02-execution-2026-07-12.md) §INFO-2
- **Depends on:** SPA-CAB-02-T01..T08 Done (`pkg-000029`)
- **activation:** `run_mode=spa_cab_02_audit_2026_07_12`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-07-12T08:48:59Z  
**Wave:** `run_mode=spa_cab_02_audit_2026_07_12` (post-audit; **не** pkg-000029)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-12T08:46:31Z  
---

## Task: refactor — remove dead `ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS` export

### Цель
Удалить неиспользуемый export `ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS` из [`accountSummaryState.js`](../../../../../../../../src/components/AccountSummary/accountSummaryState.js) — privacy уже enforced by construction в [`AccountSummary.jsx`](../../../../../../../../src/components/AccountSummary/AccountSummary.jsx).

### Почему это важно (риск)
Dead export создаёт ложное ощущение runtime whitelist; при refactor может быть ошибочно импортирован вместо фактического field set компонента.

### Code Facts (re-verify at execute)
1. Export объявлен [`accountSummaryState.js:102-109`](../../../../../../../../src/components/AccountSummary/accountSummaryState.js) — `ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS`.
2. Barrel [`index.js:1-6`](../../../../../../../../src/components/AccountSummary/index.js) **не** re-export'ит этот символ.
3. Audit §INFO-2: «exported but never consumed — privacy enforced by construction».

### AC/DoD
- [x] (P0) Удалить `ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS` и связанный JSDoc из `accountSummaryState.js`.
- [x] (P0) `rg ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS spa-app/src` → 0 hits.
- [x] (P0) `npm test` green (полный suite).
- [x] (P1) **Не** менять `pkg-000029`, `spa-active-package.current.yaml`.

### Where to change
- [`spa-app/src/components/AccountSummary/accountSummaryState.js`](../../../../../../../../src/components/AccountSummary/accountSummaryState.js)

### Out of scope
- Смена privacy-модели / whitelist semantics в компоненте
- Новый pkg / смена active package pointer
- Gate CAB-02 T08 (уже PASS)

### Verification
```bash
cd spa-app
rg ACCOUNT_SUMMARY_ALLOWED_PROFILE_KEYS src
npm test
```

### Gate
- [`acceptance-verification-spa-cab-02-t09.md`](./acceptance-verification-spa-cab-02-t09.md) → PASS
