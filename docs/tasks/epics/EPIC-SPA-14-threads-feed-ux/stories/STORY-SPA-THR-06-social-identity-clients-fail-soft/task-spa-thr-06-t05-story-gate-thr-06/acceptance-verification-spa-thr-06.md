# Acceptance verification — STORY-SPA-THR-06

- **Date:** 2026-09-23T06:53:32Z
- **Package:** `pkg-000082-20260923-epic-spa-14-thr-06-social-identity-clients-fail-soft.yaml`
- **Story:** STORY-SPA-THR-06-social-identity-clients-fail-soft
- **ui_scope:** none · console clean (NOT p3Ux · no screenshots)

## Result: **PASS**

| Check | Evidence |
|-------|----------|
| AC-SPA-THR-01 no invent social HTTP | `ThreadsSocialClient.js` · contract all `open` · no fetch |
| Social ops → Unavailable while ADMIN-04 Open | vitest `ThreadsSocialClient` · `unavailable` / `social_http_open` |
| Issues list regress | vitest fail-soft: `getIssues` still hits `/node/issues` |
| Me / write gate `identity_verified` | `meIdentityVerified.js` · phone alone fails |
| ADMIN-04 cited | backlog + arch 02 As-is |
| Vitest | **615** passed / 2 skipped (full suite) |
| `--verify` | ok 5 paths · pkg-000082 |

## Guards

- No invent production social URLs · identity_verified not phone alone  
- No git push · **STOP before P4** (OP → Validator)
