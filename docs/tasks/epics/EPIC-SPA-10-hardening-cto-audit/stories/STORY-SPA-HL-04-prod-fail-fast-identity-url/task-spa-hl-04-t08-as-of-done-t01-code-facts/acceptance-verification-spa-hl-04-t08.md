# Task acceptance — SPA-HL-04-T08 As-of-Done T01 Code Facts

- **Task:** T08 · F5
- **Package:** `pkg-000062` · `run_mode=spa_hl_04_audit_2026_08_09`
- **Result:** PASS
- **Date:** 2026-08-09T14:39:14Z
- **Scaffolded:** 2026-08-09T14:03:30Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| T01 Code Facts As-of-Done | PASS | Current → `resolveIdentityServiceUrl` + 3 clients |
| No present-tense client `?? localhost` as current | PASS | `??` only under **Historical** |
| Doc-only | PASS | T01 README only |

## Commands

```bash
rg -n "resolveIdentityServiceUrl|As-of-Done|Historical" \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-04-prod-fail-fast-identity-url/task-spa-hl-04-t01-prod-identity-url-contract/README.md
```
