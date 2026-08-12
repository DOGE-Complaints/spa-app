# Acceptance — SPA-PH-03-T08 (post-audit F3 api-req)

- **Task:** As-of-Done api-req §3.2 footer
- **run_mode:** `spa_ph_03_audit_2026_08_04`
- **Result:** PASS
- **Date:** 2026-08-04T11:11:40Z

## Checklist

| AC | Status | Evidence |
|----|--------|----------|
| §3.2 «Сегодня» reflects PublicFooter + `#` / no CMS | PASS | As-of-Done note; no stale one-liner «Сегодня» for public footer |
| Cabinet default one-liner noted | PASS | «when `footer` omitted» clause |

## Commands

```bash
rg -n 'Сегодня|PublicFooter|one-liner|CMS' spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-api-requirements.md
```
