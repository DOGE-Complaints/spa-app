## Task workspace — `task-spa-id-01-t05-magic-link-forgot-password`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: Story FR-01.3, FR-01.4; M121 states C, D
- **Depends on:** T01, T03 Todo
- **ui_scope:** `mixed`

---
**Приоритет:** P0  
**Сложность:** M  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — magic link + forgot password flows (FR-01.3, FR-01.4)

### Цель
Passwordless magic link (state C metadata: sent, ~15 min expiry); Resend; «Use password instead». Forgot password (state D) → reset link email → return to login.

### Почему это важно (риск)
Story AC #2 requires distinct magic-link and forgot-password states.

### Факты из кода (Code Facts / SSOT)
1. FR-01.3: `signInWithOtp` / magic link; state C UI with Resend + fallback to password.
2. FR-01.4: `resetPasswordForEmail`; state D → Send Reset Link → back to login.
3. M121 state C: «Check Your Email» metadata block.
4. T03 shell provides states C/D containers.

### Gap / Проблема
Magic link and password reset flows not implemented.

### AC/DoD
- [ ] (P0) State C: after magic link request show sent UI with expiry hint (~15 min).
- [ ] (P0) Resend magic link action (rate-limit aware — defer to T06 for error UI).
- [ ] (P0) «Use password instead» → state A.
- [ ] (P0) State D: email input + Send Reset Link → Supabase reset → navigate to login with confirmation.
- [ ] (P0) Story AC #2: magic-link and forgot-password have own states C/D.

### Где менять код
- `src/pages/LoginPage.jsx`
- `src/auth/useMagicLink.js` (new)
- `src/auth/useForgotPassword.js` (new)
- `src/auth/__tests__/useMagicLink.test.js` (new)
- `src/auth/__tests__/useForgotPassword.test.js` (new)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Auth error mapping UI (T06). Success redirect (T06).

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/useMagicLink.test.js src/auth/__tests__/useForgotPassword.test.js
```
