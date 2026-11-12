# SPA-NS-11-T03 — Route shell markers

**Status:** Done
**Done:** `2026-10-23T13:49:54Z`
**Note:** Vitest ns11 **4/4** · cabinet **9/9** · Path A CAPTURE-META fails: []  
**Story:** [`../STORY-SPA-NS-11-profile-next-shell.md`](../STORY-SPA-NS-11-profile-next-shell.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T13:44:49Z`  
**Package:** `pkg-000213`  
**Path A:** evidence 03 · Interview S3 · next/feed chrome parity · p13UxReady

## Purpose

FR-NS-11.4: Vitest route shell markers — Header/ProfileRail Present · Workspace sidebar Absent · OP eye no invent PASS.

## Code Facts (verify)

- Target: layout/AppShell tests assert `/profile` next-shell markers · Partial=BLOCK

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · no invent CAB-08 · no invent NS-12 · soft other protected routes OOS

## AC / DoD

- [x] Structure Present
- [x] Visual Done not claimed · OP eye Absent → gate **BLOCK**

## Where changed

`AppShellLayout.ns11Profile.test.jsx` · `UserCabinetPage.test.jsx` NS-11 asserts · `scripts/tmp-ns11-capture.mjs`

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
