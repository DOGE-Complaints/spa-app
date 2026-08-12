# SPA-HL-04-T02 — Apply fail-fast in identity clients

**Status:** Done — 2026-08-09T13:35:01Z  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) §FR-HL-04.1 · AC#1  
**Depends on:** [T01](../task-spa-hl-04-t01-prod-identity-url-contract/README.md)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T13:24:26Z  
**Package:** `pkg-000062`

## Purpose

В PROD без валидного `VITE_IDENTITY_SERVICE_URL` — явный fail, не `http://localhost:8100`. Применить контракт T01 ко всем трём identity clients.

## Risk

Misconfig маскируется silent localhost; partial apply leaves one client unsafe.

## Code Facts (As-of-Done)

1. Shared [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) — PROD throw · DEV fallback `http://localhost:8100`.
2. Wired: [`identityService.js`](../../../../../../../src/auth/identityService.js) · [`oauthService.js`](../../../../../../../src/auth/oauthService.js) · [`identityReadyClient.js`](../../../../../../../src/auth/identityReadyClient.js).

## AC / DoD

- [x] (P0) PROD path does not call localhost identity when URL missing/invalid (FR-HL-04.1 · AC#1).
- [x] (P0) All three clients share fail-fast behavior.
- [x] (P0) DEV/non-PROD localhost fallback still allowed (FR-HL-04.3).
- [x] (P0) Clear throw/assert message for operators (FR-HL-04.2 signal).

## Where to change

- `src/auth/resolveIdentityServiceUrl.js` (new)
- `src/auth/identityService.js`
- `src/auth/oauthService.js`
- `src/auth/identityReadyClient.js`

## Out of scope

Gateway URL policy; SEC-02 BFF; UX error page; strip all localhost from bundle (HL-02).

## Verification

```bash
rg -n "localhost:8100|VITE_IDENTITY_SERVICE_URL|PROD" \
  spa-app/src/auth/identityService.js \
  spa-app/src/auth/oauthService.js \
  spa-app/src/auth/identityReadyClient.js \
  spa-app/src/auth/resolveIdentityServiceUrl.js
```
