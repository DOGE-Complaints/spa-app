# STORY-SPA-BUG-08-vite-public-env-normalize-seam — Single Vite public-env normalize seam

## Meta (pipeline)

- **Key:** `STORY-SPA-BUG-08-vite-public-env-normalize-seam`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000073`
- **Status:** **Done** · P3 `2026-08-18T11:11:32Z` · T01–T05 **Done** · product AC/DoD Done · P6 T06–T07 **Done** (F1/F2 CLOSED)
- **Severity:** **P2** — latent 2026-08-18 (not the login/board root); class of URL-break bugs when a call site skips `trim`
- **Wave:** Follow-up to BUG-06 (env read SSOT)
- **Type:** Functional · config seam
- **source:** [`../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md)
- **decision_ref:** backlog STORY-SPA-BUG-08 + [investigation](../../../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md) §2.3 Trailing space 2026-08-18
- **Related:** BUG-06 · HL-04 (`resolveIdentityServiceUrl` already trims) — **do not reopen HL-02/HL-04**
- **Sibling OOS:** BUG-05 · BUG-06 (`start-spa.mjs` / bake) · BUG-07 (three-lane docs) — **not this pkg**
- **ui_scope:** `none`
- **P1.3:** 2026-08-18T11:05:39Z

## Зачем простыми словами

**As-of-Done / Current** (T03): один reader [`publicEnv.js`](../../../../../src/config/publicEnv.js); listed call sites migrated. Hygiene «починить пробел в `.env`» still not the whole class — the seam is.

**Historical** (pre-T03): в local `.env` у `VITE_GATEWAY_BASE_URL` был **хвостовой пробел**. Issues-репозиторий его срезал (`assertBaseUrl` trim); другие модули читали тот же ключ **сырьём**. Один пропущенный `trim` → битый URL.

**Итог (Historical):** не было единого reader публичных `VITE_*`. **Итог (As-of-Done):** единый seam есть; HL-04 fallback остаётся в resolver, не в `publicEnv.js`.

## Expected vs Actual

**As-of-Done / Current** (T03 `2026-08-18T11:11:32Z`): [`publicEnv.js`](../../../../../src/config/publicEnv.js) three helpers; [`issueService.js`](../../../../../src/services/issueService.js) L31–32 helpers; [`supabaseClient.js`](../../../../../src/auth/supabaseClient.js) L9–12 `resolveSupabasePublicConfig`; [`GatewayIssueRepository.js`](../../../../../src/repositories/GatewayIssueRepository.js) L9–14 delegates to `normalizePublicBaseUrl`.

**Historical** (2026-08-18 pre-T03 Actual):

| | Expected | Actual (disk 2026-08-18, pre-T03) |
|--|----------|--------|
| Public env read | One module: trim (+ strip trailing `/` for base URLs) | Each consumer invents `?? ''`, optional `trim()`, `replace(/\/+$/)` vs `replace(/\/$/)` |
| Trailing space in `.env` | Harmless at every call site | Harmless only where trim exists (`GatewayIssueRepository` L8–13, Pulse/Emerging resolver trim, `storyDraftService`, telemetry, `storyGptUrl`, identity resolver) |
| `supabaseClient` URL/key | Normalized | [`supabaseClient.js`](../../../../../src/auth/supabaseClient.js) L4–5: **no trim** |
| `issueService` gateway URL | Normalized before `createGatewayIssueRepository` | [`issueService.js`](../../../../../src/services/issueService.js) L31: raw `import.meta.env.VITE_GATEWAY_BASE_URL ?? ''` (repo trims later — accidental, not contract) |
| Operator `.env` | No trailing whitespace (example already warns L30) | Disk 2026-08-18 L20 **has** trailing space |

## Проблема (verified facts)

**Historical** (P1.3 / pre-T03): **Нет** файла `src/config/publicEnv.js` (Glob empty as of P1.3). Inventory «Normalize today» below is the pre-T03 map.

**As-of-Done / Current:** [`publicEnv.js`](../../../../../src/config/publicEnv.js) L10 `normalizePublicBaseUrl` · L20 `getVitePublicString` · L30 `getVitePublicUrl`. Listed readers import helpers. Identity: [`resolveIdentityServiceUrl.js`](../../../../../src/auth/resolveIdentityServiceUrl.js) L22 `getVitePublicString` (trim-only); HL-04 fallback L8–10 **not** moved into `publicEnv.js`.

Direct `import.meta.env.VITE_*` in `spa-app/src` (product) — **Historical** pre-T03:

