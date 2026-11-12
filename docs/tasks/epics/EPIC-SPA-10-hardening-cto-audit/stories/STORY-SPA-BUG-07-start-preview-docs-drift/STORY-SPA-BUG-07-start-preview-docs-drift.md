# STORY-SPA-BUG-07-start-preview-docs-drift — Three start lanes: `dev` / `build`+`start` / HL-02 bake (docs SSOT)

## Meta (pipeline)

- **Key:** `STORY-SPA-BUG-07-start-preview-docs-drift`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000072`
- **Status:** **Done** · P3 `2026-08-18T10:48:03Z` · T01–T05 **Done** · P6 T06–T08 **Done** (`spa_bug_07_audit_2026_08_18`) · product AC/DoD Done · OPEN gap-list **empty** (F1–F3 CLOSED)
- **Severity:** **P2** — does not cause the 2026-08-18 fail by itself; trains operators into the wrong lane
- **Wave:** Follow-up to BUG-06 (docs SSOT for three bake lanes)
- **Type:** Docs / operator contract
- **source:** [`../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md)
- **decision_ref:** backlog STORY-SPA-BUG-07 + [investigation](../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) §8.5 Docs drift 2026-08-18
- **Related:** BUG-06 · HL-02 Done · DEPLOY-02 — **do not reopen HL-02/HL-04**
- **Sibling OOS:** BUG-05 · BUG-06 product (`start-spa.mjs` / bake-meta) · BUG-08 — **not this pkg**
- **ui_scope:** `none`
- **P1.3:** 2026-08-18T10:43:15Z
- **Disk (not new AC):** [`package.json`](../../../../../package.json) L10 `"start": "node scripts/start-spa.mjs"` (BUG-06 wrapper; spawn `serve` after allow)

## Зачем простыми словами

Канон запуска в `.env.example` всё ещё описывает `npm start` как `vite preview`. Реальный скрипт — `serve -s dist` (DEPLOY-02). Оператор, который читает example и поднимает «прод-превью» против localhost backends, получает тот же класс отказа, что BUG-06: `serve` не читает `.env`.

Вторая дыра: нет явной третьей полосы — после `npm run verify:build:env-bake` `dist` **обязан** быть public-only; следующий `npm start` **нельзя** использовать как local-against-localhost preview. Это follow-up «Bake vs local DX» из отчёта, не отдельный product-баг UI.

**Итог:** docs лгут про `start` и молчат про несовместимость HL-02 bake с local `start`.

## Expected vs Actual

**As-of-Done / Current** (T03 `2026-08-18T10:48:03Z`): `.env.example` Lane A/B/C; `"start"` = `node scripts/start-spa.mjs` → `serve`; runtime-docs table matches `package.json`; after `verify:build:env-bake` do **not** `npm start` vs localhost.

**Historical** (2026-08-18 pre-T03 Actual):

