# Acceptance verification — STORY-SPA-REQ21-04 ThemeToggle Header

**Date:** `2026-10-06T20:27:07Z`  
**Package:** `pkg-000095`  
**Result:** **PASS**

## AC matrix

| ID | Result | Evidence |
|----|--------|----------|
| AC-SPA-REQ2104-01 | **PASS** | `ThemeToggle` in Header (`locale → theme → account`); `setThemeAttribute` switches `data-theme` |
| AC-SPA-REQ2104-02 | **PASS** | `localStorage['dogestonia.theme']` R/W · FOUC + `applyDefaultTheme` restore · tests |
| AC-SPA-REQ2104-03 | **PASS** | et/ru/en `appShell.theme.*` · `aria-pressed` / `aria-label` |

## Pin

No OS theme · no account sync · mockup-150 extends mockup-129 (slot only) · schemes from REQ21-03.

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run src/theme/__tests__/bootTheme.test.js src/components/ThemeToggle/__tests__/ThemeToggle.test.jsx src/components/AppShell/__tests__/Header.publicNav.test.jsx
cd spa-app && npm run test:ui:board-shell
```

Vitest **15/15 PASS** · board-shell smoke **exit 0** (`2026-10-06T20:30:01Z`).

## §UI screenshots pack (P6 F1/F2)

Story-root: [`../screenshots/README.md`](../screenshots/README.md) · [`../screenshots/full-cycle/`](../screenshots/full-cycle/)

| State | File |
|-------|------|
| A Dark | [`01-dark.png`](../screenshots/full-cycle/01-dark.png) |
| B Light | [`02-light.png`](../screenshots/full-cycle/02-light.png) |
| C Reload restore | [`03-reload-restore.png`](../screenshots/full-cycle/03-reload-restore.png) |

P6 CLOSED `2026-10-06T20:34:23Z` · `run_mode=spa_req21_04_audit_2026_10_06`.
