# SPA-NF-06-T06 — Story/epic acceptance gate rollup

**Status:** Done · P3 · story gate (`2026-10-10T19:40:00Z`)
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
Story/epic acceptance gate rollup.


## Arch anchors
- [03 §4–5 risks and retire gates](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)
- [01 §3 D2.2 vs hybrid classic](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)
- [00 claimable URLs](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Epic gate = Phase-1 feed AC on `#/next/feed*` claim matrix — not “new shell on classic + old cards” — 03 §4 · 01 §3 hybrid honesty.
- Retire classic board/issue is **out of this epic** until 03 §5 gates — do not delete shelter paths here.
- Roll up NF-01…06 AC + Q6 verify green; document residual OOS (M155, invite send, schema/media).

## Implement notes
- Acceptance verification doc / checklist for epic tip close.
- OOS: classic retire execution; cabinet redesign; bullrun unless operator asks.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-06
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Story-root screenshots + §UI gate PASS
- [x] Epic NF-01…06 rollup honesty; no invent BoardFeed
