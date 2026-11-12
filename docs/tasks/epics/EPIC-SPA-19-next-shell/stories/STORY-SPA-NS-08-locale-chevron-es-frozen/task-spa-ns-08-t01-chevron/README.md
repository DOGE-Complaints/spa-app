# SPA-NS-08-T01 — Chevron icon (not v/^)

**Status:** Done  
**Done:** `2026-10-22T12:31:42Z`  
**Note:** ShellChromeIcon chevron-down · no literal v/^ · data-ns07 mask  
**Story:** [`../STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md`](../../../../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md)  
**ui_scope:** `shell` · soft `#/next/feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T12:25:23Z`  
**Package:** `pkg-000201`  
**Path A:** code lock · Interview L1 · soft NS-07 ShellChromeIcon

## Purpose

FR-NS-08.1: Trailing control uses chevron **icon** (not literal `v`/`^`) — soft REUSE `ShellChromeIcon` / next-shell chevron catalog.

## Code Facts (verify)

- AS-IS: `LocaleSelector.jsx` `trailingIcon={<span>{isOpen ? '^' : 'v'}</span>}`
- Target: theme-safe chevron glyph (open/closed) · no invent artboard

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent ES dictionary · Rail/logo OOS

## AC / DoD

- [x] Chevron icon Present
- [x] Visual Done not claimed without OP eye

## Where changed

`LocaleSelector.jsx` · soft CSS

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "trailingIcon|ShellChromeIcon|chevron|\\^|'v'" spa-app/src/components/LocaleSelector
```
