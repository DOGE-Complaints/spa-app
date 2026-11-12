# SPA-ES-03-T06 — As-of-Done api-req SSOT (F1)

**Status:** Done — P6 PASS 2026-08-17T11:47:44Z · F1 CLOSED  
**Story:** [`../STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md)  
**Decision Ref:** [audit-STORY-SPA-ES-03-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-03-execution-2026-08-17.md) §F1  
**Depends on:** SPA-ES-03-T05 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T11:44:56Z  
**Gate Date:** 2026-08-17T11:47:44Z  
**Package:** `pkg-000068` **unchanged** · wave `spa_es_03_audit_2026_08_17`

## Purpose
Doc-only: rewrite [`STORY-SPA-ES-api-requirements.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) **header L10** + **§3 SPA row L135** from «FE unwired / no repository» → As-of-Done wired (`GatewayEmergingSignalsRepository.js` L32 · `EarlySignalDiscovery.jsx` L44).

## Risk
Inventing new AC; rewriting product JSX/CSS; inventing GW weaken/status fields; implementing ES-04/05; rewriting `pkg-000068`; filling gate `Date:` this P5.

## Code Facts (re-verify at execute)
- Product wired: [`GatewayEmergingSignalsRepository.js`](../../../../../../../src/repositories/GatewayEmergingSignalsRepository.js) L32 GET `{base}/tallinn/emerging-signals?top_n=`; [`EarlySignalDiscovery.jsx`](../../../../../../../src/components/earlySignal/EarlySignalDiscovery.jsx) L44 `<EmergingSignalsBlock />`.
- Pipeline §Текущее состояние already **wired** (no rewrite): [`STORY-SPA-ES-03-emerging-signals-provisional.md`](../STORY-SPA-ES-03-emerging-signals-provisional.md) L37.
- Backlog §Текущее состояние already **wired** (no rewrite this task).
- api-req As-of-Done (this P6): [`STORY-SPA-ES-api-requirements.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) L10 As-of-Done wired · Historical FE unwired · L136 §3 SPA ✅ As-of-Done wired.

## Gap
Audit F1 Medium — api-req §3 header L10 + SPA row L135 still «FE unwired / no repository» vs repository L32 + discovery L44 + pipeline L37 wired.

## AC / DoD
- [x] (P0) api-req header L10 As-of-Done: Emerging FE **wired** (cite repository L32 · discovery L44); Historical: spa `rg` → 0 / FE unwired (pre-P3).
- [x] (P0) §3 SPA row As-of-Done wired (not «FE gap — no repository/service call»).
- [x] (P0) Do not invent AC wording.
- [x] (P0) Doc-only — no product source.
- [x] (P0) Do not mix ES-04/05; do not rewrite `pkg-000068`.

## Where to change
- [`../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md`](../../../../../../backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md) header L10 + §3 SPA row L135

## Out of scope
Product JSX/CSS; F2 GW weaken/status (WAIVED `out-of-DoD`); F3 PNG hygiene (WAIVED `info-nonblocking`); ES-04/05; invent AC; rewrite `pkg-000068`; git push.

## Verification
```bash
rg -n "FE unwired|no repository/service call|As-of-Done|GatewayEmergingSignalsRepository|emerging-signals" spa-app/docs/tasks/backlog-stories/early-signal-dashboard/STORY-SPA-ES-api-requirements.md
```