| | Expected | Actual (disk 2026-08-18, pre-T03) |
|--|----------|--------------------------|
| `start` documented as | `serve -s dist` (DEPLOY-02 / [`package.json`](../../../../../package.json) L10 / [`deploy-guide.md`](../../../../../deploy-guide.md)) | [`.env.example`](../../../../../.env.example) L56: `package.json → "start": vite preview --host 0.0.0.0 --port ${PORT:-4173}` |
| Local GFL recipe | `npm run dev` (or `npm run build` from `.env`) | L37–41 **correct** (`npm run dev`) |
| After `verify:build:env-bake` | Explicit: do **not** `npm start` against localhost backends | Missing from `.env.example` |
| `preview` | Local Vite preview of **that** bake (`package.json` L9) | L63 still points at `preview.allowedHosts` — **removed** in DEPLOY-02 ([`vite.config.js`](../../../../../vite.config.js) L7–8 only `host`) |
| Runtime manual | Same three-lane table as `package.json` | [`frontend-run-and-environment.md`](../../../../../runtime-docs/frontend-run-and-environment.md) L42: `npm run start` = `vite preview …` |

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| `start` is static serve | [`package.json`](../../../../../package.json) L10 `serve -s dist` |
| `preview` is Vite preview | [`package.json`](../../../../../package.json) L9 `vite preview` |
| `dev` is Vite | L7 `vite`; default origin **5173** ([`vite.config.js`](../../../../../vite.config.js) has no `server.port`) |
| Example still names `vite preview` as `start` | [`.env.example`](../../../../../.env.example) L56–57 |
| Example still cites `preview.allowedHosts` | L63; config **has no** `allowedHosts` after DEPLOY-02 |
| Runtime manual stale | [`frontend-run-and-environment.md`](../../../../../runtime-docs/frontend-run-and-environment.md) L42 (sverka date on that file: **2026-06-17**, before DEPLOY-02) |
| Deploy guide already correct | [`deploy-guide.md`](../../../../../deploy-guide.md): Railway `npm start` → `serve`; local bundle check = `npm run preview` |
| `railway.toml` already correct | comment L3: `serve -s dist (static production serve; not vite preview)` |
| HL-02 overwrites dist | [`verify-build-env-bake.mjs`](../../../../../scripts/verify-build-env-bake.mjs) L48 |
| Local recipe in example is already `npm run dev` | [`.env.example`](../../../../../.env.example) L37–41 |
| Investigation names this as optional follow-up, not root | §8.5 Docs drift |

Pin layer (precise): **docs / example vs `package.json` `start`** — not product runtime, not Login/Board.

### Что это **не** (отсечённые гипотезы)

| Hypothesis | Почему отвергнута |
|------------|-------------------|
| Docs drift **caused** login/board fail 2026-08-18 | Root is H6 (BUG-06): serving placeholder `dist`. Example L37–41 already says `npm run dev` |
| Need a fourth runbook besides deploy-guide | SSOT = `.env.example` aligned with `package.json` + deploy-guide; do not fork a new operator bible |
| Change `start` back to `vite preview` | DEPLOY-02 / Railway contract; forbidden |
| Product-code / CORS / LoginPage | Out of this story |
| Weaken HL-02 so docs can say «start works locally after gate» | Forbidden (BUG-05 / BUG-06 FR) |

## Функциональные требования

Три полосы — единственный канон. Не плодить четвёртый runbook.

- **FR-BUG-07.1** Pin: docs/example `start` ≠ `package.json` `start`.
- **FR-BUG-07.2** [`.env.example`](../../../../../.env.example) hosting block describes:
  - **Lane A — local backends:** `npm run dev` (Vite reads `.env`; default `:5173`).
  - **Lane B — preview this bake:** `npm run build` from current `.env` then `npm start` (`serve -s dist`) **or** `npm run preview` (Vite preview of **that** `dist`).
  - **Lane C — Railway/public:** `npm run verify:build:env-bake` overwrites `dist` with public URLs; **after that** do **not** `npm start` against localhost gateway/identity.
- **FR-BUG-07.3** L56 no longer claims `package.json` `"start": vite preview`. L63 no longer cites removed `preview.allowedHosts` as required for prod.
- **FR-BUG-07.4** [`frontend-run-and-environment.md`](../../../../../runtime-docs/frontend-run-and-environment.md) command table matches `package.json` (`start` = `serve -s dist`; `preview` separate). Refresh sverka date.
- **FR-BUG-07.5** [`deploy-guide.md`](../../../../../deploy-guide.md) remains SSOT for Railway; this story **aligns toward it**, does not rewrite deploy as a second truth.
- **FR-BUG-07.6** Investigation §8.5 marked addressed (one-line cross-link to this story) — no duplicate essay.
- **FR-BUG-07.7** Regression grep: in `spa-app/.env.example` and `spa-app/docs/**/*.md`, `npm start` / `"start"` is **not** documented as `vite preview` except historical analysis/audit quotes and explicit «do not use preview in prod» troubleshooting.

