# SPA-NF-05-T03 — Verify-before-write via `identity_verified` on GET `/me` (no auto `/verify`)

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
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)  
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png)  

## Purpose
Verify-before-write via `identity_verified` on GET `/me` (no auto `/verify`).


## Arch anchors
- [02 §2 write gate — draft preserve; generic 403 ≠ auto `/verify`](../../../../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md)
- [00 L4 auth plane](../../../../../../architecture/feed-visual-redesign-phase-1/00-overview.md)

## Arch context
- Write gate = opaque `identity_verified` from identity `GET /me` (existing auth plane) — 00 L4 · 02 §2.
- Draft preserve; **generic 403 ≠ auto `/verify`** until discriminator (AC-07 / DUI-Q07) — 02 §2.
- No invent verify HTTP for feed; reuse `verifyWriteGate` / `meIdentityVerified` helpers.

## Implement notes
- Gate comment/react writes; honest denial UX with draft keep.
- OOS: auto redirect to `/verify` on every 403; cabinet redesign.

## Constraints
- No invent gateway/threads/identity endpoints or fields.
- Shell chrome (Header/rails/AppShell) OOS — next-shell Done.
- Icons: cite `/icons/next-feed/…` or next-shell reuse; promote already Done (ADMIN-NF-02).
- Code home: `features/feed/`; reuse `ThreadsSocialClient` / threads UI modules.

## AC / DoD
- [x] Purpose complete per backlog FR/AC for NF-05
- [x] Runtime icon URLs from catalog (no docs masters)
- [x] No shell D2 ownership claim
- [x] Writes gated on identity_verified from GET /me
- [x] Draft preserved on honest denial; no auto /verify redirect
