# STORY-SPA-HL-04-prod-fail-fast-identity-url — PROD fail-fast when identity URL missing

## Meta (pipeline)

- **Key:** `STORY-SPA-HL-04-prod-fail-fast-identity-url`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000062`
- **Status:** Done — P3 gate PASS 2026-08-09T13:36:28Z (`pkg-000062`) · **P7 WAVE COMPLETE** 2026-08-09T14:44:11Z
- **Severity:** Low (launch hygiene) — fix-before-launch
- **Wave:** Fix-before-launch
- **Finding:** F8 ([audit](../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md))
- **P4 audit:** [audit-STORY-SPA-HL-04-execution-2026-08-09.md](../../../../../analysis/audit-STORY-SPA-HL-04-execution-2026-08-09.md)
- **P7 reaudit:** [reaudit-STORY-SPA-HL-04-gap-closure-2026-08-09.md](../../../../../analysis/reaudit-STORY-SPA-HL-04-gap-closure-2026-08-09.md)
- **source:** [`../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md)
- **decision_ref:** backlog STORY-SPA-HL-04 + audit §F8 · HEAD `eaec8bb` (audit-time)
- **ui_scope:** `none` (clients/docs/tests; no UX error page)
- **P1.3:** 2026-08-09T13:24:26Z · **P3 Done:** 2026-08-09T13:36:28Z · **P4:** 2026-08-09T13:43:53Z · **P5 scaffold:** 2026-08-09T14:03:30Z · **P6:** 2026-08-09T14:39:14Z · **P7:** 2026-08-09T14:44:11Z

## Зачем простыми словами

Если в production-сборке забыли identity URL, код молча падает на `http://localhost:8100`. Это маскирует misconfig и родственно проблеме localhost bake (HL-02).

В production отсутствие базы identity должно быть **явным отказом**, а не тихим localhost.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done / Current** | Shared [`resolveIdentityServiceUrl.js`](../../../../../src/auth/resolveIdentityServiceUrl.js) — PROD missing/blank → throw; non-PROD → `http://localhost:8100`. Clients wired — **no** product `?? 'http://localhost:8100'` ([`identityService.js`](../../../../../src/auth/identityService.js) · [`oauthService.js`](../../../../../src/auth/oauthService.js) · [`identityReadyClient.js`](../../../../../src/auth/identityReadyClient.js)) |
| **Historical** (CTO audit F8 / pre-T02) | Default `?? 'http://localhost:8100'` in identity/oauth clients — [audit §F8](../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) |
| Local dist bake частных адресов (adjacent) | audit F4 · closed by HL-02 env-bake |
| Env-bake gate vs runtime (Historical) | Build-time public URL check (HL-02); runtime silent fallback **was** F8 — **Current** fail-fast via shared resolver |

## Функциональные требования (первый слой)

- **FR-HL-04.1** В **production** режиме отсутствие валидного identity base URL не приводит к использованию localhost fallback для live API calls.
- **FR-HL-04.2** Misconfig обнаруживается рано (build и/или startup/runtime assert) с понятным сигналом оператору.
- **FR-HL-04.3** Dev/test с явным localhost по-прежнему допустимы для локальной разработки.

## Acceptance Criteria (problem-level)

- [x] Prod path без identity URL не «тихо» ходит на localhost.
- [x] Документировано ожидаемое поведение misconfig (deploy-guide или env requirements).
- [x] Локальный dev с localhost не сломан без необходимости.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-hl-04-t01-…](./task-spa-hl-04-t01-prod-identity-url-contract/README.md) | **Done** · PROD identity URL contract |
| **T02** | [task-spa-hl-04-t02-…](./task-spa-hl-04-t02-apply-fail-fast-clients/README.md) | **Done** · Apply fail-fast in clients |
| **T03** | [task-spa-hl-04-t03-…](./task-spa-hl-04-t03-env-docs-touch/README.md) | **Done** · env.example + deploy-guide |
| **T04** | [task-spa-hl-04-t04-…](./task-spa-hl-04-t04-unit-tests-fail-fast/README.md) | **Done** · Unit tests fail-fast |
| **T05** | [task-spa-hl-04-t05-…](./task-spa-hl-04-t05-story-gate-hl-04/README.md) | **Done** · Story gate HL-04 |
| **T06** | [task-spa-hl-04-t06-…](./task-spa-hl-04-t06-as-of-done-backlog-pipeline-ssot/README.md) | **Done** · P6 · F1 CLOSED |
| **T07** | [task-spa-hl-04-t07-…](./task-spa-hl-04-t07-env-configuration-resolve-url/README.md) | **Done** · P6 · F2 CLOSED |
| **T08** | [task-spa-hl-04-t08-…](./task-spa-hl-04-t08-as-of-done-t01-code-facts/README.md) | **Done** · P6 · F5 CLOSED |

## Вне scope

- Полный удаление всех localhost строк из бандла (часть HL-02).
- Identity-BFF (SEC-02).
- Конкретный UX error page; gateway URL policy.

## Швы (указатели)

- `identityService.js` · `oauthService.js` · `identityReadyClient.js` · `.env.example` · deploy-guide

## Notes

- Gate: [`task-spa-hl-04-t05-story-gate-hl-04/acceptance-verification-spa-hl-04.md`](./task-spa-hl-04-t05-story-gate-hl-04/acceptance-verification-spa-hl-04.md)
- Prefer FR/AC from backlog file as story gate source of truth.

### PROD identity URL contract (T01) — SSOT for T02–T04

| Rule | Mode | Behavior |
|------|------|----------|
| R1 | `import.meta.env.PROD === true` | Non-empty `VITE_IDENTITY_SERVICE_URL` required. Missing/blank → **throw** with operator-clear message. **Never** resolve to `http://localhost:8100`. |
| R2 | `PROD === true` | Resolved URL is used as identity base for live calls (`identityService` · `oauthService` · `identityReadyClient`). |
| R3 | `PROD !== true` (dev / vitest) | Missing/blank may fall back to `http://localhost:8100` (FR-HL-04.3 · AC#3). Explicit localhost in env still ok. |
| R4 | All modes | Prefer one shared resolve helper so the three clients cannot drift (T02). |
| R5 | Signal (FR-HL-04.2) | Error text must name `VITE_IDENTITY_SERVICE_URL` and that production refuses localhost fallback. |

**Out of this contract:** UX error page · gateway URL · strip all localhost from bundle (HL-02) · SEC-02 BFF.