| File | Keys | Normalize today |
|------|------|-----------------|
| [`issueService.js`](../../../../../src/services/issueService.js) L30–31 | `VITE_LIFE_REALITY_MODE`, `VITE_GATEWAY_BASE_URL` | none |
| [`networkPulseService.js`](../../../../../src/services/networkPulseService.js) L4–5 | same | none at module; trim in `resolveNetworkPulseRepositoryForMode` L8 |
| [`emergingSignalsService.js`](../../../../../src/services/emergingSignalsService.js) L4–5 | same | none at module; trim in resolver L8 |
| [`GatewayIssueRepository.js`](../../../../../src/repositories/GatewayIssueRepository.js) L8–13 | constructor arg | `trim` + `replace(/\/+$/, '')` |
| [`GatewayIssueRepository.contract.test.js`](../../../../../src/repositories/__tests__/GatewayIssueRepository.contract.test.js) L8–9 | gateway + mode | trim + strip slashes |
| [`labelMissTelemetry.js`](../../../../../src/i18n/labelMissTelemetry.js) L8, L15 | `VITE_TELEMETRY_ENABLED`, `VITE_GATEWAY_BASE_URL` | trim; slash `replace(/\/$/, '')` (**one** trailing slash, not `+$`) |
| [`storyDraftService.js`](../../../../../src/services/storyDraftService.js) L3–5 | gateway + `VITE_STORY_DRAFT_MOCK_MODE` | trim + `replace(/\/+$/, '')` |
| [`supabaseClient.js`](../../../../../src/auth/supabaseClient.js) L4–5 | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | **none** |
| [`storyGptUrl.js`](../../../../../src/config/storyGptUrl.js) L10 | `VITE_STORY_GPT_URL` | trim only |
| [`waitlistService.js`](../../../../../src/services/waitlistService.js) L3–4 | `VITE_WAITLIST_API_URL`, `VITE_WAITLIST_API_ENABLED` | trim + strip slashes |
| [`oauthService.js`](../../../../../src/auth/oauthService.js) L7 · [`identityService.js`](../../../../../src/auth/identityService.js) L5 | `VITE_IDENTITY_MOCK_MODE` | boolean `=== 'true'` |
| [`resolveIdentityServiceUrl.js`](../../../../../src/auth/resolveIdentityServiceUrl.js) L19–23 | `VITE_IDENTITY_SERVICE_URL` | **already trim**; PROD throw / DEV fallback = HL-04 / BUG-05 |

Investigation §2.3: trailing space **not** the 2026-08-18 root (H6 is). Hygiene still required so raw env does not leak space into untrimmed sites.

Pin layer (precise): **SPA config seam** — one `publicEnv` (+ `normalizePublicBaseUrl`). Not UI, not H6.

### Что это **не** (отсечённые гипотезы)

| Hypothesis | Почему отвергнута |
|------------|-------------------|
| Trailing space caused login/board fail under `npm start` | H6 CONFIRMED — `serve` unread `.env`; dist had placeholders without that space |
| «Just delete the space in `.env`» as the whole fix | Closes one operator file; next space / next module without trim repeats |
| Copy `trim()` into every remaining file | Forbidden — that **is** spaghetti; SSOT module instead |
| Change HL-04 PROD throw / DCE fallback | BUG-05 / HL-04; this story only shares **normalize**, not fallback policy |
| Weaken HL-02 | Unrelated |
| Patch LoginPage because supabase URL might have spaces | Wrong layer |

## Функциональные требования

Один seam. Репозитории могут **защитно** нормализовать вход, но алгоритм один.

- **FR-BUG-08.1** Add [`src/config/publicEnv.js`](../../../../../src/config/publicEnv.js) (file does not exist today):
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

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-bug-08-t01-reconfirm-public-env-grep](./task-spa-bug-08-t01-reconfirm-public-env-grep/README.md) | Reconfirm grep inventory + `.env` space (no secret dump) |
| **T02** | [task-spa-bug-08-t02-pin-config-seam](./task-spa-bug-08-t02-pin-config-seam/README.md) | Pin: config seam, not UI, not H6 |
| **T03** | [task-spa-bug-08-t03-fix-publicenv-migrate-readers](./task-spa-bug-08-t03-fix-publicenv-migrate-readers/README.md) | Fix: `publicEnv.js` + migrate listed files; identity trim-only if needed |
| **T04** | [task-spa-bug-08-t04-regression-normalize-hl04-rg](./task-spa-bug-08-t04-regression-normalize-hl04-rg/README.md) | Regression: normalize tests + HL-04 tests + rg gate |
| **T05** | [task-spa-bug-08-t05-story-gate-bug-08](./task-spa-bug-08-t05-story-gate-bug-08/README.md) | Story gate FR/AC |
| **T06** | [task-spa-bug-08-t06-as-of-done-surface-repro](./task-spa-bug-08-t06-as-of-done-surface-repro/README.md) | P6 F1 CLOSED · As-of-Done backlog Surface/Repro/Env |
| **T07** | [task-spa-bug-08-t07-as-of-done-expected-problema-ssot](./task-spa-bug-08-t07-as-of-done-expected-problema-ssot/README.md) | P6 F2 CLOSED · As-of-Done Expected vs Actual + §Проблема |

## Вне scope

- Bake provenance / `start-spa.mjs` → [BUG-06](../../../../backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md).
- Docs three-lane SSOT → [BUG-07](../../../../backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md).
- Committing `spa-app/.env`.
- Moving HL-04 fallback string into `publicEnv.js`.
- Inventing runtime placeholder detection in LoginPage.
- Mix BUG-05 (`pkg-000065`) / BUG-06 (`pkg-000071`) / BUG-07 (`pkg-000072`) into this pkg.

## Швы (указатели)

- New `src/config/publicEnv.js`
- Gateway issues / Pulse / Emerging / telemetry / story draft / waitlist / supabase / story GPT
- [`resolveIdentityServiceUrl.js`](../../../../../src/auth/resolveIdentityServiceUrl.js) (HL-04 / BUG-05) — trim only
- [`.env.example`](../../../../../.env.example) L30

## Notes

- Gate: [`task-spa-bug-08-t05-story-gate-bug-08/acceptance-verification-spa-bug-08.md`](./task-spa-bug-08-t05-story-gate-bug-08/acceptance-verification-spa-bug-08.md) — Date `2026-08-18T11:11:32Z` · Result PASS.
- Prefer FR/AC from backlog file as story gate source of truth.
- Identity trim-only: `getVitePublicString` (not `getVitePublicUrl`) so HL-04 trailing-slash contract stays.
- Do **not** mark HL-02/HL-04/BUG-05/BUG-06/BUG-07 reopened. Do **not** retire `spa_bug_05_audit_2026_08_16` / `spa_bug_06_audit_2026_08_18` / `spa_bug_07_audit_2026_08_18`.
