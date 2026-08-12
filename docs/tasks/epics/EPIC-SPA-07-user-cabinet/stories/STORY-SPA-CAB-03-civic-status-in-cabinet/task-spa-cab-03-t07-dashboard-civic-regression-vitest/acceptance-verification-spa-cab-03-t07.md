# Acceptance — SPA-CAB-03-T07 (post-audit G1)

- **Task:** SPA-CAB-03-T07 — Dashboard civic regression Vitest
- **Wave:** `run_mode=spa_cab_03_audit_2026_07_26`
- **Result:** PASS
- **Date:** 2026-07-26T09:11:17Z

## AC

| AC | Status | Evidence |
|----|--------|----------|
| `DashboardPage.test.jsx` exists | PASS | [`src/pages/__tests__/DashboardPage.test.jsx`](../../../../../../../src/pages/__tests__/DashboardPage.test.jsx) |
| `[data-civic-status-card]` on dashboard | PASS | test «mounts CivicStatusCard…» |
| `civic-status-icon` present | PASS | asserts `data-testid="civic-status-icon"` + `ic-civic-*.png` src |
| Vitest PASS | PASS | `npm test -- --run DashboardPage CivicStatusCard` → 10 passed |

## Commands

```bash
cd spa-app && npm test -- --run DashboardPage CivicStatusCard
test -f src/pages/__tests__/DashboardPage.test.jsx
```
