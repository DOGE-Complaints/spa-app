# STORY-SPA-BUG-07 — Three start lanes: `dev` / `build`+`start` / HL-02 bake (docs SSOT)

> **Структура:** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) · diagnosis SSOT: [investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md](../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) §8.5 Docs drift · sibling P0: [BUG-06](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-07-start-preview-docs-drift` |
| **Type** | Docs / operator contract |
| **Severity** | **P2** — does not cause the 2026-08-18 fail by itself; trains operators into the wrong lane |
| **Status** | **Done** · P3 `pkg-000072` `2026-08-18T10:48:03Z` · P6 T06–T08 F1–F3 CLOSED |
| **Wave** | Follow-up to BUG-06 (docs SSOT for three bake lanes) |
| **UAT ID** | _(ops / docs)_ |
| **Route** | N/A (documentation) |
| **Surface** | **As-of-Done / Current** (T03): [`.env.example`](../../../../.env.example) L54–61 Lane A/B/C; runtime-docs L42 `start-spa.mjs`. **Historical** (2026-08-18 pre-T03): example L56–57 / L63 · runtime-docs L42 as `vite preview` |
| **Repro** | Always: example claims `start` = `vite preview`; `package.json` L10 = `serve -s dist` |
| **Env** | spa-app docs vs scripts on disk 2026-08-18 |
| **Epic (target)** | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md) · adjacent [EPIC-SPA-06](../../epics/EPIC-SPA-06-railway-deploy/EPIC-SPA-06-railway-deploy.md) / DEPLOY-02 |
| **Pipeline** | [EPIC-SPA-10 STORY-SPA-BUG-07](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/STORY-SPA-BUG-07-start-preview-docs-drift.md) |
| **Package** | [bugs/](INDEX.md) |
| **Source** | Investigation 2026-08-18 §8.5 · DEPLOY-02 already moved prod `start` to `serve` |
| **Related** | [BUG-06](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) · [HL-02](../hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md) · [DEPLOY-02](../railway-deploy/STORY-SPA-DEPLOY-02-static-production-serve.md) |
| **decision_ref** | investigation §8.5 Docs drift 2026-08-18 |

## Symptom (простыми словами)

Канон запуска в `.env.example` всё ещё описывает `npm start` как `vite preview`. Реальный скрипт — `serve -s dist` (DEPLOY-02). Оператор, который читает example и поднимает «прод-превью» против localhost backends, получает тот же класс отказа, что BUG-06: `serve` не читает `.env`.

Вторая дыра: нет явной третьей полосы — после `npm run verify:build:env-bake` `dist` **обязан** быть public-only; следующий `npm start` **нельзя** использовать как local-against-localhost preview. Это follow-up «Bake vs local DX» из отчёта, не отдельный product-баг UI.

**Итог:** docs лгут про `start` и молчат про несовместимость HL-02 bake с local `start`.

## Expected vs Actual

**As-of-Done / Current** (T03 `2026-08-18T10:48:03Z`): `.env.example` Lane A/B/C; `"start"` = `node scripts/start-spa.mjs` → `serve`; runtime-docs table matches `package.json`; after `verify:build:env-bake` do **not** `npm start` vs localhost.

**Historical** (2026-08-18 pre-T03 Actual):

| | Expected | Actual (disk 2026-08-18, pre-T03) |
|--|----------|--------------------------|
| `start` documented as | `serve -s dist` (DEPLOY-02 / [`package.json`](../../../../package.json) L10 / [`deploy-guide.md`](../../../deploy-guide.md)) | [`.env.example`](../../../../.env.example) L56: `package.json → "start": vite preview --host 0.0.0.0 --port ${PORT:-4173}` |
| Local GFL recipe | `npm run dev` (or `npm run build` from `.env`) | L37–41 **correct** (`npm run dev`) |
| After `verify:build:env-bake` | Explicit: do **not** `npm start` against localhost backends | Missing from `.env.example` |
| `preview` | Local Vite preview of **that** bake (`package.json` L9) | L63 still points at `preview.allowedHosts` — **removed** in DEPLOY-02 ([`vite.config.js`](../../../../vite.config.js) L7–8 only `host`) |
| Runtime manual | Same three-lane table as `package.json` | [`frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md) L42: `npm run start` = `vite preview …` |

## Repro steps

