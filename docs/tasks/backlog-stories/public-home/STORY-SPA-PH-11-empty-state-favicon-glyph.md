# STORY-SPA-PH-11 — EmptyState favicon glyph unify

## Meta
- **Key:** `STORY-SPA-PH-11-empty-state-favicon-glyph`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) · public chrome polish (post PH-10)
- **Pipeline:** _(none — draft from PH-10 P5; optional PA.3)_
- **Package:** [public-home/](README.md)
- **Status:** Todo · draft
- **Severity:** 🟢 LOW (visual consistency / brand glyph)
- **Depends on:** [PH-10 Header horizontal logo + favicon](STORY-SPA-PH-10-header-horizontal-logo-favicon.md) Done
- **Source:** [audit-STORY-SPA-PH-10-execution-2026-08-07.md](../../../analysis/audit-STORY-SPA-PH-10-execution-2026-08-07.md) §F3 (WAIVED out-of-DoD on PH-10)
- **Related:** PH-10 FR-PH-10.4 = **tab** favicon only (`index.html` + `public/favicon.png`); EmptyState glyph is separate surface

## Зачем простыми словами

После PH-10 вкладка браузера использует `public/favicon.png`, а блок EmptyState по-прежнему показывает `/favicon.svg` как декоративную иконку. Это не ломает tab icon AC, но на демо два разных «favicon» glyph могут путать.

## Verified facts (intake)

| Fact | Evidence |
|------|----------|
| EmptyState img | [`EmptyState.jsx`](../../../../src/components/EmptyState/EmptyState.jsx) — `src="/favicon.svg"` |
| Tab favicon (PH-10 Done) | [`index.html`](../../../../index.html) → `./favicon.png` |
| `public/favicon.svg` on disk | still present; not wired in head |

## Scope (draft)

- Decide product lean: reuse `favicon.png`, keep SVG, or dedicated EmptyState asset.
- Wire EmptyState + tests; update any EmptyState vitest expecting `favicon.svg`.
- Document Out of scope: Landing favicon; apple-touch-icon.

## Вне scope

- Reopening PH-10 DoD / tab `<link rel="icon">`.
- Transparent horizontal logo pad ([BUG-04](../bugs/STORY-SPA-BUG-04-horizontal-logo-transparent-pad.md)).

## Next (process)

1. Optional PA.3 refine → P1.3 when activated.  
2. Do **not** activate pkg from this draft alone.
