# SPA · scope dashboard

> **Scope-Id:** mvp  
> **Scope:** MVP  
> **SSOT:** package `INDEX.md` files + [bullrun-launch-index.md](bullrun-launch-index.md)  
> **Updated:** 2026-08-11  
> **Last change:** ADMIN-ESD-01 **Done** — [UX-PROMPTS.md](backlog-stories/early-signal-dashboard/UX-PROMPTS.md) (ESD-D/P/E/C/I + A–E). Next ADMIN: **ADMIN-ESD-02**. REQ-15 still Draft — awaiting PA.2.

## Summary

| Metric | Value |
|--------|-------|
| Backlog packages | 12 |
| Active work items | 63 |
| Done | 60 |
| Todo | 3 |
| Deferred | 1 |
| Accumulating (excl.) | 1 |
| **Overall progress (active)** | **~95%** `███████████░` |

*Active = product `STORY-SPA-*` Done+Todo (включая BUG-*). Deferred (SEC-02) и Accumulating (HK01) вне %. Admin tasks вне %.*  
*Baseline SoT `docs/requirements/01–15` — не open work items (01–14 Planned identity pack; **15** Early Signal **Draft — awaiting PA.2**).*  
*HL-06…08 Post-MVP считаются в active Todo, пока не Done.*  
*BUG-03 stub / PH-11 draft / BUG-04 draft / HL-09 draft / REQ-15 Draft не в active count; канон ID-14 **Done** · PH-10 **Done** · PH-09 **Done** · PH-08 **Done** · **HL-01 Done** · **HL-02 Done** · **HL-03 Done** · **HL-04 Done** · **HL-05 Done**.*

## By package

| Package | Stories | Done | Todo | Deferred | Progress |
|---------|---------|------|------|----------|----------|
| [search-and-filters](backlog-stories/search-and-filters/INDEX.md) | 7 | 7 | 0 | 0 | 100% `████████████` |
| [localization](backlog-stories/localization/INDEX.md) | 4 | 4 | 0 | 0 | 100% `████████████` |
| [identity-auth](backlog-stories/identity-auth/INDEX.md) | 14 | 14 | 0 | 0 | 100% `████████████` |
| [railway-deploy](backlog-stories/railway-deploy/INDEX.md) | 2 | 2 | 0 | 0 | 100% `████████████` |
| [security-hardening](backlog-stories/security-hardening/INDEX.md) | 3 | 2 | 0 | 1 | 67% `████████░░░░` |
| [design-foundation](backlog-stories/design-foundation/INDEX.md) | 7 | 7 | 0 | 0 | 100% `████████████` |
| [cabinet](backlog-stories/cabinet/INDEX.md) | 7 | 7 | 0 | 0 | 100% `████████████` |
| [housekeeping](backlog-stories/housekeeping/INDEX.md) | 1 | 0 | 0 | 0 | — Accumulating |
| [public-home](backlog-stories/public-home/INDEX.md) | 10 | 10 | 0 | 0 | 100% `████████████` |
| [hardening-cto-audit-2026-08](backlog-stories/hardening-cto-audit-2026-08/INDEX.md) | 8 | 5 | 3 | 0 | 63% `████████░░░░` |
| [bugs](backlog-stories/bugs/INDEX.md) | 2 | 2 | 0 | 0 | 100% `████████████` |
| [early-signal-dashboard](backlog-stories/early-signal-dashboard/INDEX.md) | 0 | 0 | 0 | 0 | — ADMIN **1/6** (вне %) |

*public-home: PH-01…10 Done · PH-11 draft excl. bugs: BUG-01/02 **Done** · BUG-03 **Moved→ID-14** · BUG-04 draft excl. identity: 14/14 Done. hardening: HL-01…05 **Done** · HL-06…08 Todo · HL-09 draft excl. early-signal-dashboard: ADMIN **1/6** (01 Done) · 0 stories · inbound/ = archive after triage (не package count).*

## Remaining

