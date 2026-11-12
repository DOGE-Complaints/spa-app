# Story acceptance gate — STORY-SPA-ES-01

- **Story:** Board Pre-Cluster Discovery Shell
- **Package:** `pkg-000066-20260817-epic-spa-12-es-01-discovery-shell.yaml`
- **Result:** PASS
- **Date:** 2026-08-17T10:32:24Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Zero Issues (unfiltered) → discovery root with `data-testid="board-early-signal-discovery"` (AC-SPA-ES-01). | PASS | `EarlySignalDiscovery.jsx` root testid; `BoardPage.jsx` `showEmptyBoard` branch; vitest `BoardPage.discovery.test.jsx`; live PNG `screenshots/full-cycle/es01-discovery-unfiltered-empty-desktop.png` |
| Not solely `board-empty` / `publicHome.board.empty` as the only product message. | PASS | `BoardPage.jsx` no longer renders `board-empty` / `publicHome.board.empty.*`; chrome = `earlySignal.discovery.*` + five slot titles |
| Topic ≠ Issue language in chrome (AC-SPA-ES-02); no Offers (AC-SPA-ES-06); no forbidden strings (AC-SPA-ES-03). | PASS | L10N table in `earlySignalDictionary.js`; vitest forbidden scan; no Offers UI in discovery; `rg network-pulse\|emerging-signals spa-app/src` → 0 consumers |
| Links: M136 · icon catalog · api-req §1 · L10N table above. | PASS | Path A `ui-mockup-spec.md` → M136; ES-01 icon table (shell chrome reuse only); api-req §1 = existing `getIssues`; dictionary keys match backlog table |

## UI visual pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 | PASS | T01 `ui-baseline/pre-implement/01-board-default-1536x1024.png` (live GFL-DRIVEN `board-load-error`, no discovery) |
| UI-1 Path A M136 | PASS | [`ui-mockup-spec.md`](../task-spa-es-01-t01-discovery-root-testid/ui-mockup-spec.md) — not mockup-01 |
| UI-3 + story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) · **H1** live happy PNG under `screenshots/full-cycle/` · T01 `ui-baseline/post-implement/` |

## Commands (live verification)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run --passWithNoTests   # 110 files, 504 passed | 2 skipped
cd spa-app && npm run test:ui:board-shell
ls spa-app/docs/tasks/epics/EPIC-SPA-12-early-signal-dashboard/stories/STORY-SPA-ES-01-board-pre-cluster-discovery-shell/screenshots/full-cycle/
rg -n 'board-early-signal-discovery' spa-app/src
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

## Mockups (Path A)

- `spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-136-early-signal-discovery-composition-state-sheet-spec.png`
