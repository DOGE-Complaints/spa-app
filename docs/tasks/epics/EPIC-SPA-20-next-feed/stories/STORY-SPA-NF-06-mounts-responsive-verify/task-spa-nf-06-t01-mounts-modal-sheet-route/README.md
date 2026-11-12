# SPA-NF-06-T01 — Issue mount parity modal / sheet / `#/next/feed/issue/:id`

**Status:** Done · P3 (`2026-10-10T19:40:00Z`)
**Story:** [`../STORY-SPA-NF-06-mounts-responsive-verify.md`](../STORY-SPA-NF-06-mounts-responsive-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/next/feed` · `/#/next/feed/issue/:id`  
**puppeteer_gate:** `test:ui:board-shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:32:14Z`  
**Package:** `pkg-000108`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)  

## Purpose
Issue mount parity modal / sheet / `#/next/feed/issue/:id`.


## Arch anchors
- [02 §4 Mounts parity](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [01 §2 modal/sheet share semantics with route](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)
- [00 canonical `#/next/feed/issue/:id`](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Same Issue + Discussion product across feed card→modal, mobile sheet, and `#/next/feed/issue/:id` — 02 §4 · 01 §2.
- Classic `#/issue/:id` remains shelter parity host — **not** primary AC claim URL after next exists — 02 §4 · 01 §1.
- Chrome parent may differ; product state one — 01 §2.

## Implement notes
- Wire mount parity for claimed feed content on next routes.
- OOS: retiring classic issue route; redesign shell mounts ownership.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-06
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Modal / sheet / route parity for claimed feed content
- [x] No invent Issue chrome ownership beyond feed mounts
