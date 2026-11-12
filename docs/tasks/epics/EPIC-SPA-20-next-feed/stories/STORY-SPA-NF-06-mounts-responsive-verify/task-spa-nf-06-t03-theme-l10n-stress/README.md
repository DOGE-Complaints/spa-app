# SPA-NF-06-T03 — Theme + locale stress on critical feed controls

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
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png)  

## Purpose
Theme + locale stress on critical feed controls.


## Arch anchors
- [02 §3 tokens & theme](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 L0 tokens / data-theme](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)
- [03 §1 Vitest theme/data-theme](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)

## Arch context
- Consume semantic tokens via existing `[data-theme]` runtime (REQ-21) — 00 L0 · 02 §3.
- Extend `tokens.css` only when semantics missing — incremental, no silent second palette in JSX — 02 §3 · 00 Q advisory.
- Theme/shell/feed test breakage expected — repair/extend — 03 intro · Q6.

## Implement notes
- Exercise light/dark + locale on critical feed controls; fix breaks.
- OOS: inventing account theme sync; dual hex in components.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-06
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] data-theme + locale stress: critical feed controls remain usable
- [x] No invent theme tokens outside existing system
