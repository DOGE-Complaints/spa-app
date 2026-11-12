# SPA-NS-13-T02 — No focusable hidden controls

**Status:** Done  
**Done:** `2026-10-23T14:15:41Z`  
**Note:** gated nodes not rendered → not in tab order  
**Story:** [`../STORY-SPA-NS-13-hide-header-search-notifications.md`](../STORY-SPA-NS-13-hide-header-search-notifications.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-13-hide-header-search-notifications.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-13-hide-header-search-notifications.md)  
**ui_scope:** `shell` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:10:21Z`  
**Package:** `pkg-000215`  
**Path A:** evidence 07 · Interview H7 · p13UxReady

## Purpose

FR-NS-13.1 · 13.2: Hidden controls not focusable (a11y).

## Code Facts (verify)

- Target: gated nodes not in tab order · no invent API — **Done** (conditional render; queryByTestId Null)

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Keep gated markup/handlers · no invent OP PASS · no invent search API · no invent notification center · NS-14 OOS

## AC / DoD

- [x] Structure Present
- [x] Visual Done not claimed · OP eye Absent → gate **BLOCK**

## Where changed

`Header.jsx` — gated search/notif not mounted when flag false (no focusable hidden controls)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "search-affordance|notifications-chrome|NS13" spa-app/src/components/AppShell/Header.jsx
```

## @mockup

```text
@mockup: spa-app/docs/analysis/evidence/op-residual-wave4-2026-10-23/07-header-search-notifications.png
```
