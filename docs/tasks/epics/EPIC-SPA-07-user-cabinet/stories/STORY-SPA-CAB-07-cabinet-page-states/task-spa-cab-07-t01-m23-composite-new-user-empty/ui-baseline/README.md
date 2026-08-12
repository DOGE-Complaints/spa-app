# UI baseline — SPA-CAB-07-T01 (anchor)

- **Route:** `/#/profile`
- **Viewport:** 1536×1024
- **Env:** `VITE_IDENTITY_MOCK_MODE=true`, Vite `:4173`
- **UTC capture (UI-0):** 2026-07-28T13:56:10Z session (pre-implement PNGs on disk)
- **ui-mockup-spec:** [../ui-mockup-spec.md](../ui-mockup-spec.md)

## Selectors

| State | Key selectors / hooks |
|-------|------------------------|
| A M23 | `doge.mock-profile` with `phone_verified: false`; clear story/wallet/contrib previews → default empties |
| B M22 | `sessionStorage['doge.mock-me-error']='backend_unavailable'` (pre: overlay; post: in-page ErrorPanel) |

## Pre-implement (UI-0)

| File | Notes |
|------|-------|
| [pre-implement/m23-new-user-composite-empty-1536x1024.png](./pre-implement/m23-new-user-composite-empty-1536x1024.png) | Composite already mounts CAB-02…06 empties |
| [pre-implement/m22-profile-load-error-1536x1024.png](./pre-implement/m22-profile-load-error-1536x1024.png) | Pre: SessionShell overlay (BACKEND_UNAVAILABLE) — target is in-page M22 |

## Post-implement (UI-3)

| File | Notes |
|------|-------|
| [post-implement/m23-new-user-composite-empty-1536x1024.png](./post-implement/m23-new-user-composite-empty-1536x1024.png) | M23 composite empties |
| [post-implement/m22-profile-load-error-1536x1024.png](./post-implement/m22-profile-load-error-1536x1024.png) | In-page ErrorPanel; shell sidebar/header stay; Code: PROFILE_LOAD_FAILED |

**UTC UI-3:** 2026-07-28T14:05:08Z  
Canonical story pack: [../../screenshots/](../../screenshots/).