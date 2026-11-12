# SPA-NS-11-T02 — PublicFooter on profile

**Status:** Done
**Done:** `2026-10-23T13:49:54Z`
**Note:** FR-NS-11.1 · 11.2 footer parity · cabinet in main  
**Story:** [`../STORY-SPA-NS-11-profile-next-shell.md`](../STORY-SPA-NS-11-profile-next-shell.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T13:44:49Z`  
**Package:** `pkg-000213`  
**Path A:** evidence 03 · Interview S3 · next/feed chrome parity · p13UxReady

## Purpose

FR-NS-11.1 · 11.2: PublicFooter on profile if next/feed parity · cabinet content in main region.

## Code Facts (verify)

- AS-IS: protected default AppShell may omit PublicFooter
- Target: footer slot as next/feed pattern when profile uses next shell

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · no invent CAB-08 · no invent NS-12 · soft other protected routes OOS

## AC / DoD

- [x] Structure Present
- [x] Visual Done not claimed · OP eye Absent → gate **BLOCK**

## Where changed

`AppShellLayout.jsx` — PublicFooter slot on `/profile` next shell

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "profile|ProfileRail|next-shell|useFullShell" spa-app/src/layout/AppShellLayout.jsx
```

## @mockup

```text
@mockup: spa-app/docs/analysis/evidence/op-residual-wave4-2026-10-23/03-profile-wrong-shell.png
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md
```
