# SPA-ES-04-T07 — As-of-Done pipeline + backlog SSOT (F1)

**Status:** Done — P6 PASS 2026-08-17T12:10:46Z · F1 CLOSED  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [audit-STORY-SPA-ES-04-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-04-execution-2026-08-17.md) §F1  
**Depends on:** SPA-ES-04-T06 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T12:08:25Z  
**Gate Date:** 2026-08-17T12:10:46Z  
**Package:** `pkg-000069` **unchanged** · wave `spa_es_04_audit_2026_08_17`

## Purpose
Doc-only: As-of-Done / Historical split in pipeline + backlog §Текущее состояние. Pipeline L40 still says remaining L10N keys not in dictionary; backlog L24 still says mascot may be missing until extract.

## Risk
Inventing new AC; rewriting product JSX/CSS; implementing ES-05; rewriting `pkg-000069`; filling gate `Date:` this P5.

## Code Facts (re-verify at execute)
- L10N keys present: [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js) `forming.message` · `missing.intro/areas/languages/groups/themes` · `help.message/submit/submitAccessible` (en/et/ru + `EARLY_SIGNAL_FLAT_KEYS`).
- Mascot on disk: `spa-app/public/assets/es-help-mascot.png`.
- Pipeline As-of-Done (this P6): [`STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md) L35–45 — Current keys **in dictionary** · Historical titles-only / keys not in dictionary.
- Backlog As-of-Done (this P6): [`STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) L23–31 — Current mascot **ON DISK** · Historical may be missing until extract.

## Gap
Audit F1 Medium — pipeline L40 + backlog L24 contradict dictionary + mascot on disk.

## AC / DoD
- [x] (P0) Pipeline §Текущее состояние As-of-Done: remaining ES-04 L10N keys **in dictionary**; Historical: titles-only / keys not in dictionary (pre-P3).
- [x] (P0) Backlog §Текущее состояние As-of-Done: mascot **ON DISK**; Historical: may be missing until extract.
- [x] (P0) Do not invent AC wording.
- [x] (P0) Doc-only — no product source.
- [x] (P0) Do not mix ES-05; do not rewrite `pkg-000069`.

## Where to change
- [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md) §Текущее состояние
- [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md) §Текущее состояние

## Out of scope
Product JSX/CSS; F2 api-req (T08); F3 PNG hygiene (WAIVED `info-nonblocking`); ES-05; invent AC; rewrite `pkg-000069`; git push.

## Verification
```bash
rg -n "not in dictionary yet|may be missing until extract|As-of-Done|Historical|es-help-mascot" spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-04-coverage-gaps-contribution/STORY-SPA-ES-04-coverage-gaps-contribution.md spa-app/docs/tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-04-coverage-gaps-contribution.md
```
