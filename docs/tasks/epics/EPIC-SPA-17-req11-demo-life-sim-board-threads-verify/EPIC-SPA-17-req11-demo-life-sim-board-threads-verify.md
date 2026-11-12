# EPIC-SPA-17 — REQ11 demo life sim board + threads verify

> **ID:** `EPIC-SPA-17` · **Статус:** **In Progress** · REQ11-01 P3 **BLOCKED** (`pkg-000089`, 2026-09-29T13:42:10Z)  
> **Тип:** verify-only / operator runbook (no product chrome)  
> **source:** [`../../backlog-stories/req11-demo-life-sim-board-threads-verify/INDEX.md`](../../backlog-stories/req11-demo-life-sim-board-threads-verify/INDEX.md)  
> **Parent REQ:** [`20-req11-demo-life-sim-board-threads-verify.md`](../../../requirements/20-req11-demo-life-sim-board-threads-verify.md)  
> **Parent product:** [`REQ11-DOGEstonia-Uus-Veerenni-Demo-Life-Simulation.md`](../../../../../docs/requirements%20backlog/REQ11-DOGEstonia-Uus-Veerenni-Demo-Life-Simulation.md) §3.6, §5 spa, §6.3 X-11-01, §7.1 S1–S3, §8 Wave E  
> **created_at:** `2026-09-29T13:22:04Z` · **P1.3:** `2026-09-29T13:22:04Z` · **P3 BLOCKED:** `2026-09-29T13:42:10Z`

---

## Назначение

Spa Wave E of REQ11: after sibling gateway 55 + threads 04 wipe+replay on a named profile, operator verifies existing SPA `#/board` and `#/issue/:id` show lived-in board + threads with reaction summaries — anonymous Pass, no new product chrome, no invent HTTP.

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| Parent REQ-20 on disk | Yes |
| Backlog STORY-SPA-REQ11-01 | **BLOCKED** P3 (runbook Done; Pass Evidence pending siblings) |
| EPIC-SPA-14 / REQ-17 shell | Done — consumer context only |
| EPIC-SPA-16 REQ10 H1+H5 | Done — orthogonal |
| gateway 55 wipe+replay | **Todo** (GW-REQ11-01…04) |
| threads 04 seed | partial — REQ11-01 Done · 02…04 Todo |

## Состав

| Story | Тема | Pipeline | Status |
|-------|------|----------|--------|
| REQ11-01 | Demo verify board + threads on profile SPA URL | [pipeline](stories/STORY-SPA-REQ11-01-board-threads-demo-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md) | **BLOCKED** · P3 `pkg-000089` · gate BLOCKED |

## Operator locks

| Theme | Decision |
|-------|----------|
| Canonical SPA paths | **1A** — `#/board` · `#/issue/:id` (origin from profile) |
| Verify session | **2A** — Pass = **anonymous**; own login not in DoD |

## Active tip

**REQ11-01** P3 **BLOCKED** · [`pkg-000089`](../../spa-active-packages/pkg-000089-20260929-epic-spa-17-req11-01-board-threads-demo-verify.yaml) · T01–T04 docs Done · gate BLOCKED · no invent Pass · re-run Evidence after GW55+threads04 wipe+replay · **await OP**. Do not invent HTTP. Do not git push.
