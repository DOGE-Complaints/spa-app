# SPA-SEC-03-T03 — Auth regression after debug purge

**Story:** [`../STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../STORY-SPA-SEC-03-remove-debug-instrumentation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md)  
**Depends on:** T01, T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Подтвердить, что login/signup/`fetchMe` поведение не изменилось после удаления debug-блоков (story AC #2).

## Risk
Accidental removal of non-debug lines during purge breaks auth flows.

## Code Facts (re-verify at execute)
- [`LoginPage.postAudit.test.jsx`](../../../../../../../../src/pages/__tests__/LoginPage.postAudit.test.jsx) — signup mismatch, success link.
- [`identityService.test.js`](../../../../../../../../src/auth/__tests__/identityService.test.js) — `/me` client.
- [`useAuthSession.test.js`](../../../../../../../../src/auth/__tests__/useAuthSession.test.js).

## AC / DoD
- [ ] `npm run test:run` — full suite green (story AC #2).
- [ ] Auth-focused subset green: `src/auth/__tests__/`, `LoginPage*.test.jsx`.
- [ ] Optional: `npm run test:ui:auth-login` — document pass/fail in task-completion (not blocking if infra missing).

## Where to change
- Verify only (no logic changes unless tests reveal accidental breakage from T01).

## Out of scope
- New auth features. Puppeteer infra fixes.

## Verification
```bash
cd spa-app && npm run test:run
cd spa-app && npm run test:run -- src/auth/__tests__/ src/pages/__tests__/LoginPage
```
