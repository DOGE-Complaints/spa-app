# SPA-HL-02-T05 — Railway buildCommand env-bake (F1)

**Status:** Done — P6 PASS 2026-08-09T12:27:29Z · F1  
**Story:** [`../STORY-SPA-HL-02-prod-env-bake-gate.md`](../STORY-SPA-HL-02-prod-env-bake-gate.md)  
**Decision Ref:** [audit-STORY-SPA-HL-02-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-HL-02-execution-2026-08-09.md) §F1  
**Depends on:** SPA-HL-02-T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T12:22:29Z  
**Package:** `pkg-000060` (unchanged) · `run_mode=spa_hl_02_audit_2026_08_09`

## Purpose

Закрыть platform bypass: Railway ship path должен вызывать `verify:build:env-bake`, а не голый `npm run build`, и manual Build row должен совпадать с deploy-guide Release checklist.

## Risk

Mis-set / missing public `VITE_*` на Railway всё ещё может отдать `dist/` без gate fail — checklist-only enforcement. Mitigated: bake now **is** the Railway `buildCommand` (fail closed without Variables).

## Code Facts (As-of-Done)

1. [`railway.toml`](../../../../../../../railway.toml) L7: `buildCommand = "npm run verify:build:env-bake"`.
2. [`docs/railway-git-deploy-manual.md`](../../../../../../../docs/railway-git-deploy-manual.md) L15: Build = `npm run verify:build:env-bake` · Variables required note + Release checklist link.
3. Gate exists: [`package.json`](../../../../../../../package.json) `verify:build:env-bake` · [`scripts/verify-build-env-bake.mjs`](../../../../../../../scripts/verify-build-env-bake.mjs).
4. Deploy-guide Release checklist already requires bake — [deploy-guide.md](../../../../../../../docs/deploy-guide.md).

## Gap

Medium F1 — Railway ship path env-bake → **CLOSED** (this task).

## AC / DoD

- [x] (P0) `railway.toml` `buildCommand` = `npm run verify:build:env-bake` (Railway Variables must supply public `VITE_*`).
- [x] (P0) `railway-git-deploy-manual.md` Build row aligned + note: Variables required for green bake; cross-link deploy-guide Release checklist.
- [x] (P0) No GitHub Actions invent; no HL-04 runtime fail-fast; no product JSX change.

## Where to change

- [`railway.toml`](../../../../../../../railway.toml)
- [`docs/railway-git-deploy-manual.md`](../../../../../../../docs/railway-git-deploy-manual.md)
- [`acceptance-verification-spa-hl-02-t05.md`](./acceptance-verification-spa-hl-02-t05.md)

## Out of scope

F2 evidence transcript (WAIVED working-doc); F3 identity localhost (WAIVED → existing HL-04); T02 «no CI vendor YAML» reopen; immutable `pkg-000060`.

## Verification

```bash
rg -n "buildCommand|verify:build:env-bake|npm run build" spa-app/railway.toml spa-app/docs/railway-git-deploy-manual.md
```

Gate: [`acceptance-verification-spa-hl-02-t05.md`](./acceptance-verification-spa-hl-02-t05.md) PASS 2026-08-09T12:27:29Z.
