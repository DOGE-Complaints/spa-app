# T05 completion — dashboard route integration

- **Status:** Done
- **Executed:** 2026-06-28 (P3 pkg-000017)

## Changes

- [`DashboardPage.jsx`](../../../../../../../../src/pages/DashboardPage.jsx) — hosts `<CivicStatusCard />` from `useSessionShell().profile`
- [`App.jsx`](../../../../../../../../src/App.jsx) — route `/#/dashboard` under `AppShellLayout`
- [`sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js) — `/dashboard` protected

## Verification (live)

```bash
cd spa-app && npm run test:run -- src/router/__tests__/sessionRoutePolicy.test.js
# /dashboard protected
```
