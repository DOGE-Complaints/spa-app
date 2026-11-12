# Acceptance verification — STORY-SPA-REQ21-02 CSS ownership board migrate

**Date:** `2026-10-06T19:58:42Z`  
**Package:** `pkg-000093`  
**Result:** **PASS**

## AC matrix

| ID | Result | Evidence |
|----|--------|----------|
| AC-SPA-REQ2102-01 | **PASS** | `src/index.css` reset-only (~23 LOC, **0** `.board-`); shell → `AppShell.css` / `LocaleSelector.css`; board → `BoardPage.css`; issue → `IssuePage.css` · [ownership-inventory](../task-spa-req21-02-t01-classify-index-board-rules/ownership-inventory.md) |
| AC-SPA-REQ2102-02 | **PASS** | Vitest BoardPage.shell / IssuePage.integration / HowItWorksPage / AppShell.showSidebar **17/17**; `npm run test:ui:board-shell` **PASS** |

## Pin

Behavior-preserving CSS ownership migrate; no theme/`data-theme`; no redesign invent; no class rename.

## Commands

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
wc -l spa-app/src/index.css; rg -c '\\.board-' spa-app/src/index.css || echo 0
cd spa-app && npm test -- --run BoardPage.shell IssuePage.integration HowItWorksPage AppShell.showSidebar
cd spa-app && npm run test:ui:board-shell
```
