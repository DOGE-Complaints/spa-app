# Task acceptance — SPA-BUG-05-T06 Attach Railway SUCCESS evidence

- **Task:** T06 · F1
- **Package:** `pkg-000065` · `run_mode=spa_bug_05_audit_2026_08_16`
- **Result:** BLOCKED · F1 still **OPEN**
- **Date:** 2026-08-16T12:43:28Z
- **Scaffolded:** 2026-08-16T12:39:58Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Gate AC #7 PASS only with real id **or** remains PENDING | PASS (PENDING path) | Story gate AC #7 still PENDING; no invented id |
| Do not invent deployment id | PASS | No new id written as SUCCESS-after-fix |
| Do not disable HL-02 bake | PASS | [`railway.toml`](../../../../../../../railway.toml) L8 still `verify:build:env-bake` |
| Do not reopen HL-02 / HL-04 | PASS | No HL story edits |
| Doc-only | PASS | README + gate note + this file |

## BLOCKED facts (Railway MCP live 2026-08-16T12:43:28Z)

| Fact | Value |
|------|-------|
| Service | spa-app `fbea2555-dea2-4d9a-9ce9-80e432f15836` |
| Env | tallinn-demo `297a80a7-9fc9-4049-98a8-1b0d12799fac` |
| Latest SUCCESS | `eda23243-ba9c-4548-8acb-4ee92360ff1b` · `072ae20` · 2026-08-09T13:20:21Z · **pre-fix** |
| Post-HL-04 FAILED | `6f9c2b58` · `281c00dd` · `ff982742` |
| Deploy after P3 fix tip | **none** |

F1 / FR-BUG-05.6 / backlog AC #7 remain open until operator redeploy on a tip that includes resolver DCE.

## Commands

```bash
rg -n "PENDING|BLOCKED|eda23243" spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-05-railway-env-bake-localhost-fallback/task-spa-bug-05-t05-story-gate-bug-05/acceptance-verification-spa-bug-05.md
rg -n 'verify:build:env-bake' spa-app/railway.toml
```
