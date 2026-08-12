# BULLRUN phase log — DASH-G1-T01

| Phase | Status | Notes |
|-------|--------|-------|
| P1 materialize | done | pkg-000001, 2026-06-12 |
| P3 execute | done | 2026-06-12 — `/demo-tallinn/issues` → `/tallinn/issues` in `GatewayIssueRepository.js` |

## Code changes

- `spa-app/src/repositories/GatewayIssueRepository.js:51` — list URL: `${normalizedBaseUrl}/tallinn/issues`
- `spa-app/src/repositories/GatewayIssueRepository.js:59` — get URL: `${normalizedBaseUrl}/tallinn/issues/${safeId}`

## Verification

```bash
cd spa-app && npm run test:run -- src/repositories/__tests__/GatewayIssueRepository.test.js
# 4 passed
```
