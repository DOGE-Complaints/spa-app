# SPA-BUG-08-T03 — Fix: `publicEnv.js` + migrate listed readers

**Status:** Done — P3 PASS 2026-08-18T11:11:32Z  
**Story:** [`../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)  
**Decision Ref:** [`../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) FR-BUG-08.1–.6 · FR-08.8  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-18T11:05:39Z  
**Package:** `pkg-000073`

## Purpose
Add `src/config/publicEnv.js` with the three helpers; migrate verified call-site list; identity trim-only. Local `.env` space hygiene (not committed). Keep `.env.example` L30.

## Risk
Second URL-normalize dialect; HL-04 fallback moved into `publicEnv.js`; Login/Board hostname branches; committing `.env`.

## Code Facts (re-verify at execute)
- Seam: [`publicEnv.js`](../../../../../../../src/config/publicEnv.js) L10 `normalizePublicBaseUrl` · L20 `getVitePublicString` · L30 `getVitePublicUrl`.
- `assertBaseUrl` delegates: [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) L3 · L9–14.
- Readers: `issueService.js` · `networkPulseService.js` · `emergingSignalsService.js` · `labelMissTelemetry.js` · `storyDraftService.js` · `supabaseClient.js` (`resolveSupabasePublicConfig`) · `storyGptUrl.js` · `waitlistService.js` · contract test.
- Identity trim-only via `getVitePublicString` (keeps HL-04 trailing-slash contract): [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L1 · L22. Fallback L8–10 **not** in `publicEnv.js`.
- `.env.example` L30 unchanged. Local `.env` L20 trailing space **removed** (not git).
- MOCK_MODE left as-is (`oauthService.js` / `identityService.js`).
- `package.json` L10 still `node scripts/start-spa.mjs`.

## AC / DoD
- [x] (P0) `src/config/publicEnv.js` exists with the three functions → FR-BUG-08.1 · backlog AC #1.
- [x] (P0) Verified call-site list migrated (FR-BUG-08.2 / .3 / .4) → backlog AC #2.
- [x] (P0) `.env.example` L30 still warns; no duplicate trim essay in five services → FR-BUG-08.6 · backlog AC #6.
- [x] (P0) Identity keeps HL-04 PROD throw / DCE fallback; no localhost literal in `publicEnv.js` → FR-BUG-08.5.
- [x] (P0) No Login/Board hostname branches; no HL-02 changes → FR-BUG-08.8.
- [x] (P0) Local `.env` space removed (not committed). Do not change `start-spa.mjs` / bake (BUG-06). Do not rewrite three-lane docs (BUG-07).

## Where to change
- New `spa-app/src/config/publicEnv.js` — done
- Listed FR-08.2 / .3 / .4 readers — done
- Local `.env` (operator file, **not** git) — done

## Out of scope
BUG-06 scripts; BUG-07 docs rewrite; commit `.env`; move HL-04 fallback into `publicEnv.js`; LoginPage placeholder detection.

## Verification
```bash
test -f spa-app/src/config/publicEnv.js
rg -n 'normalizePublicBaseUrl|getVitePublicString|getVitePublicUrl' spa-app/src/config/publicEnv.js
rg -n 'IDENTITY_SERVICE_DEV_FALLBACK|localhost:8100' spa-app/src/config/publicEnv.js spa-app/src/auth/resolveIdentityServiceUrl.js
```
