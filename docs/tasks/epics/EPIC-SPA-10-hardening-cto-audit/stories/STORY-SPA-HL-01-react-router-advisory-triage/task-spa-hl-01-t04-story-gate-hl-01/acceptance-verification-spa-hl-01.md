# Story acceptance gate — STORY-SPA-HL-01-react-router-advisory-triage

- **Story:** React Router advisory triage / upgrade
- **Package:** `pkg-000059-20260809-epic-spa-10-hl-01-react-router-advisory.yaml`
- **Result:** PASS
- **Date:** 2026-08-09T09:56:07Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Матрица GHSA × Applicable/N/A существует и ссылается на audit F1. | PASS | [`ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md`](../../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md) |
| Нет «висящих» High без triage для react-router* **или** есть явный operator waive. | PASS | upgrade `react-router-dom@7.18.2` · audit ABSENT for react-router* |
| Security harness после закрытия стори зелёный. | PASS | `verify:security` · vitest 485 · bundle ok · board-shell smoke |

## FR checklist

| FR | Status | Evidence |
|----|--------|----------|
| FR-HL-01.1 | PASS | T01 matrix |
| FR-HL-01.2 | PASS | T02 upgrade 7.18.2 |
| FR-HL-01.3 | PASS | T03 verify:security |
| FR-HL-01.4 | PASS | matrix in `docs/analysis/` + pipeline Notes |

## Commands (live verification 2026-08-09T09:56:07Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm ls react-router react-router-dom
cd spa-app && npm audit --omit=dev
cd spa-app && npm run verify:security
cd spa-app && npm run test:ui:board-shell
```
