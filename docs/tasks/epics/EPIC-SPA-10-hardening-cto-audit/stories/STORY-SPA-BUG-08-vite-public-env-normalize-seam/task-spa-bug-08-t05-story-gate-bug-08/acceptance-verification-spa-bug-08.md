# Story acceptance gate — STORY-SPA-BUG-08-vite-public-env-normalize-seam

- **Story:** Single Vite public-env normalize seam
- **Package:** `pkg-000073-20260818-epic-spa-10-bug-08-public-env-normalize.yaml`
- **Result:** PASS
- **Date:** 2026-08-18T11:11:32Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `src/config/publicEnv.js` exists with the three functions above. | PASS | `normalizePublicBaseUrl` L10 · `getVitePublicString` L20 · `getVitePublicUrl` L30 |
| Verified call-site list in this story migrated (FR-BUG-08.2 / .3 / .4). | PASS | issueService / Pulse / Emerging / GatewayIssueRepository (delegates) / contract test / labelMissTelemetry / storyDraft / supabaseClient / storyGptUrl / waitlist |
| `rg` product `src/` (exclude `publicEnv.js` and `__tests__` if they stub): no raw `import.meta.env.VITE_GATEWAY_BASE_URL`. | PASS | `rg` zero hits in `spa-app/src` |
| Identity HL-04 vitest (PROD throw / DEV fallback) still green. | PASS | `resolveIdentityServiceUrl.test.js` 4/4 |
| New unit tests cover space + slash class. | PASS | `publicEnv.test.js` 5/5 · `supabaseClient.publicEnv.test.js` 3/3 |
| `.env.example` L30 still warns; no duplicate trim essay in five services. | PASS | L30 hygiene line unchanged |
| BUG-06 start/bake scripts out of this PR unless already landed separately. | PASS | `package.json` L10 still `node scripts/start-spa.mjs`; no `start-spa.mjs` edit this pkg |

## Pin note (FR-BUG-08)

Pinned layer = SPA config seam (`publicEnv` + `normalizePublicBaseUrl`). Not UI / LoginPage. Not H6 bake. HL-04 fallback **not** moved into `publicEnv.js`. Identity uses `getVitePublicString` (trim-only) so HL-04 trailing-slash contract stays.

## Commands (live verification 2026-08-18T11:11:32Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run
rg -n 'import\.meta\.env\.VITE_GATEWAY_BASE_URL' spa-app/src
rg -n 'Hygiene: без хвостовых пробелов' spa-app/.env.example
rg -n 'IDENTITY_SERVICE_DEV_FALLBACK' spa-app/src/auth/resolveIdentityServiceUrl.js spa-app/src/config/publicEnv.js
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
