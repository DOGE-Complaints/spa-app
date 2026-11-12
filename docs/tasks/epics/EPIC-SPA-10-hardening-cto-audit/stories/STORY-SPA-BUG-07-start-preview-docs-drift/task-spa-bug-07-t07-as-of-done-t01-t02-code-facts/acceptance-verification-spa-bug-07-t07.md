# Task acceptance — SPA-BUG-07-T07 As-of-Done T01/T02 Code Facts

- **Task:** T07 · F2
- **Package:** `pkg-000072` **unchanged** · `run_mode=spa_bug_07_audit_2026_08_18`
- **Result:** PASS · F2 **CLOSED**
- **Date:** 2026-08-18T10:58:56Z
- **Scaffolded:** 2026-08-18T10:55:09Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| T01 Code Facts As-of-Done / Historical | PASS | Current: three-lane + `start-spa.mjs` · Historical: pre-T03 `vite preview` |
| T02 Code Facts As-of-Done / Historical | PASS | Current: L54–61 / L42 wrapper · Historical: L56–57 / L42 stale |
| Reconfirm snapshot not rewritten | PASS | `reconfirm-spa-bug-07-start-preview-docs-2026-08-18.md` kept |
| Doc-only — no product source | PASS | no `package.json` / scripts edit |
| Do not rewrite pkg | PASS | `pkg-000072` unchanged |

## Commands (live `2026-08-18T10:58:56Z`)

```bash
rg -n 'As-of-Done|Historical|start-spa.mjs|vite preview' \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t01-reconfirm-start-preview-docs-drift/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-BUG-07-start-preview-docs-drift/task-spa-bug-07-t02-pin-docs-layer/README.md
rg -n 'Lane A|start-spa.mjs' spa-app/.env.example
```
