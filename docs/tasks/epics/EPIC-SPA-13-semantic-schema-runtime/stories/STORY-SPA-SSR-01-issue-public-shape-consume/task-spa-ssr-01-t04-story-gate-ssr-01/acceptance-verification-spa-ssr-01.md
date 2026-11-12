# Story acceptance gate — STORY-SPA-SSR-01-issue-public-shape-consume

- **Story:** Issue public shape consume (typedef + repository pass-through)
- **Package:** `pkg-000074-20260902-epic-spa-13-ssr-01-issue-public-shape.yaml`
- **Result:** PASS
- **Date:** 2026-09-02T19:37:42Z
- **ui_scope:** none (no puppeteer / Path A)

## AC checklist (verbatim from backlog)

| AC | Status | Evidence |
|----|--------|----------|
| `Issue` typedef documents optional `schema_card` + `geo` with public key names (incl. optional `geo.detail_level`) | PASS | [`types.js`](../../../../../../../src/domain/types.js) `IssueSchemaCard` / `IssueGeo` + `@property schema_card` / `geo` |
| Repository passes through sidecar fields from `envelope.data.issues[]` without mutation | PASS | [`GatewayIssueRepository.js`](../../../../../../../src/repositories/GatewayIssueRepository.js) `passThroughPublicIssue` · tests |
| Vitest (or equivalent) proves parse of fixture Issue with both fields | PASS | `GatewayIssueRepository.test.js` + `types.test.js` |
| No new HTTP endpoints; no `structured_payload` handling added | PASS | repo URLs still `/node/issues` · `rg structured_payload spa-app/src` → 0 |
| grep: no `admin_district` etc. invented on Issue object in spa | PASS | `isOptionalIssueGeo` rejects `admin_*` · `rg admin_district spa-app/src/domain/types.js` → 0 |
| Aligns with api-req §5 (consume existing `/node/issues` only) | PASS | no new fetch routes |

## Commands (live verification 2026-09-02T19:37:42Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
cd spa-app && npx vitest run
rg -n 'structured_payload' spa-app/src || true
rg -n 'admin_district' spa-app/src/domain/types.js || true
```

## Vitest

128 files / **568 passed** / 2 skipped (570)

## Out of scope confirmed

No SSR-02 overlay UI · no SSR-03 map · no UX Path A · no git push · BUG pkgs not mixed
