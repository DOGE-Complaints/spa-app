# STORY-SPA-ID-13 — Регресс-гарантия публичных роутов (spa)

## Meta (pipeline)

- **Key:** `STORY-SPA-ID-13-public-route-regression`
- **Parent Epic:** [`../../EPIC-SPA-04-identity-and-auth.md`](../../EPIC-SPA-04-identity-and-auth.md)
- **Epic:** EPIC-SPA-04 Identity & Auth · gate (M-5 spa-половина)
- **Пакет:** `identity-auth/` (EPIC-SPA-04 gate)
- **Status:** ✅ Done
- **Severity:** 🟢 gate (M-5, **spa-половина**)
- **Wave:** `pkg-000041`
- **Scaffolded:** 2026-08-01T19:28:37Z
- **Gate Date:** 2026-08-01T20:02:31Z
- **source:** [`spa-app/docs/tasks/backlog-stories/identity-auth/STORY-SPA-ID-13-public-route-regression.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-13-public-route-regression.md)
- **decision_ref:** [`../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-13-public-route-regression.md`](../../../../../../backlog-stories/identity-auth/STORY-SPA-ID-13-public-route-regression.md); [`mvp-integration-plan-2026-07-02.md` M-5](../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) §0 / §2 / §7.5
- **Источник:** [`mvp-integration-plan-2026-07-02.md` M-5](../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) §0 / §2 / §7.5
- **Pair (M-5 gateway):** [STORY-GW-PUBLIC-01](../../../../../../../../doge-complaints-gateway/docs/tasks/backlog-stories/issues-read-contract/STORY-GW-PUBLIC-01-public-issues-regression.md) — **Done** (pkg-000048); spa Done **независимо**, закрывает свою половину M-5
- **Зависит от:** ID-01…12 Done (особенно ID-02 shell + ID-12 submit paths); DEPLOY-01-T05 уже усилил базовую policy-матрицу
- **Решения:** зафиксированы 2026-08-01 (см. §Решения) — стори готова к P1.3 / реализации remaining
- **ui_scope:** `none`
- **Gate:** [acceptance-verification.md](./task-spa-id-13-t06-story-gate-id-13/acceptance-verification.md)

## Зачем простыми словами

Доска и карточка issue должны открываться **без логина**. Auth на кабинет/сабмит уже в проде (ID-01…12); риск — случайно занести `/board` или `/issue/:id` в protected, или начать слать `Authorization` на read issues. Gateway-половина M-5 уже зафиксирована тестами (**GW-PUBLIC-01**). Нужен **spa-gate**: жёсткая матрица роутов + assert «read без auth-заголовка» + локальный UI-smoke доски без login, чтобы регресс падал в CI, а не на пилоте.

## 🔬 Слой анализа — verified current-state (2026-08-01)

> Все факты — из `grep`/`read` по коду; ни одно утверждение не предположение.

**A. Policy SSOT существует и используется.**
- [`sessionRoutePolicy.js:1`](../../../../../../../src/router/sessionRoutePolicy.js): `PUBLIC_PATHS = {'/', '/board', '/login'}`; `/issue/*` public через `startsWith` ([`:12-14`](../../../../../../../src/router/sessionRoutePolicy.js)).
- [`sessionRoutePolicy.js:3`](../../../../../../../src/router/sessionRoutePolicy.js): `PROTECTED_PREFIXES = ['/dashboard', '/profile', '/story/submit', '/story/compose', '/verify']` — **включая `/story/submit`** (исходная стори его не перечисляла).
- Consumers: [`AppShellLayout.jsx:11-30`](../../../../../../../src/layout/AppShellLayout.jsx) (`isProtectedPath` / `isPublicPath` → overlay + full shell).
- Routes: [`App.jsx:21-31`](../../../../../../../src/App.jsx) — `/login` вне layout; `/`→`/board`; `*`→`/board`.

**B. Unit policy — уже частично Done (не «с нуля»).**
- [`sessionRoutePolicy.test.js`](../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js): public `/board`, `/issue/demo-1`, `/login`, `/`; protected dashboard/profile/verify/submit/compose; contrast board/`/` not protected.
- Закрыто в волне DEPLOY: [SPA-DEPLOY-01-T05](../../../EPIC-SPA-06-railway-deploy/stories/STORY-SPA-DEPLOY-01-railway-deployability/task-spa-deploy-01-t05-m5-public-paths-bundle-guard/README.md) (2026-07-06).
- **Gaps матрицы (hardening):** нет явного `isProtectedPath('/issue/…') === false`; нет nested `/issue/a/b` (если нужен contract «любой prefix»); нет отдельного AC-якоря на `/story/submit` в backlog-тексте (в тесте уже есть).

**C. Issues read — без Authorization в коде; теста нет.**
- [`GatewayIssueRepository.js:77,85`](../../../../../../../src/repositories/GatewayIssueRepository.js): `fetch(url)` — **один аргумент**, без `headers`.
- [`GatewayIssueRepository.test.js`](../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js): проверяет URL/статус; **не** assert’ит отсутствие второго arg / `Authorization`.
- Grep `Authorization` в `src/repositories/` — **0**.

**D. Overlay / public-browse — ID-02 уже покрыл core; нужен мост в ID-13.**
- Контракт: [`sessionShellState.js:74-110`](../../../../../../../src/auth/sessionShellState.js) — `logged_out` / expired / backend / network → overlay **только** если `isProtectedRoute`.
- Тесты: [`sessionShellState.test.js:49-65`](../../../../../../../src/auth/__tests__/sessionShellState.test.js).
- ID-13 (решение D-ID13-3 **B**): один **cross-test** «public path ⇒ overlay false при logged_out», чтобы не разъехались policy и shell без полного регресса ID-02.

**E. UI / live smoke — tooling есть; в DoD ID-13 развести.**
- **Mandatory (local):** `npm run test:ui:board-shell` → [`tests/puppeteer/board-shell-smoke.mjs`](../../../../../../../tests/puppeteer/board-shell-smoke.mjs) — Vite + Puppeteer `/#/board`, selectors `.board-shell`… (сейчас **не** assert’ит «URL не содержит `/login`» — усилить в T04).
- **Pointer (post-deploy, не блокер Done):** `npm run verify:railway:live` → [`scripts/verify-railway-live-smoke.mjs:46-60`](../../../../../../../scripts/verify-railway-live-smoke.mjs) — fail если redirect на `/login`; нужен `SPA_BASE_URL` (+ `ALLOW_LOCAL_SMOKE=1` локально). Документировано в [`deploy-guide.md` §M-5](../../../../../deploy-guide.md).

**F. Исходная стори устарела / неполна.**
- «Пока правим ID-12» — ID-12 **Done** (`pkg-000026`).
- Protected list без `/story/submit`.
- Битый source path на `doge-identity-service/docs/analysis/…` — SSOT в корневом [`docs/analysis/mvp-integration-plan-2026-07-02.md`](../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md).
- Scope C «опц. UI-smoke» — по решению **обязателен** local board-shell.
- Не отражён pair с GW-PUBLIC-01 и partial-статус.

### Done vs Open (чеклист статуса)

| Область | Состояние | Evidence |
|---------|-----------|----------|
| Public/protected unit matrix (базовая) | ✅ Done | `sessionRoutePolicy.test.js` + DEPLOY-01-T05 |
| Hardening matrix (`/story/submit` в AC, issue≠protected, nested) | ✅ Done | T01 |
| Cross-test overlay × public | ✅ Done | T02 |
| `getIssues`/`getIssue` без Authorization | ✅ Done | T03 |
| Local UI smoke board без login | ✅ Done | T04 |
| Railway live smoke | 📎 Pointer | deploy-guide; не блокер Done |
| Doc / INDEX / mvp-plan sync | ✅ Done | T05 |
| GW-PUBLIC-01 (gateway M-5) | ✅ Done (pair) | pkg-000048 |

## Решения (зафиксированы 2026-08-01)

| ID | Вопрос | ✅ Решение | Обоснование |
|----|--------|-----------|-------------|
| **D-ID13-1** | Scope остатка | **C — full gate:** hardening матрицы + Authorization + mandatory local UI smoke | M-5 spa-gate должен ловить и unit, и «доска в браузере» |
| **D-ID13-2** | Строгость Authorization | **C:** `getIssues` **и** `getIssue`; prefer **1-arg** `fetch(url)` (как в коде сейчас) | Регресс «добавили init с Authorization» падает сразу |
| **D-ID13-3** | Overlay в scope | **B:** один cross-test public × logged_out → overlay false | Мост policy↔shell без дубля ID-02 |
| **D-ID13-4** | Puppeteer / live | **C′:** mandatory `test:ui:board-shell` (+ no-login assert); `verify:railway:live` — pointer в touchpoints, **не** блокер Done | CI без Railway URL; live остаётся post-deploy |
| **D-ID13-5** | GW-PUBLIC-01 | **B:** явный pair в Meta; spa закрывает свою половину M-5 независимо (gateway уже Done) | Две половины одного M-5; не ждать gateway |
| **D-ID13-6** | Статус | **B:** Partial + таблица Done vs Open | Честный verified state |

## Функциональные требования (FR)

- **FR-ID13.1** Матрица public: `/`, `/board`, `/login`, любой `/issue/…` → `isPublicPath === true`; `isProtectedPath` на этих путях → `false` (включая nested `/issue/a/b` если path начинается с `/issue/`).
- **FR-ID13.2** Матрица protected: `/dashboard`, `/profile`, `/verify`, `/story/submit`, `/story/compose` (+ prefix children) → `isProtectedPath === true`.
- **FR-ID13.3** Cross: при `SESSION_SHELL_STATES.LOGGED_OUT` и public route (`isProtectedRoute=false`) → `shouldShowSessionShellOverlay(…) === false`.
- **FR-ID13.4** `createGatewayIssueRepository().getIssues` / `getIssue` вызывают `fetch` **одним** аргументом (URL); нет `Authorization` в запросе.
- **FR-ID13.5** Local UI: `npm run test:ui:board-shell` зелёный; после goto `/#/board` URL **не** содержит `/login`; board shell selectors на месте.
- **FR-ID13.6** Документы: source link, INDEX Partial→Done при закрытии, mvp-plan M-5 spa-статус, deploy-guide pointer на live smoke без требования URL для Done.
- **FR-ID13.7** Runtime policy **не менять** без failing test (test-driven only; как DEPLOY-01-T05).

## Scope — Субтаски (pipeline)

| Pipeline task | Суть | Швы |
|---------------|------|-----|
| [SPA-ID-13-T01](./task-spa-id-13-t01-harden-session-route-policy-matrix/README.md) | Hardening `sessionRoutePolicy.test.js`: public≠protected для `/`/`/board`/`/issue/*`; `/story/submit` в AC-матрице; nested `/issue/…`; не трогать production policy без fail | `src/router/__tests__/sessionRoutePolicy.test.js` |
| [SPA-ID-13-T02](./task-spa-id-13-t02-cross-test-overlay-public-route/README.md) | Cross-test overlay: `logged_out` + `isProtectedRoute=false` → overlay false (и contrast protected=true → true); рядом с policy или тонкий импорт из `sessionShellState` | `sessionShellState.test.js` и/или `sessionRoutePolicy.test.js` |
| [SPA-ID-13-T03](./task-spa-id-13-t03-assert-issues-fetch-no-authorization/README.md) | Unit: `getIssues` + `getIssue` — `fetch` 1-arg; assert нет `Authorization` | `GatewayIssueRepository.test.js` |
| [SPA-ID-13-T04](./task-spa-id-13-t04-board-shell-smoke-no-login/README.md) | Усилить `board-shell-smoke.mjs`: после goto — fail если `page.url()` содержит `/login`; прогон `npm run test:ui:board-shell` green | `tests/puppeteer/board-shell-smoke.mjs` |
| [SPA-ID-13-T05](./task-spa-id-13-t05-doc-touchpoints-m5-spa/README.md) | Doc touchpoints (таблица ниже) + INDEX Partial→Done + mvp-plan spa half; pointer на `verify:railway:live` | docs |
| [SPA-ID-13-T06](./task-spa-id-13-t06-story-gate-id-13/README.md) | Story gate: FR + AC; `npm test` / `test:run` зелёный; без правок `sessionRoutePolicy.js` / repository runtime без fail-first | acceptance-verification |
| [SPA-ID-13-T07](./task-spa-id-13-t07-commit-id13-regression-tests/README.md) | Post-audit F1: commit ID-13 test/smoke deltas to HEAD | git (4 files) |
| [SPA-ID-13-T08](./task-spa-id-13-t08-sync-mvp-plan-m5-checklist/README.md) | Post-audit F3: sync mvp-plan §7.7 M-5 checklist | `mvp-integration-plan-2026-07-02.md` |

## Post-audit follow-up (P5 scaffold / P6 closed)

- `run_mode=spa_id_13_audit_2026_08_01`
- Scoped gaps: audit F1 (Medium), F3 (Low); F2 ignored working-docs; F4–F6 ignored Info
- Queue: [SPA-ID-13-T07](./task-spa-id-13-t07-commit-id13-regression-tests/README.md) Done (`15ffcd0`, 2026-08-01T20:33:09Z) → [T08](./task-spa-id-13-t08-sync-mvp-plan-m5-checklist/README.md) Done (2026-08-01T20:33:33Z)
- Status: ✅ Closed in P6; story Meta remains Done; active pkg unchanged (`pkg-000041`)
- Audit: [audit-STORY-SPA-ID-13-execution-2026-08-01.md](../../../../../analysis/audit-STORY-SPA-ID-13-execution-2026-08-01.md)
- [P6 run-summary](../../../../run-reports/run-summary-20260801-2033-spa-id-13-post-audit.md)

## Тексты и переводы (en/et/ru)

**N/A** — UI-строк не вводит.

## Иконки

**N/A**.

## Routes / API

| Слой | Контракт |
|------|----------|
| SPA routes | Public browse: `/`, `/board`, `/issue/:id`, `/login`. Protected: `/dashboard`, `/profile`, `/verify`, `/story/submit`, `/story/compose` ([`App.jsx`](../../../../../../../src/App.jsx) + policy). |
| SPA→Gateway | `GET {VITE_GATEWAY_BASE_URL}/tallinn/issues` и `…/issues/{id}` **без** Authorization ([`GatewayIssueRepository.js:73-91`](../../../../../../../src/repositories/GatewayIssueRepository.js)). |
| Gateway pair | Auth на GET issues запрещён регрессом **GW-PUBLIC-01** (вне spa pkg). |

## Зависимости

- **ID-02 Done** — overlay semantics; ID-13 добавляет только cross-test-мост.
- **ID-12 Done** — `/story/submit` в protected; риск «сломать public при submit» остаётся актуальным для gate.
- **DEPLOY-01-T05 Done** — базовая policy matrix + bundle guard (SEC); не дублировать bundle в ID-13.
- **GW-PUBLIC-01 Done** — pair M-5; не блокер spa.

## Вне scope

- Менять `PUBLIC_PATHS` / `PROTECTED_PREFIXES` без failing test.
- Gateway auth / GW-PUBLIC-01 implementation (другой repo/profile).
- Обязательный `verify:railway:live` против production URL как AC Done (остаётся deploy checklist).
- Полный повтор suite ID-02 shell states.
- OAuth `/oauth/*` на identity host (не spa HashRouter routes в `App.jsx`).
- UI redesign board/header (public-home mockups 129–132 — отдельный трек).

## Documentation touchpoints (обновить при закрытии)

| Файл | Что сейчас | После Done |
|------|------------|------------|
| Backlog + [INDEX.md](../../../../../../backlog-stories/identity-auth/INDEX.md) | Partial / Todo (partial) | Done + pkg id |
| [`mvp-integration-plan-2026-07-02.md`](../../../../../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) M-5 | spa ID-13 ⚪ | spa-половина ✅ (pair GW-PUBLIC-01) |
| [`bullrun-launch-index.md`](../../../../bullrun-launch-index.md) §Актуальная точка | ID-13 next open | обновить после P1/P3 close |
| [`spa-mvp-dashboard.md`](../../../../spa-mvp-dashboard.md) | ID-13 Todo | Done |
| [`deploy-guide.md` §M-5](../../../../../deploy-guide.md) | live smoke | подтвердить pointer; не требовать URL для story Done |
| [`backlog-status-audit-2026-07-09.md`](../../../../../analysis/backlog-status-audit-2026-07-09.md) | ID-13 partial | optional note / superseded by Done |

## Acceptance Criteria

- [x] **FR-ID13.1–2:** unit-матрица public/protected (вкл. `/story/submit`, `/issue/*` ≠ protected) зелёная; падает при переносе `/board`/`/issue/:id` в protected.
- [x] **FR-ID13.3:** cross-test overlay × public (logged_out) зелёный.
- [x] **FR-ID13.4:** `getIssues` + `getIssue` — `fetch` 1-arg / без `Authorization`.
- [x] **FR-ID13.5:** `npm run test:ui:board-shell` зелёный; нет ухода на `/login`.
- [x] `cd spa-app && npm test` (или `test:run`) зелёный; runtime policy/repository **без** необоснованных изменений (FR-ID13.7).
- [x] Docs touchpoints + INDEX → Done; mvp-plan M-5 spa half отмечен; railway live — pointer only.

## Швы

- Policy: [`sessionRoutePolicy.js`](../../../../../../../src/router/sessionRoutePolicy.js) + [`sessionRoutePolicy.test.js`](../../../../../../../src/router/__tests__/sessionRoutePolicy.test.js)
- Overlay bridge: [`sessionShellState.js`](../../../../../../../src/auth/sessionShellState.js) / [`sessionShellState.test.js`](../../../../../../../src/auth/__tests__/sessionShellState.test.js) + [`AppShellLayout.jsx`](../../../../../../../src/layout/AppShellLayout.jsx)
- Read client: [`GatewayIssueRepository.js:73-91`](../../../../../../../src/repositories/GatewayIssueRepository.js) + [`GatewayIssueRepository.test.js`](../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js)
- UI smoke: [`tests/puppeteer/board-shell-smoke.mjs`](../../../../../../../tests/puppeteer/board-shell-smoke.mjs); pointer [`scripts/verify-railway-live-smoke.mjs`](../../../../../../../scripts/verify-railway-live-smoke.mjs)

## Follow-ups (вне scope ID-13)

- Operator: post-deploy `SPA_BASE_URL=… npm run verify:railway:live` на Railway.
- Sync meta GW-PUBLIC-01 source link (там тоже битый path на identity) — gateway housekeeping.
- Public-home UX (mockup-129…132) — не M-5 regression.
