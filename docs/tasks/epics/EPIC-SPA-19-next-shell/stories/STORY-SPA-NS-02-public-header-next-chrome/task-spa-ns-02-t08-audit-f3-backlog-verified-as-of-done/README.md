# SPA-NS-02-T08 — Backlog Verified As-of-Done SSOT (F3)

**Status:** Done · P6 `2026-10-09T15:54:16Z`  
**Story:** [`../STORY-SPA-NS-02-public-header-next-chrome.md`](../STORY-SPA-NS-02-public-header-next-chrome.md)  
**Decision Ref:** [audit-STORY-SPA-NS-02-execution-2026-10-09.md](../../../../../../analysis/audit-STORY-SPA-NS-02-execution-2026-10-09.md) · F3 Medium  
**ui_scope:** `none` (docs only · no product `src/` rewrite)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-09T15:54:16Z`  
**Done:** `2026-10-09T15:54:16Z`  
**Package:** `pkg-000098` (unchanged · `run_mode=spa_ns_02_audit_2026_10_09`)  
**Gaps:** F3 → **CLOSED**

## Purpose

Split backlog §«Текущее состояние» into **Historical / As-of-Done** (brand/logout → `/next/feed`). No product `src/` · no AC reopen.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Backlog Historical / As-of-Done split Present | [`backlog …/STORY-SPA-NS-02-….md`](../../../../../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md) |
| 2 | As-of-Done matches disk | brand `FEED_HOME='/next/feed'` · logout → feed |
| 3 | AC `[x]` hold | same backlog Acceptance Criteria |
| 4 | No product `src/` | this P6 docs only |

## AC / DoD

- [x] (P0) Backlog §Verified = Historical + As-of-Done (post-P3 facts)
- [x] (P0) AC checkboxes `[x]` unchanged
- [x] (P0) No product `src/` invent
- [x] (P0) Gap F3 CLOSED

## Where changed

- `spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md`
- soft: pipeline story T06–T08 · bullrun · Spa_builder safe-override

## Out of scope

Live vitest re-run (F4 WAIVED) · BoardFeed/inbox (F5 WAIVED) · pkg edit · product chrome rewrite
