## Task workspace — `task-spa-id-01-t11-signup-password-mismatch-message`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md`](../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md) §3 F3
- **Depends on:** SPA-ID-01-T04 Done
- **activation:** `run_mode=spa_id_01_audit_2026_06_27`
- **ui_scope:** `mixed`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_id_01_audit_2026_06_27` (post-audit; **не** pkg-000013)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-27T12:20:21Z  
---

## Task: fix — signup password mismatch shows correct message

### Цель
При `password !== confirmPassword` на signup показывать inline validation / отдельное сообщение «passwords do not match» **до** auth-error state с кодом `invalid_credentials` (audit F3; вне 5 backend-кодов §10).

### Почему это важно (риск)
Частый UX-кейс показывает «Incorrect email or password», что семантически неверно для mismatch полей confirm.

### Факты из кода (Code Facts / SSOT)
1. Mismatch → `showError(new Error('invalid_credentials'))` — [`LoginPage.jsx:90-92`](../../../../../../../../src/pages/LoginPage.jsx).
2. `invalid_credentials` message — «Incorrect email or password» ([`mapAuthError.js:4`](../../../../../../../../src/auth/mapAuthError.js)).
3. Audit F3 — [audit-STORY-SPA-ID-01-execution-2026-06-27.md](../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md) §3 F3.

### Gap / Проблема
Post-audit contract: signup password mismatch mapped to wrong error copy.

### AC/DoD
- [x] (P0) Password mismatch on signup shows dedicated inline message (not AUTH_ERROR state E with `invalid_credentials`).
- [x] (P0) Supabase `signUp` **не** вызывается при mismatch.
- [x] (P1) Vitest or component test for mismatch path.
- [x] (P1) `npx vitest run` — green.

### Где менять код
- [`src/pages/LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx)
- опц. [`src/auth/mapAuthError.js`](../../../../../../../../src/auth/mapAuthError.js) + [`mapAuthError.test.js`](../../../../../../../../src/auth/__tests__/mapAuthError.test.js)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Новый backend error code in 5-code set
- Новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml)

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/mapAuthError.test.js
npx vitest run
```
