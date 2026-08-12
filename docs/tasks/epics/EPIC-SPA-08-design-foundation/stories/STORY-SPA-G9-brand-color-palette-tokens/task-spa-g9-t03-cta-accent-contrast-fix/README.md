# SPA-G9-T03 — CTA / badge accent contrast fix

**Status:** Done  
**Story:** [`../STORY-SPA-G9-brand-color-palette-tokens.md`](../STORY-SPA-G9-brand-color-palette-tokens.md)  
**Decision Ref:** backlog FR-G9.4; palette §5 contrast  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T08:45:25Z

## Purpose
Audit компонентных CSS: на фоне `accent-primary` текст = `--doge-bg` или `--doge-ink` (не `--color-text-primary`/white). Исправить white-on-orange (Login, AppErrorState, другие grep hits).

## Risk
После G9 `--color-text-primary` → white → контраст на `#F5A623` хуже (2.03:1); пропуск badge/CTA.

## Code Facts (re-verify at execute)
- [LoginPage.css](../../../../../../../src/pages/LoginPage.css): primary buttons `background: var(--color-accent-primary)` + text-primary pattern.
- [AppErrorState.css](../../../../../../../src/components/AppErrorState/AppErrorState.css): retry accent background.
- Also grep hits historically: StoryHandoff, PhoneVerification, CivicStatus, SessionShellState (re-grep at execute).

## AC / DoD
- [ ] (P0) CTA/badge on accent: text uses `var(--doge-bg)` or `var(--doge-ink)` (or consumer alias that resolves to those).
- [ ] (P0) No small white text on `#F5A623` for primary CTAs in audited files.
- [ ] (P0) Story AC: CTA на accent — текст `--doge-bg` или `--doge-ink`.

## Where to change
- EXTEND component `*.css` with accent fill + light text (grep-driven); prefer `--doge-ink` / `--doge-bg` or a dedicated CTA text token if added locally via existing vars.

## Out of scope
- Mass rename of all `var(--color-*)`. Logo/mascot. design-system (T04).

## Verification
```bash
rg -n 'accent-primary' spa-app/src --glob '*.css'
# Manual: login primary CTA + AppErrorState retry contrast
```

Gate: [`acceptance-verification-spa-g9-t03.md`](./acceptance-verification-spa-g9-t03.md)

Gate Date: 2026-08-02T08:59:09Z.
