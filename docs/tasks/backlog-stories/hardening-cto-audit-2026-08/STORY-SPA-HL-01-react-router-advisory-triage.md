# STORY-SPA-HL-01 — React Router advisory triage / upgrade

## Meta
- **Key:** `STORY-SPA-HL-01-react-router-advisory-triage`
- **Epic:** [`EPIC-SPA-10-hardening-cto-audit`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)
- **Package:** [hardening-cto-audit-2026-08/](README.md)
- **Status:** Done — P3 gate PASS 2026-08-09T09:56:07Z (`pkg-000059`) · **P7 WAVE COMPLETE** 2026-08-09T10:28:08Z ([reaudit](../../../analysis/reaudit-STORY-SPA-HL-01-gap-closure-2026-08-09.md) · F1 CLOSED · F2/F3 WAIVED · `run_mode` retired)
- **Severity:** 🔴 High (ship blocker)
- **Source:** [audit §F1](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) · HEAD `eaec8bb`
- **Depends on:** `react-router-dom` in spa-app — **Current** `@7.18.2` ([`package.json`](../../../../package.json) / lock); **Historical** (CTO audit / pre-T02) `@7.13.0`
- **Out of scope for this file:** выбор конкретной версии патча, changelog rewrite, полный CVE deep-dive вне GHSA из `npm audit`

## Зачем простыми словами

`npm audit` показывает несколько **High** advisories на React Router. Пока мы не разобрали, какие из них реально бьют по нашему **HashRouter SPA**, нельзя честно сказать «production hardened» — даже если MVP-функции работают.

Нужен явный исход: либо закрытый upgrade с зелёными регрессиями, либо **документированный N/A** по каждому релевантному GHSA с доказательствами.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| **As-of-Done / Current** | `react-router-dom@7.18.2` · `react-router@7.18.2` ([`package.json`](../../../../package.json) L77 `^7.18.2` · lock) · react-router* **ABSENT** from `npm audit --omit=dev` |
| **Historical** (CTO audit / pre-T02) | `react-router-dom@7.13.0` → `react-router@7.13.0` · 6 High family — [audit §F1](../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md) |
| Client `HashRouter` | [`src/main.jsx`](../../../../src/main.jsx) · unchanged |
| GHSA matrix | [ghsa-matrix-…](../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md) · 3 Applicable → upgraded |
| Часть GHSA описаний про SSR/RSC/single-fetch — применимость не равна «всем сразу RCE» | audit F1 context (Historical) |

## Функциональные требования (первый слой)

- **FR-HL-01.1** Для каждого High GHSA из текущего `npm audit` по react-router* зафиксирован вердикт: **Applicable** / **N/A for HashRouter SPA** с кратким evidence.
- **FR-HL-01.2** Если есть Applicable — зависимость приведена к версии/состоянию, где audit больше не репортит эти High **или** остаток явно waived оператором с датой.
- **FR-HL-01.3** После изменений `npm run verify:security` (или эквивалент vitest + bundle guard) остаётся зелёным.
- **FR-HL-01.4** Решение и матрица GHSA живут в analysis/backlog touchpoint (не только в чате).

## Acceptance Criteria (problem-level)

- [x] Матрица GHSA × Applicable/N/A существует и ссылается на audit F1.
- [x] Нет «висящих» High без triage для react-router* **или** есть явный operator waive.
- [x] Security harness после закрытия стори зелёный.


## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-HL-01-react-router-advisory-triage`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/STORY-SPA-HL-01-react-router-advisory-triage.md)
- **Epic:** [`EPIC-SPA-10`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-hl-01-t01-ghsa-applicability-matrix`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/task-spa-hl-01-t01-ghsa-applicability-matrix/README.md) | Done |
| T02 | [`task-spa-hl-01-t02-upgrade-or-waive`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/task-spa-hl-01-t02-upgrade-or-waive/README.md) | Done |
| T03 | [`task-spa-hl-01-t03-regression-verify-security`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/task-spa-hl-01-t03-regression-verify-security/README.md) | Done |
| T04 | [`task-spa-hl-01-t04-story-gate-hl-01`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/task-spa-hl-01-t04-story-gate-hl-01/README.md) | Done |
| T05 | [`task-spa-hl-01-t05-as-of-done-backlog-ssot`](../../epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-01-react-router-advisory-triage/task-spa-hl-01-t05-as-of-done-backlog-ssot/README.md) | **Done** · P6 F1 |

> **P3 Done** 2026-08-09T09:56:07Z · `pkg-000059` · matrix + upgrade `7.18.2` · verify:security PASS.  
> **P6** T05 As-of-Done backlog SSOT — F1 CLOSED (gate stamp on T05 acceptance).

## Вне scope

- Перепись routing architecture (не HashRouter).
- Полный `npm audit fix --force` без triage.
- Backend/identity CVE.

## Швы (указатели)

- `package.json` / lockfile · `src/main.jsx` · `npm audit` · `verify:security`

## Next (process)

1. ~~P3~~ — Done 2026-08-09T09:56:07Z.
2. ~~P4 audit~~ — Ready-with-blockers 2026-08-09T10:10:56Z.
3. ~~P5/P6 F1~~ — backlog As-of-Done (T05) CLOSED.
4. ~~P7~~ — WAVE COMPLETE 2026-08-09T10:28:08Z · `run_mode` retired.
5. Next ship blocker: HL-02 · draft HL-09 · Commits — только по явной команде.

