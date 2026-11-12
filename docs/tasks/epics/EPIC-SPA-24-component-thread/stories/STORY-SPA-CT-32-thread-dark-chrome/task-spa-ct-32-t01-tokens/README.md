# SPA-CT-32-T01 — Theme tokens dark+light

**Status:** Done  
**Done:** `2026-10-21T20:27:01Z`  
**Note:** tokens.css dark+light --tm-bubble-fill / --color-text-link Present  
**Story:** [`../STORY-SPA-CT-32-thread-dark-chrome.md`](../STORY-SPA-CT-32-thread-dark-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md)  
**ui_scope:** `thread-mount` · soft `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:17:30Z`  
**Package:** `pkg-000200`  
**Path A:** code lock · ARCHITECTURE §18 · Interview D5 · D6

## Purpose

FR-CT-32.1 · 32.2: Add `--tm-bubble-fill` / `--color-text-link` (and related) under dark+light in `tokens.css` — supersede light-only cream hex as Done for dark.

## Code Facts (verify)

- AS-IS: fixed cream / light-only bubble tokens · link contrast Absent or weak on dark
- Target: dual-theme tokens for bubble fill + high-contrast link

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · tokens SSOT `tokens.css`

## AC / DoD

- [x] Dark+light bubble/link tokens Present
- [x] Visual Done not claimed without OP eye

## Where changed

`tokens.css` (theme SSOT)

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "tm-bubble-fill|color-text-link|data-theme" spa-app/src --glob '*tokens*'
```
