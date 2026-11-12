# STORY-SPA-BUG-05-railway-env-bake-localhost-fallback — Railway env-bake blocked by identity localhost fallback

## Meta (pipeline)

- **Key:** `STORY-SPA-BUG-05-railway-env-bake-localhost-fallback`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000065`
- **Status:** P3 local PASS · P6 T06 **BLOCKED** / T07–T08 Done 2026-08-16T12:43:28Z · Railway SUCCESS **PENDING** (not Product Done) · F1 **OPEN**
- **Severity:** **P0** — blocks Railway deploy of spa-app (tallinn-demo)
- **Wave:** Ship unblock · post HL-04
- **Type:** Functional · ship / Railway build gate
- **source:** [`../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)
- **decision_ref:** backlog STORY-SPA-BUG-05 + [investigation](../../../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) H1 CONFIRMED 2026-08-16
- **Related Done:** HL-02 · HL-04 · DEPLOY-01 — **do not reopen**
- **ui_scope:** `none`
- **P1.3:** 2026-08-16T12:30:27Z · **P3:** 2026-08-16T12:34:58Z

## Зачем простыми словами

Каждый новый деплой **spa-app** на Railway падает на сборке. Vite сам отрабатывает, но финальная проверка «в бандле нет localhost» находит `localhost:8100` и валит билд. Свежий код после HL-04 на tallinn-demo **не выкатывается**; сервис остаётся на последнем SUCCESS (`072ae20`, 2026-08-09).

**Итог:** ship path сломан контрактом HL-02 gate × HL-04 dev-fallback string в product module.

## Expected vs Actual

| | |
|--|--|
| **Expected** | Push `dev` → `verify:build:env-bake` → `ok: no localhost; …` → deploy SUCCESS; public `VITE_*` в бандле |
| **Actual** | Pre-check public env **PASS** → `vite build` **PASS** → scan **FAIL**: `index-*.js: contains localhost:8100` → deployment **FAILED** |
| **Last green** | Deployment `eda23243-…` · commit `072ae20` (pre HL-04) · 254 modules · gate ok |
| **Failing tips** | `9f38462` / `16b4473` / `ef9ad07` · 255 modules · same needle |

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| Gate entry | [`railway.toml`](../../../../../railway.toml) `buildCommand = "npm run verify:build:env-bake"` |
| Gate script forbids needle | [`scripts/verify-build-env-bake.mjs`](../../../../../scripts/verify-build-env-bake.mjs) `FORBIDDEN_LOCALHOST` incl. `localhost:8100`; fail L79–80 |
| Pre-check public env passes on Railway | Build log: `building with public env URLs` (missing/localhost env would fail earlier) |
| Vite succeeds | Log: `✓ built` · then scan fail |
| Dev fallback string in product | [`src/auth/resolveIdentityServiceUrl.js`](../../../../../src/auth/resolveIdentityServiceUrl.js) `IDENTITY_SERVICE_DEV_FALLBACK = 'http://localhost:8100'` |
| HL-04 landed | Commit `0ad90f6` · clients use `resolveIdentityServiceUrl()` |
| Pre-HL-04 SUCCESS tip | Inline `?? 'http://localhost:8100'` on `072ae20`; gate **passed** with public env (dead-branch DCE) |
| Module delta | SUCCESS **254** → FAILED **255** modules |
| Three consecutive FAILED | `6f9c2b58`, `281c00dd`, `ff982742` — same symptom |
| Investigation matrix | [railway-spa-app-build-failure-investigation-2026-08-16.md](../../../../../analysis/railway-spa-app-build-failure-investigation-2026-08-16.md) H1 **CONFIRMED**; H2–H10 refuted as root |

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

## Функциональные требования

