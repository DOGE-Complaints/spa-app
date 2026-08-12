# STORY-SPA-HL-02 — Production env-bake gate (no localhost release)

## Meta
- **Key:** `STORY-SPA-HL-02-prod-env-bake-gate`
- **Epic:** [`EPIC-SPA-10-hardening-cto-audit`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md) (railway-deploy adjacent)
- **Package:** [hardening-cto-audit-2026-08/](README.md) · builder pkg **`pkg-000060`**
- **Status:** Done — P3 gate PASS 2026-08-09T11:52:33Z (`pkg-000060`) · **P7 WAVE COMPLETE** 2026-08-09T12:31:20Z ([reaudit](../../../analysis/reaudit-STORY-SPA-HL-02-gap-closure-2026-08-09.md) · F1 CLOSED · F2/F3 WAIVED · `run_mode` retired)
- **Severity:** 🟠 Medium (ship **process** blocker)
- **Source:** [audit §F4 / C3](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** существование [`scripts/verify-build-env-bake.mjs`](../../../../scripts/verify-build-env-bake.mjs); [deploy-guide.md](../../../deploy-guide.md)
- **Out of scope for this file:** выбор CI vendor, смена Vite pipeline internals

## Зачем простыми словами

Сборка с локальным `.env` вшивает в бандл `127.0.0.1:8000/8100`. Такой `dist/` нельзя выкатывать как production — браузеры пользователей будут ходить «в никуда» или в машину разработчика.

Скрипт проверки bake публичных URL уже есть; нужно, чтобы **релизный путь** обязанно проходил этот gate и не путал local smoke-dist с release.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done** | Release checklist + green public bake ([evidence](../../../analysis/evidence-STORY-SPA-HL-02-public-env-bake-2026-08-09.md)) |
| **Historical** (audit) | Local dist `127.0.0.1:8000` / `:8100` · C3 Partial |
| `verify:build:env-bake` требует public `VITE_*` и запрещает localhost bake | `scripts/verify-build-env-bake.mjs` |
| Source defaults identity URL → localhost fallback | `identityService.js` / oauth clients (см. также HL-04) |

## Функциональные требования (первый слой)

- **FR-HL-02.1** Артефакт, претендующий на **production release**, собран с **публичными** gateway/identity/supabase/story-gpt URL (не `127.0.0.1` / `localhost` для этих баз).
- **FR-HL-02.2** Перед релизом существует **обязательная** проверка (тот же или эквивалентный gate), которая **падает**, если в бандле запечены forbidden localhost needles.
- **FR-HL-02.3** Операторы/deploy docs явно разделяют: local dist (ok for smoke) ≠ shippable release dist.
- **FR-HL-02.4** Нельзя считать DEPLOY/«hardened» Done, пока gate для release path не зелёный хотя бы один раз на целевых public URL (evidence в run-report / CI).

## Acceptance Criteria (problem-level)

- [x] Release checklist / deploy docs требуют env-bake gate.
- [x] Есть воспроизводимое доказательство green bake на public URL (лог/CI).
- [x] Зафиксировано: dist с `127.0.0.1` service bases — **не** release.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-02-prod-env-bake-gate`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/STORY-SPA-HL-02-prod-env-bake-gate.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-02-t01-deploy-guide-release-checklist`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/task-spa-hl-02-t01-deploy-guide-release-checklist/README.md) | Done |
| T02 | [`task-spa-hl-02-t02-npm-script-or-ci-gate`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/task-spa-hl-02-t02-npm-script-or-ci-gate/README.md) | Done |
| T03 | [`task-spa-hl-02-t03-evidence-green-public-bake`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/task-spa-hl-02-t03-evidence-green-public-bake/README.md) | Done |
| T04 | [`task-spa-hl-02-t04-story-gate-hl-02`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/task-spa-hl-02-t04-story-gate-hl-02/README.md) | Done |
| T05 | [`task-spa-hl-02-t05-railway-build-env-bake`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-02-prod-env-bake-gate/task-spa-hl-02-t05-railway-build-env-bake/README.md) | **Done** · P6 · **P7 CLOSED F1** |

> **P3 Done** 2026-08-09T11:52:33Z · `pkg-000060` · [run-summary](../../run-reports/run-summary-20260809-1152-spa-hl-02-p3.md).  
> **P6** 2026-08-09T12:27:29Z · F1 CLOSED · F2 WAIVED working-doc · F3 WAIVED → existing HL-04 · [P6 run-summary](../../run-reports/run-summary-20260809-1227-spa-hl-02-p6.md).  
> **P7 WAVE COMPLETE** 2026-08-09T12:31:20Z · [reaudit](../../../analysis/reaudit-STORY-SPA-HL-02-gap-closure-2026-08-09.md).

## Вне scope

- Ротация секретов Supabase (SEC-01/02).
- Fail-fast identity URL в runtime (HL-04).
- Смена Railway product UI.

## Швы

- `verify-build-env-bake.mjs` · deploy-guide · Railway Variables · `dist/assets`

## Next (process)

1. ~~P1.3 / P3 / P4 / P5 / P6 / P7~~ — Done · WAVE COMPLETE.
2. Next ship blocker: HL-03 · Commits — только по явной команде.
