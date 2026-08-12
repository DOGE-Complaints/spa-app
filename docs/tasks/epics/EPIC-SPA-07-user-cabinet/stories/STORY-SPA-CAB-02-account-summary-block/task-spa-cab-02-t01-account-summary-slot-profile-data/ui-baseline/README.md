# UI baseline — SPA-CAB-02-T01 AccountSummary anchor

**Route:** `/#/profile`  
**Viewport:** 1536×1024  
**Captured UTC:** 2026-07-12T08:10:00Z (post-implement wave)

## Pre-implement (UI-0)

| State | File | Notes |
|-------|------|-------|
| placeholder | `pre-implement/placeholder-profile-1536x1024.png` | `/profile` rendered `ProtectedPlaceholder` before CAB-02 UI-2 |

## Post-implement (UI-3)

| State | File | data-state | Mock profile |
|-------|------|------------|--------------|
| complete | `post-implement/complete-account-summary-1536x1024.png` | `complete` | full email/created/role/status |
| minimal-data | `post-implement/minimal-data-account-summary-1536x1024.png` | `minimal-data` | email + role only |
| missing-email | `post-implement/missing-email-account-summary-1536x1024.png` | `missing-email` | default mock (no email) |

## Selectors

See [ui-mockup-spec.md](./ui-mockup-spec.md).

## Capture command

```bash
cd spa-app && node tests/puppeteer/account-summary-cab02-screenshot.mjs
```
