# SPA-NS-16-T01 — Default unset → light

**Status:** Done  
**Story:** [`../STORY-SPA-NS-16-default-theme-light.md`](../STORY-SPA-NS-16-default-theme-light.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-16-default-theme-light.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-16-default-theme-light.md)  
**ui_scope:** next-shell / theme · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-24T09:48:12Z`  
**Package:** `pkg-000221`  
**Path A:** arch Present · Interview M8 · p13UxReady

## Purpose

FR-NS-16.1 · 16.2: When storage unset and no prior `data-theme`, default **`light`**. Stored `dark`/`light` win. No OS prefers-color-scheme invent.

## Code Facts (verify)

- AS-IS: `bootTheme.js` + `index.html` FOUC default `'dark'` when unset  
- Target: default `'light'` · stored wins

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- **no invent OP PASS** · no prefers-color-scheme invent · NS-15 brand OOS · account sync OOS

## AC / DoD

- [x] Structure Present (P3 `2026-10-24T09:52:23Z`)  
- [x] Visual gate **BLOCK** (OP eye Absent · Partial · no invent PASS)

## Where changed

src/theme/bootTheme.js · index.html FOUC → light

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "data-theme|'dark'|'light'|THEME_STORAGE" spa-app/src/theme spa-app/index.html 2>/dev/null | head -40
```

## @mockup

```text
@mockup: spa-app/docs/architecture/next-feed-vl/16-default-theme-light.md
```
