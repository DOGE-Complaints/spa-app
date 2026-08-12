# Story acceptance gate — STORY-SPA-PH-09-public-sidebar-display-mode

- **Story:** Public sidebar display mode (reversible)
- **Package:** `pkg-000057-20260808-epic-spa-11-ph-09-sidebar-display.yaml`
- **Result:** PASS
- **Date:** 2026-08-08T09:04:55Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Public: нет постоянной WORKSPACE-колонки при default constant. | PASS | `PUBLIC_SHELL_SHOW_SIDEBAR=false` · Board/HIW/Issue · UI-3 · board-shell · BoardPage.shell.test |
| Cabinet: sidebar на месте. | PASS | AppShellLayout default · UserCabinetPage.test `.board-sidebar` |
| Constant flip documented → restore path. | PASS | pipeline §Contract · [`publicShell.js`](../../../../../../../src/config/publicShell.js) comment |
| Narrow без пустой зависимости от удалённой колонки. | PASS | `.board-main--no-sidebar` · UI-3 narrow 390 PNG |

## UI verification (§UI)

| Item | Status | Path |
|------|--------|------|
| UI-0 baseline | PASS | [`../task-spa-ph-09-t02-appshell-css-showSidebar/ui-baseline/`](../task-spa-ph-09-t02-appshell-css-showSidebar/ui-baseline/) |
| UI-1 Path A | PASS | [`../task-spa-ph-09-t02-appshell-css-showSidebar/ui-mockup-spec.md`](../task-spa-ph-09-t02-appshell-css-showSidebar/ui-mockup-spec.md) |
| UI-3 post-implement PNG | PASS | [`../task-spa-ph-09-t02-appshell-css-showSidebar/ui-baseline/post-implement/`](../task-spa-ph-09-t02-appshell-css-showSidebar/ui-baseline/post-implement/) |
| Story-root screenshots pack | PASS | [`../screenshots/`](../screenshots/) · P6 T06 2026-08-08T09:41:23Z |
| puppeteer_gate | PASS | `npm run test:ui:board-shell` |
| Vitest | PASS | AppShell.showSidebar 2/2 · Board shell · Issue · Cabinet |

## FR checklist

| FR | Status |
|----|--------|
| FR-PH-09.1 | PASS |
| FR-PH-09.2 | PASS |
| FR-PH-09.3 | PASS |
| FR-PH-09.4 | PASS |
| FR-PH-09.5 | PASS (no HIW composition changes) |

## Commands (live verification 2026-08-08T09:04:55Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npm test -- --run src/components/AppShell/__tests__/AppShell.showSidebar.test.jsx src/pages/__tests__/BoardPage.shell.test.jsx src/pages/__tests__/IssuePage.integration.test.jsx src/pages/__tests__/UserCabinetPage.test.jsx
cd spa-app && npm run test:ui:board-shell
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
