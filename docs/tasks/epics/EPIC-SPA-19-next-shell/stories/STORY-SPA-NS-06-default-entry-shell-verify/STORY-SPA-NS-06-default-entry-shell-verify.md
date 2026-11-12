# STORY-SPA-NS-06-default-entry-shell-verify — pipeline mirror

> **Epic:** [EPIC-SPA-19-next-shell](../../EPIC-SPA-19-next-shell.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`](../../../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md)  
> **source:** `backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md`  
> **Status:** ✅ Done · P3 · Wave C · gate PASS `pkg-000102` (`2026-10-09T17:50:50Z`)  
> **Package:** next-shell · REQ-22 shell · `pkg-000102`  
> **ui_scope:** `shell` · UX ready Arch 03 verify (no STORY-UX-MOCKUP-BRIEF)  
> **Gate:** [acceptance-verification-spa-ns-06.md](task-spa-ns-06-t05-story-epic-gate/acceptance-verification-spa-ns-06.md)  
> **Screenshots:** [screenshots/README.md](screenshots/README.md)

## Purpose
Default entry + shell verify — see backlog FR/AC. Shell-only; feed body → next-feed.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | `t01-default-entry-flip` | `/` and `*` → `/next/feed` after shell works | ✅ Done |
| T02 | `t02-spa-url-page-map` | Update spa-url-page-map for next shell + home flip | ✅ Done |
| T03 | `t03-vitest-browser-shell-smoke` | Vitest + browser-smoke shell chrome/routes | ✅ Done |
| T04 | `t04-icon-promote-404-check` | Shell icon runtime URLs 404-free after promote | ✅ Done |
| T05 | `t05-story-epic-gate` | Story/epic gate checklist NS-01…06 shell scope | ✅ Done · PASS |
| T06 | `t06-audit-f1-backlog-as-of-done` | P5 gap F1 — backlog Historical vs As-of-Done | ✅ Done · F1 CLOSED |
| T07 | `t07-audit-f2-spa-url-page-map-checklist` | P5 gap F2 — spa-url-page-map §8 checklist | ✅ Done · F2 CLOSED |

## Out of scope
BoardFeed / threads / reactions / right-rail product module → [next-feed](../../../../backlog-stories/next-feed/INDEX.md).
Retire classic permanently; full feed product verify; invent CI beyond existing patterns.

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md`
- soft: `spa-app/docs/UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md` (chrome reuse)
- `spa-app/docs/tasks/backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md`
