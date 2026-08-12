# UI mockup spec — SPA-ID-07-T03 (M123 anchor, Path A)

**Gate:** Path A — operator `@mockup` in P3 Execute  
**SSOT artboard:** [mockup-123-country-waitlist-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.md)  
**PNG:** [mockup-123-country-waitlist-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-123-country-waitlist-state-sheet-spec.png)  
**Human gate:** Accepted (Path A — SSOT mockup refs, 2026-06-30)

## Scope (anchor task)

| State | Component | `data-testid` |
|-------|-----------|---------------|
| A Country Not Supported | `CountryNotSupportedPanel` | `waitlist-not-supported-panel` |
| B Waitlist Form | `WaitlistFormPanel` (T04) | `waitlist-form-panel` |
| C Waitlist Joined | `WaitlistJoinedPanel` (T04) | `waitlist-joined-panel` |
| D Submission Error | `WaitlistErrorPanel` (T05) | `waitlist-error-panel` |

Dependent tasks T04–T06 **extend** this spec; UI-0 skipped on dependents.

## State A — layout & selectors

- **Panel:** `.waitlist-panel.waitlist-panel--not-supported`
- **Title:** `t('waitlist.notSupported.title')`
- **Message:** `t('waitlist.notSupported.message')` — informative tone (not rejection)
- **Country meta:** `waitlist-country-from-number` / `waitlist-country-name` — dial-derived label (FR-07.6)
- **Primary CTA:** `waitlist-join-cta` → FORM phase
- **Secondary CTA:** `waitlist-learn-more` → external learn-more link

## Visual language (from M123 §6)

Dark civic-tech glass panel; white typography; DOGEstonia yellow accent on primary CTA; no error-page / red failure aesthetics.

## Verify host

`VerifyPage` orchestrates phases on `/#/verify`; entry from ID-05 `COUNTRY_NOT_ALLOWED` → `onJoinWaitlist({ phone })`.

## UI-3 gate

```bash
cd spa-app && npm run test:run
# post-implement PNG: ui-baseline/post-implement/waitlist-not-supported-1536x1024.png
```
