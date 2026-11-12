# SPA-NF-04-T01 — Compose Closed `ThreadsSocialClient` tree into feed presentation

**Status:** Done · P3 (`2026-10-10T19:13:32Z`)  
**Story:** [`../STORY-SPA-NF-04-thread-tree-composer.md`](../STORY-SPA-NF-04-thread-tree-composer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/next/feed`  
**puppeteer_gate:** `test:ui:board-shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:06:39Z`  
**Package:** `pkg-000106`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png)  


## Purpose
Compose Closed `ThreadsSocialClient` tree into feed presentation.


## Arch anchors
- [02 §1 reuse threads behind feed presentation](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [02 §2 fail-soft — thread fail ≠ remove Issue](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 Q4 one data plane](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Prefer reuse of existing thread modules (`components/threads/`, Closed `ThreadsSocialClient`) **behind** feed presentation — do not reinvent REQ-17 contracts — 02 §1.
- Fail-soft: social/thread failure must not remove civic Issue (AC-05) — 02 §2.
- Closed paths only — no `/threads/by-issue`, no second HTTP client — 00 Q4 · 02 §1.
- Feed visual plane on `#/next/feed*` (D2.2); shell chrome OOS — 01 D2.2.

## Implement notes
- Compose tree_read + knobs into feed Issue/thread surfaces.
- OOS: invent threads URLs; multipart; people surfaces.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-04
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Uses Closed GET tree/knobs via existing client
- [x] Thread unavailable/error does not strip civic Issue chrome
- [x] No invent threads paths
