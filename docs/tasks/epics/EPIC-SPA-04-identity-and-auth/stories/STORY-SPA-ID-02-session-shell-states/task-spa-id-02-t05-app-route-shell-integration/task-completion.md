# T05 completion — app route shell integration

- **Status:** Done
- **Executed:** 2026-06-28 (P3 pkg-000016)

## Changes

- [`AppShellLayout.jsx`](../../../../../../../../src/layout/AppShellLayout.jsx) — overlay orchestration + protected stubs
- [`sessionRoutePolicy.js`](../../../../../../../../src/router/sessionRoutePolicy.js) — public `/board`, `/issue/:id`, `/login`; protected `/profile`, `/verify`, `/story/compose`
- [`App.jsx`](../../../../../../../../src/App.jsx) — nested routes under `AppShellLayout`

## Verification (live)

```bash
cd spa-app && npm run test:run -- src/router/__tests__/sessionRoutePolicy.test.js
# logged out: /#/board accessible; /#/profile shows Sign In Required overlay
```
