## Task workspace — `task-spa-id-05-t09-mock-verification-error-fixtures`

- Story: [`../STORY-SPA-ID-05-verification-error-states.md`](../STORY-SPA-ID-05-verification-error-states.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-05-execution-2026-06-29.md`](../../../../../../analysis/audit-STORY-SPA-ID-05-execution-2026-06-29.md) §3 F3
- **Depends on:** SPA-ID-05-T08 (recommended order); T01–T07 Done
- **activation:** `run_mode=spa_id_05_audit_2026_06_29`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** M  
**Статус:** Done  
**Wave:** `run_mode=spa_id_05_audit_2026_06_29` (post-audit; **не** pkg-000019)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-29T10:14:37Z  
---

## Task: implement — mock verification error fixtures (9/9 kinds in mock mode)

### Цель
Расширить mock-ветки `identityService` детерминированными phone/OTP триггерами для всех M37 error kinds, чтобы ручной UI-smoke в `VITE_IDENTITY_MOCK_MODE=true` не требовал identity backend. Закрыть audit F3.

### Почему это важно (риск)
Сейчас mock покрывает только 2/9 kind'ов ([identityService.js:109-140](../../../../../../../../src/auth/identityService.js)); QA вынуждены поднимать identity для остальных веток.

### Факты из кода (Code Facts / SSOT)
1. Существующие mock-триггеры — `+37288888888` → `COUNTRY_NOT_ALLOWED`; OTP `999999` → `CODE_MISMATCH` ([identityService.js:109-140](../../../../../../../../src/auth/identityService.js)).
2. Happy-path mock — номер `55555555` / OTP `123456` (любые 6 цифр кроме фикстур) → success.
3. Mapping SSOT — [verificationErrorMapping.js](../../../../../../../../src/auth/verificationErrorMapping.js) `API_CODE_TO_ERROR_KIND` (9 kinds).
4. Manual smoke — [manual-smoke-phone-verification.md](../../../../../../runtime-docs/manual-smoke-phone-verification.md) §error scenarios (2 сценария today).
5. Audit F3 — [audit-STORY-SPA-ID-05-execution-2026-06-29.md](../../../../../../analysis/audit-STORY-SPA-ID-05-execution-2026-06-29.md) §3 F3.

### Gap / Проблема
Post-audit: mock mode не инжектит 7 из 9 error kinds; vitest покрывает mapping, но ручной mock UI-smoke неполный.

### Mock trigger contract (P6 implement — SSOT for this task)

**requestPhoneVerification** (`VITE_IDENTITY_MOCK_MODE=true`):

| Local digits | E.164 | `error.code` |
|---|---|---|
| `88888888` | `+37288888888` | `COUNTRY_NOT_ALLOWED` (existing) |
| `77777777` | `+37277777777` | `RATE_LIMITED` |
| `66666666` | `+37266666666` | `SEND_FAILED` (maps to SMS_UNAVAILABLE UI) |
| `55555556` | `+37255555556` | `profile_conflict` |
| `44444444` | `+37244444444` | `PROVIDER_UNAVAILABLE` |
| `33333333` | `+37233333333` | throw `network_error` (simulate fetch failure in mock branch) |

**confirmPhoneVerification** mock OTP:

| OTP | `error.code` |
|---|---|
| `999999` | `CODE_MISMATCH` (existing) |
| `888888` | `CODE_EXPIRED` |
| `777777` | `TOO_MANY_ATTEMPTS` |
| `666666` | `AUTHENTICATION_REQUIRED` |
| `555555` | `session_expired` (defensive; maps to SIGN_IN UI) |

**Collision rules:** не пересекать happy-path `55555555` + `123456`; документировать в manual-smoke.

### AC/DoD
- [x] (P0) Все строки mock trigger contract реализованы в `identityService.js` mock branches.
- [x] (P0) Каждый триггер бросает `IdentityApiError` с корректным `code` (и `trace_id` где уместно).
- [x] (P0) Vitest: по одному тесту на каждый новый триггер в [`identityService.phone.test.js`](../../../../../../../../src/auth/__tests__/identityService.phone.test.js).
- [x] (P1) [manual-smoke-phone-verification.md](../../../../../../runtime-docs/manual-smoke-phone-verification.md) — таблица phone/OTP → error panel (все 9 kinds).
- [x] (P1) `npm run test:run` green; `test:ui:verify-error` still PASS.
- [x] (P1) Puppeteer gate extension — **optional** (non-blocking).

### Где менять
- `spa-app/src/auth/identityService.js` — mock branches
- `spa-app/src/auth/__tests__/identityService.phone.test.js` — fixture tests
- `spa-app/docs/runtime-docs/manual-smoke-phone-verification.md` — error scenario table

### Out of scope
- Изменение `verificationErrorMapping` / `PhoneVerificationErrorState` (Done)
- ID-07 waitlist form
- Новый puppeteer script (optional)
- `doge-identity-service` backend

### Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/identityService.phone.test.js
cd spa-app && npm run test:ui:verify-error
# manual: VITE_IDENTITY_MOCK_MODE=true — пройти таблицу в manual-smoke §error scenarios
```
