# SPA-NF-06-T02 — Narrow viewport feed **body** stress (shell chrome OOS)

**Status:** Done · P3 (`2026-10-10T19:40:00Z`)
**Story:** [`../STORY-SPA-NF-06-mounts-responsive-verify.md`](../STORY-SPA-NF-06-mounts-responsive-verify.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** false  
**extends mockup:** [`../task-spa-nf-06-t01-mounts-modal-sheet-route/README.md`](../task-spa-nf-06-t01-mounts-modal-sheet-route/README.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:32:14Z`  
**Package:** `pkg-000108`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.png)  

## Purpose
Narrow viewport feed **body** stress (shell chrome OOS).


## Arch anchors
- [02 §1 feed visual plane](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [01 §3 D2 — shell vs content](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)
- [03 §1 browser smoke narrow width sample](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)

## Arch context
- Narrow viewport stress = **feed body** usability (M159 body claim); mobile shell chrome = next-shell (D2.1 Done) — 01 §3.
- Browser-smoke later samples narrow width — 03 §1; this task implements body layout behavior.
- Do not re-own MobileAppBar / bottom nav — shell OOS.

## Implement notes
- Adjust feed content layout for narrow breakpoints under existing shell.
- OOS: changing AppShell mobile chrome composition.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-06
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Narrow feed body usable without claiming shell chrome
- [x] Mobile AppBar/BottomNav remain next-shell OOS
