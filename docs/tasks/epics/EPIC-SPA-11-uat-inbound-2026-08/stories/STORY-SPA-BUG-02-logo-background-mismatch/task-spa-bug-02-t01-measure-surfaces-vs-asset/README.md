# SPA-BUG-02-T01 — Measure surfaces vs logo asset

**Status:** Done — P3 PASS 2026-08-07T11:49:42Z · **P4 verified** ([audit](../../../../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-02-logo-background-mismatch.md`](../STORY-SPA-BUG-02-logo-background-mismatch.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) FR-BUG-02.1 · Diagnostic playbook A–C  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T11:41:33Z  
**Package:** `pkg-000054`

## Purpose
Зафиксировать **таблицу hex** «asset pad vs parent surface» (header/footer/sidebar) + `decision_lean` / `pin_layer` по schema backlog §C — до любого asset/CSS fix (T02).

## Risk
Fix без measure → случайный цвет / перекраска всего shell без pin.

## Code Facts (closed)
- Evidence: [`evidence-STORY-SPA-BUG-02-measure-2026-08-07T114942Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-measure-2026-08-07T114942Z.md)
- Pre-fix asset: RGB 982×954, no alpha; corners `#01091C`–`#030A1E`
- Strip/sidebar `#111C2B`; Night `#0B1320`
- `decision_lean: transparent_asset` · `pin_layer: asset`

## AC / DoD
- [x] (P0) Measure / evidence note exists (`asset.has_alpha`, corner hex, strip hex) → FR-BUG-02.1 · backlog AC #1.
- [x] (P0) `decision_lean` зафиксирован и согласован с product rule (prefer transparent) → backlog AC #2 · pin rules §D.
- [x] (P0) No product asset/CSS replace in this task (T02 only).

## Where to change
- Evidence note — done

## Out of scope
Asset replace (T02); placeholder icons; palette redesign; landing logo; PH-08/09.

## Verification
```bash
rg -n "decision_lean|has_alpha|corner_hex" spa-app/docs/analysis/evidence-STORY-SPA-BUG-02*
```
