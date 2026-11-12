# SPA-ES-04-T08 — As-of-Done api-req §0 Coverage SPA (F2)

**Status:** Done — P6 PASS 2026-08-17T12:12:04Z · F2 CLOSED  
**Story:** [`../STORY-SPA-ES-04-coverage-gaps-contribution.md`](../STORY-SPA-ES-04-coverage-gaps-contribution.md)  
**Decision Ref:** [audit-STORY-SPA-ES-04-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-04-execution-2026-08-17.md) §F2  
**Depends on:** SPA-ES-04-T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T12:08:25Z  
**Gate Date:** 2026-08-17T12:12:04Z  
**Package:** `pkg-000069` **unchanged** · wave `spa_es_04_audit_2026_08_17`

## Purpose
Doc-only: rewrite [`STORY-SPA-ES-api-requirements.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) **§0 Coverage framing SPA** L38 from «⚠️ keys TBD ADMIN-05» → As-of-Done qualitative i18n shipped (no coverage HTTP).

## Risk
Inventing coverage DTO / % endpoint; rewriting product JSX/CSS; implementing ES-05; rewriting `pkg-000069`; filling gate `Date:` this P5.

## Code Facts (re-verify at execute)
- No coverage HTTP: api-req §4.1–4.2 still qualitative / env GPT only.
- L10N shipped: [`earlySignalDictionary.js`](../../../../../../../src/i18n/earlySignalDictionary.js) `earlySignal.missing.*` · `forming.message` · `help.*`.
- Product: [`WhatsMissingBlock.jsx`](../../../../../../../src/components/earlySignal/WhatsMissingBlock.jsx) framing rows; [`HelpCompleteBlock.jsx`](../../../../../../../src/components/earlySignal/HelpCompleteBlock.jsx) PH-06 helper.
- api-req As-of-Done (this P6): [`STORY-SPA-ES-api-requirements.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) §0 L38 Coverage framing SPA ✅ As-of-Done i18n shipped · L45–46 Historical keys TBD ADMIN-05.

## Gap
Audit F2 Medium — api-req §0 L38 still ADMIN-05 TBD vs shipped ES-04 dictionary + trio UI.

## AC / DoD
- [x] (P0) api-req §0 Coverage framing SPA As-of-Done: static i18n keys **shipped** (cite dictionary + WhatsMissingBlock); Historical: keys TBD ADMIN-05.
- [x] (P0) Do **not** invent coverage HTTP / DTO / %.
- [x] (P0) Do not invent AC wording.
- [x] (P0) Doc-only — no product source.
- [x] (P0) Do not mix ES-05; do not rewrite `pkg-000069`.

## Where to change
- [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) §0 Coverage framing SPA row L38

## Out of scope
Product JSX/CSS; F1 pipeline/backlog (T07); F3 PNG hygiene (WAIVED `info-nonblocking`); coverage API; ES-05; invent AC; rewrite `pkg-000069`; git push.

## Verification
```bash
rg -n "keys TBD ADMIN-05|Coverage framing|As-of-Done|earlySignal.missing" spa-app/docs/tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md
```
