# STORY-SPA-BUG-08 — Single Vite public-env normalize seam

> **Структура:** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) · diagnosis SSOT: [investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md](../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) §2.3 Trailing space · sibling P0: [BUG-06](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md)

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-08-vite-public-env-normalize-seam` |
| **Type** | Functional · config seam |
| **Severity** | **P2** — latent 2026-08-18 (not the login/board root); class of URL-break bugs when a call site skips `trim` |
| **Status** | **Done** · P3 `2026-08-18T11:11:32Z`; T01–T05 Done · P6 T06–T07 F1–F2 CLOSED |
| **Wave** | Follow-up to BUG-06 (env read SSOT) |
| **UAT ID** | _(ops / local hygiene)_ |
| **Route** | Any GFL-DRIVEN fetch (`#/board`, Pulse, Emerging, telemetry, story draft, login supabase client) |
| **Surface** | **As-of-Done / Current** (T03): [`src/config/publicEnv.js`](../../../../src/config/publicEnv.js) L10 `normalizePublicBaseUrl` · L20 `getVitePublicString` · L30 `getVitePublicUrl`; listed readers migrated. **Historical** (pre-T03): `import.meta.env.VITE_*` scattered; no `publicEnv.js` |
| **Repro** | **As-of-Done:** trailing space is trimmed at the seam (`getVitePublicString` / `getVitePublicUrl`). **Historical:** some readers trimmed, some did not |
| **Env** | **As-of-Done:** `.env.example` L30 hygiene; local `.env` space stripped at P3 (gitignored, not committed). **Historical:** Disk 2026-08-18 L20 trailing space |
| **Epic (target)** | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md) |
| **Pipeline** | [EPIC-SPA-10](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-08-vite-public-env-normalize-seam/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) |
| **Package** | [bugs/](INDEX.md) |
| **Source** | Investigation 2026-08-18 §2.3 / §8.1 п.3 / §8.5 Trailing space |
| **Related** | [BUG-06](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) · [HL-04](../hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) (`resolveIdentityServiceUrl` already trims) |
| **decision_ref** | investigation §2.3 2026-08-18 |

## Symptom (простыми словами)

**As-of-Done / Current** (T03): один reader [`publicEnv.js`](../../../../src/config/publicEnv.js) (`normalizePublicBaseUrl` / `getVitePublicString` / `getVitePublicUrl`); listed call sites migrated. Hygiene «починить пробел в `.env`» still not the whole class — the seam is.

**Historical** (pre-T03): в local `.env` у `VITE_GATEWAY_BASE_URL` был **хвостовой пробел**. Issues-репозиторий его срезал (`assertBaseUrl` trim); другие модули читали тот же ключ **сырьём** (`issueService`, Pulse, Emerging, `supabaseClient`). Один пропущенный `trim` → битый URL.

**Итог (Historical):** не было единого reader публичных `VITE_*`. **Итог (As-of-Done):** единый seam есть; HL-04 fallback остаётся в resolver, не в `publicEnv.js`.

## Expected vs Actual

