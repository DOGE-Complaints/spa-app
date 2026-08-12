# Task acceptance — SPA-ID-13-T01

- **Story:** STORY-SPA-ID-13 — Public route regression
- **Package:** `pkg-000041-20260801-epic-spa-04-id-13-public-route-regression.yaml`
- **Result:** PASS
- **Date:** 2026-08-01T20:02:31Z
- **Scaffolded:** 2026-08-01T19:28:37Z

## AC checklist

| AC | Status | Evidence |
|----|--------|----------|
| FR-ID13.1 public matrix + issue≠protected + nested | PASS | `sessionRoutePolicy.test.js` — `/issue/a/b` public; `isProtectedPath` false for `/`, `/board`, `/login`, `/issue/*` |
| FR-ID13.2 protected matrix incl. `/story/submit` + children | PASS | same file — dashboard/profile/verify/submit/compose + prefix children |
| FR-ID13.7 no unjustified runtime policy edit | PASS | `sessionRoutePolicy.js` unchanged |

```bash
cd spa-app && npm run test:run -- src/router/__tests__/sessionRoutePolicy.test.js
# 4 tests passed
```
