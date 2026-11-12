# SPA-CT-32-T02 — Remap bubbles / composer to tokens

**Status:** Done  
**Done:** `2026-10-21T20:27:01Z`  
**Note:** CommentNode/Tree/Composer → theme tokens · show-more --color-text-link  
**Story:** [`../STORY-SPA-CT-32-thread-dark-chrome.md`](../STORY-SPA-CT-32-thread-dark-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-32-thread-dark-chrome.md)  
**ui_scope:** `thread-mount` · soft `feed` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-21T20:17:30Z`  
**Package:** `pkg-000200`  
**Path A:** code lock · ARCHITECTURE §18

## Purpose

FR-CT-32.1 · 32.2 · 32.6: Remap CommentNode / CommentTree / ThreadComposer CSS to theme tokens so body + quote + show-more readable in dark; light held.

## Code Facts (verify)

- AS-IS: cream `#f7f6f2` / fixed fills · quote invisible on dark · show-more low contrast
- Target: token-backed fills/text/link · no fixed cream Done claim

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- Depends T01 tokens · no invent OP PASS

## AC / DoD

- [x] Bubbles/quote/composer readable in dark
- [x] Show more high contrast
- [x] Light theme held
- [x] Visual Done not claimed without OP eye

## Where changed

`thread-mount/tree/CommentNode.css` · `CommentTree.css` · `ThreadComposer.css`

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "#f7f6f2|tm-bubble|color-text-link" spa-app/src/features/thread-mount
```
