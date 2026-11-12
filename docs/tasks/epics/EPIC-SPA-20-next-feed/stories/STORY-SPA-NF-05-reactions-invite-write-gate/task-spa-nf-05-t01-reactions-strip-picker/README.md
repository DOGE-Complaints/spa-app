# SPA-NF-05-T01 — Reactions.v1 strip/picker + Closed PUT + local catalog

**Status:** Done · P3 (`2026-10-10T19:27:30Z`)  
**Story:** [`../STORY-SPA-NF-05-reactions-invite-write-gate.md`](../STORY-SPA-NF-05-reactions-invite-write-gate.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** true  
**UI routes:** `/#/next/feed`  
**puppeteer_gate:** `test:ui:board-shell`  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:23:08Z`  
**Package:** `pkg-000107`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)  

## Purpose
Reactions.v1 strip/picker + Closed PUT + local catalog.


## Arch anchors
- [02 §1–2 reactions reuse + honesty](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 Q4 one data plane](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Reactions.v1 via Closed PUT + local catalog — reuse threads reaction modules behind feed presentation — 02 §1.
- No invent reaction ids beyond catalog; no people/Connect API (M155 OOS) — 02 §2 · 00 §5.
- Fail-soft: reaction errors must not remove Issue — 02 §2.

## Implement notes
- Wire strip/picker on feed Issue/comment surfaces.
- OOS: M155 people lists; invent reaction HTTP.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-05
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Reactions strip/picker with catalog ids only
- [x] Closed PUT reactions; no invent reaction ids
- [x] No people/Connect surfaces (M155 OOS)
