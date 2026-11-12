# SPA-NS-07-T02 — Rail + mobile nav glyphs

**Status:** Done  
**Story:** [`../STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:05:02Z`  
**Package:** `pkg-000199`
**P3 Done:** `2026-10-21T20:10:51Z`    
**Path A:** code lock · evidence wave2 `05` · Interview D5

## Purpose

FR-NS-07.2 · 07.3: Profile rail / shelter nav + mobile bottom nav icons readable on dark via same theme-safe pattern as T01.

## Code Facts (verify)

- AS-IS: AccountControl · MobileBottomNav · soft ProfileRail glyphs black on dark
- Target: rail + mobile nav inherit theme icon color

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · follow T01 pattern · CT-32 OOS

## AC / DoD

- [x] Rail / shelter icons readable on dark
- [x] Mobile nav icons readable on dark
- [x] Visual Done not claimed without OP eye

## Where changed

`AccountControl` · `MobileBottomNav` · soft `ProfileRail`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "mask|currentColor|img" spa-app/src/components/AppShell/
```
