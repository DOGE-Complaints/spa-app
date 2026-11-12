# SPA-NF-06-T04 — Verify catalog `/icons/next-feed/…` 404-free — **no re-promote** unless gap

**Status:** Done · P3 (`2026-10-10T19:40:00Z`)
**Story:** [`../STORY-SPA-NF-06-mounts-responsive-verify.md`](../STORY-SPA-NF-06-mounts-responsive-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md)  
**ui_scope:** `feed`  
**ui_anchor:** false  
**extends mockup:** [`../task-spa-nf-06-t01-mounts-modal-sheet-route/README.md`](../task-spa-nf-06-t01-mounts-modal-sheet-route/README.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:32:14Z`  
**Package:** `pkg-000108`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)  

## Purpose
Verify catalog `/icons/next-feed/…` 404-free — **no re-promote** unless gap.


## Arch anchors
- [03 §1 production/preview must exercise assets](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)
- [00 — static assets not invent HTTP](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Verify catalog `/icons/next-feed/…` 404-free under Vite public — promote already Done (ADMIN-NF-02).
- **Do not** re-copy masters unless a verified gap — name ≠ invent promote wave.
- Icons are not an HTTP API plane — 00 packaging N/A · static public.

## Implement notes
- Smoke list of catalog URLs (or equivalent check) for 24 promoted SVGs + documented shell reuse.
- OOS: Lucide generate; touching icon-system masters.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-06
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Catalog runtime URLs resolve under Vite public
- [x] No re-promote unless verified 404 gap
