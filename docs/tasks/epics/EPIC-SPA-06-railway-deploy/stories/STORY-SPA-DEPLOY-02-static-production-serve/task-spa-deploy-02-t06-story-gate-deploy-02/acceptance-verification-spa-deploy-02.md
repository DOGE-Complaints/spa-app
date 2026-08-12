# Story acceptance gate — STORY-SPA-DEPLOY-02-static-production-serve

- **Story:** Static production serve (замена vite preview)
- **Package:** `pkg-000028-20260709-epic-spa-06-deploy-02-static-production-serve.yaml`
- **Result:** PASS
- **Date:** 2026-07-09T11:00:50Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `npm start` на Railway отдаёт `dist/` без `vite preview`. | PASS | [`package.json:10`](../../../../../../../../package.json) `serve -s dist -l tcp://0.0.0.0:${PORT:-4173}`; local `PORT=4173 npm start` → HTTP 200 + `id="root"` |
| `npm run verify:railway:live` green на production URL. | PASS | `SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app npm run verify:railway:live` — ok 2026-07-09 |
| Custom domain (если назначен) работает без правок `allowedHosts`. | PASS (by-design) | Static `serve` не использует Host whitelist; custom domain не назначен на Tallinn demo — waived |
| `npm run preview` по-прежнему доступен локально для ручной проверки бандла. | PASS | [`vite.config.js`](../../../../../../../../vite.config.js) `preview.host: 0.0.0.0`; `npm run preview` unchanged |
| Документация deploy-guide отражает новый serve-контракт. | PASS | [`deploy-guide.md`](../../../../../../../docs/deploy-guide.md) §3 + troubleshooting; [`railway-git-deploy-manual.md`](../../../../../../../docs/railway-git-deploy-manual.md) |

## Commands (live verification 2026-07-09)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm run test:run
cd spa-app && npm run build && PORT=4173 npm start
ALLOW_LOCAL_SMOKE=1 SPA_BASE_URL=http://127.0.0.1:4173 npm run verify:railway:live
SPA_BASE_URL=https://spa-app-tallinn-demo.up.railway.app npm run verify:railway:live
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
