# SPA-NF-06-T05 — Vitest + browser-smoke feed critical states

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
Vitest + browser-smoke feed critical states.


## Arch anchors
- [03 §1 Vitest and browser-smoke](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)
- [00 Q6-B both surfaces](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)
- [01 §2 route smoke `#/next/feed*`](../../../../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)

## Arch context
- Q6-B mandatory: Vitest **and** browser-smoke for next shell + **critical feed** states — Vitest-only ≠ Done — 03 §1 · 00 Q6.
- Critical sample: load/empty/error; Issue open; narrow width — 03 §1.
- Route smoke: `#/next/feed`, `#/next/feed/issue/:id` — 01 §2 · 03 §1.
- Default `/` flip already Done in shell wave; do not regress shelter-list — 03 §2–3.
- Production/preview must exercise hash routes — not src-unit alone — 03 §1.

## Implement notes
- Extend Vitest + puppeteer/analogue smokes for feed critical paths.
- OOS: retire classic board; dropping shelter-list entries.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-06
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Vitest covers feed critical states for NF-01…05 surfaces
- [x] Browser-smoke / board-shell honesty for feed host
