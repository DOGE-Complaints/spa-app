# T02 completion — .env.example warning

- **Status:** Done
- **Executed:** 2026-06-27 (P3 pkg-000014)

## Changes

- Added comment block after anon key lines in [`spa-app/.env.example`](../../../../../../../.env.example): «service_role — НИКОГДА на фронте» + `VITE_*SERVICE_ROLE*` ban + link to `04-env-configuration.md`.

## Verification (live)

```bash
grep -i "НИКОГДА" spa-app/.env.example
grep -v '^#' spa-app/.env.example | grep SERVICE_ROLE || echo "ok: no active SERVICE_ROLE lines"
```
