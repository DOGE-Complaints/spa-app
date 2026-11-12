# Story acceptance gate — STORY-SPA-SSR-02-schema-card-overlay

- **Story:** Schema card overlay (Issue card + detail)
- **Package:** `pkg-000075-20260902-epic-spa-13-ssr-02-schema-card-overlay.yaml`
- **Result:** PASS
- **Date:** 2026-09-02T20:06:33Z
- **ui_scope:** visual (Path A M141)

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| Non-empty `schema_card` → overlay on card **and** detail (M141) | PASS | `SchemaCardOverlay` · IssueCard · IssuePage · full-cycle PNGs |
| Empty/absent → civic-only (no empty overlay chrome) | PASS | vitest · pre-implement PNG |
| Keys/values match gateway JSON; labels 1:1 i18n glue (MVP three paths) | PASS | `schemaRuntimeDictionary.js` |
| Missing label → dotted-path + dev warn | PASS | `resolveSchemaCardFieldLabel` |
| No `structured_payload` surface | PASS | rg + overlay only iterates `schema_card` |
| Links: M141 · icon catalog · api-req · ADMIN-SSR-05 | PASS | backlog + pipeline Meta |

## §UI verification

| Item | Evidence |
|------|----------|
| Story-root screenshots README | [`../../screenshots/README.md`](../../screenshots/README.md) |
| Happy board PNG | [`../../screenshots/full-cycle/01-board-overlay-happy-1536x1024.png`](../../screenshots/full-cycle/01-board-overlay-happy-1536x1024.png) |
| Happy detail PNG | [`../../screenshots/full-cycle/02-detail-overlay-happy-1536x1024.png`](../../screenshots/full-cycle/02-detail-overlay-happy-1536x1024.png) |
| Anchor baseline archive | [`../task-spa-ssr-02-t01-…/ui-baseline/`](../task-spa-ssr-02-t01-overlay-compact-card/ui-baseline/README.md) |
| puppeteer_gate | `npm run test:ui:board-shell` PASS |

## Commands (live 2026-09-02T20:06:33Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run
cd spa-app && npm run test:ui:board-shell
ls spa-app/docs/tasks/epics/EPIC-SPA-13-semantic-schema-runtime/stories/STORY-SPA-SSR-02-schema-card-overlay/screenshots/full-cycle/*.png
rg -n 'structured_payload' spa-app/src || true
```

## Vitest

130 files / **575 passed** / 2 skipped

## Out of scope confirmed

SSR-03 map · invent fields · pack.json UI · git push · BUG pkgs not mixed
