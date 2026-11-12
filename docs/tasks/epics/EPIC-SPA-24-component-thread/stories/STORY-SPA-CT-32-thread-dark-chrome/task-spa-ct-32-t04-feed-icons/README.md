# SPA-CT-32-T04 — Soft feed civic icons theme-safe

**Status:** Done  
**Done:** `2026-10-21T20:27:01Z`  
**Note:** FeedCivicPost comment/share ShellChromeIcon · soft NS-07 pattern  
**Story:** [`../STORY-SPA-CT-32-thread-dark-chrome.md`](../STORY-SPA-CT-32-thread-dark-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md)  
**ui_scope:** `feed` · soft `thread-mount` · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:17:30Z`  
**Package:** `pkg-000200`  
**Path A:** code lock · soft NS-07 pattern

## Purpose

FR-CT-32.5: Feed civic strip action icons (comment/share/filter) readable on dark — soft next-feed CSS/components; same theme-safe pattern as NS-07.

## Code Facts (verify)

- AS-IS: civic/toolbar `<img>` black on dark
- Target: mask/currentColor on FeedCivicPost / FeedToolbar soft surfaces

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Soft next-feed only · NF-18 strip density OOS · no invent OP PASS

## AC / DoD

- [x] Feed action icons readable in dark (soft)
- [x] Visual Done not claimed without OP eye

## Where changed

`FeedCivicPost` · `FeedToolbar` soft · related CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "mask|currentColor|data-ns07|shell-chrome" spa-app/src/features/feed
```
