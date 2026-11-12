# SPA-NF-LAB-07-T02 — Compose FeedPostCard + strip/media/identity

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
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**Depends on:** T01 scaffold
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** Partial=**BLOCK**

## Result
- `FeedPostCard` + Identity/Title/Summary/OpenIssue/Media/ActionStrip Present
- New CSS only · fixture `summary` authored (not geoHint-only)
- 4-zone strip · one React zone per card

## AC / DoD
- [x] Modules under `feed-lab/post/` compose card anatomy
- [x] 4-zone strip · no dual React pill
- [x] Fixture publicIds visible · media 16:9
- [x] Ban-list held
