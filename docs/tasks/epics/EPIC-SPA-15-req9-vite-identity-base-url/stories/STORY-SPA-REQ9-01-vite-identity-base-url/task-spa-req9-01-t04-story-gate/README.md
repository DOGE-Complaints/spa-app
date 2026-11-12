# SPA-REQ9-01-T04 — Story gate REQ9-01

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** backlog `STORY-SPA-REQ9-01-vite-identity-base-url.md` · REQ-18 · REQ9 R3  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:06:24Z`  
**Package:** `pkg-000086`

## Purpose

Story acceptance gate for REQ9-01. Fill `acceptance-verification-spa-req9-01.md` **after** live vitest + `--verify` in P3 (Date from live `--print-utc-now`). Confirm AC-01…05 including `rg` old key, bundle guard, no new `/health`, Railway checklist-only Done.

## Code Facts (pre-P3)

| Claim | Evidence |
|-------|----------|
| Story AC on disk | pipeline + backlog |
| Gate template | `docs/methodology/Zeya888-builder-queue/templates/story-acceptance-gate-template.md` |
| Bundle guard script | `spa-app/package.json` → `verify:bundle:no-service-role` / `scripts/verify-bundle-no-service-role.mjs` |
| pkg paths | `pkg-000086` |

## AC / DoD

- [x] (P0) All AC-SPA-REQ901-01…05 evidenced in gate file
- [x] (P0) `rg VITE_IDENTITY_SERVICE_URL spa-app` → **0** in product/templates/scripts (prefer 0 everywhere) — **AC-01**
- [x] (P0) No new `VITE_*SERVICE_ROLE*` / service token; bundle guard green if present — **AC-02**
- [x] (P0) No new BE `/health` route on spa — **AC-03**
- [x] (P0) PROD fail-fast / non-PROD fallback / user Bearer only — **AC-04**
- [x] (P0) Ops checklist documents bake rename; **no** live Railway UI required — **AC-05**
- [x] (P0) Gate `Date:` only after live P3 verify + `--print-utc-now`

## Where to change

- `acceptance-verification-spa-req9-01.md` — fill in P3 (stub scaffolded)

## Out of scope

P4 · P8 · UX screenshots (`ui_scope: none`) · product implementation (T01–T03)

## Verification

```bash
cd spa-app && npm test
# if CI uses it:
# npm run verify:bundle:no-service-role
rg -n 'VITE_IDENTITY_SERVICE_URL' spa-app --glob '!docs/tasks/**' --glob '!docs/analysis/**' || true
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
