# Acceptance verification — SPA-HL-01-T05

- **Task:** As-of-Done backlog SSOT (F1)
- **Result:** PASS
- **Date:** 2026-08-09T10:21:19Z
- **Package:** `pkg-000059` · `run_mode=spa_hl_01_audit_2026_08_09`
- **Scaffolded:** 2026-08-09T10:16:56Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| §Проблема Current/Historical | PASS | backlog L23–24 · Current `7.18.2` · Historical `7.13.0` |
| Meta Depends-on aligned | PASS | backlog L10 · Current `@7.18.2` / Historical `@7.13.0` |
| Doc-only | PASS | T05 touched backlog + this gate only; no product JSX edit |

## Commands

```bash
rg -n "7\\.13|7\\.18|Current|Historical|As-of-Done|Depends on|Установлено" spa-app/docs/tasks/backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md
node -e "const l=require('./spa-app/package-lock.json'); console.log(l.packages['node_modules/react-router-dom'].version)"
```

Lock claim: `react-router-dom@7.18.2` (unchanged by T05).
