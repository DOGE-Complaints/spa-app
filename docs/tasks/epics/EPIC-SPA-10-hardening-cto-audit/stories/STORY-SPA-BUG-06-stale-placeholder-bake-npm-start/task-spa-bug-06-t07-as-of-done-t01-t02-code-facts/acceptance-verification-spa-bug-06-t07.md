# Task acceptance — SPA-BUG-06-T07 As-of-Done T01/T02 Code Facts

- **Task:** T07 · F2
- **Package:** `pkg-000071` **unchanged** · `run_mode=spa_bug_06_audit_2026_08_18`
- **Result:** PASS · F2 **CLOSED**
- **Date:** 2026-08-18T10:35:03Z
- **Scaffolded:** 2026-08-18T10:30:56Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| T01 Code Facts As-of-Done / Historical | PASS | Current: `"start": "node scripts/start-spa.mjs"` · Historical: `serve -s dist` |
| T02 Code Facts As-of-Done / Historical | PASS | Current: wrapper L10 · Historical: blind `serve -s dist` |
| Doc-only — no product source | PASS | no `spa-app/src` / `scripts/` edit this task |
| Do not mix BUG-07 | PASS | `.env.example` / `railway.toml` comment untouched |
| Do not rewrite pkg | PASS | `pkg-000071` unchanged |

## Commands (live `2026-08-18T10:35:03Z`)

```bash
rg -n "As-of-Done|Historical|start-spa.mjs|serve -s dist" \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/task-spa-bug-06-t01-reconfirm-placeholder-start/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/task-spa-bug-06-t02-pin-start-dist-provenance/README.md
rg -n '"start"' spa-app/package.json
```
