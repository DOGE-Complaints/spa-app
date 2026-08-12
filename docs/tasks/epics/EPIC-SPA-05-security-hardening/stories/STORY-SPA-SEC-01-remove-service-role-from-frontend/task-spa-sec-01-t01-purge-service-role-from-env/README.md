# SPA-SEC-01-T01 — Purge service_role from local env

**Story:** [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md); [`identity-supabase-frontend-split-2026-06-16.md §6.1`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md)  
**Depends on:** — (first task in wave)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Удалить `VITE_SUPABASE_SERVICE_ROLE` из локального `spa-app/.env` и любых `.env.*`, оставив только `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.

## Risk
Привилегированный ключ в `VITE_*` встраивается Vite в browser bundle и обходит RLS.

## Code Facts (re-verify at execute)
- 🔴 `VITE_SUPABASE_SERVICE_ROLE` — [`spa-app/.env:24`](../../../../../../../../.env) (gitignored; operator applies locally).
- [`.gitignore:5-7`](../../../../../../../../.gitignore) — `.env` / `.env.*` не коммитятся.
- [`supabaseClient.js`](../../../../../../../../src/auth/supabaseClient.js) — `createClient(URL, ANON_KEY)` only; grep `SERVICE_ROLE` in `src/` → 0.

## AC / DoD
- [ ] `VITE_SUPABASE_SERVICE_ROLE` удалён из `spa-app/.env` и всех локальных `.env.*`.
- [ ] `grep -R SERVICE_ROLE spa-app/.env*` → пусто (story AC #1, env half).

## Where to change
- `spa-app/.env` (local only — not in git)
- Любые локальные `spa-app/.env.*` с этой переменной

## Out of scope
- Backend `service_role` — identity [SEC-04](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md).
- Anon-in-browser ADR — [SPA-SEC-02](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md).
- `.env.example` warning — T02; guard test — T03; bundle scan — T04.

## Verification
```bash
grep -R SERVICE_ROLE spa-app/.env* || echo "ok: no SERVICE_ROLE in env files"
grep -R SERVICE_ROLE spa-app/src || echo "ok: no SERVICE_ROLE in src"
```
