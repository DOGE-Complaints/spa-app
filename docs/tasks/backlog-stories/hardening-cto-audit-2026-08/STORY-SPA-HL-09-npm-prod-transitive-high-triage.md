# STORY-SPA-HL-09 — npm prod transitive High triage (`serve` / brace-expansion / minimatch)

## Meta
- **Key:** `STORY-SPA-HL-09-npm-prod-transitive-high-triage`
- **Epic:** [`EPIC-SPA-10-hardening-cto-audit`](../../epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md) (target)
- **Package:** [hardening-cto-audit-2026-08/](README.md)
- **Status:** Todo · **draft** (from HL-01 P4 F3 · P5 2026-08-09T10:16:56Z) — awaiting optional PA.3 refine
- **Severity:** Medium (dependency hygiene · not HL-01 ship reopen)
- **Source:** [audit-STORY-SPA-HL-01-execution-2026-08-09.md](../../../analysis/audit-STORY-SPA-HL-01-execution-2026-08-09.md) §F3 · parent [HL-01](STORY-SPA-HL-01-react-router-advisory-triage.md)
- **Depends on:** HL-01 Done (react-router* ABSENT); current `npm audit --omit=dev` High on transitive `serve` stack
- **Out of scope for this file:** react-router* (closed in HL-01); backend/identity CVE; full `npm audit fix --force` without triage

## Зачем простыми словами

После HL-01 в `npm audit --omit=dev` остаются **High** на `brace-expansion` / `minimatch` / `serve*` — не react-router. Их нельзя «забыть», но и нельзя смешивать с уже закрытым HL-01. Нужна отдельная triage-волна: Applicable vs N/A для нашего `serve` usage, затем upgrade/waive.

## Проблема (verified facts)

| Fact | Evidence |
|------|----------|
| Post HL-01: react-router* ABSENT in audit | HL-01 P3 / [matrix](../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md) |
| Remaining High: brace-expansion, minimatch, serve / serve-handler | HL-01 P4 audit §F3 · `npm audit --omit=dev` |
| `serve` is SPA static host dep | [`package.json`](../../../../package.json) dependencies |

## Функциональные требования (первый слой)

- **FR-HL-09.1** Каждый High GHSA из текущего `npm audit --omit=dev` на `serve*` / `brace-expansion` / `minimatch` (prod omit=dev path) имеет вердикт Applicable / N/A with evidence.
- **FR-HL-09.2** Applicable закрыты upgrade или operator waive с датой.
- **FR-HL-09.3** Решение зафиксировано в analysis/backlog touchpoint (не только чат).

## Acceptance Criteria (problem-level)

- [ ] Матрица GHSA × Applicable/N/A для non-RR High (serve stack) существует.
- [ ] Нет висящих High без triage **или** явный waive.
- [ ] HL-01 product / react-router* не reopen.

## Вне scope

- React-router advisories (HL-01 Done).
- Полный force-fix всех npm vulns без triage.
- CI vendor / deploy redesign (см. HL-02).

## Next (process)

1. Optional PA.3 refine this draft.
2. P1.3 materialize / deepen when operator prioritizes after HL-02…08 or in parallel.
3. Do **not** reopen HL-01 for these High.
