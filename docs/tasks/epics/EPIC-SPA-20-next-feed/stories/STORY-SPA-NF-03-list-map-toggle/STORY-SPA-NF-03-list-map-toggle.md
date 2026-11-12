# STORY-SPA-NF-03-list-map-toggle — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md`  
> **Status:** Done · P3 (`2026-10-10T18:53:45Z`) · Wave 3 · `pkg-000105`  
> **Package:** next-feed · REQ-22 feed · active `pkg-000105`  
> **ui_scope:** `feed` · UX ready M151 Path A (no STORY-UX-MOCKUP-BRIEF)  
> **Skill declared:** `react-expert`

## Purpose
List | Map toggle — see backlog FR/AC. Feed content only; shell chrome → next-shell.

## Acceptance Criteria (verbatim backlog)
- [x] List|Map toggle + states per M151 register
- [x] Pins use next-feed `map-pin` URL; eligibility = lat/lon only
- [x] No invent map API; cite api-req + Q14 honesty
- [x] L10N keys listed; shell OOS

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-03-t01-list-map-toggle](task-spa-nf-03-t01-list-map-toggle/README.md) | List \| Map toggle control + list/map/partial/error states | Done · ui_anchor |
| T02 | [task-spa-nf-03-t02-map-pins-next-feed-icon](task-spa-nf-03-t02-map-pins-next-feed-icon/README.md) | Pins via `/icons/next-feed/map/map-pin.svg` + `issueGeo` lat/lon eligibility | Done · extends mockup |
| T03 | [task-spa-nf-03-t03-l10n-nextfeed-map](task-spa-nf-03-t03-l10n-nextfeed-map/README.md) | Add `nextFeed.map.*` en/et/ru | Done · story gate |
| T04 | [task-spa-nf-03-t04-audit-f1-map-error-png](task-spa-nf-03-t04-audit-f1-map-error-png/README.md) | Audit F1 MAP-ERROR full-cycle PNG | Done · P6 CLOSED |
| T05 | [task-spa-nf-03-t05-audit-f2-map-pins-visible-png](task-spa-nf-03-t05-audit-f2-map-pins-visible-png/README.md) | Audit F2 pins visible PNG | Done · P6 CLOSED |

## Out of scope
Shell D2 ownership · invent HTTP · illustrative streets as goldens · invent pin fields · Q14 privacy product gate is process, not invent API.

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md`
- `spa-app/docs/UX/next/feed/artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.png`
- Register: `spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md` row NF-M → NF-03
