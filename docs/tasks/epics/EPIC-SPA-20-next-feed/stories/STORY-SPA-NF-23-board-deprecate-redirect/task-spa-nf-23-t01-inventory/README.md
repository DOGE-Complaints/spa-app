# SPA-NF-23-T01 — List board-only vs shared

**Status:** Done  
**Story:** [`../STORY-SPA-NF-23-board-deprecate-redirect.md`](../STORY-SPA-NF-23-board-deprecate-redirect.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md`](../../../../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md)  
**ui_scope:** `feed` / routes · **mixed**  
**ui_anchor:** false  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-22T14:23:16Z`  
**Package:** `pkg-000206`  
**Path A:** Interview B11 · ARCH-DELTA §11 · analysis Present

## Purpose

FR-NF-23.3 · 23.4: Inventory classic board-only vs shared next-feed modules. Do not mass-delete without list. Keep shared map/filters/boardQuery. Document spaghetti risks (cite analysis).

## Code Facts (verify)

- AS-IS: `BoardPage` · `features/board` · shared `router/boardQuery` · Filters · map used by next-feed
- Target: inventory note Present · zero-importer board-only candidates listed · no purge this task unless list proves safe

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- No invent OP PASS · no invent CDN · no mass-delete without inventory

## AC / DoD

- [x] Inventory note Present (board-only vs shared) — [`../inventory-board-vs-shared.md`](../inventory-board-vs-shared.md)
- [x] Shared modules kept / documented
- [x] Visual Done not claimed without OP eye · gate **BLOCK**

## Where changed

analysis inventory note (story docs or `docs/analysis/`) · soft App/features/board skim

## Verification

```bash
rg -n "BoardPage|features/board|boardQuery" spa-app/src --glob '*.{jsx,js}' | head -40
```
