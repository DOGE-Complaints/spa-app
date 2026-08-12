# SPA-G10-T06 — Vitest Button states and a11y

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** backlog FR/D-G10 + [design-system-buttons-spec.md](../../../../../UX/design-system-buttons-spec.md)  
**Depends on:** SPA-G10-T02…T05  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T20:13:25Z

## Purpose
FR-G10 + AC: Vitest covers hierarchies, a11y labels, loading lock, nav element rules (`a` vs `button`).

## Risk
Регрессии API без тестов при миграции Waves 2–4.

## Code Facts (re-verify at execute)
- No Button `__tests__` yet (component absent).
- Project Vitest: `cd spa-app && npx vitest run`.

## AC / DoD
- [x] (P0) Vitest covers hierarchies + a11y labels + loading lock + href/nav element rules.
- [x] (P0) Tests green under spa Vitest.

## Where to change
- NEW tests under `spa-app/src/components/Button/__tests__/` (or project convention)

## Out of scope
Other SPA-G10-T* tasks; SplitButton; Storybook; Light theme; brand hex changes; inventing mockup-134.md.

## Verification
```bash
cd spa-app && npx vitest run src/components/Button --pool=forks --maxWorkers=2
```

Gate: [`acceptance-verification-spa-g10-t06.md`](./acceptance-verification-spa-g10-t06.md)
