# UI mockup spec — SPA-ID-05-T02 PhoneVerificationErrorState

- **extends mockup:** [mockup-37-verification-error-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.md)
- **PNG SSOT:** [mockup-37-verification-error-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-37-verification-error-state-sheet-spec.png)
- **Intake path:** P3 Path A (`@mockup:` operator refs) — human gate satisfied by global M37 spec
- **Component:** `<PhoneVerificationErrorState />` inside `PhoneVerificationFlow` failed phase

## Layout (delta from M37 §2)

| Element | Implementation |
|---------|----------------|
| Panel | `.phone-verification-error` — dark glass inherits flow shell (`PhoneVerificationFlow.css`) |
| Title | `.phone-verification-error__title` — white, calm headline |
| Message | `.phone-verification-error__message` — muted gray body |
| Meta lines | Cooldown `MM:SS` (rate limited); `Attempts remaining: N` (wrong code) |
| Primary CTA | Yellow `.phone-verification-error__button--primary` |
| Secondary CTA | Ghost `.phone-verification-error__button--secondary` |
| Technical | Muted `.phone-verification-error__technical` — `error.code` + optional `trace_id` |

## States (runtime one-at-a-time)

All M37 §4–12 kinds mapped via `verificationErrorMapping.js` → `phoneVerificationErrorLabels.js`.

## Routes

- `/#/verify` — primary puppeteer gate (`test:ui:verify-error`)
- Inline host on dashboard civic CTA → `/verify` (ID-04)

## Verification

```bash
cd spa-app && npm run test:ui:verify-error
```

Post-implement PNG: `ui-baseline/post-implement/code-mismatch-1536x1024.png`
