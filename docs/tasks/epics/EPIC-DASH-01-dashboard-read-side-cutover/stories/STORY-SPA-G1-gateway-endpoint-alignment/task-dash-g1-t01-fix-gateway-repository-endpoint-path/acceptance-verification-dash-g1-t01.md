# Acceptance verification — DASH-G1-T01

**Task:** task-dash-g1-t01-fix-gateway-repository-endpoint-path  
**Status:** Done (2026-06-12)

## AC checklist

- [x] Story AC #1: `getIssues` builds URL `{baseUrl}/tallinn/issues` (+ query) — `GatewayIssueRepository.js:51`
- [x] Story AC #1: `getIssue` builds URL `{baseUrl}/tallinn/issues/{id}` — `GatewayIssueRepository.js:59`
- [x] Envelope parsing and 404 → null unchanged — `GatewayIssueRepository.js:61-65`

## Commands run

```bash
cd spa-app && npm run test:run -- src/repositories/__tests__/GatewayIssueRepository.test.js
```

**Result:** 4 tests passed.

## Evidence

Gateway list/get paths align with gateway canon (`asgi_app.py:322`, `asgi_app.py:364`).
