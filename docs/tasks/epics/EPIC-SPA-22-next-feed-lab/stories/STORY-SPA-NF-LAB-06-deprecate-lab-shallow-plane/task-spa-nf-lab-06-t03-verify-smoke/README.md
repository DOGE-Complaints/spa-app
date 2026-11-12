# SPA-NF-LAB-06-T03 — Verify smoke · no shared rename

**Status:** Done · P3 (`2026-10-13T15:09:44Z`)
**Story:** [`../STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** false
**UI routes:** `/#/lab/feed` · `/#/next/feed` · `/#/board`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T15:02:37Z`
**Closed:** `2026-10-13T15:09:44Z`
**Package:** `pkg-000132`
**UX appendix:** skip (Artboards N/A · NOT visual PASS)
**Depends on:** T02 rename
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
Vitest rename smoke · `#/lab/feed` still opens · `#/next/feed` + `#/board` smoke unchanged (FR-LAB-06.2/06.5). Grep ban: no shared `features/feed/**` rename solely for this tip.

## Result
```text
vitest --run src/features/feed-lab src/pages/__tests__/FeedLabPage
Test Files  5 passed (5)
Tests       20 passed (20)
incl. feedLabDeprecated.nflab06.test.jsx (5)
```
- `data-lab-plane=deprecated` on page · cards · reactions · overlay panel
- Shared VL paths still Present (identity/reactions/comments/composer/presentation)
- `git status src/features/feed/` empty · no product mutate
- **NOT** visual package PASS · no invent OP eye

## AC / DoD
- [x] Vitest rename smoke PASS
- [x] `#/lab/feed` opens with Deprecated plane (vitest route mount)
- [x] `#/next/feed` / `#/board` smoke unchanged (no src touch under shared feed / board hosts)
- [x] Grep: no shared `features/feed/**` file renamed solely for this tip
