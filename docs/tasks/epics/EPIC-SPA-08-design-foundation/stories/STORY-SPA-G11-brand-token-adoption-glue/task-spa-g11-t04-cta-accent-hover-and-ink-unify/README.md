# SPA-G11-T04 — CTA accent-hover + ink/bg unify

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** backlog FR/D-G11 + reaudit F3–F8  
**Depends on:** T01–T03 (Wave 0 docs)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-02T12:25:03Z

## Purpose
FR-G11.2–3 / D-G11-2 / F6: wire map primary CTA selectors; `:hover`/`:focus-visible` → `var(--color-accent-hover)`; unify CTA label on accent to one pattern (`--doge-ink` **or** `--color-bg-primary`) + design-system §2.1 note.

## Risk
Hover stays old accent; label contrast pattern inconsistent — blocks G10 polish.

## Code Facts (re-verify at execute)
- `--color-accent-hover` defined in `tokens.css`; `rg accent-hover` outside tokens = 0 (verify).
- Primary CTAs use `var(--color-accent-primary)` + `var(--color-bg-primary)` or `--doge-bg` (AppErrorState, StoryActivity, …).

## AC / DoD
- [ ] (P0) Primary CTA `:hover` / `:focus-visible` use `--color-accent-hover` on listed surfaces (Login, StoryHandoff, Phone, SessionShell, Civic, StoryActivity, AppErrorState, …).
- [ ] (P0) Single CTA-on-accent label pattern chosen and applied; noted in design-system §2.1.
- [ ] (P0) Story AC: hover + label unify.

## Where to change
- EDIT component `*.css` with primary CTA; EDIT `docs/UX/design-system.md` §2.1 note

## Out of scope
G10 Button.jsx. danger/success. Soft fills (T05). StatusBadge (T07).

## Verification
```bash
rg -n 'accent-hover|color-accent-primary' spa-app/src --glob '*.css' | head -60
```

Gate: [`acceptance-verification-spa-g11-t04.md`](./acceptance-verification-spa-g11-t04.md)

**Completed:** 2026-08-02T12:42:17Z

Gate Date: 2026-08-02T12:42:17Z.
