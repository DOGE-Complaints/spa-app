# Story acceptance — SPA-BUG-06-T04 regression bake kinds + HL-02

- **Task:** T04
- **Result:** PASS
- **Date:** 2026-08-18T10:18:16Z
- **Package:** `pkg-000071-20260818-epic-spa-10-bug-06-stale-placeholder-bake.yaml`

## AC

| AC | Status | Evidence |
|----|--------|----------|
| (a) placeholder refuse | PASS | vitest + live start-spa exit 1 |
| (b) public × local `.env` refuse | PASS | vitest spaStartDecision |
| (c) public no-localhost allow | PASS | vitest spaStartDecision `{ action: 'serve' }` |
| (d) local bake allow | PASS | vitest spaStartDecision local kind + localhost `.env` → serve |
| `FORBIDDEN_LOCALHOST` present; `railway.toml` still `verify:build:env-bake` | PASS | `scripts/verify-build-env-bake.mjs` L7 · `railway.toml` L7 |

Vitest: **13 passed** (`scripts/lib/__tests__/classifySpaBake.test.js` 6 · `spaStartDecision.test.js` 7) · vitest 4.0.18 · 2026-08-18T10:18:16Z session.

## Commands

```bash
cd spa-app && npx vitest run scripts/lib/__tests__/classifySpaBake.test.js scripts/lib/__tests__/spaStartDecision.test.js
rg -n 'FORBIDDEN_LOCALHOST' spa-app/scripts/verify-build-env-bake.mjs
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
