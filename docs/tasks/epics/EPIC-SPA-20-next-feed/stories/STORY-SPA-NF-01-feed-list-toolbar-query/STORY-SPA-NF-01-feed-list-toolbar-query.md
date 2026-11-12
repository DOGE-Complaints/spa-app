# STORY-SPA-NF-01-feed-list-toolbar-query — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md`  
> **Status:** Done · P3 · Wave 1 · `pkg-000103` (`2026-10-10T17:50:10Z`)  
> **Package:** next-feed · REQ-22 feed · active `pkg-000103`  
> **ui_scope:** `feed` · UX ready M149 Path A (no STORY-UX-MOCKUP-BRIEF)  
> **Skill declared:** `react-expert`

## Purpose
Feed list + toolbar + query — see backlog FR/AC. Feed content only; shell chrome → next-shell.

## Acceptance Criteria (verbatim backlog)
- [x] `#/next/feed` shows feed/toolbar content states per M149 register (not shell chrome)
- [x] List requests use `status=PUBLISHED`; no invent alternate search HTTP (BE Ready: `search` per REQ-56; live toolbar = FE enable / DUI-Q12)
- [x] Icons = `/icons/next-feed/…` or next-shell reuse from catalog
- [x] Links UX register + api-req; shell OOS explicit
- [x] L10N via `t()`; en/et/ru keys listed

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-01-t01-features-feed-host](task-spa-nf-01-t01-features-feed-host/README.md) | Scaffold `features/feed/` and replace WIP host content with feed list host | Done · ui_anchor |
| T02 | [task-spa-nf-01-t02-list-filters-published-states](task-spa-nf-01-t02-list-filters-published-states/README.md) | Wire gateway list + structural filters + `status=PUBLISHED` + load/empty/error/stale/retry | Done · extends mockup |
| T03 | [task-spa-nf-01-t03-wire-list-toolbar-icons](task-spa-nf-01-t03-wire-list-toolbar-icons/README.md) | Wire filter/retry/status icons to `/icons/next-feed/…` (+ shell close/chevron reuse) | Done |
| T04 | [task-spa-nf-01-t04-l10n-nextfeed-list-toolbar](task-spa-nf-01-t04-l10n-nextfeed-list-toolbar/README.md) | Add `nextFeed.list.*` / `nextFeed.toolbar.*` en/et/ru | Done |
| T05 | [task-spa-nf-01-t05-vitest-list-smoke](task-spa-nf-01-t05-vitest-list-smoke/README.md) | Vitest smoke for feed list/toolbar critical states (+ story acceptance at P3) | Done · gate |
| T06 | [task-spa-nf-01-t06-audit-f1-full-cycle-state-pngs](task-spa-nf-01-t06-audit-f1-full-cycle-state-pngs/README.md) | P5/P6 gap F1 — distinct Path A full-cycle state PNGs | Done · P6 · F1 CLOSED |
| T07 | [task-spa-nf-01-t07-audit-f2-rename-happy-error-png](task-spa-nf-01-t07-audit-f2-rename-happy-error-png/README.md) | P5/P6 gap F2 — rename misnamed happy → error/Retry | Done · P6 · F2 CLOSED |

## Out of scope
Shell D2 ownership · invent HTTP · M155 people · real invite send · schema/media production · re-promote icons (unless 404 gap) · production live toolbar search until FE enable ([REQ-56](../../../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready**, param **`search`**).
PublicHeader / ProfileRail / shell grid → [next-shell](../../../../backlog-stories/next-shell/INDEX.md).

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`
- `spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`
- Register: `spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md` row NF-F → NF-01
