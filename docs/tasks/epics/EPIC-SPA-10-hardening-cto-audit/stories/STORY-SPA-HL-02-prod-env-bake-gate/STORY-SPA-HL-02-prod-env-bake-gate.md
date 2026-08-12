# STORY-SPA-HL-02-prod-env-bake-gate — Production env-bake gate (no localhost release)

## Meta (pipeline)

- **Key:** `STORY-SPA-HL-02-prod-env-bake-gate`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000060`
- **Status:** Done — P3 gate PASS 2026-08-09T11:52:33Z (`pkg-000060`) · **P7 WAVE COMPLETE** 2026-08-09T12:31:20Z
- **Severity:** Medium (ship **process** blocker)
- **Wave:** Ship blocker
- **Finding:** F4 / C3 ([audit](../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md))
- **P4 audit:** [audit-STORY-SPA-HL-02-execution-2026-08-09.md](../../../../../analysis/audit-STORY-SPA-HL-02-execution-2026-08-09.md)
- **P7 reaudit:** [reaudit-STORY-SPA-HL-02-gap-closure-2026-08-09.md](../../../../../analysis/reaudit-STORY-SPA-HL-02-gap-closure-2026-08-09.md)
- **source:** [`../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md`](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-02-prod-env-bake-gate.md)
- **decision_ref:** backlog STORY-SPA-HL-02 + audit §F4 / C3 · HEAD `eaec8bb` (audit-time)
- **ui_scope:** `none` (docs/scripts/deploy process)
- **P1.3:** 2026-08-09T11:37:17Z · **P3 Done:** 2026-08-09T11:52:33Z · **P4:** 2026-08-09T12:01:37Z · **P5:** 2026-08-09T12:22:29Z · **P6:** 2026-08-09T12:27:29Z · **P7:** 2026-08-09T12:31:20Z

## Зачем простыми словами

Сборка с локальным `.env` вшивает в бандл `127.0.0.1:8000/8100`. Такой `dist/` нельзя выкатывать как production — браузеры пользователей будут ходить «в никуда» или в машину разработчика.

Скрипт проверки bake публичных URL уже есть; нужно, чтобы **релизный путь** обязанно проходил этот gate и не путал local smoke-dist с release.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done** | Release checklist in deploy-guide · green public bake evidence 2026-08-09T11:52:18Z |
| **Historical** (audit) | Local `verify:security` dist contained `127.0.0.1:8000` / `:8100` · C3 Partial |
| Gate script | [`scripts/verify-build-env-bake.mjs`](../../../../../../scripts/verify-build-env-bake.mjs) |
| Evidence | [evidence-STORY-SPA-HL-02-…](../../../../../analysis/evidence-STORY-SPA-HL-02-public-env-bake-2026-08-09.md) |

## Функциональные требования (первый слой)

- **FR-HL-02.1** Артефакт, претендующий на **production release**, собран с **публичными** gateway/identity/supabase/story-gpt URL (не `127.0.0.1` / `localhost` для этих баз).
- **FR-HL-02.2** Перед релизом существует **обязательная** проверка (тот же или эквивалентный gate), которая **падает**, если в бандле запечены forbidden localhost needles.
- **FR-HL-02.3** Операторы/deploy docs явно разделяют: local dist (ok for smoke) ≠ shippable release dist.
- **FR-HL-02.4** Нельзя считать DEPLOY/«hardened» Done, пока gate для release path не зелёный хотя бы один раз на целевых public URL (evidence в run-report / CI).

## Acceptance Criteria (problem-level)

- [x] Release checklist / deploy docs требуют env-bake gate.
- [x] Есть воспроизводимое доказательство green bake на public URL (лог/CI).
- [x] Зафиксировано: dist с `127.0.0.1` service bases — **не** release.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-hl-02-t01-…](./task-spa-hl-02-t01-deploy-guide-release-checklist/README.md) | **Done** · Deploy-guide release checklist |
| **T02** | [task-spa-hl-02-t02-…](./task-spa-hl-02-t02-npm-script-or-ci-gate/README.md) | **Done** · npm script / release-path gate |
| **T03** | [task-spa-hl-02-t03-…](./task-spa-hl-02-t03-evidence-green-public-bake/README.md) | **Done** · Evidence green public bake |
| **T04** | [task-spa-hl-02-t04-…](./task-spa-hl-02-t04-story-gate-hl-02/README.md) | **Done** · Story gate PASS |
| **T05** | [task-spa-hl-02-t05-…](./task-spa-hl-02-t05-railway-build-env-bake/README.md) | **Done** · F1 **P6 CLOSED** |

## Вне scope

- Ротация секретов Supabase (SEC-01/02).
- Fail-fast identity URL в runtime (HL-04).
- Смена Railway product UI.
- Выбор CI vendor, смена Vite pipeline internals.

## Швы (указатели)

- `verify-build-env-bake.mjs` · deploy-guide · Railway Variables · `dist/assets`

## Notes

- Gate: [`task-spa-hl-02-t04-story-gate-hl-02/acceptance-verification-spa-hl-02.md`](./task-spa-hl-02-t04-story-gate-hl-02/acceptance-verification-spa-hl-02.md)
- Run-summary P3: [`../../../../run-reports/run-summary-20260809-1152-spa-hl-02-p3.md`](../../../../run-reports/run-summary-20260809-1152-spa-hl-02-p3.md)
- Run-summary P6: [`../../../../run-reports/run-summary-20260809-1227-spa-hl-02-p6.md`](../../../../run-reports/run-summary-20260809-1227-spa-hl-02-p6.md)
- **P5 note (2026-08-09T12:22:29Z):** Product AC/DoD remain **Done** (no reopen T01–T04). Disposition: F1 **TASKED**→T05 · F2 **WAIVED** (`working-doc`) · F3 **WAIVED** (`out-of-DoD` → existing [HL-04](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md); no new draft).
- **P6 (2026-08-09T12:27:29Z):** F1 **CLOSED** (T05 PASS). Actionable gap-list **empty**. WAIVED F2/F3 recorded. Ready **P7**.
