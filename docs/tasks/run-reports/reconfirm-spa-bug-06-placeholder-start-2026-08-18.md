# Reconfirm — STORY-SPA-BUG-06 placeholder `npm start` (T01)

- **Date:** 2026-08-18T10:18:16Z
- **Story:** STORY-SPA-BUG-06-stale-placeholder-bake-npm-start
- **Task:** T01

## Live facts (this session)

| Fact | Evidence |
|------|----------|
| Dist chunk still placeholder bake | `spa-app/dist/assets/index-3Fbc_xg4.js` (mtime 2026-08-16 15:34) contains `gateway.example.invalid`, `identity.example.invalid`, `project.supabase.co`, `public-anon-key-bake-reconfirm` |
| Zero HL-02 localhost needles in that chunk | scan: no `localhost:8000` / `localhost:8100` / `127.0.0.1:8000` / `127.0.0.1:8100` |
| Pre-fix `start` served static dist | `package.json` was `serve -s dist` (P1 Code Facts); leftover process on `:4173` still HTTP 200 this session |
| Diagnosis SSOT | [investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md](../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) H6 CONFIRMED — **not rediscovered** |
| Control gateway | `curl http://127.0.0.1:8000/tallinn/issues` this session → connection failed (gateway not listening). Identity `:8100/me` → **401**. Do not invent issues **200**. |

Did **not** dump `USER_PASSWORD` / anon JWT.

H1–H7 not re-run. Pin remains start × dist bake (T02).
