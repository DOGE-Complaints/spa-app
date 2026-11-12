# SPA-REQ9-01-T03 — Docs + Railway ops checklist

**Status:** Done  
**Story:** [`../STORY-SPA-REQ9-01-vite-identity-base-url.md`](../STORY-SPA-REQ9-01-vite-identity-base-url.md)  
**Decision Ref:** backlog `STORY-SPA-REQ9-01-vite-identity-base-url.md` · REQ-18 · REQ9 R3 · Railway lock **A**  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-09-26T12:06:24Z`  
**Package:** `pkg-000086`

## Purpose

Update listed operator docs to `VITE_IDENTITY_BASE_URL`; sweep remaining old-name hits under `spa-app/docs/` that are in scope for Story AC (prefer 0 under `spa-app/`). Document bake-var rename + rebuild in Railway/ops checklist (lock **A** — checklist only; live UI click is **not** Done gate).

## Code Facts (As-of-Done / Current)

| Claim | Evidence |
|-------|----------|
| REQ env doc new key | `spa-app/docs/requirements/04-env-configuration.md` |
| Deploy guide + REQ9 checklist | `spa-app/docs/deploy-guide.md` §REQ9 |
| Railway git deploy manual | `spa-app/docs/railway-git-deploy-manual.md` |
| Residual old-key under docs | REQ-18 Goal/Historical rename narrative only (F4 WAIVED) |

**Historical (pre-P3):** listed docs named `VITE_IDENTITY_SERVICE_URL`.

## AC / DoD

- [x] (P0) At least `04-env-configuration.md`, `deploy-guide.md`, `railway-git-deploy-manual.md` use new key — **AC-SPA-REQ901-01**
- [x] (P0) Remaining in-scope docs hits under `spa-app/docs/` aligned (prefer `rg` → 0 under `spa-app/`) — **AC-SPA-REQ901-01**
- [x] (P0) Ops checklist documents rename bake-var + rebuild — **AC-SPA-REQ901-05**
- [x] (P0) Story Done does **not** require live Railway UI proof — lock **A**

## Where to change

- `spa-app/docs/requirements/04-env-configuration.md`
- `spa-app/docs/deploy-guide.md`
- `spa-app/docs/railway-git-deploy-manual.md`
- Other `spa-app/docs/**` hits from `rg` (operator-facing; historical audit narrative may note As-of-Done vs Historical if required by analysis.mdc)

## Out of scope

Product code/scripts (T01/T02) · live Railway UI rename as gate · invent `/health` · waitlist backend · gateway/threads renames

## Verification

```bash
rg -n 'VITE_IDENTITY_SERVICE_URL' spa-app/docs/requirements/04-env-configuration.md spa-app/docs/deploy-guide.md spa-app/docs/railway-git-deploy-manual.md || true
rg -n 'VITE_IDENTITY_BASE_URL' spa-app/docs/requirements/04-env-configuration.md spa-app/docs/deploy-guide.md spa-app/docs/railway-git-deploy-manual.md
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
