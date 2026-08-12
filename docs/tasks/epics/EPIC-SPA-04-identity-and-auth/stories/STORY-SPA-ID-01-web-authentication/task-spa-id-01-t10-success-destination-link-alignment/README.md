## Task workspace — `task-spa-id-01-t10-success-destination-link-alignment`

- Story: [`../STORY-SPA-ID-01-web-authentication.md`](../STORY-SPA-ID-01-web-authentication.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md`](../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md) §3 F2
- **Depends on:** SPA-ID-01-T06 Done
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

## Task: fix — align auth success destination links with real routes

### Цель
Убрать misleading labels «Issues»/«Dashboard» на success-экране или привести ссылки/подписи к существующим роутам (`/board`, `/issue/:id`) без добавления `/dashboard` (audit F2).

### Почему это важно (риск)
После успешного входа пользователь видит ссылки с подписями, не соответствующими фактическому `to` — все три ведут на `/board` ([`LoginPage.jsx:343-347`](../../../../../../../../src/pages/LoginPage.jsx)).

### Факты из кода (Code Facts / SSOT)
1. Success state links — [`LoginPage.jsx:343-347`](../../../../../../../../src/pages/LoginPage.jsx) — `to="/board"` для Board/Issues/Dashboard.
2. App routes — только `/`, `/login`, `/board`, `/issue/:id` ([`App.jsx`](../../../../../../../../src/App.jsx)); `/issues`, `/dashboard` отсутствуют.
3. Audit F2 — [audit-STORY-SPA-ID-01-execution-2026-06-27.md](../../../../../../analysis/audit-STORY-SPA-ID-01-execution-2026-06-27.md) §3 F2.

### Gap / Проблема
Post-audit UX: success destination labels не соответствуют href.

### AC/DoD
- [x] (P0) Каждая ссылка на success-экране: label соответствует целевому route (нет «Dashboard» → `/board`).
- [x] (P0) Не добавлять новые routes `/dashboard` / `/issues` (вне scope ID-01; ID-02+).
- [x] (P1) `npm run test:ui:auth-login` — PASS (state F or `dev_auth_state=auth-success`).

### Где менять код
- [`src/pages/LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx)

### Out of scope
- Story-draft/GPT context (ID-06/08). Phone verify (ID-04). OAuth code (ID-08).
- Новый dashboard route (ID-02 Session Shell)
- Новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml)

### Проверка
```bash
cd spa-app
npm run test:ui:auth-login
```
