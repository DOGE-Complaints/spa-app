# SPA-NS-07-T03 — Light theme hold

**Status:** Done  
**Story:** [`../STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:05:02Z`  
**Package:** `pkg-000199`
**P3 Done:** `2026-10-21T20:10:51Z`    
**Path A:** code lock · Interview D5

## Purpose

FR-NS-07.5: Light theme icons remain readable — no invert-only hack that breaks light.

## Code Facts (verify)

- AS-IS: light shell icons Present readable
- Risk: dark-only `filter: invert` / forced white breaks light
- Target: theme-token path works for both `data-theme=light` and `dark`

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · soft ThemeToggle check

## AC / DoD

- [x] Light theme icons held readable
- [x] Visual Done not claimed without OP eye

## Where changed

ThemeToggle soft · Header/rail/mobile CSS · soft theme tokens

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "invert|filter:|data-theme" spa-app/src/components/AppShell/
```
