# Task acceptance — SPA-BUG-07-T08 As-of-Done Surface + Expected vs Actual

- **Task:** T08 · F3
- **Package:** `pkg-000072` **unchanged** · `run_mode=spa_bug_07_audit_2026_08_18`
- **Result:** PASS · F3 **CLOSED**
- **Date:** 2026-08-18T10:59:41Z
- **Scaffolded:** 2026-08-18T10:55:09Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| Expected vs Actual labeled **Historical** (pipeline + backlog) | PASS | Historical tables keep 2026-08-18 pre-T03 Actual |
| Backlog Surface current three-lane + historical cite | PASS | As-of-Done L54–61 / L42 wrapper · Historical L56–57 / L42 |
| `package.json` `start` unchanged | PASS | L10 `node scripts/start-spa.mjs` |
| Do not rewrite pkg | PASS | `pkg-000072` unchanged |

## Commands (live `2026-08-18T10:59:41Z`)

```bash
rg -n 'Surface|Expected vs Actual|Historical|As-of-Done' spa-app/docs/tasks/backlog-stories/bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/STORY-SPA-BUG-07-start-preview-docs-drift.md
rg -n '"start"' spa-app/package.json
```
