# Task acceptance — SPA-BUG-06-T08 As-of-Done Surface + Expected vs Actual

- **Task:** T08 · F3
- **Package:** `pkg-000071` **unchanged** · `run_mode=spa_bug_06_audit_2026_08_18`
- **Result:** PASS · F3 **CLOSED**
- **Date:** 2026-08-18T10:35:55Z
- **Scaffolded:** 2026-08-18T10:30:56Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Backlog Surface As-of-Done / Historical | PASS | Current: `"start"` → `node scripts/start-spa.mjs` · Historical: `serve -s dist` |
| Pipeline + backlog Expected vs Actual | PASS | Current start wrapper; 2026-08-18 Actual kept as Historical |
| Doc-only — do not open BUG-07 | PASS | `.env.example` / `railway.toml` comment untouched |
| Do not mix BUG-05/08 / rewrite pkg | PASS | `pkg-000071` unchanged |

## Commands (live `2026-08-18T10:35:55Z`)

```bash
rg -n "As-of-Done|Historical|start-spa.mjs|serve -s dist" \
  spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md
rg -n '"start"' spa-app/package.json
```
