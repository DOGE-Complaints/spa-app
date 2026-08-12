# SPA-SEC-03-T01 — Purge debug ingest from auth layer

**Story:** [`../STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../STORY-SPA-SEC-03-remove-debug-instrumentation.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-03-remove-debug-instrumentation.md); [`identity-supabase-frontend-split-2026-06-16.md §6.6`](../../../../../../../analysis/identity-supabase-frontend-split-2026-06-16.md)  
**Depends on:** — (first task in wave)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Удалить все `#region agent log` блоки и `fetch('http://127.0.0.1:7840/ingest/…')` из auth-слоя (`supabaseClient`, `identityService`, `LoginPage`).

## Risk
Debug-ingest в проде → висящие запросы на localhost, раздувание bundle, шум в консоли.

## Code Facts (re-verify at execute)
- [`supabaseClient.js:19-21`](../../../../../../../../src/auth/supabaseClient.js) — 1× ingest at module init.
- [`identityService.js:61-63`](../../../../../../../../src/auth/identityService.js) — 1× ingest in `identityFetch` catch.
- [`LoginPage.jsx:58-113`](../../../../../../../../src/pages/LoginPage.jsx) — 6× ingest in `completeAuthSuccess` + `handleSignup`.
- grep `7840|4e2a7ee6|X-Debug-Session-Id` in `src/` → only these 3 files.

## AC / DoD
- [ ] All ingest blocks removed from the 3 files (story AC #1).
- [ ] Surrounding control flow unchanged (`completeAuthSuccess` still swallows identity errors).
- [ ] `grep -rE 'ingest/4e2a7ee6|X-Debug-Session-Id|127\.0\.0\.1:7840' spa-app/src/` → empty.

## Where to change
- [`spa-app/src/auth/supabaseClient.js`](../../../../../../../../src/auth/supabaseClient.js)
- [`spa-app/src/auth/identityService.js`](../../../../../../../../src/auth/identityService.js)
- [`spa-app/src/pages/LoginPage.jsx`](../../../../../../../../src/pages/LoginPage.jsx)

## Out of scope
- Handler logic changes (login/signup/fetchMe behavior). Guard test — T02. Auth regression — T03.
- New telemetry framework behind env flag.

## Verification
```bash
grep -rE 'ingest/4e2a7ee6|X-Debug-Session-Id|127\.0\.0\.1:7840' spa-app/src/ && exit 1 || echo "ok: src clean"
```
