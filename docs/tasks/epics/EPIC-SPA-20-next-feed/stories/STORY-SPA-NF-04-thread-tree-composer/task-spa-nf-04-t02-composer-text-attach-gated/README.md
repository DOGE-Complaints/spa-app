# SPA-NF-04-T02 — Composer text path (Q06) + attach gated; no multipart invent

**Status:** Done · P3 (`2026-10-10T19:13:32Z`)  
**Story:** [`../STORY-SPA-NF-04-thread-tree-composer.md`](../STORY-SPA-NF-04-thread-tree-composer.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** false  
**extends mockup:** [`../task-spa-nf-04-t01-compose-closed-thread-tree/README.md`](../task-spa-nf-04-t01-compose-closed-thread-tree/README.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:06:39Z`  
**Package:** `pkg-000106`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png)  


## Purpose
Composer text path (Q06) + attach gated; no multipart invent.


## Arch anchors
- [02 §2 write honesty / confirmed slice](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [02 §1 threads reuse](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Text composer path only (DUI-Q06) — confirmed UI slice — 02 §2.
- Attach = Closed `attachment-refs` (refs only); UI gated — no multipart blob invent — 02 §1–2.
- Write-gate UX details (`identity_verified`) owned with NF-05 — keep composer ready for gate.
- Fail-soft write failures map Closed fail kinds — do not invent escalate HTTP.

## Implement notes
- Wire root/reply createComment via Closed POST + Bearer.
- OOS: blob upload; invent attach media types beyond Closed refs.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-04
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Text path works; attach gated without multipart invent
- [x] No invent comment endpoints
