# SPA-NF-01-T07 — Rename misnamed happy PNG → error/Retry (F2)

**Status:** ✅ Done · P6 `2026-10-10T18:08:39Z`  
**Story:** [`../STORY-SPA-NF-01-feed-list-toolbar-query.md`](../STORY-SPA-NF-01-feed-list-toolbar-query.md)  
**Decision Ref:** [audit-STORY-SPA-NF-01-execution-2026-10-10.md](../../../../../../analysis/audit-STORY-SPA-NF-01-execution-2026-10-10.md) · F2 Medium  
**ui_scope:** `none` (docs / filename honesty)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T17:57:16Z`  
**Done:** `2026-10-10T18:08:39Z`  
**Package:** `pkg-000103` (unchanged · `run_mode=spa_nf_01_audit_2026_10_10`)  
**Gaps:** F2 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-nf-01-t07.md`](./acceptance-verification-spa-nf-01-t07.md)

## Purpose

`01-feed-list-happy-1536x1024.png` claims Happy while content is load-error + Retry. Rename to honest error/Retry filename; update story-root README, gate §UI Screenshots / Story-root tables, and any post-implement copies that reuse the Happy name.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | PNG content = error + Retry | audit §2 Match matrix · image read |
| 2 | Filename = `…happy…` | `screenshots/full-cycle/01-feed-list-happy-1536x1024.png` |
| 3 | Gate/README reference Happy | [screenshots/README.md](../screenshots/README.md) · acceptance §Story-root |

## AC / DoD

- [x] Rename `01-feed-list-happy-…` → error/Retry-honest name (e.g. `01-feed-list-error-retry-1536x1024.png`)
- [x] Update `screenshots/README.md` + gate acceptance rows + run-summary touchpoints if they cite Happy
- [x] No product `src/` rewrite
- [x] Gap F2 CLOSED in bullrun wave note / P6 acceptance

## Where to change

- `…/screenshots/full-cycle/` rename
- `…/screenshots/README.md`
- `task-spa-nf-01-t05-…/acceptance-verification-spa-nf-01.md` §UI tables
- Optional: post-implement twin if still named happy

## Out of scope

Capturing new states (F1 → T06) · vitest re-run (F3) · shell / live search (F5)

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/screenshots/full-cycle/
rg -n "happy|error-retry|load-error" spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/screenshots/README.md \
  spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/task-spa-nf-01-t05-vitest-list-smoke/acceptance-verification-spa-nf-01.md | head -30
test ! -f spa-app/docs/tasks/epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-01-feed-list-toolbar-query/screenshots/full-cycle/01-feed-list-happy-1536x1024.png
```
