# SPA-HL-01-T02 — Upgrade patched react-router or operator waive

**Status:** Done — P3 PASS 2026-08-09T09:55:18Z  
**Story:** [`../STORY-SPA-HL-01-react-router-advisory-triage.md`](../STORY-SPA-HL-01-react-router-advisory-triage.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md) · [audit §F1](../../../../../../analysis/audit-spa-app-architect-cto-security-2026-08-06.md)  
**Depends on:** SPA-HL-01-T01 (**hard:** matrix before upgrade)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T09:47:19Z  
**Package:** `pkg-000059`

## Purpose

Закрыть Applicable GHSA upgrade-ом до версии, где audit больше не репортит эти High, **или** явным operator waive с датой; N/A остаются в матрице T01.

## Risk

Непатченный Applicable = ship blocker «hardened».

## Code Facts (closed)

1. Matrix T01: 3 Applicable (open-redirect ×2 · route-matching DoS).
2. Upgraded: `react-router-dom@^7.18.2` → installed `7.18.2` / `react-router@7.18.2` (`npm ls`).
3. Post-upgrade `npm audit --omit=dev`: **react-router / react-router-dom ABSENT**.
4. [`src/main.jsx`](../../../../../../../src/main.jsx): `HashRouter` unchanged.

## Gap

Applicable High without upgrade/waive → **CLOSED** (upgrade path).

## AC / DoD

- [x] (P0) Applicable closed via upgrade → FR-HL-01.2 · AC2.
- [x] (P0) `package.json` / lockfile согласованы.
- [x] (P0) N/A rows remain N/A in matrix (upgrade does not rewrite N/A claims).
- [x] (P0) No routing architecture rewrite (HashRouter stays).

## Where to change

- [`package.json`](../../../../../../../package.json)
- `package-lock.json`
- [`ghsa-matrix-…`](../../../../../../analysis/ghsa-matrix-STORY-SPA-HL-01-react-router-2026-08-09.md) T02 closeout note
- [`acceptance-verification-spa-hl-01-t02.md`](./acceptance-verification-spa-hl-01-t02.md)

## Out of scope

- Matrix authoring (T01)
- `verify:security` full run ownership (T03)
- `serve` / brace-expansion High (not react-router*)

## Verification

```bash
cd spa-app && npm ls react-router react-router-dom
cd spa-app && npm audit --omit=dev
# react-router* ABSENT from audit
```
