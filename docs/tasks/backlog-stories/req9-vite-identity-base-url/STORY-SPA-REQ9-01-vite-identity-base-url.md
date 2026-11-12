# STORY-SPA-REQ9-01 — `VITE_IDENTITY_BASE_URL` hard cut

## Meta
- **Key:** `STORY-SPA-REQ9-01-vite-identity-base-url`
- **Пакет:** [`req9-vite-identity-base-url/`](./INDEX.md)
- **Status:** Done · P3 `2026-09-26T12:09:47Z` · `pkg-000086` · gate PASS
- **Тип:** env rename (hard cut) / docs+tests+build align
- **Parent REQ:** [`18-req9-vite-identity-base-url.md`](../../../requirements/18-req9-vite-identity-base-url.md)
- **Parent product:** REQ9 §5–§6 R3, §8.5, §10.2 (`dogestonia-microservices-ops-parity-target`)
- **Siblings:** identity [`22-req9-make-env-load-parity`](../../../../../doge-identity-service/docs/requirements/22-req9-make-env-load-parity.md) (origin semantics); aibridge `REQ-08` (`SPA_BASE_URL` value-level — no shared env name)
- **Skill declared (future P3):** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`  
  Soft: `code-documenter` @ `.cursor/skills/sources/jeffallan-claude-skills/skills/code-documenter/SKILL.md`
- **Зависит от:** —
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)
- **Operator locks:**
  - Railway: **A** — ops checklist; live UI rename does not block Done
  - Keep **`VITE_`** prefix → primary name `VITE_IDENTITY_BASE_URL`
  - **Env key only** — no rename of `resolveIdentityServiceUrl` / `IDENTITY_SERVICE_URL` locals
  - **Hard cut** — no dual-read of `VITE_IDENTITY_SERVICE_URL`

---

## Зачем простыми словами

Публичный URL identity в spa должен называться так же, как другие peer base URL (`VITE_GATEWAY_BASE_URL`, `VITE_THREADS_BASE_URL`): `VITE_IDENTITY_BASE_URL`. Старое `…SERVICE_URL` убираем полностью.

---

## Scope

1. Rename primary env to `VITE_IDENTITY_BASE_URL` in `.env.example`, code readers, tests, scripts, operator docs.
2. Update `resolveIdentityServiceUrl` to read **only** the new key (JSDoc/errors); keep PROD fail-fast / non-PROD `:8100` fallback (HL-04 semantics).
3. Inventory: `publicEnv` tests, `spaStartDecision.mjs`, `verify-build-env-bake.mjs`, auth resolver tests.
4. Docs: at least `docs/requirements/04-env-configuration.md`, `deploy-guide.md`, `railway-git-deploy-manual.md`, plus other in-repo hits of the old name under `spa-app/docs/`.
5. Railway/build: document rename in checklist; update bake **verify** script key names.
6. Guard: no `VITE_*SERVICE_ROLE*` / service token in browser; `verify:bundle:no-service-role` stays green if in CI.

## Out of scope

- Dual-read / alias of `VITE_IDENTITY_SERVICE_URL`
- Dropping `VITE_` prefix / stack-agnostic public env grammar
- New spa `/health` (G10)
- Invent waitlist backend (`VITE_WAITLIST_API_URL` — REQ §6 Unknown)
- Rename `VITE_GATEWAY_*` / `VITE_THREADS_*`
- Live Railway UI click as Done gate (lock **A** — checklist only)
- Product auth UX (`identity-auth` package)

---

## Verified current state

**As-of-Done / Current** (P3 `2026-09-26T12:09:47Z`):

| Fact | Path |
|------|------|
| `.env.example` primary key `VITE_IDENTITY_BASE_URL` | `.env.example` (~L89) |
| Resolver reads **only** new key; PROD fail-fast / non-PROD fallback | `src/auth/resolveIdentityServiceUrl.js` |
| Consumers via resolver; locals unchanged | `identityService.js` · `identityReadyClient.js` · `oauthService.js` |
| Tests + scripts use new key | `resolveIdentityServiceUrl.test.js` · `publicEnv.test.js` · `spaStartDecision.mjs` · `verify-build-env-bake.mjs` |
| Listed operator docs + Railway checklist | `04-env-configuration.md` · `deploy-guide.md` §REQ9 · `railway-git-deploy-manual.md` |
| `rg VITE_IDENTITY_SERVICE_URL` in `src/` / `scripts/` / `.env.example` | **0** |

**Historical (pre-REQ9-01):** `.env.example` / resolver / scripts used `VITE_IDENTITY_SERVICE_URL`; `VITE_IDENTITY_BASE_URL` absent from `src/`.

---

## Target / AC

- [x] **AC-SPA-REQ901-01 (R3):** code + `.env.example` + scripts + listed docs use `VITE_IDENTITY_BASE_URL`; `rg VITE_IDENTITY_SERVICE_URL spa-app` → **0** in product/templates/scripts (prefer 0 everywhere under `spa-app/`).
- [x] **AC-SPA-REQ901-02:** no new `VITE_*SERVICE_ROLE*` / service token embed; bundle guard still green if present.
- [x] **AC-SPA-REQ901-03 (G10):** no new BE health route on spa.
- [x] **AC-SPA-REQ901-04:** PROD fail-fast if blank; non-PROD fallback still local identity origin; auth remains **user Bearer** only.
- [x] **AC-SPA-REQ901-05 (Railway lock A):** ops checklist documents rename bake-var + rebuild; **Story Done does not require** live Railway UI proof.

---

## Точки в коде / docs

- `src/auth/resolveIdentityServiceUrl.js` (+ `__tests__/resolveIdentityServiceUrl.test.js`)
- `src/config/__tests__/publicEnv.test.js`
- `scripts/lib/spaStartDecision.mjs` (+ tests)
- `scripts/verify-build-env-bake.mjs`
- `.env.example`
- `docs/requirements/04-env-configuration.md`, `docs/deploy-guide.md`, `docs/railway-git-deploy-manual.md` (+ remaining `rg` hits)

## Dependencies

- Parent R3.
- Sibling identity `22`: URL = identity origin (no spa rename of their env).
- Related Done: HL-04 / BUG-08 — reuse `getVitePublicString`; only **key string** changes.
