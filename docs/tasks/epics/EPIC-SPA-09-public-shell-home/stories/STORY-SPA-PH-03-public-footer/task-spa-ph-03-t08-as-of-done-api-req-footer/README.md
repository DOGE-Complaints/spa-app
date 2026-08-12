# SPA-PH-03-T08 — As-of-Done api-req §3.2 footer (post-audit F3)

**Status:** Done — P6 PASS 2026-08-04T11:11:40Z  
**Story:** [`../STORY-SPA-PH-03-public-footer.md`](../STORY-SPA-PH-03-public-footer.md)  
**Decision Ref:** [audit-STORY-SPA-PH-03-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-03-execution-2026-08-04.md) §F3  
**Depends on:** SPA-PH-03-T01…T05 Done · T06 may run first (order in run_mode)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_ph_03_audit_2026_08_04`  
**Scaffolded:** 2026-08-04T10:58:42Z

## Purpose
Закрыть audit **F3**: [STORY-SPA-PH-api-requirements.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §3.2 «Сегодня» всё ещё утверждает one-liner `appShell.footer` / `footer` как текущее состояние public footer, хотя WT уже имеет `<PublicFooter />` + `#` placeholders.

## Risk
Doc drift → ложный CMS/footer API gap для следующего intake (PH-04+).

## Code Facts (re-verify at execute)
- api-req §3.2 line (~117): «Сегодня: `t('appShell.footer')` / `t('footer')` — one-liner».
- WT: PublicFooter on Board/Issue/HowItWorks; cabinet AppShell default still one-liner when `footer` omitted.
- Backlog/pipeline PH-03 already As-of-Done for product story; this task is **api-req SSOT only**.

## AC / DoD
- [x] (P0) api-req §3.2 «Сегодня» / As-of-Done: PublicFooter on public PH chrome; links `#` or static; **no CMS**; cabinet default one-liner when `footer` omitted.
- [x] (P0) No invented CMS API or `/about` route requirements beyond existing FR-PH-03.4.
- [x] (P0) Gate filled; Date from `--print-utc-now` after `rg` verify.

Gate Date: 2026-08-04T11:11:40Z.

## Where to change
- EDIT [`STORY-SPA-PH-api-requirements.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) §3.2
- Gate: `acceptance-verification-spa-ph-03-t08.md`

## Out of scope
- F1 commit (T06). F2 CSS (T07). Runtime product code. New CMS endpoints. F4–F6.

## Verification
```bash
rg -n 'Сегодня|PublicFooter|appShell\.footer|CMS' spa-app/docs/tasks/backlog-stories/public-home/STORY-SPA-PH-api-requirements.md
```

Gate: [`acceptance-verification-spa-ph-03-t08.md`](./acceptance-verification-spa-ph-03-t08.md)
