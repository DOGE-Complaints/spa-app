# UI mockup spec — SPA-CAB-07 (anchor T01)

**Path:** A (operator `@mockup` + P1.3 ready mockups)  
**Story:** STORY-SPA-CAB-07-cabinet-page-states  
**Anchor:** SPA-CAB-07-T01  
**Scaffolded / gate:** 2026-07-28T13:56:10Z  
**Viewport:** 1536×1024

## Extends mockup (SSOT)

| ID | Role | Spec | PNG |
|----|------|------|-----|
| **M23** | New-user composite empty | [mockup-23-user-cabinet-empty-new-user-spec.md](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.md) | [png](../../../../../../UX/mockups/user%20profile/mockup-23-user-cabinet-empty-new-user-spec.png) |
| **M22** | Profile load error panel | [mockup-22-user-cabinet-load-error-spec.md](../../../../../../UX/mockups/user%20profile/mockup-22-user-cabinet-load-error-spec.md) | ⚠️ **error PNG отсутствует** |

> **Не SSOT для M22 error:** [mockup-22-user-cabinet-loading-spec.png](../../../../../../UX/mockups/user%20profile/mockup-22-user-cabinet-loading-spec.png) — loading skeleton (CAB-01 FR-CAB-01.5), не error-панель. Не линковать как target для T02.

## States (this wave)

| State | Slug | Target |
|-------|------|--------|
| A | `m23-new-user-composite-empty` | All cabinet sections visible; local empties (civic unverified / story empty / wallet unlinked / contrib A1·B1·C1); actions Verify / Go to Board / Coming Later — no giant welcome |
| B | `m22-profile-load-error` | In-page `AppErrorState`/`ErrorPanel`: title Unable to load account data, message, Retry, Back to Board, optional `Code: PROFILE_LOAD_FAILED` (etc.); **AppShell sidebar/header stay** — not full-page SessionShell overlay crash |

## Selectors (target)

| State | Selectors |
|-------|-----------|
| A | `[data-testid="user-cabinet-page"]`, `[data-testid="cabinet-grid"]`, slots `cabinet-slot-*`, `[data-wallet-status-state="unlinked"]`, `[data-contrib-receipts-state="empty"]` |
| B | `[data-testid="cabinet-profile-error"]` / `[data-app-error-state]`, `[data-testid="app-shell-nav-profile"]` still present; **no** `[data-testid="session-shell-overlay"]` for backend/network on `/profile` |

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md) — pre-implement captured before UI-2.

## Dependent tasks

- T02 extends this spec for M22 DOM; UI-0 skip on T02.
- T03–T05 `ui_scope: none`.
- T06 story gate §UI + story-root `screenshots/`.

## Human gate

**Path A** — interview skip; `@mockup` M23 md+png + M22 md cover AC. Proceed to UI-2.
