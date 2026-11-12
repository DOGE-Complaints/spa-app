# SPA-NF-05-T04 — Wire reaction + collaboration-invite icons (+ shell verified/close)

**Status:** Done · P3 (`2026-10-10T19:27:30Z`) · story gate  
**Story:** [`../STORY-SPA-NF-05-reactions-invite-write-gate.md`](../STORY-SPA-NF-05-reactions-invite-write-gate.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md)  
**ui_scope:** `feed`  
**ui_anchor:** false  
**extends mockup:** [`../task-spa-nf-05-t01-reactions-strip-picker/README.md`](../task-spa-nf-05-t01-reactions-strip-picker/README.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:23:08Z`  
**Package:** `pkg-000107`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  

## Purpose
Wire reaction + collaboration-invite icons (+ shell verified/close).


## Arch anchors
- [02 §3 tokens](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)

## Arch context
- Reaction + `collaboration-invite` icons under `/icons/next-feed/…`; `verified`/`close` = next-shell reuse.
- Token/`currentColor` — 02 §3. Do not promote `connect` (M155 OOS).

## Implement notes
- Wire picker/strip/stub/gate chrome icons from catalog.
- OOS: connect icon promote; Lucide generate.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-05
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Reaction/invite icons use catalog runtime URLs
- [x] Shell verified/close reuse where needed
