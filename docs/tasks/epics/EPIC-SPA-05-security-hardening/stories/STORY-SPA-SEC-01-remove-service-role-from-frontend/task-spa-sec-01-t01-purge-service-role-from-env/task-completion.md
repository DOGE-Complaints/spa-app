# T01 completion — purge service_role from env

- **Status:** Done
- **Executed:** 2026-06-27 (P3 pkg-000014)

## Changes

- Removed `VITE_SUPABASE_SERVICE_ROLE` from [`spa-app/.env`](../../../../../../../.env) (line 24 at intake; gitignored).

## Verification (live)

```bash
grep SERVICE_ROLE spa-app/.env || echo "ok"
# ok: .env no SERVICE_ROLE
```

## Evidence

- Intake: [`STORY-SPA-SEC-01`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md) §«Точки в коде» → `.env:24`.
- Post-T01: only `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` remain in `.env`.
