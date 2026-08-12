# SPA-HL-04-T01 — Spec: PROD identity URL contract

**Status:** Done — 2026-08-09T13:35:01Z  
**Story:** [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md)  
**Decision Ref:** [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-04-prod-fail-fast-identity-url.md) §FR-HL-04.1–04.3 · audit §F8  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T13:24:26Z  
**Package:** `pkg-000062`

## Purpose

Зафиксировать контракт FR-HL-04.*: в PROD нет silent localhost fallback для identity base; misconfig → явный отказ; DEV/test с localhost допустимы. Без реализации clients (T02).

## Risk

Реализация без контракта размазана по трём файлам.

## Code Facts (As-of-Done)

1. **As-of-Done / Current:** Shared [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) — PROD missing/blank → throw; non-PROD → `http://localhost:8100`. Wired from [`identityService.js`](../../../../../../../src/auth/identityService.js) · [`oauthService.js`](../../../../../../../src/auth/oauthService.js) · [`identityReadyClient.js`](../../../../../../../src/auth/identityReadyClient.js) — **no** product `?? 'http://localhost:8100'`.
2. **Historical** (pre-T02 / audit F8): three clients used `VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'`.
3. T01 itself was contract-only (no client impl) — impl landed in T02.
4. Audit F8 — silent localhost on missing env (Historical).

## AC / DoD

- [x] (P0) Contract written in pipeline story Notes (PROD fail-fast · DEV localhost ok · clear operator signal).
- [x] (P0) No client code change in this task (T02 owns impl).
- [x] (P0) FR-HL-04.1–04.3 framed for T02–T04.

## Where to change

- [`../STORY-SPA-HL-04-prod-fail-fast-identity-url.md`](../STORY-SPA-HL-04-prod-fail-fast-identity-url.md) Notes (contract block)
- This README Status → Done

## Out of scope

Implement clients (T02); env docs (T03); tests (T04); UX error page.

## Verification

```bash
rg -n "PROD identity URL contract|localhost:8100|fail-fast" \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/STORY-SPA-HL-04-prod-fail-fast-identity-url.md
```

**Evidence (P3):** pipeline Notes R1–R5 · `git diff` empty for `src/auth/*` in T01.
