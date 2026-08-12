## Task workspace — `task-spa-id-01-t09-remember-me-persist-session`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md`](../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md) §3 F1
- **Depends on:** SPA-ID-01-T01, T04 Done
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

## Task: fix — Remember Me affects session persistence

### Цель
Связать чекбокс Remember Me с реальной persistSession/storage Supabase **или** убрать контрол (продуктовое решение в рамках таска). Закрыть audit F1: флаг `dogestonia-remember-me` сейчас косметический.

### Почему это важно (риск)
Пользователь ожидает, что снятый Remember Me не сохраняет сессию между перезапусками браузера; сейчас поведение одинаково независимо от чекбокса.

### Факты из кода (Code Facts / SSOT)
1. `readRememberMe` / `writeRememberMe` — [`LoginPage.jsx:11-17,74`](../../../../../../../../src/pages/LoginPage.jsx).
2. Supabase client — фиксированный `storageKey`, дефолтный `persistSession` — [`supabaseClient.js:18-22`](../../../../../../../../src/auth/supabaseClient.js); флаг **не читается**.
3. Audit F1 — [audit-STORY-SPA-ID-01-execution-2026-06-27.md](../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md) §3 F1.

### Gap / Проблема
Post-audit UX: Remember Me checkbox без эффекта на persistSession.

### AC/DoD
- [x] (P0) Remember Me checked → сессия персистится (localStorage / Supabase default).
- [x] (P0) Remember Me unchecked → session-only поведение (sessionStorage или explicit non-persist) **или** контрол удалён с обоснованием в task close note.
- [x] (P1) Vitest: поведение флага покрыто (mock storage or integration).
- [x] (P1) `npx vitest run src/auth/__tests__/` — green.

### Где менять код
- [`src/auth/supabaseClient.js`](../../../../../../../../src/auth/supabaseClient.js)
- [`src/pages/LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx)
- [`src/auth/__tests__/`](../../../../../../../../src/auth/__tests__/)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml)

### Проверка
```bash
cd spa-app
npx vitest run src/auth/__tests__/
```
