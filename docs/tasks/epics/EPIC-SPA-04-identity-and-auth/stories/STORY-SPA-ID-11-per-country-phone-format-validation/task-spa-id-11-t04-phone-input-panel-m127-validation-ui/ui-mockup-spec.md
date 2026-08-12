# UI mockup spec — STORY-SPA-ID-11 (Path A)

**Gate:** принято (Path A — `@mockup` mockup-127)  
**Captured:** 2026-06-30T13:08:15Z  
**Viewport:** 1536×1024  
**Route:** `/#/verify` → disclosure → phone panel

## Target mockup (Path A)

| Ref | Path |
|-----|------|
| Spec | `spa-app/docs/UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.md` |
| PNG | `spa-app/docs/UX/mockups/epic-04/mockup-127-phone-input-per-country-format-validation-spec.png` |

## States

| State | M127 | Description |
|-------|------|-------------|
| A | Valid EE | `55555555` — placeholder `5555 5555`, status Valid, Send enabled |
| B | Invalid EE | `55555` — length hint, status Needs correction, Send disabled |
| C | Different country DE | Germany selected — placeholder `1512 3456789`, helper/example updated; Join Waitlist (unsupported) |
| D | Empty | No digits — helper/example visible, Send disabled |

## Selectors (implementation)

| Element | data-testid |
|---------|-------------|
| Phone panel | `phone-verification-phone-input` |
| Local input | `phone-verification-local-input` |
| Format helper | `phone-format-helper` |
| Format example | `phone-format-example` |
| Validation hint | `phone-verification-phone-hint` |
| Status valid | `phone-format-status-valid` |
| Status needs correction | `phone-format-status-needs-correction` |
| Send Code CTA | `phone-verification-send-code` |
| Country option | `phone-country-option-{code}` |

## Puppeteer gate

```bash
cd spa-app && npm run test:ui:country-format-m127
cd spa-app && npm run test:ui:verify-host
```
