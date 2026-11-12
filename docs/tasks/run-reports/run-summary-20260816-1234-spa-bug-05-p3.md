# Run summary — SPA BUG-05 P3

- **Date:** 2026-08-16T12:34:58Z
- **Package:** `pkg-000065`
- **Story:** STORY-SPA-BUG-05-railway-env-bake-localhost-fallback
- **Phase:** P3

## Tasks

| Task | Result | Date |
|------|--------|------|
| T01 Reconfirm env-bake fail | PASS · exit 1 · `contains localhost:8100` · 255 modules | 2026-08-16T12:34:58Z |
| T02 Pin resolver fallback bake | PASS · pin = `resolveIdentityServiceUrl.js` | 2026-08-16T12:34:58Z |
| T03 Fix prod fallback bake | PASS · `import.meta.env.PROD` DCE | 2026-08-16T12:34:58Z |
| T04 Regression HL-04 + local bake | PASS · vitest 4/4 · bake exit 0 | 2026-08-16T12:34:58Z |
| T05 Story gate | PASS (local) · Railway SUCCESS PENDING | 2026-08-16T12:34:58Z |

## Evidence

- Product: [`spa-app/src/auth/resolveIdentityServiceUrl.js`](../../../src/auth/resolveIdentityServiceUrl.js)
- Reconfirm: [reconfirm-spa-bug-05-env-bake-2026-08-16.md](reconfirm-spa-bug-05-env-bake-2026-08-16.md)
- Gate: [acceptance-verification-spa-bug-05.md](../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md)
- `railway.toml` L8 unchanged (`verify:build:env-bake`)
- HL-02 / HL-04 **not** reopened

## Next

P4 hard-audit (optional). Product Story Done **blocked** on Railway SUCCESS evidence (operator redeploy). Commits: P8 unless asked. No push.
