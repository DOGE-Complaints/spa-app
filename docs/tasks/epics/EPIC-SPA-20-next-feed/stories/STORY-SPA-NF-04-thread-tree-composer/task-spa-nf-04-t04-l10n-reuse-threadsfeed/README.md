# SPA-NF-04-T04 — L10N reuse `threadsFeed.*` + draft `nextFeed.thread.*` gaps

**Status:** Done · P3 (`2026-10-10T19:13:32Z`) · story gate  
**Story:** [`../STORY-SPA-NF-04-thread-tree-composer.md`](../STORY-SPA-NF-04-thread-tree-composer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md)  
**ui_scope:** `feed`  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:06:39Z`  
**Package:** `pkg-000106`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)  


## Purpose
L10N reuse `threadsFeed.*` + draft `nextFeed.thread.*` gaps.


## Arch anchors
- [02 §1 reuse threads / i18n plane](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Prefer `threadsFeed.*` discussion/composer keys; draft `nextFeed.thread.*` only for gaps — 02 reuse.
- Same i18n plane — 00 L4.

## Implement notes
- Wire `t()`; avoid duplicating NF-05 reaction/invite strings.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-04
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Reuse threadsFeed where valid; draft gaps only
