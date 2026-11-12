# STORY-SPA-BUG-06-stale-placeholder-bake-npm-start — Dist provenance + `npm start` contract (placeholder bake)

## Meta (pipeline)

- **Key:** `STORY-SPA-BUG-06-stale-placeholder-bake-npm-start`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000071`
- **Status:** P6 T01–T05 **Done** · T06 **BLOCKED** F1 OPEN · T07/T08 **Done** · local scripts PASS · §8.4 board **PENDING** (gateway `:8000` down `2026-08-18T10:33:43Z`) · not full Product Done
- **Severity:** **P0** — local login + board fail under the operator's actual start command
- **Wave:** Local-stack unblock · post HL-02 / sibling of BUG-05
- **Type:** Functional · DX / bake contract
- **source:** [`../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)
- **decision_ref:** backlog STORY-SPA-BUG-06 + [investigation](../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) H6 CONFIRMED 2026-08-18
- **Related:** BUG-05 (Railway side) · HL-02 Done · DEPLOY-02 — **do not reopen HL-02/HL-04**
- **Sibling OOS:** BUG-07 · BUG-08 — **not this pkg**
- **ui_scope:** `none`
- **P1.3:** 2026-08-18T10:06:59Z · **P3:** 2026-08-18T10:18:16Z

## Зачем простыми словами

Оператор поднимает живые local identity (`:8100`) и gateway (`:8000`), затем SPA командой **`npm start`**. Логин показывает Authentication Error / `network_error`. Доска — Unable To Load The Board (`board-load-error`). Бэкенды при этом отвечают (issues **200**, identity **401** без Bearer).

Причина не в форме логина и не в issues API: `serve` отдаёт **старый production `dist`**, в который вшиты placeholder-хосты (`gateway.example.invalid`, `project.supabase.co`). Браузер ходит туда (DNS NXDOMAIN). Файл `spa-app/.env` с localhost **не читается** командой `start`.

**Итог:** value loop (открыть доску → увидеть issues → залогиниться) ломается на операторском старте, который совпадает с Railway `startCommand`, но против несовместимого bake.

## Expected vs Actual

**As-of-Done / Current** (T03 `2026-08-18T10:18:16Z`): `"start": "node scripts/start-spa.mjs"` — refuse `placeholder`/`unknown`; public bake + localhost `.env` → exit 1; spawn `serve` only after allow. Local value-loop still uses `npm run dev` or matching local bake.

**Historical** (2026-08-18 pre-T03 Actual):

| | Expected when operator wants local backends | Actual 2026-08-18 (pre-fix) |
|--|---------------------------------------------|-------------------|
| SPA command | Fail-fast if `dist` cannot talk to intended backends **or** a lane that reads `.env` (`npm run dev` / `npm run build` from `.env`) | Silent `serve -s dist` |
| Auth host | `VITE_SUPABASE_URL` from operator `.env` (hosted project, not `project.supabase.co`) | `https://project.supabase.co` (NXDOMAIN) |
| Issues host | `http://127.0.0.1:8000/tallinn/issues` | `https://gateway.example.invalid/tallinn/issues` |
| Identity host | `http://127.0.0.1:8100` | `https://identity.example.invalid` |
| Board | issues JSON, no `board-load-error` | load-error |
| Login | token grant to real Supabase URL | `network_error` |
| After HL-02 gate | Operator cannot confuse public bake with local preview | `verify:build:env-bake` overwrites `dist`; next `npm start` still looks like a local preview |

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| `start` As-of-Done wrapper (T03) | [`package.json`](../../../../../package.json) L10: `"start": "node scripts/start-spa.mjs"` |
| Historical: `start` served static `dist`, not Vite `.env` | same L10 was `serve -s dist -l tcp://0.0.0.0:${PORT:-4173}` (pre-T03) |
| `dev` is the lane that reads `.env` at server start | [`package.json`](../../../../../package.json) L7: `vite`; [`.env.example`](../../../../../.env.example) L5–8, L37–41 |
| Dist chunk 2026-08-18 | `dist/assets/index-3Fbc_xg4.js` mtime **2026-08-16 15:34:53**; literals `https://gateway.example.invalid`, `https://identity.example.invalid`, `https://project.supabase.co`, `public-anon-key-bake-reconfirm`, `VITE_LIFE_REALITY_MODE=GFL-DRIVEN` |
| Zero localhost needles in that chunk | investigation §2.1 — compatible with HL-02 `FORBIDDEN_LOCALHOST` |
| Local `.env` unread by `serve` | file read 2026-08-18: gateway `http://127.0.0.1:8000` (+ trailing space), identity `http://127.0.0.1:8100`; `.env` mtime **2026-07-25** (older than dist) |
| Login maps Failed to fetch → `network_error` | [`LoginPage.jsx`](../../../../../src/pages/LoginPage.jsx) L184–198 · [`mapAuthError.js`](../../../../../src/auth/mapAuthError.js) L15–20 |
| Board maps rejected `getIssues` → `board-load-error` | [`BoardPage.jsx`](../../../../../src/pages/BoardPage.jsx) L87–112, L299–312 |
| Gateway issues live | curl `GET http://127.0.0.1:8000/tallinn/issues` **200**; CORS `access-control-allow-origin: *` |
| Identity live | `GET http://127.0.0.1:8100/me` **401** `AUTHENTICATION_REQUIRED` without Bearer |
| HL-02 overwrites `dist` | [`verify-build-env-bake.mjs`](../../../../../scripts/verify-build-env-bake.mjs) L48 `execSync('npm run build')`; L7–14 `FORBIDDEN_LOCALHOST`; L38–40 public-only |
| Placeholder strings **0 hits** in repo sources | Grep 2026-08-18; who baked them is **not** in git — do not invent |
| Vite default origin for `dev` | [`vite.config.js`](../../../../../vite.config.js) — no `server.port`; Vite default **5173** |
| Investigation matrix | H6 **CONFIRMED**; H1–H5, H7 **REJECTED** |

