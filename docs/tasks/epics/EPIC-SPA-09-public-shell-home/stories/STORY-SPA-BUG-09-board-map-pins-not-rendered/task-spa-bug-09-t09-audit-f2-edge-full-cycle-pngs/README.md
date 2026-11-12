# SPA-BUG-09-T09 — Edge full-cycle PNGs empty-pins + List (F2)

**Status:** Done · P6 `2026-10-03T15:25:37Z`  
**Story:** [`../STORY-SPA-BUG-09-board-map-pins-not-rendered.md`](../STORY-SPA-BUG-09-board-map-pins-not-rendered.md)  
**Decision Ref:** [audit-STORY-SPA-BUG-09-execution-2026-10-03.md](../../../../../../analysis/audit-STORY-SPA-BUG-09-execution-2026-10-03.md) · F2  
**ui_scope:** `visual` · **extends ui-mockup:** [`../task-spa-bug-09-t03-fix-loadimage-boot/ui-mockup-spec.md`](../task-spa-bug-09-t03-fix-loadimage-boot/ui-mockup-spec.md)  
**Skill declared:** `javascript-pro`  
**Scaffolded:** `2026-10-03T15:22:22Z`  
**Done:** `2026-10-03T15:25:37Z`  
**Package:** `pkg-000090` (unchanged · `run_mode=spa_bug_09_audit_2026_10_03`)  
**Gap:** F2 Medium → **CLOSED**

## Purpose

Capture UI-1 Edge states into story-root `screenshots/full-cycle/`: empty-pins + List mode. Update README inventories. No product code. No H2 invent Pass.

## Code Facts (As-of-Done)

| # | Claim | Evidence |
|---|-------|----------|
| 1 | List Edge PNG Present | [`../screenshots/full-cycle/bug09-edge-list-mode-1536x1024.png`](../screenshots/full-cycle/bug09-edge-list-mode-1536x1024.png) · live `#/board` · List pressed |
| 2 | empty-pins Edge PNG Present | [`../screenshots/full-cycle/bug09-edge-empty-pins-1536x1024.png`](../screenshots/full-cycle/bug09-edge-empty-pins-1536x1024.png) · `data-testid="board-map-empty-pins"` · **DOM-inject** in Board Map chrome (live Map path unreachable: `BoardPage` `mapEligible` ≡ `pinCapable≥1`) |
| 3 | Inventories updated | [`../screenshots/README.md`](../screenshots/README.md) · [`../screenshots/full-cycle/README.md`](../screenshots/full-cycle/README.md) |
| 4 | No product `src/` | docs/screenshots only |

## AC / DoD

- [x] (P0) full-cycle PNG: empty-pins state Present — **F2**
- [x] (P0) full-cycle PNG: List mode Present — **F2**
- [x] (P0) Listed in screenshots READMEs
- [x] (P0) No product `src/` · no invent H2 geo Pass

## Where changed

- `…/screenshots/full-cycle/bug09-edge-list-mode-1536x1024.png` (NEW)
- `…/screenshots/full-cycle/bug09-edge-empty-pins-1536x1024.png` (NEW)
- `…/screenshots/README.md` · `full-cycle/README.md`

## Out of scope

screenshots/README-only (T08) · backlog As-of-Done (T10) · H2 disperse pins · BoardIssuesMap rewrite · pkg-000090 edit

## Verification

```bash
ls spa-app/docs/tasks/epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-BUG-09-board-map-pins-not-rendered/screenshots/full-cycle/
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
