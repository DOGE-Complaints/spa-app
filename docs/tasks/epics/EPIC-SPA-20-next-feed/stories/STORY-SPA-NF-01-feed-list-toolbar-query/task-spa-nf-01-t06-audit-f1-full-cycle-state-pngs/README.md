# SPA-NF-01-T06 — Capture distinct Path A full-cycle PNGs (F1)

**Status:** ✅ Done · P6 `2026-10-10T18:08:39Z`  
**Story:** [`../STORY-SPA-NF-01-feed-list-toolbar-query.md`](../STORY-SPA-NF-01-feed-list-toolbar-query.md)  
**Decision Ref:** [audit-STORY-SPA-NF-01-execution-2026-10-10.md](../../../../../../analysis/audit-STORY-SPA-NF-01-execution-2026-10-10.md) · F1 Medium  
**ui_scope:** `feed` (screenshots / evidence only)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T17:57:16Z`  
**Done:** `2026-10-10T18:08:39Z`  
**Package:** `pkg-000103` (unchanged · `run_mode=spa_nf_01_audit_2026_10_10`)  
**Gaps:** F1 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-nf-01-t06.md`](./acceptance-verification-spa-nf-01-t06.md)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)

## Purpose

Add distinct `screenshots/full-cycle/` PNG evidence for Path A content states still missing after P3: **loading**, **empty**, **filtered-empty**, **populated** (Backend UP or honest fixture — **no fake cards**), **stale**. Keep error/Retry frame; update story-root README matrix → pass.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | State branches Present in code | [`FeedListArea.jsx`](../../../../../../../src/features/feed/FeedListArea.jsx) · host stale |
| 2 | P3 pack only error×3 (md5 shared) | `screenshots/full-cycle/01…03` · audit §2 |
| 3 | Gate claimed error path only | [acceptance-verification-spa-nf-01.md](../task-spa-nf-01-t05-vitest-list-smoke/acceptance-verification-spa-nf-01.md) |

## AC / DoD

- [x] Distinct full-cycle PNGs for load / empty / filtered-empty / populated-or-fixture / stale (plus error retained)
- [x] Story-root `screenshots/README.md` matrix lists each file ↔ state
- [x] No invent fake Issue cards while gateway DOWN without labelled fixture provenance
- [x] No product `src/` rewrite unless capture harness requires it (prefer fixture/route inject)
- [x] Gap F1 CLOSED in bullrun wave note / P6 acceptance

## Where to change

- `…/STORY-SPA-NF-01-…/screenshots/full-cycle/**`
- `…/screenshots/README.md`
- Optional: anchor `ui-baseline/post-implement/` copies · gate §UI rows

## Out of scope

Live search enable (F5) · shell chrome · rename-only (F2 → T07) · optional vitest re-run (F3)

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/screenshots/full-cycle/
rg -n "loading|empty|stale|populated|filtered" spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/screenshots/README.md | head -20
```
