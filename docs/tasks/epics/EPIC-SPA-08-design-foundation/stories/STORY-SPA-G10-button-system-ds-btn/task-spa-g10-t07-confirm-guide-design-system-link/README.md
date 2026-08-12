# SPA-G10-T07 — Confirm guide and design-system link

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T02 (API stable enough)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.9: confirm developer guide published; link from `design-system.md` (Buttons section → guide + component path).

## Risk
Инженеры не найдут SSOT и продолжат page-local buttons.

## Code Facts (re-verify at execute)
- Guide **exists**: [`docs/runtime-docs/button-system-developer-guide.md`](../../../../../runtime-docs/button-system-developer-guide.md).
- Spec **exists**: [`docs/UX/design-system-buttons-spec.md`](../../../../../UX/design-system-buttons-spec.md).
- Verify `design-system.md` Buttons link at execute (hard-audit: prep §4.0 may exist).

## AC / DoD
- [x] (P0) Developer guide live; linked from design-system.md + story touchpoints.
- [x] (P0) Guide points to `src/components/Button/` path once package exists.

## Where to change
- EDIT `spa-app/docs/UX/design-system.md`
- EDIT guide if API drift
- Optional: buttons-spec Status note

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
rg -n 'button-system-developer-guide|Button' spa-app/docs/UX/design-system.md | head
```

Gate: [`acceptance-verification-spa-g10-t07.md`](./acceptance-verification-spa-g10-t07.md)
