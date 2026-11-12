# SPA-CT-32-T03 — IssueTypeIcon + Close theme-safe

**Status:** Done  
**Done:** `2026-10-21T20:27:01Z`  
**Note:** IssueTypeIcon + FeedIssueMount Close · ShellChromeIcon mask · data-ct32-*  
**Story:** [`../STORY-SPA-CT-32-thread-dark-chrome.md`](../STORY-SPA-CT-32-thread-dark-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md)  
**ui_scope:** `thread-mount` · soft `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:17:30Z`  
**Package:** `pkg-000200`  
**Path A:** code lock · soft NS-07 mask pattern

## Purpose

FR-CT-32.3 · 32.4: Theme-safe IssueTypeIcon + FeedIssueMount Close glyph readable on dark (mask/currentColor or locked equivalent).

## Code Facts (verify)

- AS-IS: black `<img>` glyphs on dark for type + Close
- Target: mask/currentColor (reuse ShellChromeIcon / CrReactionIcon pattern)

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no new icon artboards · NS-07 shell OOS

## AC / DoD

- [x] Issue type glyph readable in dark
- [x] Close glyph readable in dark
- [x] Visual Done not claimed without OP eye

## Where changed

`IssueTypeIcon` · `FeedIssueMount` / PresentationChrome

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "IssueTypeIcon|mask|currentColor|close" spa-app/src/features/feed spa-app/src/components --glob '*Issue*'
```
