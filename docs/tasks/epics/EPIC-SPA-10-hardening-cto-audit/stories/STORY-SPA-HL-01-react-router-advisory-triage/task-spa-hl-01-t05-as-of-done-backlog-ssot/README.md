# SPA-HL-01-T05 — As-of-Done backlog SSOT (F1)

**Status:** Done — P6 PASS 2026-08-09T10:21:19Z · F1 CLOSED  
**Story:** [`../STORY-SPA-HL-01-react-router-advisory-triage.md`](../STORY-SPA-HL-01-react-router-advisory-triage.md)  
**Decision Ref:** [audit-STORY-SPA-HL-01-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-HL-01-execution-2026-08-09.md) §F1  
**Depends on:** SPA-HL-01-T04  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-09T10:16:56Z  
**Package:** `pkg-000059` (unchanged) · `run_mode=spa_hl_01_audit_2026_08_09`

## Purpose

Убрать present-tense SSOT drift в backlog HL-01: §Проблема / Meta Depends-on всё ещё «`@7.13.0` / Установлено 7.13.0» при disk `react-router-dom@^7.18.2` и pipeline As-of-Done.

## Risk

Оператор/аудит читают pre-upgrade 7.13.0 как текущее состояние; Done AC противоречит тексту backlog.

## Code Facts (closed)

1. Backlog Meta Depends-on: **Current** `@7.18.2` / **Historical** `@7.13.0`.
2. Backlog §Проблема: **As-of-Done / Current** `7.18.2` · RR ABSENT · **Historical** `7.13.0`.
3. Disk unchanged by T05: [`package.json`](../../../../../../../package.json) L77 `^7.18.2`; lock `react-router-dom@7.18.2`.
4. Audit F1 Medium — [audit-STORY-SPA-HL-01-execution-2026-08-09.md](../../../../../../analysis/audit-STORY-SPA-HL-01-execution-2026-08-09.md).

## Gap

Medium F1 — backlog As-of-Done → **CLOSED** (this task).

## AC / DoD

- [x] (P0) Backlog §Проблема: **Current** (`7.18.2` · RR ABSENT) / **Historical** (audit-time `7.13.0`).
- [x] (P0) Meta Depends-on wording aligned (no present-tense «installed 7.13.0» as current).
- [x] (P0) Doc-only — no `package.json` / lockfile / product JSX change in T05.

## Where to change

- [`../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md`](../../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md)
- [`acceptance-verification-spa-hl-01-t05.md`](./acceptance-verification-spa-hl-01-t05.md)

## Out of scope

F2 matrix Commands (WAIVED working-doc); F3 non-RR High (WAIVED → HL-09 draft); product upgrade rework.

## Verification

```bash
rg -n "7\\.13|7\\.18|Current|Historical|As-of-Done|Depends on" spa-app/docs/tasks/backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-01-react-router-advisory-triage.md
```

PASS 2026-08-09T10:21:19Z — Current/Historical present; no present-tense «Установлено …@7.13.0».
