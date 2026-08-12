# SPA-ID-13-T07 — Commit ID-13 regression tests (post-audit F1)

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** [audit-STORY-SPA-ID-13-execution-2026-08-01.md](../../../../../../../analysis/audit-STORY-SPA-ID-13-execution-2026-08-01.md) §F1  
**Depends on:** SPA-ID-13-T01…T06 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T20:28:56Z  
**run_mode:** `spa_id_13_audit_2026_08_01`

## Purpose
Зафиксировать в `git HEAD` spa-app дельты регресс-замка M-5 (unit + board-shell smoke), чтобы чистый clone/reset нёс FR-ID13.1–5.

## Risk
Story/gate Done на working tree; без commit новый checkout теряет hardening matrix, overlay bridge, fetch 1-arg asserts и no-`/login` smoke.

## Code Facts (re-verify at execute)
- Audit F1: WT `M` — `sessionRoutePolicy.test.js`, `sessionShellState.test.js`, `GatewayIssueRepository.test.js`, `board-shell-smoke.mjs`.
- `git show HEAD:…` (audit): нет nested/issue≠protected, ID-13 bridge, Authorization 1-arg, `/login` assert.
- Runtime [`sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js) / [`GatewayIssueRepository.js`](../../../../../../../../src/repositories/GatewayIssueRepository.js) — не менять без fail-first.

## Gap
F1 Medium — uncommitted ID-13 test/smoke deltas vs HEAD.

## AC / DoD
- [x] (P0) В HEAD присутствуют изменения ровно в 4 файлах (или уже committed):  
  `src/router/__tests__/sessionRoutePolicy.test.js`,  
  `src/auth/__tests__/sessionShellState.test.js`,  
  `src/repositories/__tests__/GatewayIssueRepository.test.js`,  
  `tests/puppeteer/board-shell-smoke.mjs`.
- [x] (P0) `git show HEAD:<path>` содержит: nested `/issue/a/b` + issue≠protected; ID-13 overlay bridge via `isProtectedPath`; fetch 1-arg asserts; `page.url()` `/login` fail.
- [x] (P0) Runtime `sessionRoutePolicy.js` / `GatewayIssueRepository.js` без необоснованных правок (FR-ID13.7).
- [x] (P0) Gate заполнен; Date из `--print-utc-now` после live verify.

Gate Date: 2026-08-01T20:33:09Z · Commit: `15ffcd0`.

## Where to change
- Commit (P6/P8): 4 файла выше — без runtime policy/repository edits
- Этот gate / acceptance stub

## Out of scope
- F2 rewrite §анализ; F3 mvp §7.7 (T08); F4–F6 Info asserts; смена active pkg; новый pkg.

## Verification
```bash
cd spa-app
git status --short -- src/router/__tests__/sessionRoutePolicy.test.js src/auth/__tests__/sessionShellState.test.js src/repositories/__tests__/GatewayIssueRepository.test.js tests/puppeteer/board-shell-smoke.mjs
git show HEAD:src/router/__tests__/sessionRoutePolicy.test.js | rg -n "issue/a/b|isProtectedPath\\('/issue"
git show HEAD:src/auth/__tests__/sessionShellState.test.js | rg -n "ID-13|bridges public route"
git show HEAD:src/repositories/__tests__/GatewayIssueRepository.test.js | rg -n "single URL argument|Authorization"
git show HEAD:tests/puppeteer/board-shell-smoke.mjs | rg -n "login"
```

Gate: [`acceptance-verification-spa-id-13-t07.md`](./acceptance-verification-spa-id-13-t07.md)
