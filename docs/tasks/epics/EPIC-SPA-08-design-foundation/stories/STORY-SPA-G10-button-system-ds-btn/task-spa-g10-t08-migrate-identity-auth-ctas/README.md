# SPA-G10-T08 — Migrate identity/auth CTAs

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T02…T07  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.8 Wave 2: migrate Login + PhoneVerification + SessionShell + StoryGate panels to shared Button.

## Risk
Identity flows остаются крупнейшим источником raw `<button>` (Login ≈13).

## Code Facts (re-verify at execute)
- [`LoginPage.jsx`](../../../../../../src/pages/LoginPage.jsx) — 13 `<button` (scaffold count).
- PhoneVerification / SessionShell / StoryGate — multiple buttons (re-count at execute).

## AC / DoD
- [x] (P0) Product CTAs on listed surfaces use `Button` / siblings; labels via `t()` (FR-G10.10).
- [x] (P0) No new page-specific button CSS on these surfaces.

## Where to change
- EDIT Login / PhoneVerification* / SessionShell* / StoryGate* JSX+CSS

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n '<button' spa-app/src/pages/LoginPage.jsx spa-app/src/components/PhoneVerification spa-app/src/components/SessionShellState spa-app/src/components/StoryGate 2>/dev/null | head
```

Gate: [`acceptance-verification-spa-g10-t08.md`](./acceptance-verification-spa-g10-t08.md)
