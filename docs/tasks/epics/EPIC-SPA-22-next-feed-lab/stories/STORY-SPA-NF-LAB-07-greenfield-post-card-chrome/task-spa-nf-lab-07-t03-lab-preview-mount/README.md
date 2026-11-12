# SPA-NF-LAB-07-T03 — Lab preview mount (pre-cutover)

**Status:** Done · P3 (`2026-10-13T15:48:00Z`)
**Story:** [`../STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md`](../STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T15:39:17Z`
**Closed:** `2026-10-13T15:48:00Z`
**Package:** `pkg-000133`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**Note:** M149 = **list rhythm only**
**Depends on:** T02 compose
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK** · not package visual Done

## Result
- **Choice:** parallel section on `#/lab/feed` — greenfield primary + Deprecated residual
- `FeedPostCard` imported from `features/feed-lab/post/` only
- `data-lab-preview=greenfield` · `data-lab-list-rhythm=m149`
- `#/next/feed` unchanged (`git status features/feed/` empty this tip)

## AC / DoD
- [x] Lab preview mount renders greenfield cards from fixtures
- [x] M149 rhythm spacing on greenfield list
- [x] `#/next/feed` unchanged
- [x] Zero Deprecated import on greenfield Done path (`post/`)
