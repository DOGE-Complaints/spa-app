# STORY-SPA-HL-04 — PROD fail-fast when identity URL missing

## Meta
- **Key:** `STORY-SPA-HL-04-prod-fail-fast-identity-url`
- **Epic:** [`EPIC-SPA-10-hardening-cto-audit`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** [hardening-cto-audit-2026-08/](README.md) · builder pkg **`pkg-000062`**
- **Status:** Done — P3 gate PASS 2026-08-09T13:36:28Z (`pkg-000062`) · **P7 WAVE COMPLETE** 2026-08-09T14:44:11Z ([reaudit](../../../analysis/reaudit-STORY-SPA-HL-04-gap-closure-2026-08-09.md) · F1/F2/F5 CLOSED · F4 WAIVED · `run_mode` retired)
- **Severity:** 🟡 Low (launch hygiene) — в ship list как fix-before-launch
- **Source:** [audit §F8](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** `VITE_IDENTITY_SERVICE_URL` usage in `identityService` / `oauthService` / `identityReadyClient`
- **Out of scope for this file:** конкретный UX error page; gateway URL policy (может быть парной позже)

## Зачем простыми словами

Если в production-сборке забыли identity URL, код молча падает на `http://localhost:8100`. Это маскирует misconfig и родственно проблеме localhost bake (HL-02).

В production отсутствие базы identity должно быть **явным отказом**, а не тихим localhost.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done / Current** | Shared [`resolveIdentityServiceUrl.js`](../../../src/auth/resolveIdentityServiceUrl.js) — PROD missing/blank → throw; non-PROD → `http://localhost:8100`. Clients: [`identityService.js`](../../../src/auth/identityService.js) · [`oauthService.js`](../../../src/auth/oauthService.js) · [`identityReadyClient.js`](../../../src/auth/identityReadyClient.js) — **no** product `?? 'http://localhost:8100'` |
| **Historical** (CTO audit F8 / pre-T02) | Default `?? 'http://localhost:8100'` in identity/oauth clients — [audit §F8](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) |
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


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-04-prod-fail-fast-identity-url`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/STORY-SPA-HL-04-prod-fail-fast-identity-url.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-04-t01-prod-identity-url-contract`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t01-prod-identity-url-contract/README.md) | Done |
| T02 | [`task-spa-hl-04-t02-apply-fail-fast-clients`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t02-apply-fail-fast-clients/README.md) | Done |
| T03 | [`task-spa-hl-04-t03-env-docs-touch`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t03-env-docs-touch/README.md) | Done |
| T04 | [`task-spa-hl-04-t04-unit-tests-fail-fast`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t04-unit-tests-fail-fast/README.md) | Done |
| T05 | [`task-spa-hl-04-t05-story-gate-hl-04`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t05-story-gate-hl-04/README.md) | Done |
| T06 | [`task-spa-hl-04-t06-as-of-done-backlog-pipeline-ssot`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t06-as-of-done-backlog-pipeline-ssot/README.md) | Done · P6 · F1 CLOSED |
| T07 | [`task-spa-hl-04-t07-env-configuration-resolve-url`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t07-env-configuration-resolve-url/README.md) | Done · P6 · F2 CLOSED |
| T08 | [`task-spa-hl-04-t08-as-of-done-t01-code-facts`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t08-as-of-done-t01-code-facts/README.md) | Done · P6 · F5 CLOSED |

> P3 Done · gate PASS · `pkg-000062`. **P6 gap wave CLOSED** 2026-08-09T14:39:14Z · F1/F2/F5 CLOSED · F3 CLOSED · F4 WAIVED · actionable OPEN empty. Await P7 to retire `run_mode`.

## Вне scope

- Полный удаление всех localhost строк из бандла (часть HL-02).
- Identity-BFF (SEC-02).

## Швы

- `identityService.js` · `oauthService.js` · `identityReadyClient.js` · `.env.example` · deploy-guide

## Next (process)

1. ~~PA.3 / P1.3 / P3 / P4 / P5 / P6 / P7~~ — Done · WAVE COMPLETE.
2. Commits only on explicit ask · next ship blocker HL-05.
