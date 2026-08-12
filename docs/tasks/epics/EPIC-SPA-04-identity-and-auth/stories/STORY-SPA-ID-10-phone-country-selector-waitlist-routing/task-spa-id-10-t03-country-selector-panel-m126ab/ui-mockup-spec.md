# UI mockup spec — STORY-SPA-ID-10 (Path A)

**Gate:** принято (Path A — existing SSOT)  
**Captured:** 2026-06-30T10:58:19Z  
**Viewport:** 1536×1024  
**Route:** `/#/verify` → disclosure → phone panel

## Target mockup (Path A)

| Ref | Path |
|-----|------|
| Spec | `spa-app/docs/UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md` |
| PNG | `spa-app/docs/UX/mockups/epic-04/mockup-126-phone-country-selector-spec.png` |

## States

| State | M126 | Description |
|-------|------|-------------|
| A | State A | Estonia selected; Send Verification Code CTA |
| B | State B | Country dropdown open; search + list |
| C | State C | Unsupported country; notice + Join Waitlist |

## Selectors (implementation)

| Element | data-testid |
|---------|-------------|
| Phone panel | `phone-verification-phone-input` |
| Country trigger | `phone-country-selector-trigger` |
| Country dropdown | `phone-country-selector-dropdown` |
| Country option | `phone-country-option-{code}` |
| Country search | `phone-country-selector-search` |
| Unsupported notice | `phone-country-unsupported-notice` |
| Join Waitlist CTA | `phone-country-join-waitlist` |
| Send Code CTA | `phone-verification-send-code` |

## Puppeteer gate

`npm run test:ui:verify-host`
