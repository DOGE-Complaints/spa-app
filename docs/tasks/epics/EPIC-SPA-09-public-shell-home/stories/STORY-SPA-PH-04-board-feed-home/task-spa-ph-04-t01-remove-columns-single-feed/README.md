# SPA-PH-04-T01 — Remove columns → single feed

**Status:** Done — P3 2026-08-04T12:16:21Z
**Story:** [`../STORY-SPA-PH-04-board-feed-home.md`](../STORY-SPA-PH-04-board-feed-home.md)  
**Decision Ref:** [`../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md`](../../../../../../backlog-stories/public-home/STORY-SPA-PH-04-board-feed-home.md) FR-PH-04.1  
**Depends on:** PH-01 chrome Done; SEARCH filters Done  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:29:50Z · **P1.3 refresh:** 2026-08-04T11:24:18Z

```text
@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.png
@mockup: spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec-estonia.png
```

## Purpose
`BoardPage`: remove status/kanban columns (`board-columns`); render **one vertical feed** per M132. Path A UI anchor for PH-04.

## Risk
Leaving column layout; inventing new list API; restoring M01 multi-column; drifting from M132.

## Code Facts (re-verify at execute)
- [`BoardPage.jsx`](../../../../../../../src/pages/BoardPage.jsx) — `board-columns` / NEW · IN REVIEW · PUBLISHED (~L308+); `getIssues` (~L100).
- M132 SSOT on disk: `docs/UX/mockups/home/mockup-132-…-spec.md` (+ `.png`, estonia). M01 superseded — do not implement columns.
- API: [api-req §2.1](../../../../../../backlog-stories/public-home/STORY-SPA-PH-api-requirements.md) — live `GET /tallinn/issues`; **no new list API**.
- Icons: [STORY-SPA-PH-icon-assets.md](../../../../../../backlog-stories/public-home/STORY-SPA-PH-icon-assets.md).

## AC / DoD
- [x] (P0) `/board` (and `/` → board) renders **single vertical feed** (FR-PH-04.1) → backlog AC #1.
- [x] (P0) Status/kanban `board-columns` removed; M132 supersedes M01.
- [x] (P0) UI Path A: `@mockup` M132 md+png (+ estonia) on this ui_anchor task.

## Where to change
- `spa-app/src/pages/BoardPage.jsx`
- `spa-app/src/pages/BoardPage.css` (or related board styles)

## Out of scope
Filter wiring (T02); skeletons (T03); empty/error (T04); card route (T05); L10N keys (T06); vitest (T07); gate (T08); new list API; metrics; column restore; PH-06 Submit CTA.

## Verification
```bash
test -f spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md
test -f spa-app/docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.png
rg -n 'board-columns|NEW|IN REVIEW|PUBLISHED' spa-app/src/pages/BoardPage.jsx
```
