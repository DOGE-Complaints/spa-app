# Story acceptance gate — STORY-SPA-ID-03

- **Story:** Civic Status Component (reusable)
- **Package:** `pkg-000017-20260628-epic-spa-04-id03-civic-status-component.yaml`
- **Result:** PASS
- **Date:** 2026-06-28T09:50:03Z

## AC checklist (verbatim from backlog / pipeline story)

| AC | Status | Evidence |
|----|--------|----------|
| 5 states in one reusable `CivicStatusCard` | PASS | [`CivicStatusCard.jsx`](../../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx); `data-civic-status-state` A–E in tests |
| FE-derived from `phone_verified` + phase; no `verification_status` | PASS | [`civicStatusState.js`](../../../../../../../../src/auth/civicStatusState.js); grep `verification_status` in civic modules → 0 |
| Canonical labels verbatim | PASS | [`civicStatusLabels.js`](../../../../../../../../src/components/CivicStatus/civicStatusLabels.js); test asserts exact strings |
| Trust tone; no gamification badges | PASS | CSS uses DOGEstonia yellow accent; no green-badge/trophy classes |
| Wallet info block reserved in Verified | PASS | `data-testid="civic-status-wallet-info"` + `Wallet not linked` in state D |

## Commands (live verification 2026-06-28T09:50:03Z)

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify --check-dates
# ok 7 paths; ok date-check

cd spa-app && npm run test:run
# 233 passed | 2 skipped (60 files)

cd spa-app && npm run test:ui:board-shell
# FAIL pre-existing: Expected 4 board columns, received 3 (BoardPage; not touched by ID-03)
```

## §UI spot-check

- Host route: `/#/dashboard` renders single `<CivicStatusCard />` with profile from [`useSessionShell`](../../../../../../../../src/auth/SessionShellContext.jsx)
- M28 hierarchy: icon → status label → title → description → CTA/metadata in [`CivicStatus.css`](../../../../../../../../src/components/CivicStatus/CivicStatus.css)
- UI-0 baseline: deferred (component did not exist at intake; ui-mockup-spec UI-1 accepted at scaffold)

SSOT дат: [`builder-artifact-dates.md`](../../../../../../../docs/methodology/Zeya888-builder-queue/guides/builder-artifact-dates.md)
