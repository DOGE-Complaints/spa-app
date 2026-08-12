# SPA-G10-T02 — Implement Button component

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T01  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10.1–6: `<Button />` + CSS; hierarchies + sizes + loading/disabled/focus; independent axes (не overloaded `variant`).

## Risk
Без shared Button миграция Waves 2–4 невозможна.

## Code Facts (re-verify at execute)
- `src/components/Button/` — **absent** (scaffold 2026-08-02).
- Spec §3 file tree / §6–§17 API — [`design-system-buttons-spec.md`](../../../../../UX/design-system-buttons-spec.md).

## AC / DoD
- [x] (P0) `Button` supports primary/secondary/tertiary/link-style; destructive independent; S/M/L; icons; loading; disabled; focus.
- [x] (P0) Axes: hierarchy · intent · size · form factor · runtime state.
- [x] (P0) Colors from G9 tokens; primary label contrast compliant.

## Where to change
- NEW `spa-app/src/components/Button/` (Button + CSS per spec §3)

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
test -f spa-app/src/components/Button/Button.jsx || test -f spa-app/src/components/Button/Button.tsx; ls spa-app/src/components/Button/
```

Gate: [`acceptance-verification-spa-g10-t02.md`](./acceptance-verification-spa-g10-t02.md)
