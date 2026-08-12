## Task workspace — `task-spa-id-01-t04-login-signup-password-flows`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: Story FR-01.1, FR-01.2; [identity-frontend FR-FE-001](../../../../../../../docs/Identity/identity-frontend.md)
- **Depends on:** T01, T03 Todo
- **ui_scope:** `mixed`

---
**Приоритет:** P0  
**Сложность:** L  
**Статус:** Done  
**Wave:** `pkg-000013`  
**Skill declared:** react-expert  
---

## Task: implement — login + signup password flows (FR-01.1, FR-01.2)

### Цель
Wire Supabase `signInWithPassword` (state A, Remember me) и `signUp` (state B, confirm password); support text «Phone verification happens later when required»; **no phone field**.

### Почему это важно (риск)
Core account-first entry (Story AC #1); без password flows auth screen — empty shell.

### Факты из кода (Code Facts / SSOT)
1. FR-01.1: login email/password + Remember me (Supabase persistSession).
2. FR-01.2: signup email/password/confirm; phone NOT at signup.
3. T01 provides `supabaseClient` + `useAuthSession`.
4. T03 provides LoginPage shell states A/B.
5. After success → call T02 `fetchMe` then transition to state F (T06).

### Gap / Проблема
No wired forms or Supabase auth calls on login page.

### AC/DoD
- [ ] (P0) State A: email/password form; submit → `signInWithPassword`; Remember me → session persistence.
- [ ] (P0) State B: signup form with confirm; submit → `signUp`; no phone input.
- [ ] (P0) Support text on signup per FR-01.2 (i18n key or literal per project convention).
- [ ] (P0) Toggle A ↔ B without losing entered email where sensible.
- [ ] (P0) Story AC #1: login/signup work; phone not requested at signup.
- [ ] (P1) Form validation: required fields, password match on signup.

### Где менять код
- `src/pages/LoginPage.jsx`
- `src/auth/useLoginForm.js` (new)
- `src/auth/useSignupForm.js` (new)
- `src/i18n/dictionaries/*.js` (auth strings if needed)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Magic link / forgot password (T05). Error UI mapping (T06).

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/useLoginForm.test.js src/auth/__tests__/useSignupForm.test.js
```
