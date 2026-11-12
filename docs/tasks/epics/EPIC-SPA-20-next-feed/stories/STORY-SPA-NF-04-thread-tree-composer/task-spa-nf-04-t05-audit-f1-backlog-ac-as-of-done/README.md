# SPA-NF-04-T05 — Backlog AC As-of-Done checkboxes (F1)

**Status:** ✅ Done · P6 `2026-10-10T19:20:16Z`  
**Story:** [`../STORY-SPA-NF-04-thread-tree-composer.md`](../STORY-SPA-NF-04-thread-tree-composer.md)  
**Decision Ref:** [audit-STORY-SPA-NF-04-execution-2026-10-10.md](../../../../../../analysis/audit-STORY-SPA-NF-04-execution-2026-10-10.md) · F1 Medium  
**ui_scope:** `none` (docs SSOT only)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:19:54Z`  
**Done:** `2026-10-10T19:20:16Z`  
**Package:** `pkg-000106` (unchanged · `run_mode=spa_nf_04_audit_2026_10_10`)  
**Gaps:** F1 → **CLOSED**  
**acceptance:** [`acceptance-verification-spa-nf-04-t05.md`](./acceptance-verification-spa-nf-04-t05.md)  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)

## Purpose

Sync backlog SSOT AC checkboxes to As-of-Done (`[x]`) matching pipeline/gate Done. Optional Historical note. Do **not** reopen product AC or touch `src/`.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | Pipeline AC `[x]` · Status Done P3 | [`STORY-SPA-NF-04-….md`](../STORY-SPA-NF-04-thread-tree-composer.md) |
| 2 | Gate PASS | [`acceptance-verification-spa-nf-04.md`](../task-spa-nf-04-t04-l10n-reuse-threadsfeed/acceptance-verification-spa-nf-04.md) |
| 3 | Backlog AC As-of-Done `[x]` | [`backlog STORY-SPA-NF-04`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md) |

## AC / DoD

- [x] Backlog Acceptance Criteria marked `[x]` (As-of-Done)
- [x] Status / note aligns with P3 Done · no product reopen
- [x] No `src/` invent · no shell invent · no multipart invent
- [x] Gap F1 CLOSED in P6 acceptance

## Where to change

- `spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md` only (docs)

## Out of scope

Product code · F2–F5 WAIVED · invent threads URLs · P8 commits

## Verification

```bash
rg -n "Acceptance Criteria|^- \\[x\\]" spa-app/docs/tasks/backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md
```
