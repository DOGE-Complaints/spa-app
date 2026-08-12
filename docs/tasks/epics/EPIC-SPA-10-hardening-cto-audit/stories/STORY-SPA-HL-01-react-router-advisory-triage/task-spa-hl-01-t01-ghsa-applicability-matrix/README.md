# SPA-HL-01-T01 — GHSA applicability matrix for HashRouter SPA

**Status:** Done — P3 PASS 2026-08-09T09:54:17Z  
**Story:** [`../STORY-SPA-HL-01-react-router-advisory-triage.md`](../STORY-SPA-HL-01-react-router-advisory-triage.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md) · [audit §F1](../../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T09:47:19Z  
**Package:** `pkg-000059`

## Purpose

Зафиксировать каждый High GHSA из текущего `npm audit` по react-router* как **Applicable** / **N/A for HashRouter SPA** с кратким evidence, чтобы T02 не апгрейдил вслепую.

## Risk

Ложный N/A оставляет реальный XSS/open-redirect; ложный Applicable тратит upgrade без нужды.

## Code Facts (closed)

1. [`package.json`](../../../../../../../package.json) L77: `"react-router-dom": "^7.13.0"` (pre-T02).
2. [`src/main.jsx`](../../../../../../../src/main.jsx) L3, L17–19: client `HashRouter`.
3. Live `npm ls`: `react-router-dom@7.13.0` → `react-router@7.13.0`.
4. Matrix: [`ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md`](../../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md) — **3 Applicable** · **9 N/A** · links audit F1.

## Gap

GHSA matrix → **CLOSED**.

## AC / DoD

- [x] (P0) Документ-матрица GHSA × Applicable/N/A с evidence → FR-HL-01.1 · AC1.
- [x] (P0) Матрица ссылается на audit F1 → FR-HL-01.4.
- [x] (P0) Ссылка из pipeline story HL-01 Notes.
- [x] (P0) No product route architecture change; lockfile read-only this task.

## Where to change

- [`spa-app/docs/analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md`](../../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md)
- [`acceptance-verification-spa-hl-01-t01.md`](./acceptance-verification-spa-hl-01-t01.md)

## Out of scope

- Upgrade кода / lockfile (T02)
- Полный `npm audit` всех пакетов вне react-router*
- Backend/identity CVE

## Verification

```bash
cd spa-app && npm ls react-router react-router-dom
ls spa-app/docs/analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md
```
