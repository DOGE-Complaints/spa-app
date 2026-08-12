# SPA-ID-13-T04 — Board-shell smoke: no redirect to /login

**Status:** Done  
**Story:** [`../STORY-SPA-ID-13-public-route-regression.md`](../STORY-SPA-ID-13-public-route-regression.md)  
**Decision Ref:** backlog FR-ID13.5; D-ID13-4 C′; Scope T04  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-01T19:28:37Z

## Purpose
Усилить local Puppeteer board-shell smoke: после goto `/#/board` URL не содержит `/login`; shell selectors на месте; `npm run test:ui:board-shell` green.

## Risk
Unit policy green при том, что UI редиректит анонима на `/login` — ловится только browser smoke.

## Code Facts (re-verify at execute)
- [`tests/puppeteer/board-shell-smoke.mjs`](../../../../../../../../tests/puppeteer/board-shell-smoke.mjs): Vite + Puppeteer `http://127.0.0.1:4173/#/board`; asserts selectors + 3 columns; **нет** check `page.url()` vs `/login`.
- Package script: `npm run test:ui:board-shell` (verify in `package.json` at execute).
- Railway live smoke — pointer only ([`scripts/verify-railway-live-smoke.mjs`](../../../../../../../../scripts/verify-railway-live-smoke.mjs)); **не** AC Done.

## Gap
Smoke есть; no-login URL assert Open.

## AC / DoD
- [ ] (P0) **FR-ID13.5:** после `page.goto` на `/#/board` — fail если `page.url()` содержит `/login`.
- [ ] (P0) **FR-ID13.5:** board shell selectors remain; `npm run test:ui:board-shell` green.

## Where to change
- EXTEND `spa-app/tests/puppeteer/board-shell-smoke.mjs`

## Out of scope
- Mandatory `verify:railway:live` against production URL; public-home redesign; unit policy (T01).

## Verification
```bash
cd spa-app && npm run test:ui:board-shell
```