1. Open [`spa-app/.env.example`](../../../../.env.example) L54–63.
2. Open [`spa-app/package.json`](../../../../package.json) L7–10.
3. Observe: example `start` = `vite preview`; package `start` = `serve -s dist`; `preview` is a **separate** script.
4. Open [`spa-app/docs/runtime-docs/frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md) L38–42 — same stale `start` line.
5. Optional: `rg -n 'start.*vite preview|npm run start.*vite preview' spa-app --glob '*.md' --glob '*.example'`.

## Verified facts (code + docs — не гипотезы)

| Fact | Evidence |
|------|----------|
| `start` is static serve | [`package.json`](../../../../package.json) L10 `serve -s dist` |
| `preview` is Vite preview | [`package.json`](../../../../package.json) L9 `vite preview` |
| `dev` is Vite | L7 `vite`; default origin **5173** ([`vite.config.js`](../../../../vite.config.js) has no `server.port`) |
| Example still names `vite preview` as `start` | [`.env.example`](../../../../.env.example) L56–57 |
| Example still cites `preview.allowedHosts` | L63; config **has no** `allowedHosts` after DEPLOY-02 |
| Runtime manual stale | [`frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md) L42 (sverka date on that file: **2026-06-17**, before DEPLOY-02) |
| Deploy guide already correct | [`deploy-guide.md`](../../../deploy-guide.md): Railway `npm start` → `serve`; local bundle check = `npm run preview` |
| `railway.toml` already correct | comment L3: `serve -s dist (static production serve; not vite preview)` |
| HL-02 overwrites dist | [`verify-build-env-bake.mjs`](../../../../scripts/verify-build-env-bake.mjs) L48 |
| Local recipe in example is already `npm run dev` | [`.env.example`](../../../../.env.example) L37–41 |
| Investigation names this as optional follow-up, not root | §8.5 Docs drift |

## What this is NOT

| Hypothesis | Почему отвергнута |
|------------|-------------------|
| Docs drift **caused** login/board fail 2026-08-18 | Root is H6 (BUG-06): serving placeholder `dist`. Example L37–41 already says `npm run dev` |
| Need a fourth runbook besides deploy-guide | SSOT = `.env.example` aligned with `package.json` + deploy-guide; do not fork a new operator bible |
| Change `start` back to `vite preview` | DEPLOY-02 / Railway contract; forbidden |
| Product-code / CORS / LoginPage | Out of this story |
| Weaken HL-02 so docs can say «start works locally after gate» | Forbidden (BUG-05 / BUG-06 FR) |

## Diagnostic playbook

Docs-only. T01+T02 may be **one** task (schema: visual/docs compress OK). Pin = file mismatch, not runtime rediscovery.

```bash
cd spa-app
# Current (pre-fix) expected hits:
rg -n 'start.*vite preview|"start": vite preview' .env.example docs/runtime-docs/frontend-run-and-environment.md
# Canonical (must remain true):
rg -n 'serve -s dist' package.json railway.toml docs/deploy-guide.md
```

### Pin rules

| Observation | Pin layer | Prefer fix direction |
|-------------|-----------|----------------------|
| `.env.example` / runtime-docs describe `start` as `vite preview` | **Docs** | Align with `package.json` + deploy-guide |
| Missing third lane after HL-02 | **Docs** | State: gate = public overwrite; then `npm start` ≠ local backends |
| «Fix» by switching `package.json` `start` to `vite preview` | **Anti-pattern** | **Запрещено** |

## Hypothesis matrix

| # | Hypothesis | Status |
|---|------------|--------|
| D1 | `.env.example` L56–57 disagrees with `package.json` L10 | **CONFIRMED** (file compare) |
| D2 | Runtime manual L42 same stale `start` | **CONFIRMED** |
| D3 | This mismatch is the **root** of 2026-08-18 UI fail | **REJECTED** — H6 is root (BUG-06); docs are contributing DX |
| D4 | deploy-guide still says `start` = `vite preview` as the happy path | **REJECTED** as root — deploy-guide already documents `serve`; leftover lines are troubleshooting «do not use preview in prod» |

## Функциональные требования

Три полосы — единственный канон. Не плодить четвёртый runbook.

- **FR-BUG-07.1** Pin: docs/example `start` ≠ `package.json` `start`.
- **FR-BUG-07.2** [`.env.example`](../../../../.env.example) hosting block describes:
  - **Lane A — local backends:** `npm run dev` (Vite reads `.env`; default `:5173`).
  - **Lane B — preview this bake:** `npm run build` from current `.env` then `npm start` (`serve -s dist`) **or** `npm run preview` (Vite preview of **that** `dist`).
  - **Lane C — Railway/public:** `npm run verify:build:env-bake` overwrites `dist` with public URLs; **after that** do **not** `npm start` against localhost gateway/identity.
