# STORY-SPA-NF-02-civic-issue-post — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md)  
> **source:** `backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md`  
> **Status:** Done · P3 (`2026-10-10T18:41:45Z`) · Wave 2 · `pkg-000104`  

> **Package:** next-feed · REQ-22 feed · active `pkg-000104`  
> **ui_scope:** `feed` · UX ready M150 Path A (no STORY-UX-MOCKUP-BRIEF)  
> **Skill declared:** `react-expert`

## Purpose
Civic issue-as-post — see backlog FR/AC. Feed content only; shell chrome → next-shell.

## Acceptance Criteria (verbatim backlog)
- [x] Civic post matches M150 content claim without schema/media production
- [x] Icons from catalog runtime URLs
- [x] API = existing issue fields only; links api-req
- [x] L10N reuse + draft keys; shell OOS

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-02-t01-civic-post-card](task-spa-nf-02-t01-civic-post-card/README.md) | Render civic issue-as-post (no schema/media production) | Done · ui_anchor |
| T02 | [task-spa-nf-02-t02-wire-post-action-icons](task-spa-nf-02-t02-wire-post-action-icons/README.md) | Wire open-issue/more/comment/react/share (+ shell location) | Done · extends mockup |
| T03 | [task-spa-nf-02-t03-l10n-nextfeed-post](task-spa-nf-02-t03-l10n-nextfeed-post/README.md) | L10N: reuse `threadsFeed.post.*` + draft `nextFeed.post.*` | Done · story gate |

## Out of scope
Shell D2 ownership · invent HTTP · M155 people · real invite send · schema/media production · re-promote icons (unless 404 gap).
PublicHeader / ProfileRail / shell grid → [next-shell](../../../../backlog-stories/next-shell/INDEX.md).

## @mockup handoff (P2/P3 Path A)
- `spa-app/docs/UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`
- `spa-app/docs/UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`
- Register: `spa-app/docs/tasks/backlog-stories/next-feed/NF-feed-mockup-intake-register.md` row NF-P → NF-02