**As-of-Done / Current** (T03 `2026-08-18T11:11:32Z`): [`publicEnv.js`](../../../../src/config/publicEnv.js) three helpers; [`issueService.js`](../../../../src/services/issueService.js) L31–32 `getVitePublicString` / `getVitePublicUrl`; [`supabaseClient.js`](../../../../src/auth/supabaseClient.js) L9–12 `resolveSupabasePublicConfig`; [`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js) L9–14 `assertBaseUrl` delegates to `normalizePublicBaseUrl`.

**Historical** (2026-08-18 pre-T03 Actual):

| | Expected | Actual (disk 2026-08-18, pre-T03) |
|--|----------|--------|
| Public env read | One module: trim (+ strip trailing `/` for base URLs) | Each consumer invents `?? ''`, optional `trim()`, `replace(/\/+$/)` vs `replace(/\/$/)` |
| Trailing space in `.env` | Harmless at every call site | Harmless only where trim exists (`GatewayIssueRepository` L8–13, Pulse/Emerging resolver trim, `storyDraftService`, telemetry, `storyGptUrl`, identity resolver) |
| `supabaseClient` URL/key | Normalized | [`supabaseClient.js`](../../../../src/auth/supabaseClient.js) L4–5: **no trim** |
| `issueService` gateway URL | Normalized before `createGatewayIssueRepository` | [`issueService.js`](../../../../src/services/issueService.js) L31: raw `import.meta.env.VITE_GATEWAY_BASE_URL ?? ''` (repo trims later — accidental, not contract) |
| Operator `.env` | No trailing whitespace (example already warns L30) | Disk 2026-08-18 L20 **has** trailing space |

## Repro steps

1. Read `spa-app/.env` `VITE_GATEWAY_BASE_URL` (do **not** paste secrets): trailing space on L20 as of 2026-08-18.
2. Compare readers:
   ```bash
   rg -n 'import\.meta\.env\.VITE_' spa-app/src --glob '*.{js,jsx}'
   ```
3. Confirm [`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js) L8–13 trims; [`supabaseClient.js`](../../../../src/auth/supabaseClient.js) L4–5 and [`issueService.js`](../../../../src/services/issueService.js) L31 do not.
4. Confirm [`.env.example`](../../../../.env.example) L30 already documents trailing-space hygiene.
5. Unit already encodes the class: [`GatewayIssueRepository.test.js`](../../../../src/repositories/__tests__/GatewayIssueRepository.test.js) L19 `createGatewayIssueRepository('http://localhost:8000 ')`.

## Verified facts (grep 2026-08-18 + investigation)

**Historical** (pre-T03): **Нет** файла `src/config/publicEnv.js` (Glob empty). Inventory «Normalize today» below is the pre-T03 map.

**As-of-Done / Current:** [`publicEnv.js`](../../../../src/config/publicEnv.js) L10 / L20 / L30; listed readers import helpers. Identity uses `getVitePublicString` (trim-only); HL-04 fallback stays in [`resolveIdentityServiceUrl.js`](../../../../src/auth/resolveIdentityServiceUrl.js) L8–10 — **not** in `publicEnv.js`.

Direct `import.meta.env.VITE_*` in `spa-app/src` (product) — **Historical** pre-T03:

| File | Keys | Normalize today |
|------|------|-----------------|
| [`issueService.js`](../../../../src/services/issueService.js) L30–31 | `VITE_LIFE_REALITY_MODE`, `VITE_GATEWAY_BASE_URL` | none |
| [`networkPulseService.js`](../../../../src/services/networkPulseService.js) L4–5 | same | none at module; trim in `resolveNetworkPulseRepositoryForMode` L8 |
| [`emergingSignalsService.js`](../../../../src/services/emergingSignalsService.js) L4–5 | same | none at module; trim in resolver L8 |
| [`GatewayIssueRepository.js`](../../../../src/repositories/GatewayIssueRepository.js) L8–13 | constructor arg | `trim` + `replace(/\/+$/, '')` |
| [`GatewayIssueRepository.contract.test.js`](../../../../src/repositories/__tests__/GatewayIssueRepository.contract.test.js) L8–9 | gateway + mode | trim + strip slashes |
| [`labelMissTelemetry.js`](../../../../src/i18n/labelMissTelemetry.js) L8, L15 | `VITE_TELEMETRY_ENABLED`, `VITE_GATEWAY_BASE_URL` | trim; slash `replace(/\/$/, '')` (**one** trailing slash, not `+$`) |
| [`storyDraftService.js`](../../../../src/services/storyDraftService.js) L3–5 | gateway + `VITE_STORY_DRAFT_MOCK_MODE` | trim + `replace(/\/+$/, '')` |
| [`supabaseClient.js`](../../../../src/auth/supabaseClient.js) L4–5 | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | **none** |
| [`storyGptUrl.js`](../../../../src/config/storyGptUrl.js) L10 | `VITE_STORY_GPT_URL` | trim only |
| [`waitlistService.js`](../../../../src/services/waitlistService.js) L3–4 | `VITE_WAITLIST_API_URL`, `VITE_WAITLIST_API_ENABLED` | trim + strip slashes |
| [`oauthService.js`](../../../../src/auth/oauthService.js) L7 · [`identityService.js`](../../../../src/auth/identityService.js) L5 | `VITE_IDENTITY_MOCK_MODE` | boolean `=== 'true'` |
| [`resolveIdentityServiceUrl.js`](../../../../src/auth/resolveIdentityServiceUrl.js) L19–23 | `VITE_IDENTITY_SERVICE_URL` | **already trim**; PROD throw / DEV fallback = HL-04 / BUG-05 |

