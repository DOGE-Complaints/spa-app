# Story acceptance gate — STORY-SPA-BUG-05

- **Story:** Railway env-bake blocked by identity localhost fallback
- **Package:** `pkg-000065-20260816-epic-spa-10-bug-05-railway-env-bake.yaml`
- **Result:** PASS (local AC) · Railway SUCCESS **PENDING**
- **Date:** 2026-08-16T12:34:58Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Evidence / reconfirm note (или явная ссылка на investigation + local scan) существует. | PASS | [reconfirm-spa-bug-05-env-bake-2026-08-16.md](../../../../run-reports/reconfirm-spa-bug-05-env-bake-2026-08-16.md) · pre-fix exit 1 · `index-Bu0Q4772.js: contains localhost:8100` · 255 modules |
| Pin layer = SPA resolver / fallback bake (зафиксирован в gate note). | PASS | T02 pin: [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) `IDENTITY_SERVICE_DEV_FALLBACK` × HL-02 bake. Not env / Node / flake. Do not disable gate. |
| `npm run verify:build:env-bake` с public env → exit **0**. | PASS | Post-fix: `ok: no localhost; gateway/identity/supabase/gpt URLs present in bundle` |
| `rg`/`scan`: no `localhost:8100` / `127.0.0.1:8100` in `dist/assets/*.js`. | PASS | `rg` no needle · chunk `index-3Fbc_xg4.js` |
| HL-04 vitest (PROD throw / DEV fallback) зелёный. | PASS | `npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js` · 4/4 |
| `railway.toml` всё ещё `verify:build:env-bake`. | PASS | [`railway.toml`](../../../../../../../railway.toml) L8 `buildCommand = "npm run verify:build:env-bake"` |
| Railway spa-app tallinn-demo deployment **SUCCESS** после fix tip (evidence: deployment id + gate ok line). | PENDING | P6 T06 **BLOCKED** 2026-08-16T12:43:28Z. Latest Railway SUCCESS still `eda23243` / `072ae20` (2026-08-09, **pre-fix**). No spa-app deploy after P3 fix. Id **not invented**. Operator must redeploy tallinn-demo on fix tip and attach id + gate ok line. |

## Pin note (FR-BUG-05.2)

Pinned layer = SPA product resolver fallback string bake (`IDENTITY_SERVICE_DEV_FALLBACK`). Fix: fold via `import.meta.env.PROD` so prod DCE drops `localhost:8100`. HL-04 throw kept. HL-02 `FORBIDDEN_LOCALHOST` / `railway.toml` buildCommand **unchanged**.

## Commands (live verification 2026-08-16T12:34:58Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js
# public VITE_* then:
cd spa-app && npm run verify:build:env-bake
rg -n 'verify:build:env-bake' spa-app/railway.toml
rg -n 'localhost:8100|127.0.0.1:8100' spa-app/dist/assets/*.js
```

## T06 BLOCKED note (P6 2026-08-16T12:43:28Z)

Railway MCP list-deployments (spa-app / tallinn-demo): no SUCCESS after resolver DCE. Last SUCCESS `eda23243-ba9c-4548-8acb-4ee92360ff1b` is pre-fix. Do not close FR-BUG-05.6 on that id. See [T06 acceptance](../task-spa-bug-05-t06-attach-railway-success-evidence/acceptance-verification-spa-bug-05-t06.md).

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