Pin layer (precise): **SPA start contract / dist provenance** — not gateway, not identity, not Login/Board product code.

### Что это **не** (отсечённые гипотезы)

| Hypothesis | Почему отвергнута |
|------------|-------------------|
| Local identity/gateway down | H1 REJECTED — issues 200, identity 401, `db_ready=True` |
| CORS blocks SPA origin | H2 REJECTED — `access-control-allow-origin: *` for `Origin: http://localhost:4173` |
| Wrong password / `invalid_credentials` | H3 REJECTED — request never reaches real Supabase |
| `fetchMe` / identity `/me` drives login card | H4 REJECTED — `completeAuthSuccess` swallows `fetchMe`; token URL is supabase host |
| SPA talks to localhost from `.env` | H5 REJECTED — dist literals are placeholders; 0 localhost in chunk |
| GFL-DRIVEN empty gateway throws before fetch | H7 REJECTED — bake has non-empty `https://gateway.example.invalid`; UI is fetch-fail |
| LoginPage / `mapAuthError` / BoardPage broken | They behaved as written; mapping Failed to fetch is correct |
| «Weaken `FORBIDDEN_LOCALHOST` so local `start` works» | Would break Railway / BUG-05 / HL-02 |
| «Commit localhost `dist` as the prod fix» | Forbidden (investigation §8.3) |
| ES-01…05 / Pulse / Emerging API regression | Backends were not called; not an Early Signal product defect |

## Функциональные требования

Контракт на **артефакте** `dist`, не ветки в UI.

- **FR-BUG-06.1** Reconfirm: `npm start` against current placeholder-or-public `dist` still fails local board/login **or** note «superseded by investigation 2026-08-18».
- **FR-BUG-06.2** Pin остаётся: start × bake mismatch (не CORS, не LoginPage, не gateway).
- **FR-BUG-06.3** Classifier SSOT: `scripts/lib/classifySpaBake.mjs` читает **уже собранный** `dist/assets/*.js` (как расследование), не второй dotenv. Kinds:
  - `placeholder` — needles `gateway.example.invalid` / `identity.example.invalid` / `project.supabase.co` / `public-anon-key-bake-reconfirm`
  - `local` — HL-02 needles `localhost:8000` / `localhost:8100` / `127.0.0.1:8000` / `127.0.0.1:8100`
  - `public` — иначе HTTPS-хосты без placeholder
  - `unknown` — нет файлов / не классифицируется
- **FR-BUG-06.4** Post-build provenance: `package.json` `"build"` = `vite build && node scripts/write-bake-meta.mjs` пишет `dist/bake-meta.json` (`schema`, `builtAt`, `bakeKind`, hostnames **без** секретов/anon key, `source`). HL-02 вызывает `npm run build` — meta появляется и на Railway bake.
- **FR-BUG-06.5** `start` = `node scripts/start-spa.mjs` (не слепой `serve`):
  - нет `dist` / нет `bake-meta.json` → exit 1 («пересобери»)
  - `placeholder` \| `unknown` → **всегда** exit 1 (actionable: `npm run dev` или `npm run build` from `.env`, не `verify:build:env-bake`)
  - `public` **и** в `spa-app/.env` есть `localhost` / `127.0.0.1` в `VITE_GATEWAY_BASE_URL` или `VITE_IDENTITY_SERVICE_URL` → exit 1 (public/HL-02 bake не ходит на local backends)
  - иначе spawn `serve -s dist -l tcp://0.0.0.0:${PORT:-4173}` (Railway: нет local `.env` с localhost → public bake проходит)
- **FR-BUG-06.6** HL-02 сохранён: [`verify-build-env-bake.mjs`](../../../../../scripts/verify-build-env-bake.mjs) `FORBIDDEN_LOCALHOST` и [`railway.toml`](../../../../../railway.toml) `buildCommand` **не** ослаблены.
- **FR-BUG-06.7** Нет UI-веток в `LoginPage` / `BoardPage` / `mapAuthError` под placeholder hostname.
- **FR-BUG-06.8** Regression: (a) placeholder `dist` → `npm start` exit 1; (b) public bake + `.env` with localhost → exit 1; (c) public bake without localhost `.env` (Railway-like) → serve starts; (d) local bake after `npm run build` from local `.env` → serve starts; (e) local board/login validation [investigation §8.4](../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) on `npm run dev` **or** matching local bake `start`.

