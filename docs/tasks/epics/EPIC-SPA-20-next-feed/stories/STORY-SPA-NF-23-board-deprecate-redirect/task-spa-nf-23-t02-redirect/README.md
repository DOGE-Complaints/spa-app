# SPA-NF-23-T02 — App.jsx Navigate `#/board` → `#/next/feed`

**Status:** Done  
**Story:** [`../STORY-SPA-NF-23-board-deprecate-redirect.md`](../STORY-SPA-NF-23-board-deprecate-redirect.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md)  
**ui_scope:** `feed` / routes · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:23:16Z`  
**Package:** `pkg-000206`  
**Path A:** Interview B11 · ARCH-DELTA §11 · p13UxReady

## Purpose

FR-NF-23.1: `#/board` redirects to `#/next/feed` with `replace`. Soft update NS-06 test that currently asserts `/board` reachable.

## Code Facts (verify)

- AS-IS: `App.jsx` `<Route path="/board" element={<BoardPage />} />`
- AS-IS: `/` and `*` already Navigate → `/next/feed`
- Target: `/board` → `<Navigate to="/next/feed" replace />` (or equivalent)

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · inventory (T01) before purge of BoardPage files

## AC / DoD

- [x] `/board` replace-redirects to `/next/feed`
- [x] Soft NS-06 expectation updated
- [x] Visual Done not claimed without OP eye · gate **BLOCK**

## Where changed

`App.jsx` · soft `App.ns06DefaultEntry.test.jsx`

## Verification

```bash
rg -n 'path="/board"|Navigate to="/next/feed"' spa-app/src/App.jsx
```
