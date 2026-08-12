# SPA-SEC-03-T02 — Debug ingest guard test

**Story:** [`../STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../STORY-SPA-SEC-03-remove-debug-instrumentation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md)  
**Depends on:** T01  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro` (precedent [`serviceRoleEnvGuard.test.js`](../../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js))

## Purpose
Vitest guard: scan `src/**` — fail on `ingest/4e2a7ee6`, `X-Debug-Session-Id`, `127.0.0.1:7840/ingest`.

## Risk
Regression: debug-ingest снова попадёт в production code без CI failure.

## Code Facts (re-verify at execute)
- Guard precedent: [`serviceRoleEnvGuard.test.js`](../../../../../../../../src/auth/__tests__/serviceRoleEnvGuard.test.js), [`localeHardcodeGuard.test.js`](../../../../../../../../src/i18n/__tests__/localeHardcodeGuard.test.js).
- `npm run test:run` — existing vitest entry.

## AC / DoD
- [ ] New vitest file scans `src/**`; fails on banned debug-ingest patterns (story AC #3).
- [ ] Guard runs via `npm run test:run`.
- [ ] Guard passes after T01 purge.

## Where to change
- New: `spa-app/src/auth/__tests__/debugIngestGuard.test.js` (or similar)
- Optional: `spa-app/package.json` scripts

## Out of scope
- Purge implementation — T01. Auth behavior tests — T03.

## Verification
```bash
cd spa-app && npm run test:run -- src/auth/__tests__/debugIngestGuard.test.js
# intentional fail: re-add ingest fetch to src → guard must fail
```