| Story | Package | Notes |
|-------|---------|-------|
| [ADMIN-ESD-02…06](backlog-stories/early-signal-dashboard/INDEX.md) | early-signal-dashboard | **ADMIN package Todo** · next ADMIN-ESD-02 · ESD-01 Done · 0 product stories |
| [HL-06](backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md) · [pipeline](epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-06-protected-route-guard-model/STORY-SPA-HL-06-protected-route-guard-model.md) | hardening-cto-audit | Post-MVP · guard model · 4 tasks |
| [HL-07](backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-07-bundle-size-split.md) · [pipeline](epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-07-bundle-size-split/STORY-SPA-HL-07-bundle-size-split.md) | hardening-cto-audit | Post-MVP · bundle split · 5 tasks |
| [HL-08](backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-08-dual-gpt-operator-clarity.md) · [pipeline](epics/EPIC-SPA-10-hardening-cto-audit/stories/STORY-SPA-HL-08-dual-gpt-operator-clarity/STORY-SPA-HL-08-dual-gpt-operator-clarity.md) | hardening-cto-audit | Post-MVP · dual GPT ops docs · 4 tasks |

*Deferred / Accumulating / admin — вне %.*  
*PH-07 Done (`pkg-000052`, P3 gate 2026-08-06T13:45:10Z) — removed from Remaining (P6 T09).*  
*BUG-01 Done (`pkg-000053`, P3 gate 2026-08-07T10:51:56Z) — removed from Remaining (P6 T06).*  
*BUG-02 Done (`pkg-000054`, P3 gate 2026-08-07T11:54:23Z) — removed from Remaining (P6 T06 post-audit).*  
*BUG-03 Moved → ID-14 (identity-auth) 2026-08-07T18:44:01Z · ID-14 **Done** (`pkg-000055`, P7 WAVE COMPLETE) — removed from Remaining.*  
*PH-10 Done (`pkg-000056`, P3 gate 2026-08-07T20:53:02Z · **P7 WAVE COMPLETE** 2026-08-08T08:40:26Z) — removed from Remaining.*  
*PH-09 Done (`pkg-000057`, P3 gate 2026-08-08T09:04:55Z) — removed from Remaining.*  
*PH-08 Done (`pkg-000058`, P3 gate 2026-08-09T07:46:54Z · **P7 WAVE COMPLETE**) — removed from Remaining.*  
*HL-01 Done (`pkg-000059`, P3 gate 2026-08-09T09:56:07Z · **P7 WAVE COMPLETE** 2026-08-09T10:28:08Z) — removed from Remaining.*  
*HL-02 Done (`pkg-000060`, P3 gate 2026-08-09T11:52:33Z) — removed from Remaining.*  
*HL-03 Done (`pkg-000061`, P3 gate 2026-08-09T13:08:31Z) — removed from Remaining.*  
*HL-05 Done (`pkg-000063`/`000064`, P3 gate 2026-08-10T09:42:36Z · **P7 WAVE COMPLETE** 10:07:35Z) — removed from Remaining.*
*HL-04 Done (`pkg-000062`, P3 gate 2026-08-09T13:36:28Z · **P7 WAVE COMPLETE** 14:44:11Z) — removed from Remaining.*  
*Drafts (не Remaining / не active %): [PH-11](backlog-stories/public-home/STORY-SPA-PH-11-empty-state-favicon-glyph.md) · [BUG-04](backlog-stories/bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md) · [HL-09](backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-09-npm-prod-transitive-high-triage.md) — optional PA.3.*  
*REQ intake (не Remaining / не active %): [REQ-15 Early Signal / Pre-Cluster public board](../requirements/15-early-signal-pre-cluster-public-dashboard.md) — **Draft — awaiting PA.2**; parent Early Signal; sibling [gateway 48](../../doge-complaints-gateway/docs/requirements/48-early-signal-pre-cluster-data-readiness.md).*

## Requirements (intake)

| REQ | Title | Status | Notes |
|-----|-------|--------|-------|
| [15](../requirements/15-early-signal-pre-cluster-public-dashboard.md) | Early Signal / Pre-Cluster — Public Board Discovery State | Draft — awaiting PA.2 | `/board` continuum; not REQ-12 `/dashboard`; seam TBD with gateway 48 |

*01–14 identity extension pack — Planned baseline (см. [README-index](../requirements/README-index.md)); не active %.*

## Epic rollup

