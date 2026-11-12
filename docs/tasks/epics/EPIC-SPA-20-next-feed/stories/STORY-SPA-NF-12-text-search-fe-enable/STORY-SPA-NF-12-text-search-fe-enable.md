# STORY-SPA-NF-12-text-search-fe-enable — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-12-text-search-fe-enable.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-12-text-search-fe-enable.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-12-text-search-fe-enable.md`  
> **Status:** Done · P3 (`2026-10-11T15:10:00Z`) · Visual parity tip · `pkg-000114`  
> **Package:** next-feed · REQ-22 feed · active `pkg-000114`  
> **Depends:** REQ-56 Ready · tip after NF-10 · **before NF-11 gate** (OP reorder)  
> **ui_scope:** `feed` · UX ready M149 search Path A  
> **Skill declared:** `react-expert`  
> **Runtime:** local-five + gateway `search` required  
> **Arch delta:** AD-VP-03 · AD-VP-06 · AD-VP-04

## Purpose
Enable FE `search` on next-feed (DUI-Q12 lift) — gateway param **`search`** only. See backlog FR/AC.

## Acceptance Criteria (verbatim backlog)
- [x] Live toolbar search enabled; hide-only state gone (local-five)
- [x] Network shows `search` on list when non-empty
- [x] Empty/no-results + filter compose + edges exercised
- [x] Cites AD-VP-03/06 · REQ-56 · api-req
- [x] Vitest for query builder + live smoke evidence

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-12-t01-build-issues-query-search](task-spa-nf-12-t01-build-issues-query-search/README.md) | Pass `search` in buildIssuesQuery + serialize | Done · P3 |
| T02 | [task-spa-nf-12-t02-toolbar-enable](task-spa-nf-12-t02-toolbar-enable/README.md) | Toolbar enable (lift hide) | Done · P3 · ui_anchor · M149 |
| T03 | [task-spa-nf-12-t03-empty-filter-edges](task-spa-nf-12-t03-empty-filter-edges/README.md) | Empty/no-results + filter compose + edges | Done · P3 |
| T04 | [task-spa-nf-12-t04-l10n-live](task-spa-nf-12-t04-l10n-live/README.md) | L10N + live-five | Done · P3 |
| T05 | [task-spa-nf-12-t05-audit-f1-narrow-390-viewport](task-spa-nf-12-t05-audit-f1-narrow-390-viewport/README.md) | Audit F1 narrow 390 viewport | Done · P6 `2026-10-11T15:16:17Z` |

## Out of scope
Invent search endpoint/param · comments search · FTS · classic board redesign · M155

## @mockup handoff (P2/P3 Path A)
- M149 search control + BOARD-SEARCH-NO-RESULTS
- ARCH-DELTA AD-VP-03/06 · REQ-56
