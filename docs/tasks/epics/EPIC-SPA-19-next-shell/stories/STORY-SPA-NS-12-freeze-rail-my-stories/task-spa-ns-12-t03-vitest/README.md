# SPA-NS-12-T03 — Update NS-03/09 tests

**Status:** Done
**Done:** `2026-10-23T14:03:30Z`
**Note:** ns12 **2/2** · ns03/09 held · CAPTURE-META fails: []  
**Story:** [`../STORY-SPA-NS-12-freeze-rail-my-stories.md`](../STORY-SPA-NS-12-freeze-rail-my-stories.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T13:59:33Z`  
**Package:** `pkg-000214`  
**Path A:** Interview R4 code lock · p13UxReady

## Purpose

FR-NS-12.4: Vitest · update NS-03/09 tests · OP eye no invent PASS.

## Code Facts (verify)

- Target: ProfileRail.ns03/ns09 asserts · My stories Absent · Feed+Profile held

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Keep gated code for later unfreeze · no invent OP PASS · no invent story list · no invent CAB-08 HTTP

## AC / DoD

- [x] Structure Present
- [x] Visual Done not claimed · OP eye Absent → gate **BLOCK**

## Where changed

`ProfileRail.ns12.test.jsx` · ns03 updated · `scripts/tmp-ns12-capture.mjs`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "my-stories|profile-rail-nav-my" spa-app/src/components/AppShell
```

## @mockup

```text
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md
```
