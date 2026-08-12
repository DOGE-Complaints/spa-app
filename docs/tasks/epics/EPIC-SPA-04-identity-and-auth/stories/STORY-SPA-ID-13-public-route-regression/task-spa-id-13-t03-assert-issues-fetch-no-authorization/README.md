# SPA-ID-13-T03 — Assert issues fetch without Authorization

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** backlog FR-ID13.4; D-ID13-2 C; Scope T03  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T19:28:37Z

## Purpose
Unit-assert: `getIssues` и `getIssue` вызывают `fetch` одним аргументом (URL); нет `Authorization` — регресс «добавили auth header на read» падает сразу.

## Risk
Случайный `fetch(url, { headers: { Authorization } })` на public issues сломает анонимный browse и M-5 spa-половину.

## Code Facts (re-verify at execute)
- [`GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js) (~77, 85): `fetch(url)` — один аргумент, без headers.
- [`GatewayIssueRepository.test.js`](../../../../../../../../src/repositories/__tests__/GatewayIssueRepository.test.js): URL/status; **не** assert’ит отсутствие второго arg / `Authorization`.
- Grep `Authorization` in `src/repositories/` — 0 (verify at execute).

## Gap
Код ✅; теста ❌.

## AC / DoD
- [ ] (P0) **FR-ID13.4:** `createGatewayIssueRepository().getIssues` — `fetch` called with exactly 1 arg (URL); no `Authorization` in request init.
- [ ] (P0) **FR-ID13.4:** same for `getIssue`.
- [ ] (P0) **FR-ID13.7:** runtime repository не менять без failing test.

## Where to change
- EXTEND `spa-app/src/repositories/__tests__/GatewayIssueRepository.test.js`
- Runtime `GatewayIssueRepository.js` — только fail-first

## Out of scope
- Gateway auth / GW-PUBLIC-01; other repositories; UI smoke.

## Verification
```bash
cd spa-app && npx vitest run src/repositories/__tests__/GatewayIssueRepository.test.js
```