## Acceptance Criteria

- [x] Evidence / reconfirm note (или явная ссылка на investigation 2026-08-18).
- [x] Pin layer = SPA start / dist provenance (зафиксирован в gate note).
- [x] `classifySpaBake` + `write-bake-meta.mjs` + `start-spa.mjs` существуют; `package.json` `build`/`start` wired.
- [x] `npm start` на placeholder bake → exit **1**, не silent `:4173` UI fail.
- [x] `npm start` на public bake при local `.env` с localhost gateway/identity → exit **1**.
- [x] Railway-like: public bake, no localhost `.env` → `serve` starts on `${PORT:-4173}`.
- [x] `rg` `FORBIDDEN_LOCALHOST` still present; `railway.toml` still `verify:build:env-bake`.
- [x] No new hostname branches in Login/Board.
- [ ] After intended local lane (`npm run dev` or local `build`+`start`): `#/board` without `board-load-error`; Network issues to `127.0.0.1:8000` or `localhost:8000` **200**; login token **not** to `project.supabase.co`. **PENDING** (T06 BLOCKED `2026-08-18T10:33:43Z`; gateway not listening).
- [x] No operator passwords / anon JWT in commit or notes.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-bug-06-t01-reconfirm-placeholder-start](./task-spa-bug-06-t01-reconfirm-placeholder-start/README.md) | **Done** · Reconfirm placeholder `start` |
| **T02** | [task-spa-bug-06-t02-pin-start-dist-provenance](./task-spa-bug-06-t02-pin-start-dist-provenance/README.md) | **Done** · Pin start × dist bake (H6) |
| **T03** | [task-spa-bug-06-t03-fix-classifier-start-spa](./task-spa-bug-06-t03-fix-classifier-start-spa/README.md) | **Done** · classifier + bake-meta + `start-spa.mjs` |
| **T04** | [task-spa-bug-06-t04-regression-start-bake-kinds](./task-spa-bug-06-t04-regression-start-bake-kinds/README.md) | **Done** · bake-kind refuse/allow + HL-02 intact |
| **T05** | [task-spa-bug-06-t05-story-gate-bug-06](./task-spa-bug-06-t05-story-gate-bug-06/README.md) | **Done** · gate local PASS · §8.4 PENDING |
| **T06** | [task-spa-bug-06-t06-live-section-8-4-board-login](./task-spa-bug-06-t06-live-section-8-4-board-login/README.md) | **Done BLOCKED** · F1 OPEN · `:8000` http_code **000** |
| **T07** | [task-spa-bug-06-t07-as-of-done-t01-t02-code-facts](./task-spa-bug-06-t07-as-of-done-t01-t02-code-facts/README.md) | **Done** · F2 CLOSED · T01/T02 As-of-Done |
| **T08** | [task-spa-bug-06-t08-as-of-done-surface-expected-ssot](./task-spa-bug-06-t08-as-of-done-surface-expected-ssot/README.md) | **Done** · F3 CLOSED · Surface + Expected vs Actual |

## Вне scope

- Ослабление HL-02 / `FORBIDDEN_LOCALHOST` / смена `railway.toml` `buildCommand`.
- Патч CORS gateway/identity (runtime 2026-08-18 уже `*`).
- Патч `LoginPage` / `mapAuthError` / `BoardPage` / `issueService` как «фикс логина».
- Коммит `dist/` с localhost bake как prod-артефакт.
- Docs-only drift `vite preview` vs `serve` → [BUG-07](../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md).
- Trailing-space / scattered `import.meta.env` trim → [BUG-08](../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md).
- Кто записал `*.example.invalid` в dist 2026-08-16 — не в git; не выдумывать.
- EPIC-SPA-12 Early Signal product work.
- Mix BUG-05 (`pkg-000065`) / ES-01…05 (`pkg-000066`…`070`) into this pkg.

## Швы (указатели)

- [`package.json`](../../../../../package.json) `dev` / `build` / `preview` / `start` / `verify:build:env-bake`
- [`scripts/verify-build-env-bake.mjs`](../../../../../scripts/verify-build-env-bake.mjs) · [`railway.toml`](../../../../../railway.toml)
- New: `scripts/lib/classifySpaBake.mjs` · `scripts/write-bake-meta.mjs` · `scripts/start-spa.mjs` · `dist/bake-meta.json`
- HL-02 Done · DEPLOY-02 static serve · BUG-05 Railway bake × identity fallback
- Operator `.env` (unread by `serve`) vs compile-time Vite bake

## Notes

- Gate: [`task-spa-bug-06-t05-story-gate-bug-06/acceptance-verification-spa-bug-06.md`](./task-spa-bug-06-t05-story-gate-bug-06/acceptance-verification-spa-bug-06.md) — Date deferred to P3 live verify.
- Prefer FR/AC from backlog file as story gate source of truth.
- Do **not** mark HL-02/HL-04/BUG-05 reopened; this is the **local-DX** side of the bake seam.
