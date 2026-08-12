# SPA-BUG-02-T02 — Transparent asset or matching surface

**Status:** Done — P3 PASS 2026-08-07T11:53:11Z · **P4 verified** · residual F1 ([audit](../../../../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md))  
**Story:** [`../STORY-SPA-BUG-02-logo-background-mismatch.md`](../STORY-SPA-BUG-02-logo-background-mismatch.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md) FR-BUG-02.2–02.5 · pin rules §D  
**Depends on:** SPA-BUG-02-T01  
**ui_scope:** `chrome`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T11:41:33Z  
**Package:** `pkg-000054`

## Purpose
Реализовать **только** слой из T01 `pin_layer` / `decision_lean`: prefer **transparent** logo (+ surfaces documented) **или** verified surface↔pad match — без full palette redesign.

## Risk
Несогласованный fix оставляет RGB pad на `--color-bg-secondary` strip; третий «почти night» hex без tokens doc.

## Code Facts (closed)
- Applied `decision_lean: transparent_asset` — RGBA flood-fill pad; backup opaque RGB kept.
- Evidence: [`evidence-…115311Z.md`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-fix-t02-2026-08-07T115311Z.md)
- Fallback SVG: opaque rect removed.
- Consumers paths unchanged (same `/assets/DOGEstonia-logo-big.png`).

## AC / DoD
- [x] (P0) Primary logo path не RGB-pad на secondary strip (transparent **или** verified match) → FR-BUG-02.3 · AC #4.
- [x] (P0) Нет видимой подложки на public header + footer (viewport matrix → T04) → FR-BUG-02.2.
- [x] (P0) Consumers обновлены единообразно; fallback не хуже primary → FR-BUG-02.5 · AC #5.
- [x] (P0) `#0B1320` остаётся Night token → FR-BUG-02.4.
- [x] (P0) Fix limited to T01 pin (asset); no full palette redesign.

## Where to change
- `public/assets/DOGEstonia-logo-big.png` (+ `.opaque-rgb-backup.png`)
- `public/assets/DOGEstonia-logo-fallback.svg`

## Out of scope
Placeholder icons; PH-08 composition; PH-09 sidebar mode; landing logo; strip=`#0B1320` everywhere without product sign-off.

## Verification
```bash
cd spa-app && python3 -c "from PIL import Image; im=Image.open('public/assets/DOGEstonia-logo-big.png'); print(im.mode)"
```