- **FR-BUG-07.3** L56 no longer claims `package.json` `"start": vite preview`. L63 no longer cites removed `preview.allowedHosts` as required for prod.
- **FR-BUG-07.4** [`frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md) command table matches `package.json` (`start` = `serve -s dist`; `preview` separate). Refresh sverka date.
- **FR-BUG-07.5** [`deploy-guide.md`](../../../deploy-guide.md) remains SSOT for Railway; this story **aligns toward it**, does not rewrite deploy as a second truth.
- **FR-BUG-07.6** Investigation §8.5 marked addressed (one-line cross-link to this story) — no duplicate essay.
- **FR-BUG-07.7** Regression grep: in `spa-app/.env.example` and `spa-app/docs/**/*.md`, `npm start` / `"start"` is **not** documented as `vite preview` except historical analysis/audit quotes and explicit «do not use preview in prod» troubleshooting.

## Acceptance Criteria

- [x] Pin note: example/runtime-docs vs `package.json` L10.
- [x] `.env.example` three-lane block present; L56–63 match `serve` / `preview` split.
- [x] `frontend-run-and-environment.md` L38–42 (or successor table) matches `package.json`.
- [x] `rg` gate: no remaining **normative** `start` = `vite preview` in `.env.example` or runtime-docs (analysis/audit historical quotes allowed).
- [x] deploy-guide / railway.toml not rewritten against DEPLOY-02.
- [x] No `FORBIDDEN_LOCALHOST` / `railway.toml` `buildCommand` changes.

## Nested tasks

Docs-only. T01+T02 compress OK.

| Task | Role | Status | Notes |
|------|------|--------|-------|
| **T01** | Reproduce: grep/example vs `package.json` | Done | P3 `2026-08-18T10:47:00Z` |
| **T02** | Pin: docs layer (not product runtime) | Done | P3 `2026-08-18T10:47:00Z` |
| **T03** | Fix pinned docs: `.env.example` + runtime-docs; optional one-line in investigation §8.5 | Done | P3 `2026-08-18T10:48:03Z` |
| **T04** | Regression grep (FR-BUG-07.7) | Done | P3 `2026-08-18T10:48:03Z` |
| **T05** | Story gate FR/AC | Done | P3 gate PASS `2026-08-18T10:48:03Z` |
| **T06** | As-of-Done bullrun table + parent INDEX (F1) | Done | P6 F1 CLOSED `2026-08-18T10:58:18Z` |
| **T07** | As-of-Done T01/T02 Code Facts (F2) | Done | P6 F2 CLOSED `2026-08-18T10:58:56Z` |
| **T08** | As-of-Done Surface + Expected vs Actual (F3) | Done | P6 F3 CLOSED `2026-08-18T10:59:41Z` |

## Вне scope

- Реализация `start-spa.mjs` / bake-meta → [BUG-06](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md).
- `publicEnv` trim SSOT → [BUG-08](STORY-SPA-BUG-08-vite-public-env-normalize-seam.md).
- Rollback DEPLOY-02 (`start` → `vite preview`).
- HL-02 weaken.
- Rewriting Early Signal product docs (ES INDEX only gets a cross-link in the index pass).

## Швы

- [`.env.example`](../../../../.env.example) · [`package.json`](../../../../package.json) · [`vite.config.js`](../../../../vite.config.js)
- [`docs/deploy-guide.md`](../../../deploy-guide.md) · [`docs/runtime-docs/frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md) · [`railway.toml`](../../../../railway.toml)
- DEPLOY-02 Done · HL-02 Done · BUG-06 start contract

## As-of-Done (P3 `2026-08-18T10:48:03Z`)

- Hosting block: [`.env.example`](../../../../.env.example) Lane A/B/C; `"start"` = `node scripts/start-spa.mjs` → `serve`.
- Runtime table: [`frontend-run-and-environment.md`](../../../runtime-docs/frontend-run-and-environment.md) matches disk; sverka **2026-08-18**.
- Disk `"start"` still [`package.json`](../../../../package.json) L10 `node scripts/start-spa.mjs` (not reverted to `vite preview`).
- Gate: [acceptance-verification-spa-bug-07.md](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t05-story-gate-bug-07/acceptance-verification-spa-bug-07.md)

## Next (process)

1. Product AC/DoD **Done**. P6 F1–F3 **CLOSED**. Optional P7 reaudit. Commits: P8 unless asked.
2. Do not mix BUG-05/06/08. Do not reopen HL-02/HL-04. Do not git push.