Investigation §2.3: trailing space **not** the 2026-08-18 root (H6 is). Hygiene still required so raw env does not leak space into untrimmed sites.

## What this is NOT

| Hypothesis | Почему отвергнута |
|------------|-------------------|
| Trailing space caused login/board fail under `npm start` | H6 CONFIRMED — `serve` unread `.env`; dist had placeholders without that space |
| «Just delete the space in `.env`» as the whole fix | Closes one operator file; next space / next module without trim repeats |
| Copy `trim()` into every remaining file | Forbidden — that **is** spaghetti; SSOT module instead |
| Change HL-04 PROD throw / DCE fallback | BUG-05 / HL-04; this story only shares **normalize**, not fallback policy |
| Weaken HL-02 | Unrelated |
| Patch LoginPage because supabase URL might have spaces | Wrong layer |

## Diagnostic playbook

T01 = grep inventory (this story’s table) + optional vitest: `getVitePublicUrl('VITE_GATEWAY_BASE_URL')` with stub `'http://localhost:8000 '`.

### Pin rules

| Observation | Pin layer | Prefer fix direction |
|-------------|-----------|----------------------|
| Mixed trim / no-trim / `/` vs `/+$/` | **SPA config seam** | One `publicEnv` (+ `normalizePublicBaseUrl`) |
| Only edit `.env` | **Operator file** | Necessary hygiene, **insufficient** as product fix |
| Trim inside LoginPage | **UI anti-pattern** | **Запрещено** |

## Hypothesis matrix

| # | Hypothesis | Status |
|---|------------|--------|
| E1 | `.env` gateway URL has trailing space | **CONFIRMED** (investigation §2.2) |
| E2 | `GatewayIssueRepository.assertBaseUrl` trims | **CONFIRMED** (L8–13 + unit L19) |
| E3 | `issueService` / `supabaseClient` do not trim at read | **CONFIRMED** (grep) |
| E4 | Trailing space is root of 2026-08-18 UI fail | **REJECTED** (H6) |
| E5 | Slash-strip is inconsistent (`/` vs `/+$/`) | **CONFIRMED** (`labelMissTelemetry` vs `storyDraftService`) |

## Функциональные требования

Один seam. Репозитории могут **защитно** нормализовать вход, но алгоритм один.

- **FR-BUG-08.1** Add [`src/config/publicEnv.js`](../../../../src/config/publicEnv.js) (file does not exist today):
  - `normalizePublicBaseUrl(raw)` — `String(raw ?? '').trim().replace(/\/+$/, '')`
  - `getVitePublicString(key, env = import.meta.env)` — trim (mode, flags, keys)
  - `getVitePublicUrl(key, env = import.meta.env)` — `normalizePublicBaseUrl(env[key])`
- **FR-BUG-08.2** Migrate **all** product reads of `VITE_GATEWAY_BASE_URL` and `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` to that module:
  - `issueService.js`
  - `networkPulseService.js`
  - `emergingSignalsService.js`
  - `GatewayIssueRepository.js` (`assertBaseUrl` delegates to `normalizePublicBaseUrl`)
  - `GatewayIssueRepository.contract.test.js`
  - `labelMissTelemetry.js`
  - `storyDraftService.js`
  - `supabaseClient.js`
