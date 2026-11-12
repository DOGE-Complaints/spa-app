# SPA-REQ9-01-T02 — Scripts: start decision + bake verify

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** backlog `STORY-SPA-REQ9-01-vite-identity-base-url.md` · REQ-18 · REQ9 R3  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:06:24Z`  
**Package:** `pkg-000086`

## Purpose

Rename bake/start script readers from `VITE_IDENTITY_SERVICE_URL` → `VITE_IDENTITY_BASE_URL` (`spaStartDecision.mjs` + tests, `verify-build-env-bake.mjs`). No dual-read.

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| Start decision parses new key | `spa-app/scripts/lib/spaStartDecision.mjs` — key `VITE_IDENTITY_BASE_URL` |
| Start decision tests | `spa-app/scripts/lib/__tests__/spaStartDecision.test.js` |
| Bake verify reads new key | `spa-app/scripts/verify-build-env-bake.mjs` — `process.env.VITE_IDENTITY_BASE_URL` + fail messages |

**Historical (pre-P3):** scripts parsed `VITE_IDENTITY_SERVICE_URL`.

## AC / DoD

- [x] (P0) `spaStartDecision.mjs` (+ tests) use `VITE_IDENTITY_BASE_URL` — **AC-SPA-REQ901-01**
- [x] (P0) `verify-build-env-bake.mjs` key names + error strings use new key — **AC-SPA-REQ901-01** · Scope #5
- [x] (P0) No dual-read of old key in scripts
- [x] (P0) Do not weaken HL-02 / placeholder bake semantics beyond key rename

## Where to change

- `spa-app/scripts/lib/spaStartDecision.mjs`
- `spa-app/scripts/lib/__tests__/spaStartDecision.test.js`
- `spa-app/scripts/verify-build-env-bake.mjs`

## Out of scope

Resolver/`.env.example` (T01) · operator docs/checklist (T03) · live Railway UI · invent health route

## Verification

```bash
cd spa-app && npx vitest run scripts/lib/__tests__/spaStartDecision.test.js
rg -n 'VITE_IDENTITY_SERVICE_URL' spa-app/scripts || true
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
