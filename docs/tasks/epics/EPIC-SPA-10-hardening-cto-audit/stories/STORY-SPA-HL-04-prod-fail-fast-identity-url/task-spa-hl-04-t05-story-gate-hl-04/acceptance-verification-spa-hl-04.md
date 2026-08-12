# Story acceptance gate — STORY-SPA-HL-04-prod-fail-fast-identity-url

- **Story:** PROD fail-fast when identity URL missing
- **Package:** `pkg-000062-20260809-epic-spa-10-hl-04-prod-fail-fast-identity.yaml`
- **Result:** PASS
- **Date:** 2026-08-09T13:36:28Z
- **Scaffolded:** 2026-08-09T13:24:26Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Prod path без identity URL не «тихо» ходит на localhost | PASS | [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) PROD throw · vitest 4/4 · three clients wired |
| Документировано ожидаемое поведение misconfig (deploy-guide или env requirements) | PASS | [`.env.example`](../../../../../../../.env.example) HL-04 note · [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) Variables table |
| Локальный dev с localhost не сломан без необходимости | PASS | non-PROD fallback `http://localhost:8100` · identity/oauth tests green with explicit localhost |

## FR checklist

| FR | Status | Evidence |
|----|--------|----------|
| FR-HL-04.1 prod no localhost fallback | PASS | `env.PROD === true` + blank → throw; never returns DEV fallback |
| FR-HL-04.2 early misconfig signal | PASS | throw at resolve/module load · message names `VITE_IDENTITY_SERVICE_URL` · docs note |
| FR-HL-04.3 dev/test localhost ok | PASS | non-PROD missing → `IDENTITY_SERVICE_DEV_FALLBACK` · tests |

## Commands

```bash
rg -n "localhost:8100|resolveIdentityServiceUrl" spa-app/src/auth/*.js
npx vitest run src/auth/__tests__/resolveIdentityServiceUrl.test.js
# Test Files 1 passed · Tests 4 passed (2026-08-09T13:36:28Z)
```
