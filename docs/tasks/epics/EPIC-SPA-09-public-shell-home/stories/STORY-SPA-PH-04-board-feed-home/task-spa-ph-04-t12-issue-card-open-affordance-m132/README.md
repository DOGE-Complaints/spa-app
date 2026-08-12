# SPA-PH-04-T12 — IssueCard open affordance vs M132 (post-audit F6)

**Status:** Done — P3 2026-08-04T12:48:38Z  
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [audit-STORY-SPA-PH-04-execution-2026-08-04.md](../../../../../../analysis/audit-STORY-SPA-PH-04-execution-2026-08-04.md) §F6  
**Depends on:** T09  
**ui_scope:** `visual`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-04T12:33:45Z  
**Package:** `pkg-000049`  
**extends ui-mockup:** [`../task-spa-ph-04-t01-remove-columns-single-feed/ui-mockup-spec.md`](../task-spa-ph-04-t01-remove-columns-single-feed/ui-mockup-spec.md)

## Purpose
Привести open-affordance на results feed ближе к M132 («Open issue →»).

## AC / DoD
- [x] (P0) Explicit `publicHome.board.openIssue` + chevron; ellipsis hidden when openable.
- [x] (P0) Item still navigates `/issue/:id`.
- [x] (P0) Vitest + `test:ui:board-shell`; UI-3 partial post-implement PNGs.
- [x] (P0) Icon catalog path retained (chevron placeholder-ok).

## Gate
[`acceptance-verification-spa-ph-04-t12.md`](./acceptance-verification-spa-ph-04-t12.md)  
UI: [`ui-baseline/`](./ui-baseline/)
