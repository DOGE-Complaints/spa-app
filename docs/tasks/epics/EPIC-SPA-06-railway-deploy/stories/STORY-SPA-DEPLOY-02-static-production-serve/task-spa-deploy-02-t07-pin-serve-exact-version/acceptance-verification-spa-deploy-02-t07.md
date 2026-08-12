# Task acceptance gate — SPA-DEPLOY-02-T07 pin serve exact version

- **Task:** `task-spa-deploy-02-t07-pin-serve-exact-version`
- **Wave:** `run_mode=spa_deploy_02_audit_2026_07_09`
- **Result:** PASS
- **Date:** 2026-07-09T11:56:04Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| `serve` pinned exact in `package.json` (no caret). | PASS | [`package.json:45`](../../../../../../../../package.json) `"serve": "14.2.4"` |
| `package-lock.json` synced. | PASS | [`package-lock.json`](../../../../../../../../package-lock.json) `node_modules/serve` → `14.2.4` |
| Local static serve smoke after pin. | PASS | `npm run build && PORT=4173 npm start`; `curl http://127.0.0.1:4173/` → HTML; `ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live` → ok |

## Commands (live verification 2026-07-09)

```bash
cd spa-app
grep '"serve"' package.json
npm install
npm run build && PORT=4173 npm start
curl -s http://127.0.0.1:4173/ | head -5
ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
```
