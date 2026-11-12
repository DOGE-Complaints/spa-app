# SPA-NF-05-T02 — Invite organization stub only — no invent escalate HTTP

**Status:** Done · P3 (`2026-10-10T19:27:30Z`)  
**Story:** [`../STORY-SPA-NF-05-reactions-invite-write-gate.md`](../STORY-SPA-NF-05-reactions-invite-write-gate.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md)  
**ui_scope:** `feed`  
**ui_complexity:** `standard`  
**ui_anchor:** false  
**extends mockup:** [`../task-spa-nf-05-t01-reactions-strip-picker/README.md`](../task-spa-nf-05-t01-reactions-strip-picker/README.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-10T19:23:08Z`  
**Package:** `pkg-000107`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png)  

## Purpose
Invite organization stub only — no invent escalate HTTP.


## Arch anchors
- [02 §2 honesty / no invent endpoints](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [03 §4 PNG/API invent risks](../../../../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)

## Arch context
- Invite organization = **stub** informational chrome only — no send/persist HTTP (DUI-Q18) — 02 §2.
- Reuse existing stub module honesty (“No invent escalate HTTP”) behind feed presentation — 02 §1.
- Do not claim Product Done for real org invite — 03 §4 false Done risk pattern.

## Implement notes
- Compose stub into feed escalation chrome; feedback-only.
- OOS: invent escalate endpoints; false success toasts.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-05
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Invite control is informational stub only
- [x] No false success / no invent escalate HTTP
