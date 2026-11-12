# SPA-NS-07-T01 — Theme-safe header glyphs

**Status:** Done  
**Story:** [`../STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:05:02Z`  
**Package:** `pkg-000199`
**P3 Done:** `2026-10-21T20:10:51Z`    
**Path A:** code lock · evidence wave2 `06` · Interview D5

## Purpose

FR-NS-07.1 · 07.4: Header chrome icons (search · language chevron · notifications · account) readable on dark via mask/`currentColor` (reuse CrReactionIcon) — not invent per-file black SVG masters unless needed.

## Code Facts (verify)

- AS-IS: Header `<img src=*.svg>` glyphs stay black on dark
- Target: theme-safe header glyphs inherit token/icon color on dark + light

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no new icon artboards · CT-32 / NF-18 / map OOS

## AC / DoD

- [x] Header icons readable on dark
- [x] Theme-safe pattern Present
- [x] Visual Done not claimed without OP eye

## Where changed

`src/components/AppShell/Header.jsx` · `Header.css` · soft icon CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "mask|currentColor|img" spa-app/src/components/AppShell/Header.jsx spa-app/src/components/AppShell/Header.css
```
