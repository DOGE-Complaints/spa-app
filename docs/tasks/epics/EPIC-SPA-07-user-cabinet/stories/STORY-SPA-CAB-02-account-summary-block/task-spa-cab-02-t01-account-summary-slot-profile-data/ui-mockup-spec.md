# UI mockup spec — SPA-CAB-02-T01 (anchor)

**Story:** STORY-SPA-CAB-02-account-summary-block  
**Path A:** extends existing mockup SSOT (operator gate: принято via P3 `@mockup:` refs)  
**Viewport:** 1536×1024  
**Route:** `/#/profile`

## Extends mockup

- [mockup-24-account-summary-complete-spec.md](../../../../../../UX/mockups/user%20profile/mockup-24-account-summary-complete-spec.md) — state `complete`
- [mockup-25-account-summary-minimal-data-spec.md](../../../../../../UX/mockups/user%20profile/mockup-25-account-summary-minimal-data-spec.md) — state `minimal-data`
- [mockup-26-account-summary-missing-email-spec.md](../../../../../../UX/mockups/user%20profile/mockup-26-account-summary-missing-email-spec.md) — state `missing-email`

## Component

```tsx
<AccountSummary profile={...} />
```

Mounted in `cabinet-slot-account` on `UserCabinetPage` (`/#/profile`).

## Selectors (puppeteer / Vitest)

| Element | Selector |
|---------|----------|
| Cabinet page | `[data-testid="user-cabinet-page"]` |
| Account slot | `[data-testid="cabinet-slot-account"]` |
| AccountSummary root | `[data-testid="account-summary"]` |
| State variant | `[data-testid="account-summary"][data-state="complete\|minimal-data\|missing-email"]` |
| Title | `[data-testid="account-summary-title"]` |
| Email row | `[data-testid="account-summary-field-email"]` |
| Created row | `[data-testid="account-summary-field-created"]` |
| Role row | `[data-testid="account-summary-field-role"]` |
| Status row | `[data-testid="account-summary-field-status"]` |
| Not Available value | `[data-testid="account-summary-not-available"]` |

## States

| State | data-state | Trigger (mock profile) |
|-------|------------|------------------------|
| complete | `complete` | email + created_at + role + status |
| minimal-data | `minimal-data` | email + role; missing created/status |
| missing-email | `missing-email` | no email; role from /me |

## Visual rules (from M24–M26)

- Four field rows with ic-field-* icons (no warning icon on M26 email row)
- Missing values: `Not Available` muted text
- No avatar, social metrics, raw phone/OTP/tokens

## AC traceability

- AC #1: `[data-testid="account-summary"]` visible on `/profile`
- AC #2–#3: state + Not Available rows
- AC #4: privacy — no phone in DOM
- AC #6: labels via `cabinet.account.*`
