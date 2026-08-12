## Task workspace — `task-spa-deploy-02-t07-pin-serve-exact-version`

- Story: [`../STORY-SPA-DEPLOY-02-static-production-serve.md`](../STORY-SPA-DEPLOY-02-static-production-serve.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-DEPLOY-02-execution-2026-07-09.md`](../../../../../../analysis/audit-STORY-SPA-DEPLOY-02-execution-2026-07-09.md) §Findings Info-1
- **Depends on:** SPA-DEPLOY-02-T01..T06 Done (`pkg-000028`)
- **activation:** `run_mode=spa_deploy_02_audit_2026_07_09`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Closed:** 2026-07-09T11:56:04Z  
**Wave:** `run_mode=spa_deploy_02_audit_2026_07_09` (post-audit; **не** pkg-000028)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-09T11:51:07Z  
---

## Task: fix — pin `serve` exact version for reproducible Railway prod start

### Цель
Закрыть audit **Info-1**: зафиксировать точную версию `serve` в `package.json` вместо caret `^14.2.4`, чтобы prod-start на Railway не зависел от плавающей minor/patch-версии.

### Почему это важно (риск)
Caret в `dependencies.serve` допускает автоматический подъём minor при `npm install` на Railway — слабее воспроизводимость prod static-serve.

### Code Facts (re-verify at execute)
- [`package.json:45`](../../../../../../../../package.json) — `"serve": "^14.2.4"` в `dependencies`.
- [`package.json:10`](../../../../../../../../package.json) — `"start": "serve -s dist -l tcp://0.0.0.0:${PORT:-4173}"` — prod path зависит от `serve`.
- [`package-lock.json`](../../../../../../../../package-lock.json) — lockfile уже содержит resolved `serve@14.2.4` (сверить в P6).

### AC/DoD
- [x] (P0) `package.json` — `"serve": "14.2.4"` (exact pin, без `^`).
- [x] (P0) `package-lock.json` синхронизирован (`npm install` в P6).
- [x] (P1) `npm run build && PORT=4173 npm start` — `curl http://127.0.0.1:4173/` отдаёт `dist/index.html`.
- [x] (P1) Gate [`acceptance-verification-spa-deploy-02-t07.md`](./acceptance-verification-spa-deploy-02-t07.md) → PASS.
- [x] (P1) **Не** менять `pkg-000028`, `spa-active-package.current.yaml`.

### Where to change
- [`spa-app/package.json`](../../../../../../../../package.json) — `dependencies.serve`
- [`spa-app/package-lock.json`](../../../../../../../../package-lock.json) — sync after pin

### Out of scope
- [`railway.toml`](../../../../../../../../railway.toml), deploy docs, [`vite.config.js`](../../../../../../../../vite.config.js), smoke scripts.

### Verification
```bash
cd spa-app
grep '"serve"' package.json
npm install
npm run build && PORT=4173 npm start
# separate terminal:
curl -s http://127.0.0.1:4173/ | head -20
```
