# Acceptance verification — STORY-SPA-BUG-02 (story gate)

- **Story:** Logo background color mismatch
- **Result:** PASS (P3) · **P6 T07** footer evidence attached — FR-02.2 header+footer desktop+narrow **PASS**
- **Date:** 2026-08-07T17:57:43Z (P6 T07 amend; prior P3 2026-08-07T11:54:23Z)
- **Package:** `pkg-000054` · `run_mode=spa_bug_02_audit_2026_08_07` (T06/T07)

## Backlog AC / FR

| AC / FR | Status | Evidence |
|---------|--------|----------|
| FR-BUG-02.1 Measure note | PASS | [`evidence-…114942Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-measure-2026-08-07T114942Z.md) |
| FR-BUG-02.2 No outer pad header+footer desktop+narrow | **PASS** | Header: [`evidence-…115423Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-viewports-2026-08-07T115423Z.md) · Footer: [`evidence-…175743Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-footer-2026-08-07T175743Z.md) · crops `bug02-footer-logo-crop-desktop.png` / `bug02-footer-logo-crop-narrow.png` · pad `#02091D` **0** · surface `#0B1320` |
| FR-BUG-02.3 transparent prefer | PASS | RGBA flood-fill · [`evidence-…115311Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-02-fix-t02-2026-08-07T115311Z.md) |
| FR-BUG-02.4 Night `#0B1320` kept | PASS | tokens.css unchanged |
| FR-BUG-02.5 Consumers + fallback | PASS | same PNG path · SVG pad rect removed |
| FR-BUG-02.6 Placeholder icons | PASS (non-blocking) | out of gate per FR |

## Commands

```bash
cd spa-app && python3 -c "from PIL import Image; im=Image.open('public/assets/DOGEstonia-logo-big.png'); print(im.mode)"
cd spa-app && npm test -- --run src/components/AppShell/__tests__/Header.publicNav.test.jsx src/components/PublicFooter/__tests__/PublicFooter.test.jsx
cd spa-app && npm run test:ui:board-shell
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
```
