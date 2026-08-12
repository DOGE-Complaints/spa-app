# Acceptance verification — DASH-G1-T02

**Task:** task-dash-g1-t02-update-gateway-repository-tests  
**Status:** Done (2026-06-12)

## AC checklist

- [x] `getIssues` test expects `/tallinn/issues` in request URL — line 29
- [x] `getIssue` URL assertion for `/tallinn/issues/{id}` — line 44
- [x] `npm run test:run` GatewayIssueRepository — green (4/4)

## Commands run

```bash
cd spa-app && npm run test:run -- src/repositories/__tests__/GatewayIssueRepository.test.js
```

**Result:** 4 tests passed.
