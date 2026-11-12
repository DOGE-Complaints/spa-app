# SPA-NF-LAB-04-T01 — Hit targets (title / summary / media)

**Status:** Done · P3 (`2026-10-13T13:06:08Z`)
**Story:** [`../STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:59:05Z`
**Package:** `pkg-000130`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**Depends on:** LAB-03 `FeedLabIssueCard` structure Present
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK** · hit model for M158 opener

## Purpose
Wrap title / summary / media in controls that call `onOpenDetail(fixtureId)`. Action strip (react/comment/share/reactions) must `stopPropagation` — does **not** open modal.

## Constraints
- No invent hit API · fixture id only.
- No gateway/threads HTTP.
- `#/next/feed` unchanged.
- name ≠ create until P3.

## AC / DoD
- [x] Title / summary / media open detail
- [x] Action strip excluded from open hit
- [x] Opener focus target retained for return (T02/T03)

## Where to change
- `spa-app/src/features/feed-lab/FeedLabIssueCard.jsx` (+ page wiring)
- Cite M150 written hit/action independence

## Verification
- Manual/local-five: click text/media → open; click action → no open
- Path A M158 evidence in T03