- **FR-BUG-05.1** Reconfirm: `verify:build:env-bake` с public `VITE_*` воспроизводит needle `localhost:8100` (или note «superseded by Railway logs + investigation»).  
- **FR-BUG-05.2** Root-cause pin остаётся: product resolver / fallback string × gate (не env, не Node, не flake).  
- **FR-BUG-05.3** Fix на pinned SPA layer: после public-env bake **нет** forbidden localhost needles в `dist/assets/*.js`; gate печатает `ok: no localhost; …`.  
- **FR-BUG-05.4** HL-04 сохраняется: PROD + missing/blank `VITE_IDENTITY_SERVICE_URL` → throw; non-PROD unset → dev fallback behaviour (тесты `resolveIdentityServiceUrl`).  
- **FR-BUG-05.5** HL-02 gate остаётся в [`railway.toml`](../../../../../railway.toml) `buildCommand`; не заменён голым `npm run build`.  
- **FR-BUG-05.6** Regression: unit tests HL-04 + local `verify:build:env-bake` green; Railway redeploy spa-app → **SUCCESS** (или documented operator redeploy evidence).

## Acceptance Criteria

- [x] Evidence / reconfirm note (или явная ссылка на investigation + local scan) существует.  
- [x] Pin layer = SPA resolver / fallback bake (зафиксирован в gate note).  
- [x] `npm run verify:build:env-bake` с public env → exit **0**.  
- [x] `rg`/`scan`: no `localhost:8100` / `127.0.0.1:8100` in `dist/assets/*.js`.  
- [x] HL-04 vitest (PROD throw / DEV fallback) зелёный.  
- [x] `railway.toml` всё ещё `verify:build:env-bake`.  
- [ ] Railway spa-app tallinn-demo deployment **SUCCESS** после fix tip (evidence: deployment id + gate ok line). **PENDING** — no deploy this P3.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-bug-05-t01-reconfirm-env-bake-fail](./task-spa-bug-05-t01-reconfirm-env-bake-fail/README.md) | **Done** · Reconfirm bake fail |
| **T02** | [task-spa-bug-05-t02-pin-resolver-fallback-bake](./task-spa-bug-05-t02-pin-resolver-fallback-bake/README.md) | **Done** · Pin resolver fallback bake |
| **T03** | [task-spa-bug-05-t03-fix-prod-fallback-bake](./task-spa-bug-05-t03-fix-prod-fallback-bake/README.md) | **Done** · Prod DCE fallback literal |
| **T04** | [task-spa-bug-05-t04-regression-hl04-env-bake](./task-spa-bug-05-t04-regression-hl04-env-bake/README.md) | **Done** · HL-04 4/4 + local bake |
| **T05** | [task-spa-bug-05-t05-story-gate-bug-05](./task-spa-bug-05-t05-story-gate-bug-05/README.md) | **Done** · gate local PASS · Railway PENDING |
| **T06** | [task-spa-bug-05-t06-attach-railway-success-evidence](./task-spa-bug-05-t06-attach-railway-success-evidence/README.md) | **Done — BLOCKED** · F1 OPEN |
| **T07** | [task-spa-bug-05-t07-sync-backlog-ac-nested-ssot](./task-spa-bug-05-t07-sync-backlog-ac-nested-ssot/README.md) | **Done** · F2 CLOSED |
| **T08** | [task-spa-bug-05-t08-as-of-done-t02-t03-code-facts](./task-spa-bug-05-t08-as-of-done-t02-t03-code-facts/README.md) | **Done** · F3 CLOSED |

## Вне scope

- Отключение / ослабление HL-02 bake gate.  
- Смена Railway Variables «наугад».  
- Node 18 → 20 upgrade (residual EBADENGINE — отдельный tech debt / HL-09 adjacent).  
- UI builder `RAILPACK` vs toml `nixpacks` drift (observation only).  
- BUG-04 logo pad · HL-06…08 Post-MVP · Early Signal ADMIN.

## Швы (указатели)

- [`resolveIdentityServiceUrl.js`](../../../../../src/auth/resolveIdentityServiceUrl.js) · identity/oauth/ready clients  
- [`verify-build-env-bake.mjs`](../../../../../scripts/verify-build-env-bake.mjs) · [`railway.toml`](../../../../../railway.toml)  
- HL-02 Done · HL-04 Done (F4 WAIVED bake) · DEPLOY-01 bake path

## Notes

- Gate: [`task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md`](./task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md) — Date deferred to P3 live verify.
- Prefer FR/AC from backlog file as story gate source of truth.
- Do **not** mark HL-02/HL-04 reopened; this is a **new** ship bug on their seam.
