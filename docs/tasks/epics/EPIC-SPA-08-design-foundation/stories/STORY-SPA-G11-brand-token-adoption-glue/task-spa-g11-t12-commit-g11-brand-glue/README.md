# SPA-G11-T12 — Commit G11 brand token glue to git HEAD (post-audit F1)

**Status:** Done  
**Story:** [`../STORY-SPA-G11-brand-token-adoption-glue.md`](../STORY-SPA-G11-brand-token-adoption-glue.md)  
**Decision Ref:** [audit-STORY-SPA-G11-execution-2026-08-02.md](../../../../../../analysis/audit-STORY-SPA-G11-execution-2026-08-02.md) §F1  
**Depends on:** SPA-G11-T01…T11 Done  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**run_mode:** `spa_g11_audit_2026_08_02`  
**Scaffolded:** 2026-08-02T14:19:30Z

## Purpose
Зафиксировать G11 brand token adoption / glue в `git HEAD`: сейчас Done на working tree (CTA hover, accent-soft, StatusBadge tokens, rgba packs, design-system §2.1), но clone/reset откатывает к pre-G11 literals.

## Risk
Story/INDEX/bullrun/gate Done при uncommitted runtime → риск доставки (повтор G9-F1).

## Code Facts (re-verify at execute)
- Commit `846599b` — HEAD has `--color-accent-soft`, StatusBadge token surfaces, CTA hover wiring, rgba packs.
- Excluded unrelated `M`/`??`: mockup-01/19, logo png, button-system docs, public-home icons, `Untitled`.

## AC / DoD
- [x] (P0) G11-scoped CSS + `docs/UX/design-system.md` (+ `tokens.css` alias) committed in spa-app git root.
- [x] (P0) `git show HEAD:src/components/StatusBadge.css` — **0** hex backgrounds; surfaces via tokens.
- [x] (P0) Brand-family inventory excl. `tokens.css` on HEAD = **0**; `git log --grep=G11` nonempty.
- [x] (P0) Gate filled; Date from `--print-utc-now` after verify.

## Where to change
- Commit (spa-app git root): `src/styles/tokens.css`, `docs/UX/design-system.md`, G11 component CSS (StatusBadge, Login, Wallet, Civic, Contribution, Story*, Phone*, SessionShell, AppError, Filters/IssueCard/GptBridge, CountryWaitlist, UserCabinetPage, index.css as audited).
- Gate: `acceptance-verification-spa-g11-t12.md`.

## Out of scope
- F2 backlog §анализ (ignored working-doc). F3 pkg drift N/A. F4–F5 Info. Changing active pkg / rewriting `pkg-000043`. Vitest re-run not required unless commit hygiene needs it.

## Verification
```bash
cd spa-app && git show HEAD:src/components/StatusBadge.css | head -40
cd spa-app && git log --grep=G11 -1 --oneline
```

Gate: [`acceptance-verification-spa-g11-t12.md`](./acceptance-verification-spa-g11-t12.md)

Gate Date: 2026-08-02T14:29:34Z.
