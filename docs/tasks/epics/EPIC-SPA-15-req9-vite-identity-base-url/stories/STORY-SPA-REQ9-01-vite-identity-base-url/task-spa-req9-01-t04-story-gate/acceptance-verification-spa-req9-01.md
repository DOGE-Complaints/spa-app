# Story acceptance gate — STORY-SPA-REQ9-01-vite-identity-base-url

- **Story:** `VITE_IDENTITY_BASE_URL` hard cut
- **Package:** `pkg-000086-20260926-epic-spa-15-req9-01-vite-identity-base-url.yaml`
- **Result:** PASS
- **Date:** 2026-09-26T12:09:47Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| AC-SPA-REQ901-01 (R3) | PASS | `src/` + `.env.example` + `scripts/` + listed docs use `VITE_IDENTITY_BASE_URL`; `rg VITE_IDENTITY_SERVICE_URL spa-app/src spa-app/scripts spa-app/.env.example` → **0**. Gate-scope (`!docs/tasks/**` `!docs/analysis/**`): residual only in REQ-18 Goal rename narrative + README-index historical arrow (prefer-0 soft). |
| AC-SPA-REQ901-02 | PASS | No new `VITE_*SERVICE_ROLE*` embed; `.env.example` still warns never to add; `serviceRoleEnvGuard.test.js` bans pattern. Bundle guard path unchanged. |
| AC-SPA-REQ901-03 (G10) | PASS | No new spa BE `/health` route added (`rg /health spa-app/src` empty for new route). |
| AC-SPA-REQ901-04 | PASS | `resolveIdentityServiceUrl.js` reads only `VITE_IDENTITY_BASE_URL`; PROD blank → throw; non-PROD → `IDENTITY_SERVICE_DEV_FALLBACK`; function/local names unchanged; auth still user Bearer via existing clients. Vitest resolver+publicEnv+spaStartDecision **17/17**. |
| AC-SPA-REQ901-05 (Railway lock A) | PASS | [deploy-guide.md § REQ9 checklist](../../../../../../deploy-guide.md#req9--rename-bake-var-to-vite_identity_base_url-ops-checklist) + [railway-git-deploy-manual.md](../../../../../../railway-git-deploy-manual.md) document Variables rename + rebuild; **no** live Railway UI required for Done. |

## Commands (live verification 2026-09-26T12:09:47Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
# ok 4 paths · pkg-000086
cd spa-app && npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js src/config/__tests__/publicEnv.test.js scripts/lib/__tests__/spaStartDecision.test.js
# 17 passed
cd spa-app && npm test -- --run
# 638 passed | 2 skipped
rg -n 'VITE_IDENTITY_SERVICE_URL' spa-app/src spa-app/scripts spa-app/.env.example || true
# → 0
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
