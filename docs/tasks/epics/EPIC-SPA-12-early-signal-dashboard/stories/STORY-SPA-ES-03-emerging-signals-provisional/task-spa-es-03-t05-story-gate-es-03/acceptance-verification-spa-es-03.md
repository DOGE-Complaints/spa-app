# Story acceptance gate — STORY-SPA-ES-03

- **Story:** Emerging Signals Provisional
- **Package:** `pkg-000068-20260817-epic-spa-12-es-03-emerging-signals.yaml`
- **Result:** PASS
- **Date:** 2026-08-17T11:36:37Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| Live Emerging fetch; cards from `signals` only; empty/failure honest. | PASS | `GatewayEmergingSignalsRepository.js` L32 GET `/tallinn/emerging-signals?top_n=`; `bindEmergingSignals.js` label/axis/story_count; `EmergingSignalsBlock.jsx` empty vs cards; fail/empty → `emerging-signals-empty` |
| Topic/provisional ≠ Issue (AC-SPA-ES-02); no fabricated counts (AC-SPA-ES-08); no forbidden strings (AC-SPA-ES-03). | PASS | bind drops `issue_id`; vitest `EmergingSignalsBlock.test.jsx` + `bindEmergingSignals.test.js` + dictionary forbidden scan |
| Links: M138 · icons · api-req §3 · L10N. | PASS | Path A `ui-mockup-spec.md`; `EMERGING_ICONS` catalog paths; L10N `earlySignal.emerging.*` |

## UI verification

| Gate | Status | Evidence |
|------|--------|----------|
| UI-0 | PASS | T02 `ui-baseline/pre-implement/01-board-default-1536x1024.png` (discovery + emerging slot title-only) |
| UI-1 Path A M138 | PASS | [`ui-mockup-spec.md`](../task-spa-es-03-t02-emerging-cards-empty/ui-mockup-spec.md) — not mockup-01 |
| UI-3 + story-root screenshots | PASS | [`screenshots/README.md`](../screenshots/README.md) · empty / fail-omit / cards PNGs under `screenshots/full-cycle/` · T02 `ui-baseline/post-implement/` |

## Commands (live verification 2026-08-17T11:36:37Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run --passWithNoTests   # 118 files, 528 passed | 2 skipped
cd spa-app && npm run test:ui:board-shell
PHASE=post-implement node spa-app/tests/puppeteer/es03-emerging-screenshot.mjs
```

SSOT дат: [`guides/builder-artifact-dates.md`](../../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)

## Mockups (Path A)

- `spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.md`
- `spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-138-emerging-signals-provisional-state-sheet-spec.png`