## Acceptance Criteria

- [x] Pin note: example/runtime-docs vs `package.json` L10.
- [x] `.env.example` three-lane block present; L56–63 match `serve` / `preview` split.
- [x] `frontend-run-and-environment.md` L38–42 (or successor table) matches `package.json`.
- [x] `rg` gate: no remaining **normative** `start` = `vite preview` in `.env.example` or runtime-docs (analysis/audit historical quotes allowed).
- [x] deploy-guide / railway.toml not rewritten against DEPLOY-02.
- [x] No `FORBIDDEN_LOCALHOST` / `railway.toml` `buildCommand` changes.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-bug-07-t01-reconfirm-start-preview-docs-drift](./task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md) | Reproduce: grep/example vs `package.json` |
| **T02** | [task-spa-bug-07-t02-pin-docs-layer](./task-spa-bug-07-t02-pin-docs-layer/README.md) | Pin: docs layer (not product runtime) |
| **T03** | [task-spa-bug-07-t03-fix-env-example-runtime-docs](./task-spa-bug-07-t03-fix-env-example-runtime-docs/README.md) | Fix `.env.example` + runtime-docs; optional §8.5 one-line |
| **T04** | [task-spa-bug-07-t04-regression-grep-start-preview](./task-spa-bug-07-t04-regression-grep-start-preview/README.md) | Regression grep FR-BUG-07.7 |
| **T05** | [task-spa-bug-07-t05-story-gate-bug-07](./task-spa-bug-07-t05-story-gate-bug-07/README.md) | Story gate FR/AC |
| **T06** | [task-spa-bug-07-t06-as-of-done-bullrun-parent-index](./task-spa-bug-07-t06-as-of-done-bullrun-parent-index/README.md) | P6 F1 CLOSED · bullrun table + parent INDEX |
| **T07** | [task-spa-bug-07-t07-as-of-done-t01-t02-code-facts](./task-spa-bug-07-t07-as-of-done-t01-t02-code-facts/README.md) | P6 F2 CLOSED · T01/T02 Code Facts |
| **T08** | [task-spa-bug-07-t08-as-of-done-surface-expected-ssot](./task-spa-bug-07-t08-as-of-done-surface-expected-ssot/README.md) | P6 F3 CLOSED · Surface + Expected vs Actual |

## Вне scope

- Реализация `start-spa.mjs` / bake-meta → [BUG-06](../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md).
- `publicEnv` trim SSOT → [BUG-08](../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md).
- Rollback DEPLOY-02 (`start` → `vite preview`).
- HL-02 weaken.
- Rewriting Early Signal product docs (ES INDEX only gets a cross-link in the index pass).
- Mix BUG-05 (`pkg-000065`) / BUG-06 (`pkg-000071`) into this pkg.

## Швы (указатели)

- [`.env.example`](../../../../../.env.example) · [`package.json`](../../../../../package.json) · [`vite.config.js`](../../../../../vite.config.js)
- [`docs/deploy-guide.md`](../../../../../deploy-guide.md) · [`docs/runtime-docs/frontend-run-and-environment.md`](../../../../../runtime-docs/frontend-run-and-environment.md) · [`railway.toml`](../../../../../railway.toml)
- DEPLOY-02 Done · HL-02 Done · BUG-06 start contract

## Notes

- Gate: [`task-spa-bug-07-t05-story-gate-bug-07/acceptance-verification-spa-bug-07.md`](./task-spa-bug-07-t05-story-gate-bug-07/acceptance-verification-spa-bug-07.md) — Date `2026-08-18T10:48:03Z` · Result PASS.
- Prefer FR/AC from backlog file as story gate source of truth.
- T03 docs must match **disk** `package.json` L10 (`node scripts/start-spa.mjs` → spawn `serve -s dist`); do not invent a fourth lane.
- Do **not** mark HL-02/HL-04/BUG-05/BUG-06 reopened.
