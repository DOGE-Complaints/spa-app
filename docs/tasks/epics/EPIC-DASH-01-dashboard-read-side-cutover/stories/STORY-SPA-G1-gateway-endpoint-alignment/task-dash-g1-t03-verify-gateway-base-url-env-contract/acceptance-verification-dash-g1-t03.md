# Acceptance verification — DASH-G1-T03

**Task:** task-dash-g1-t03-verify-gateway-base-url-env-contract  
**Status:** Done (2026-06-12)

## AC checklist

- [x] Story Scope §3: sole host env is `VITE_GATEWAY_BASE_URL`
- [x] No `VITE_GATEWAY_*_PATH` or path-prefix env in `src/` / `.env.example`
- [x] No drift — **no change required** beyond documentation in this artifact

## Grep evidence (2026-06-12)

`spa-app/src/` — `VITE_GATEWAY` references:

| File | Line | Content |
|------|------|---------|
| `issueService.js` | 31 | `import.meta.env.VITE_GATEWAY_BASE_URL` |
| `GatewayIssueRepository.js` | 5 | error message references `VITE_GATEWAY_BASE_URL` |
| `issueService.test.js` | 78 | throw assertion |
| `GatewayIssueRepository.test.js` | 10 | throw assertion |

`demo-tallinn`: **no matches** in `src/`.

`.env.example`: only `VITE_GATEWAY_BASE_URL` documented (lines 17–20).

## Commands run

```bash
rg "VITE_.*GATEWAY|demo-tallinn" spa-app/src/ spa-app/.env.example
cd spa-app && npm run test:run
```

**Result:** 71 tests passed.