| Epic | Status | Notes |
|------|--------|-------|
| [EPIC-SPA-01](epics/EPIC-SPA-01-labels-i18n-dictionary/EPIC-SPA-01-labels-i18n-dictionary.md) | Done | G2 labels i18n |
| [EPIC-SPA-02](epics/EPIC-SPA-02-localization-l10n/EPIC-SPA-02-localization-l10n.md) | Done | L10N-01…04 |
| [EPIC-SPA-03](epics/EPIC-SPA-03-search-and-filters/EPIC-SPA-03-search-and-filters.md) | Done | SEARCH / G1 / G3 |
| [EPIC-SPA-04](epics/EPIC-SPA-04-identity-and-auth/EPIC-SPA-04-identity-and-auth.md) | Done | ID-01…14 Done (`pkg-000055` ID-14 · P7 WAVE COMPLETE) |
| [EPIC-SPA-05](epics/EPIC-SPA-05-security-hardening/EPIC-SPA-05-security-hardening.md) | Done | SEC-01/03 Done; SEC-02 Deferred |
| [EPIC-SPA-06](epics/EPIC-SPA-06-railway-deploy/EPIC-SPA-06-railway-deploy.md) | Done | DEPLOY-01/02 |
| [EPIC-SPA-07](epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) | Done | CAB-01…07 Done (`pkg-000037`) |
| [EPIC-SPA-08](epics/EPIC-SPA-08-design-foundation/EPIC-SPA-08-design-foundation.md) | Done | G4–G11 Done (`pkg-000044` G10) |
| [EPIC-SPA-09](epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) | Done | PH-01…07/10 Done (`pkg-000056` PH-10 · P7 WAVE COMPLETE) |
| [EPIC-SPA-10](epics/EPIC-SPA-10-hardening-cto-audit/EPIC-SPA-10-hardening-cto-audit.md) | In progress | HL-01…05 Done (`pkg-000059`…`000064`) · HL-06…08 Todo · HL-09 draft |
| [EPIC-SPA-11](epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md) | Done (demo stories) | BUG-01/02 · PH-08/09 **Done** · ID-14 Done |
| [EPIC-DASH-01](epics/EPIC-DASH-01-dashboard-read-side-cutover/EPIC-DASH-01-dashboard-read-side-cutover.md) | In Progress | Legacy DASH-P* (parallel; вне package INDEX) |

## Roadmap → 100%

**Текущая точка:** active **60/63 (~95%)**; open HL-06…08 · **HL-01…05 Done**.

| Цель | Знаменатель | Как закрыть |
|------|-------------|-------------|
| **Активные 100%** | 63 Done | HL-06…08 (HL-01…05 ✅) |
| **Demo / UAT wave** | EPIC-SPA-11 Done ✅ | PH-08/09 + BUG-01/02 |
| **Brand polish** | PH-10 Done ✅ | Horizontal header logo + favicon (`pkg-000056` · P7) |
| **Launch hardened (audit §6)** | HL-01…05 Done ✅ | HL-05 P7 WAVE COMPLETE |
| **Post-MVP HL** | HL-06…08 | После MVP loop |
| **Полные 100%** | + SEC-02 Deferred | Credential boundary после product decision |

## §Now

1. **Next ADMIN:** [early-signal-dashboard/](backlog-stories/early-signal-dashboard/INDEX.md) · **ADMIN-ESD-02** ([ADMIN-ESD-02-ux-mockup-intake.md](backlog-stories/early-signal-dashboard/ADMIN-ESD-02-ux-mockup-intake.md)) — mockup specs intake after UX session.
2. ADMIN-ESD-01 **Done** — [UX-PROMPTS.md](backlog-stories/early-signal-dashboard/UX-PROMPTS.md).
3. **Next product:** [HL-06](backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-06-protected-route-guard-model.md) Post-MVP guard model (EPIC-SPA-10) · or HL-07/08 / draft HL-09.
4. **PA.2** на [REQ-15 Early Signal](../requirements/15-early-signal-pre-cluster-public-dashboard.md) (Draft) · ADMIN package in progress · drafts optional: [PH-11](backlog-stories/public-home/STORY-SPA-PH-11-empty-state-favicon-glyph.md) · [BUG-04](backlog-stories/bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md) · [HL-09](backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-09-npm-prod-transitive-high-triage.md).

## §Deferred

- [SEC-02](backlog-stories/security-hardening/STORY-SPA-SEC-02-supabase-credential-boundary.md) — Supabase credential boundary ADR (после SEC-01).

## §Admin intake (вне active %)

- early-signal-dashboard ADMIN-ESD-01…06 — **1/6** (01 Done · [UX-PROMPTS](backlog-stories/early-signal-dashboard/UX-PROMPTS.md); next 02) (см. [early-signal-dashboard/INDEX](backlog-stories/early-signal-dashboard/INDEX.md)).
- public-home ADMIN-PH-01…06 — **6/6 Done** (см. [public-home/INDEX](backlog-stories/public-home/INDEX.md)).
- inbound triage archive: [inbound/README](backlog-stories/inbound/README.md).
