# SPA-NF-04-T03 — Wire reply/send/attach/retry (+ shell chevron/close)

**Status:** Done · P3 (`2026-10-10T19:13:32Z`)  
**Story:** [`../STORY-SPA-NF-04-thread-tree-composer.md`](../STORY-SPA-NF-04-thread-tree-composer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md)  
**ui_scope:** `feed`  
**ui_anchor:** false  
**extends mockup:** [`../task-spa-nf-04-t01-compose-closed-thread-tree/README.md`](../task-spa-nf-04-t01-compose-closed-thread-tree/README.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:06:39Z`  
**Package:** `pkg-000106`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)  


## Purpose
Wire reply/send/attach/retry (+ shell chevron/close).


## Arch anchors
- [02 §3 tokens](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 L0 data-theme](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Thread/composer icons from `/icons/next-feed/…`; expand/close reuse next-shell — catalog.
- Token/`currentColor` consumption — 02 §3.

## Implement notes
- Wire reply/send/attach/retry (+ shell chevron/close).
- OOS: re-promote; Lucide generate.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-04
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Thread icons use catalog runtime URLs
