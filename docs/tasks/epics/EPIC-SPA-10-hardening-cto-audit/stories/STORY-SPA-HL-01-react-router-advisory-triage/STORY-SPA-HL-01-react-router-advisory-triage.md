# STORY-SPA-HL-01-react-router-advisory-triage — React Router advisory triage / upgrade

## Meta (pipeline)

- **Key:** `STORY-SPA-HL-01-react-router-advisory-triage`
- **Parent Epic:** [`../../EPIC-SPA-10-hardening-cto-audit.md`](../../EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** `pkg-000059`
- **Status:** Done — P3 gate PASS 2026-08-09T09:56:07Z (`pkg-000059`) · **P7 WAVE COMPLETE** 2026-08-09T10:28:08Z ([reaudit](../../../../../analysis/reaudit-STORY-SPA-HL-01-gap-closure-2026-08-09.md) · F1 CLOSED · F2/F3 WAIVED · `run_mode` retired)
- **Severity:** High (ship blocker)
- **Wave:** Ship blocker
- **Finding:** F1 ([audit](../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md))
- **source:** [`../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md`](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md)
- **decision_ref:** backlog STORY-SPA-HL-01 + audit §F1 · HEAD `eaec8bb` (audit-time)
- **ui_scope:** `none` (docs/tests/deps)
- **P1.3:** 2026-08-09T09:47:19Z · **P3 Done:** 2026-08-09T09:56:07Z

## Зачем простыми словами

`npm audit` показывает несколько **High** advisories на React Router. Пока мы не разобрали, какие из них реально бьют по нашему **HashRouter SPA**, нельзя честно сказать «production hardened» — даже если MVP-функции работают.

Нужен явный исход: либо закрытый upgrade с зелёными регрессиями, либо **документированный N/A** по каждому релевантному GHSA с доказательствами.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done** | `react-router-dom@7.18.2` · react-router* **ABSENT** from `npm audit --omit=dev` |
| **Historical** (audit / pre-T02) | `react-router-dom@7.13.0` · 6 High family in audit F1 |
| Client `HashRouter` | [`src/main.jsx`](../../../../../../src/main.jsx) L3, L17–19 · unchanged |
| GHSA matrix | [ghsa-matrix-…](../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md) · 3 Applicable → upgraded |

## Функциональные требования (первый слой)

- **FR-HL-01.1** Для каждого High GHSA из текущего `npm audit` по react-router* зафиксирован вердикт: **Applicable** / **N/A for HashRouter SPA** с кратким evidence.
- **FR-HL-01.2** Если есть Applicable — зависимость приведена к версии/состоянию, где audit больше не репортит эти High **или** остаток явно waived оператором с датой.
- **FR-HL-01.3** После изменений `npm run verify:security` (или эквивалент vitest + bundle guard) остаётся зелёным.
- **FR-HL-01.4** Решение и матрица GHSA живут в analysis/backlog touchpoint (не только в чате).

## Acceptance Criteria (problem-level)

- [x] Матрица GHSA × Applicable/N/A существует и ссылается на audit F1.
- [x] Нет «висящих» High без triage для react-router* **или** есть явный operator waive.
- [x] Security harness после закрытия стори зелёный.

## Субтаски (pipeline)

| Таск | Task folder | Суть |
|------|-------------|------|
| **T01** | [task-spa-hl-01-t01-…](./task-spa-hl-01-t01-ghsa-applicability-matrix/README.md) | **Done** · GHSA matrix |
| **T02** | [task-spa-hl-01-t02-…](./task-spa-hl-01-t02-upgrade-or-waive/README.md) | **Done** · Upgrade 7.18.2 |
| **T03** | [task-spa-hl-01-t03-…](./task-spa-hl-01-t03-regression-verify-security/README.md) | **Done** · verify:security |
| **T04** | [task-spa-hl-01-t04-…](./task-spa-hl-01-t04-story-gate-hl-01/README.md) | **Done** · gate PASS |
| **T05** | [task-spa-hl-01-t05-…](./task-spa-hl-01-t05-as-of-done-backlog-ssot/README.md) | **Done** · F1 **P7 CLOSED** |

## Вне scope

- Перепись routing architecture (не HashRouter).
- Полный `npm audit fix --force` без triage.
- Backend/identity CVE.

## Швы (указатели)

- `package.json` / lockfile · `src/main.jsx` · `npm audit` · `verify:security`

## Notes

- Hard order: **T01 matrix → T02 upgrade/waive** (honored).
- GHSA matrix: [`../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md`](../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md)
- Gate: [`task-spa-hl-01-t04-story-gate-hl-01/acceptance-verification-spa-hl-01.md`](./task-spa-hl-01-t04-story-gate-hl-01/acceptance-verification-spa-hl-01.md)
- Run-summary: [`../../../../run-reports/run-summary-20260809-0956-spa-hl-01-p3.md`](../../../../run-reports/run-summary-20260809-0956-spa-hl-01-p3.md)
- **P5 note (2026-08-09T10:16:56Z):** Product AC/DoD remain Done (no reopen). Disposition: F1 **TASKED**→T05 · F2 **WAIVED** (`working-doc`) · F3 **WAIVED** (`out-of-DoD` → [HL-09 draft](../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-09-npm-prod-transitive-high-triage.md)).
- **P6 (2026-08-09T10:21:19Z):** F1 **CLOSED** (T05 PASS).  
- **P7 (2026-08-09T10:28:08Z):** **WAVE COMPLETE** · `run_mode` **retired** · [reaudit](../../../../../analysis/reaudit-STORY-SPA-HL-01-gap-closure-2026-08-09.md).
