# UI baseline — SPA-ID-05-T02 (anchor)

- **Route:** `/#/verify` (unverified mock session)
- **Viewport:** 1536×1024
- **Env:** `VITE_IDENTITY_MOCK_MODE=true`, mock auth via `dogestonia-auth` localStorage (same as `verify-page-host-smoke.mjs`)
- **Pre-implement state (UI-0):** generic inline `phone-verification-failed` panel on any API error — no `PhoneVerificationErrorState`, no per-code mapping (`PhoneVerificationFlow.jsx` catch without `error.code`).
- **Path A intake:** operator supplied `@mockup:` refs in P3; `ui-mockup-spec.md` extends [mockup-37](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md).

## Post-implement captures (UI-3)

| File | State | Notes |
|------|-------|-------|
| `post-implement/code-mismatch-1536x1024.png` | `CODE_MISMATCH` | Captured by `npm run test:ui:verify-error` after OTP `999999` mock fixture |

## Selectors (DOM contract)

- Flow host: `[data-testid="phone-verification-flow"]`
- Error shell: `[data-testid="phone-verification-error-<kind>"]` (e.g. `code-mismatch`, `rate-limited`)
- Cooldown: `[data-testid="phone-verification-error-cooldown"]`
- Attempts: `[data-testid="phone-verification-error-attempts"]`
- Trace: `[data-testid="phone-verification-error-trace-id"]`
