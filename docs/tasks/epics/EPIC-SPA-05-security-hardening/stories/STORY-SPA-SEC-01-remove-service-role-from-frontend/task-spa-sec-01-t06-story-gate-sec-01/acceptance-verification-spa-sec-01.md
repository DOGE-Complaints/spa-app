# Story acceptance gate — STORY-SPA-SEC-01-remove-service-role-from-frontend

- **Story:** STORY-SPA-SEC-01 — Remove service_role from frontend env/bundle
- **Package:** `pkg-000014-20260627-epic-spa-05-sec01-remove-service-role.yaml`
- **Result:** PASS
- **Date:** 2026-06-27

## AC checklist (verbatim from pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| `grep SERVICE_ROLE` по `spa-app/.env*` → пусто (secrets); bundle без service_role | PASS | `.env`: no matches (2026-06-27). `.env.example`: warning in `#` comments only; no active lines (`grep -v '^#' .env.example \| grep SERVICE_ROLE` empty). T04: `grep -r service_role dist/assets/*.js` → empty after `npm run build`. |
| CI/lint падает, если `VITE_*SERVICE_ROLE*` снова появится | PASS | [`serviceRoleEnvGuard.test.js`](../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js) in `npm run test:run`; 195 passed (2026-06-27). |
| `.env.example` содержит предупреждение про service_role | PASS | [`spa-app/.env.example`](../../../../../../../.env.example) comment block «service_role — НИКОГДА на фронте». |
| Принято решение по ротации — синхронизировано с identity SEC-04 | PASS | [`rotation-decision-sec01.md`](../task-spa-sec-01-t05-rotation-decision-sec04-sync/rotation-decision-sec01.md): recommend rotate; SEC-04 handoff; no identity code in this wave. |

## Commands (live verification 2026-06-27)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
grep SERVICE_ROLE spa-app/.env || echo "ok"
grep -v '^#' spa-app/.env.example | grep SERVICE_ROLE || echo "ok"
cd spa-app && npm run test:run
cd spa-app && npm run build && grep -r service_role dist/assets/*.js; test $? -ne 0
```

## Task closure

| Task | Status |
|------|--------|
| T01 purge env | Done |
| T02 .env.example warning | Done |
| T03 guard test | Done |
| T04 bundle verify | Done |
| T05 rotation decision | Done |
| T06 story gate | Done |
