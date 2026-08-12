# SPA-ID-10-T03 — Country selector panel (M126 A/B)

**Story:** [`../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md`](../STORY-SPA-ID-10-phone-country-selector-waitlist-routing.md)  
**Decision Ref:** [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) states A–B; FR-10.1  
**Depends on:** T01, T02  
**ui_scope:** `visual`  
**ui_anchor:** `true`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-30T10:51:01Z

## Purpose
Replace readonly country field in `PhoneInputPanel` with interactive country selector: flag + localized name + dial code; Estonia default; dropdown/search per M126 state B. **ui_anchor** for M126 visual pipeline.

## Risk
Readonly field left in place blocks entire story. Missing `data-testid` breaks UI-3 puppeteer gate.

## Code Facts (re-verify at execute)
- [`PhoneInputPanel.jsx`](../../../../../../../../src/components/PhoneVerification/PhoneInputPanel.jsx) L22-28 — `readOnly` country input + fixed `+372` dial prefix display.
- M126 spec exists: [mockup-126-phone-country-selector-spec.md](../../../../../../UX/mockups/epic-04/mockup-126-phone-country-selector-spec.md) — Path A for UI-1.
- T01 countries dataset — scaffold target.

## AC / DoD
- [ ] (P0) Country selector not readonly; Estonia default (AC #1, FR-10.1).
- [ ] (P0) List item: flag + localized name + dial code from dataset.
- [ ] (P0) All visible strings via `t()` — no English literals (FR-10.7).
- [ ] (P1) `data-testid` for selector trigger, dropdown, country options (puppeteer).
- [ ] (P1) UI-0 baseline in `ui-baseline/` before UI-2; UI-1 `ui-mockup-spec.md` → mockup-126 Path A.

## Where to change
- `spa-app/src/components/PhoneVerification/PhoneInputPanel.jsx`
- New (if needed): `spa-app/src/components/PhoneVerification/CountrySelector.jsx`
- `spa-app/src/components/PhoneVerification/PhoneVerificationFlow.css` — selector styles
- Task folder: `ui-baseline/`, `ui-mockup-spec.md`

## Out of scope
- Unsupported adaptive mode (T04). OTP submit routing (T05). Per-country validation (ID-11).

## Verification
```bash
cd spa-app && npm run dev
# /#/verify — disclosure → phone panel; selector opens; Estonia default
npm run test:ui:verify-host
```
