# SPA-G10-T13 — Commit G10 button system to git HEAD (post-audit F1)

**Status:** Done  
**Story:** [`../STORY-SPA-G10-button-system-ds-btn.md`](../STORY-SPA-G10-button-system-ds-btn.md)  
**Decision Ref:** [audit-STORY-SPA-G10-execution-2026-08-02.md](../../../../../../analysis/audit-STORY-SPA-G10-execution-2026-08-02.md) §F1  
**Depends on:** SPA-G10-T01…T12 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_g10_audit_2026_08_02`  
**Scaffolded:** 2026-08-02T21:11:00Z

## Purpose
Зафиксировать G10 DS-BTN runtime + SSOT в `git HEAD`: сейчас Done на working tree (`Button/` package, button tokens, Waves 2–4 migrations, guide + buttons-spec + design-system §4.0), но clone/reset откатывает к pre-G10 raw buttons.

## Risk
Story/INDEX/bullrun/gate Done при uncommitted runtime → риск доставки (паттерн G9/G11-F1, масштабнее).

## Code Facts (re-verify at execute)
- Audit `2026-08-02T21:05:55Z`: `?? src/components/Button/`; `?? design-system-buttons-spec.md` / guide; ~55 `M` under `src/` + `tokens.css` + `design-system.md`.
- `git log --grep=G10` — пусто; `git show HEAD:tokens.css` — нет `--button-primary-*`.
- Inventory excl. tests+Button = **22** (Filters + CountrySelector exceptions) — keep after commit.

## AC / DoD
- [x] (P0) G10-scoped `src/components/Button/`, button tokens in `tokens.css`, migrated product CTAs, `docs/UX/design-system-buttons-spec.md`, `docs/runtime-docs/button-system-developer-guide.md`, `docs/UX/design-system.md` committed in spa-app git root.
- [x] (P0) `git ls-tree HEAD src/components/Button` nonempty; `git show HEAD:src/styles/tokens.css` contains `--button-primary-*` / `--color-btn-on-primary`.
- [x] (P0) `git log --grep=G10` nonempty; HEAD inventory still documents chip/listbox exceptions (not re-introduce legacy `*-btn`).
- [x] (P0) Gate filled; Date from `--print-utc-now` after live verify.

Gate Date: 2026-08-03T07:17:33Z · Commit: `d767a13`.

## Where to change
- Commit (spa-app git root): G10 Button package + tokens + migrated JSX/CSS + SSOT docs listed above.
- Exclude unrelated WT noise (mockups, logos, public-home, etc.) unless required for G10 compile.
- Gate: `acceptance-verification-spa-g10-t13.md`.

## Out of scope
- F2 visual waive (T14). F3–F7 ignored. Changing active pkg / rewriting `pkg-000044`. Vitest re-run not required unless commit hygiene needs it.

## Verification
```bash
cd spa-app && git ls-tree -r HEAD --name-only | rg 'components/Button' | head
cd spa-app && git show HEAD:src/styles/tokens.css | rg 'button-primary|btn-on-primary' | head
cd spa-app && git log --grep=G10 -1 --oneline
```

Gate: [`acceptance-verification-spa-g10-t13.md`](./acceptance-verification-spa-g10-t13.md)
