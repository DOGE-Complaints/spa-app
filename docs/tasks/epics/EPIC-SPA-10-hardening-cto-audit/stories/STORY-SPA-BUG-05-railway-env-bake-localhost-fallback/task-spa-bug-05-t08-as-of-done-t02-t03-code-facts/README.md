# SPA-BUG-05-T08 — As-of-Done T02/T03 Code Facts (F3)

**Status:** Done — P6 PASS 2026-08-16T12:43:28Z · F3 **CLOSED**  
**Story:** [`../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md`](../STORY-SPA-BUG-05-railway-env-bake-localhost-fallback.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-05-execution-2026-08-16.md](../../../../../../analysis/audit-STORY-SPA-BUG-05-execution-2026-08-16.md) §F3  
**Depends on:** SPA-BUG-05-T03 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-16T12:39:58Z  
**Package:** `pkg-000065` **unchanged** · wave `spa_bug_05_audit_2026_08_16`

## Purpose
As-of-Done rewrite of T02/T03 Code Facts to current resolver L6–8 `import.meta.env.PROD` ternary. Historical: module-level L2 literal `'http://localhost:8100'`.

## Risk
Leaving present-tense «L2 literal» as current contradicts disk and confuses P7.

## Code Facts (closed)
- **Current:** [`resolveIdentityServiceUrl.js`](../../../../../../../src/auth/resolveIdentityServiceUrl.js) L6–8 ternary
- T02/T03 README §Code Facts now As-of-Done + Historical (no present-tense L2 literal as current)

## AC / DoD
- [x] (P0) T02 Code Facts: As-of-Done = L6–8 ternary; Historical = L2 literal (pre-T03).
- [x] (P0) T03 Code Facts: As-of-Done = same L6–8; no present-tense «L2 literal exists».
- [x] (P0) Do not change product source.
- [x] (P0) Doc-only.

## Where to change
- [`task-spa-bug-05-t02-pin-resolver-fallback-bake/README.md`](../task-spa-bug-05-t02-pin-resolver-fallback-bake/README.md) §Code Facts
- [`task-spa-bug-05-t03-fix-prod-fallback-bake/README.md`](../task-spa-bug-05-t03-fix-prod-fallback-bake/README.md) §Code Facts

## Out of scope
Product patch; weaken bake gate; invent new AC.

## Verification
```bash
rg -n "L2 literal|import.meta.env.PROD|As-of-Done|Historical" \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/task-spa-bug-05-t02-pin-resolver-fallback-bake/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/task-spa-bug-05-t03-fix-prod-fallback-bake/README.md
```
