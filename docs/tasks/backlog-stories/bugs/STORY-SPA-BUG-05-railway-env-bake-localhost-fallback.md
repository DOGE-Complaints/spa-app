# STORY-SPA-BUG-05 — Railway env-bake blocked by identity localhost fallback

> **Структура:** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) · diagnosis SSOT: [railway-spa-app-build-failure-investigation-2026-08-16.md](../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md)

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-05-railway-env-bake-localhost-fallback` |
| **Type** | Functional · ship / Railway build gate |
| **Severity** | **P0** — blocks Railway deploy of spa-app (tallinn-demo) |
| **Status** | **Todo** — triaged; root cause pinned in analysis (H1 CONFIRMED); fix not applied |
| **Wave** | Ship unblock · post HL-04 |
| **UAT ID** | _(ops / Railway — не FE-HANDOFF)_ |
| **Route** | N/A (build-time); live surface `app.dogestonia.me` / `spa-app-tallinn-demo.up.railway.app` stuck on last SUCCESS |
| **Surface** | Railway `buildCommand` → `npm run verify:build:env-bake` |
| **Repro** | Always on branch `dev` tips after `0ad90f6` (HL-04) |
| **Env** | Railway project **DOGEstonia** · env **tallinn-demo** · service **spa-app** |
| **Epic (target)** | Prefer [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md) (HL-02 × HL-04 seam); adjacent [EPIC-SPA-06](../../epics/EPIC-SPA-06-railway-deploy/EPIC-SPA-06-railway-deploy.md) |
| **Pipeline** | _(none — scaffold at P1.3 / pkg activation)_ |
| **Package** | [bugs/](INDEX.md) |
| **Source** | Railway MCP investigation 2026-08-16 · [analysis report](../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) |
| **Related Done** | [HL-02](../hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md) · [HL-04](../hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) · [DEPLOY-01](../railway-deploy/STORY-SPA-DEPLOY-01-railway-deployability.md) |
| **Related note** | HL-04 reaudit **F4 WAIVED** (HL-02 bake OOS) — this bug is the **ship-path** manifestation of that seam |
| **decision_ref** | analysis H1 CONFIRMED 2026-08-16 |

## Symptom (простыми словами)

Каждый новый деплой **spa-app** на Railway падает на сборке. Vite сам отрабатывает, но финальная проверка «в бандле нет localhost» находит `localhost:8100` и валит билд. Свежий код после HL-04 на tallinn-demo **не выкатывается**; сервис остаётся на последнем SUCCESS (`072ae20`, 2026-08-09).

**Итог:** ship path сломан контрактом HL-02 gate × HL-04 dev-fallback string в product module.

## Expected vs Actual

| | |
|--|--|
| **Expected** | Push `dev` → `verify:build:env-bake` → `ok: no localhost; …` → deploy SUCCESS; public `VITE_*` в бандле |
| **Actual** | Pre-check public env **PASS** → `vite build` **PASS** → scan **FAIL**: `index-*.js: contains localhost:8100` → deployment **FAILED** |
| **Last green** | Deployment `eda23243-…` · commit `072ae20` (pre HL-04) · 254 modules · gate ok |
| **Failing tips** | `9f38462` / `16b4473` / `ef9ad07` · 255 modules · same needle |

## Repro steps

1. Railway: project DOGEstonia → service spa-app → env tallinn-demo → latest FAILED deployment build logs **или** локально из `spa-app/`:  
   ```bash
   # public VITE_* must be set (non-localhost), then:
   npm run verify:build:env-bake
   ```
2. Дождаться `building with public env URLs` и успешного `vite build`.  
3. Наблюдать:  
   `[verify-build-env-bake] localhost URLs baked into bundle:`  
   `… contains localhost:8100`  
4. Process exit **1** (Railway: Build Failed).

Опционально сверить: `git merge-base --is-ancestor 0ad90f6 <tip>` → true на failing tips; false на `072ae20`.

## Verified facts (code + Railway — не гипотезы)

| Fact | Evidence |
|------|----------|
| Gate entry | [`railway.toml`](../../../../railway.toml) `buildCommand = "npm run verify:build:env-bake"` |
| Gate script forbids needle | [`scripts/verify-build-env-bake.mjs`](../../../../scripts/verify-build-env-bake.mjs) `FORBIDDEN_LOCALHOST` incl. `localhost:8100`; fail L79–80 |
| Pre-check public env passes on Railway | Build log: `building with public env URLs` (missing/localhost env would fail earlier) |
| Vite succeeds | Log: `✓ built` · then scan fail |
| Dev fallback string in product | [`src/auth/resolveIdentityServiceUrl.js`](../../../../src/auth/resolveIdentityServiceUrl.js) `IDENTITY_SERVICE_DEV_FALLBACK = 'http://localhost:8100'` |
| HL-04 landed | Commit `0ad90f6` · clients use `resolveIdentityServiceUrl()` |
| Pre-HL-04 SUCCESS tip | Inline `?? 'http://localhost:8100'` on `072ae20`; gate **passed** with public env (dead-branch DCE) |
| Module delta | SUCCESS **254** → FAILED **255** modules |
| Three consecutive FAILED | `6f9c2b58`, `281c00dd`, `ff982742` — same symptom |
| Investigation matrix | [railway-spa-app-build-failure-investigation-2026-08-16.md](../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) H1 **CONFIRMED**; H2–H10 refuted as root |

### Что это **не** (отсечённые гипотезы)

| Hypothesis | Почему отвергнута |
|------------|-------------------|
| «Нет / пустые `VITE_*` на Railway» | Лог дошёл до `building with public env URLs` |
| «`VITE_IDENTITY_SERVICE_URL` = localhost» | Иначе fail `must use public URL`, не post-scan |
| «Сломан Vite / npm ci» | `✓ built`; exit на gate |
| «Node 18 EBADENGINE — корень» | Те же warn на SUCCESS |
| «Gate не применяется» | Stage явно `npm run verify:build:env-bake` |
| «Flake Railway» | 3× идентичный fail |
| «Тесты `__tests__` попали в dist» | Needle только product resolver; tests вне vite app graph |
| «Runtime / domain crash» | Deploy logs пустые; fail на build |

## Diagnostic playbook

**Уже выполнено** в [investigation 2026-08-16](../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md). При pkg activation T01 — короткий **reconfirm**, не полный rediscovery.

### A. Local reconfirm (T01)

```bash
cd spa-app
# Set public (non-localhost) VITE_GATEWAY_BASE_URL, VITE_IDENTITY_SERVICE_URL,
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_STORY_GPT_URL — then:
npm run verify:build:env-bake
# Expect (pre-fix): exit 1 + "contains localhost:8100"
# Optional: rg -n 'localhost:8100' dist/assets/*.js
```

### B. Pin rules (T02) — already pinned

| Observation | Pin layer | Prefer fix direction |
|-------------|-----------|----------------------|
| Public env OK + vite OK + dist contains `localhost:8100` from `IDENTITY_SERVICE_DEV_FALLBACK` | **SPA product source** (HL-04 resolver module) | Убрать bake литерала в **prod** dist **без** ослабления HL-02 gate и **без** отката HL-04 PROD fail-fast |
| Gate disabled / buildCommand → bare `npm run build` | **Deploy config anti-pattern** | **Запрещено** как «fix» этого бага (ломает HL-02) |
| Change Railway VITE to localhost | **Env** | **Не** причина; не чинить |

**Запрет:** не отключать `verify:build:env-bake`; не ослаблять `FORBIDDEN_LOCALHOST` без отдельного product decision; не «чинить» Variables вслепую.

## Hypothesis matrix (post-investigation)

| # | Hypothesis | Status |
|---|------------|--------|
| H1 | `IDENTITY_SERVICE_DEV_FALLBACK` string baked into prod bundle; HL-02 gate fails | **CONFIRMED** |
| H2–H10 | См. investigation Appendix B | **REFUTED** / N/A as root |

## Функциональные требования

- **FR-BUG-05.1** Reconfirm: `verify:build:env-bake` с public `VITE_*` воспроизводит needle `localhost:8100` (или note «superseded by Railway logs + investigation»).  
- **FR-BUG-05.2** Root-cause pin остаётся: product resolver / fallback string × gate (не env, не Node, не flake).  
- **FR-BUG-05.3** Fix на pinned SPA layer: после public-env bake **нет** forbidden localhost needles в `dist/assets/*.js`; gate печатает `ok: no localhost; …`.  
- **FR-BUG-05.4** HL-04 сохраняется: PROD + missing/blank `VITE_IDENTITY_SERVICE_URL` → throw; non-PROD unset → dev fallback behaviour (тесты `resolveIdentityServiceUrl`).  
- **FR-BUG-05.5** HL-02 gate остаётся в [`railway.toml`](../../../../railway.toml) `buildCommand`; не заменён голым `npm run build`.  
- **FR-BUG-05.6** Regression: unit tests HL-04 + local `verify:build:env-bake` green; Railway redeploy spa-app → **SUCCESS** (или documented operator redeploy evidence).

## Acceptance Criteria

- [x] Evidence / reconfirm note (или явная ссылка на investigation + local scan) существует.  
- [x] Pin layer = SPA resolver / fallback bake (зафиксирован в gate note).  
- [x] `npm run verify:build:env-bake` с public env → exit **0**.  
- [x] `rg`/`scan`: no `localhost:8100` / `127.0.0.1:8100` in `dist/assets/*.js`.  
- [x] HL-04 vitest (PROD throw / DEV fallback) зелёный.  
- [x] `railway.toml` всё ещё `verify:build:env-bake`.  
- [ ] Railway spa-app tallinn-demo deployment **SUCCESS** после fix tip (evidence: deployment id + gate ok line). **PENDING** — T06 BLOCKED; no post-fix Railway SUCCESS; id not invented.

## Nested tasks

Простая стори: диагностика **уже** в analysis. Nested = короткий ship loop (не раздувать). Pipeline folders — при P1.3.

| Task | Role | Status | Notes |
|------|------|--------|-------|
| **T01** | Reproduce / reconfirm gate fail + optional `dist` needle | Done | P3 local · [reconfirm](../../run-reports/reconfirm-spa-bug-05-env-bake-2026-08-16.md) |
| **T02** | Root-cause pin (write pin note in gate / task README) | Done | Pin = `resolveIdentityServiceUrl.js` fallback string bake |
| **T03** | Fix **pinned** SPA layer only | Done | Prod DCE `import.meta.env.PROD` ternary |
| **T04** | Regression: HL-04 tests + local env-bake green | Done | vitest 4/4 · local bake exit 0 |
| **T05** | Story gate FR/AC + Railway SUCCESS evidence | Done (local) | Gate 6/7 PASS · Railway **PENDING** |

> Можно сжать T01+T02 в один task при pkg activation (schema: compress OK when pin already evidence-backed). **Не** пропускать T03–T05.

## Вне scope

- Отключение / ослабление HL-02 bake gate.  
- Смена Railway Variables «наугад».  
- Node 18 → 20 upgrade (residual EBADENGINE — отдельный tech debt / HL-09 adjacent).  
- UI builder `RAILPACK` vs toml `nixpacks` drift (observation only).  
- BUG-04 logo pad · HL-06…08 Post-MVP · Early Signal ADMIN.

## Швы

- [`resolveIdentityServiceUrl.js`](../../../../src/auth/resolveIdentityServiceUrl.js) · identity/oauth/ready clients  
- [`verify-build-env-bake.mjs`](../../../../scripts/verify-build-env-bake.mjs) · [`railway.toml`](../../../../railway.toml)  
- HL-02 Done · HL-04 Done (F4 WAIVED bake) · DEPLOY-01 bake path

## Next (process)

1. P1.3 — pipeline under EPIC-SPA-10 (or EPIC-SPA-06) + pkg activate.  
2. P3 — T01→T05 in order; prefer small fix surface.  
3. Status **Done** только после T05 + Railway SUCCESS evidence.  
4. Do **not** mark HL-02/HL-04 reopened; this is a **new** ship bug on their seam.
