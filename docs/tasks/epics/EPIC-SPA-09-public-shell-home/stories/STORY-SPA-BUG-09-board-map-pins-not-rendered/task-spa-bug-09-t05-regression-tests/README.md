# SPA-BUG-09-T05 — Vitest mocked map boot path

**Status:** Done · P3 `2026-10-03T15:18:08Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** backlog STORY-SPA-BUG-09 · AC-BUG-09-02/04  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:08:51Z`  
**Package:** `pkg-000090`

## Purpose

Vitest: mocked map loadImage resolves; assert addSource/addLayer; hasImage branch; empty-pins unchanged.

## Code Facts (P3)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | NEW `src/components/map/__tests__/BoardIssuesMap.test.jsx` | 3 tests · `@vitest-environment jsdom` |
| 2 | Live run | `npx vitest run src/components/map/__tests__/BoardIssuesMap.test.jsx` → **3 passed** (`2026-10-03T15:18:08Z`) |

## AC / DoD

- [x] (P0) Promise boot mounts source/layers — **AC-BUG-09-02/04**
- [x] (P0) hasImage short-circuit covered — **AC-BUG-09-02/04**
- [x] (P0) empty-pins path unchanged when pinIssues empty — **AC-BUG-09-02/04**

## Where to change

- src/components/map/__tests__/BoardIssuesMap.test.jsx

## Out of scope

H2 life-sim geo · gateway invent · MapLibre downgrade · other BUG pkgs

## Verification

```bash
cd spa-app && npx vitest run src/components/map/__tests__/BoardIssuesMap.test.jsx
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
