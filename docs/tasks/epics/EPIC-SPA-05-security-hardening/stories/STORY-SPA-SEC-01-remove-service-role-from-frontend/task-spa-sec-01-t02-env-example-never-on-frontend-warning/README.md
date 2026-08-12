# SPA-SEC-01-T02 — .env.example never-on-frontend warning

**Story:** [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md); [`04-env-configuration.md`](../../../../../../../requirements/04-env-configuration.md)  
**Depends on:** T01 (env purge)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Добавить в `.env.example` явный comment block после строк anon key: «service_role — НИКОГДА на фронте».

## Risk
Без документированного запрета оператор снова добавит `VITE_SUPABASE_SERVICE_ROLE`.

## Code Facts (re-verify at execute)
- [`.env.example:66-68`](../../../../../../../../.env.example) — сейчас только URL + anon, без anti-service_role warning.
- [`04-env-configuration.md:30`](../../../../../../../requirements/04-env-configuration.md) — env-spec для Supabase vars.

## AC / DoD
- [ ] `.env.example` содержит предупреждение «service_role — НИКОГДА на фронте» (story AC #3).
- [ ] Текст согласован с `04-env-configuration.md` (no new `VITE_SUPABASE_SERVICE_ROLE` line).

## Where to change
- [`spa-app/.env.example`](../../../../../../../../.env.example) — comment block после `VITE_SUPABASE_ANON_KEY`

## Out of scope
- Guard test implementation — T03.
- Env purge — T01.
- Backend SEC-04 / SPA-SEC-02.

## Verification
```bash
grep -i "service_role" spa-app/.env.example
grep -i "НИКОГДА\|NEVER" spa-app/.env.example
```
