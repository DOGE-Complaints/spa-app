# T01 reconfirm — STORY-SPA-BUG-05 env-bake fail

- **When:** local P3 execute (pre-fix)
- **Story:** STORY-SPA-BUG-05-railway-env-bake-localhost-fallback
- **Command:** `cd spa-app &&` public `VITE_*` (non-localhost) + `npm run verify:build:env-bake`

## Result (pre-fix)

- Pre-check: `building with public env URLs`
- Vite: `✓ 255 modules transformed` · `✓ built`
- Gate: exit **1**
- Needle: `index-Bu0Q4772.js: contains localhost:8100`

Matches backlog Expected vs Actual and [investigation](../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) H1 CONFIRMED. Not superseded — local scan reproduced the Railway fail.

## Public env used (dummy bake values, not Railway secrets)

`VITE_GATEWAY_BASE_URL`, `VITE_IDENTITY_SERVICE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_STORY_GPT_URL` — all non-localhost HTTPS / public-looking strings.
