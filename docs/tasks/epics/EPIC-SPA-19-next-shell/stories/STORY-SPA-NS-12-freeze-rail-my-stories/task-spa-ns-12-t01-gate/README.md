# SPA-NS-12-T01 — Hide/gate My stories NavLink

**Status:** Done
**Done:** `2026-10-23T14:03:30Z`
**Note:** My stories Absent · Feed+Profile held  
**Story:** [`../STORY-SPA-NS-12-freeze-rail-my-stories.md`](../STORY-SPA-NS-12-freeze-rail-my-stories.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T13:59:33Z`  
**Package:** `pkg-000214`  
**Path A:** Interview R4 code lock · p13UxReady

## Purpose

FR-NS-12.1: ProfileRail does not show My stories nav item (gate/hide — keep code for later unfreeze).

## Code Facts (verify)

- AS-IS: `profile-rail-nav-my-stories` NavLink Present
- Target: gate/hide · keep code · Feed + Profile held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Keep gated code for later unfreeze · no invent OP PASS · no invent story list · no invent CAB-08 HTTP

## AC / DoD

- [x] Structure Present
- [x] Visual Done not claimed · OP eye Absent → gate **BLOCK**

## Where changed

`ProfileRail.jsx` — NS12_SHOW_MY_STORIES=false · keep NavLink code gated

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "my-stories|profile-rail-nav-my" spa-app/src/components/AppShell
```

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md
```