- **FR-BUG-08.3** Same helpers for other public base URLs already doing ad-hoc trim: `storyGptUrl.js`, `waitlistService.js`. Do not leave a second URL-normalize dialect.
- **FR-BUG-08.4** `VITE_LIFE_REALITY_MODE` via `getVitePublicString` (strict `GFL-DRIVEN` match must not fail on accidental surrounding whitespace).
- **FR-BUG-08.5** Identity: `resolveIdentityServiceUrl` **keeps** HL-04 PROD throw and `import.meta.env.PROD` DCE fallback (BUG-05). It **may** call `getVitePublicUrl` / `normalizePublicBaseUrl` for the trimmed URL branch only — **no** second fallback, **no** localhost literal moved into `publicEnv.js`.
- **FR-BUG-08.6** Operator hygiene: remove trailing space on `VITE_GATEWAY_BASE_URL` in local `.env` (not committed). Example L30 stays as the documented rule.
- **FR-BUG-08.7** Regression: unit tests for `normalizePublicBaseUrl` (space, trailing slashes, empty); existing GatewayIssueRepository trailing-space test still green; supabase client uses trimmed URL when stubbed with trailing space; `rg 'import.meta.env.VITE_GATEWAY_BASE_URL'` in `spa-app/src` has **no** remaining product reads outside `publicEnv.js` (tests may stub env).
- **FR-BUG-08.8** No Login/Board hostname branches; no HL-02 changes.

## Acceptance Criteria

- [x] `src/config/publicEnv.js` exists with the three functions above.
- [x] Verified call-site list in this story migrated (FR-BUG-08.2 / .3 / .4).
- [x] `rg` product `src/` (exclude `publicEnv.js` and `__tests__` if they stub): no raw `import.meta.env.VITE_GATEWAY_BASE_URL`.
- [x] Identity HL-04 vitest (PROD throw / DEV fallback) still green.
- [x] New unit tests cover space + slash class.
- [x] `.env.example` L30 still warns; no duplicate trim essay in five services.
- [x] BUG-06 start/bake scripts out of this PR unless already landed separately.

## Nested tasks

| Task | Role | Status | Notes |
|------|------|--------|-------|
| **T01** | Reconfirm grep inventory + `.env` space (no secret dump) | Done | Can merge with T02 |
| **T02** | Pin: config seam, not UI, not H6 | Done | |
| **T03** | Fix: `publicEnv.js` + migrate listed files; identity trim-only if needed | Done | |
| **T04** | Regression: normalize tests + HL-04 tests + rg gate | Done | |
| **T05** | Story gate FR/AC | Done | |
| **T06** | As-of-Done Surface / Repro / Env (F1) | Done | P6 F1 CLOSED |
| **T07** | As-of-Done Expected vs Actual + §Проблема (F2) | Done | P6 F2 CLOSED |

## Вне scope

- Bake provenance / `start-spa.mjs` → [BUG-06](STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md).
- Docs three-lane SSOT → [BUG-07](STORY-SPA-BUG-07-start-preview-docs-drift.md).
- Committing `spa-app/.env`.
- Moving HL-04 fallback string into `publicEnv.js`.
- Inventing runtime placeholder detection in LoginPage.

## Швы

- New `src/config/publicEnv.js`
- Gateway issues / Pulse / Emerging / telemetry / story draft / waitlist / supabase / story GPT
- [`resolveIdentityServiceUrl.js`](../../../../src/auth/resolveIdentityServiceUrl.js) (HL-04 / BUG-05) — trim only
- [`.env.example`](../../../../.env.example) L30

## Next (process)

1. Independent of BUG-06 fail-fast; can land in parallel once T02 pin is written.
2. P1.3 pipeline under EPIC-SPA-10.
3. Status **Done** after T05 rg + tests.
