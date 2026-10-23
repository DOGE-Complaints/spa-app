# NS-13 — Hide header search + notifications (structure Present · visual BLOCKED)

> **UTC:** 2026-10-23T14:22:30Z (P8 local close)  
> **Package:** `pkg-000215` · EPIC-SPA-19  
> **Code home:** `Header.jsx` · soft Header.css  
> **Normative:** Interview **H7** · [evidence 07](../../analysis/evidence/op-residual-wave4-2026-10-23/07-header-search-notifications.png) · Path A · keep gated code  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| Search | Absent from Header UI · `NS13_SHOW_SEARCH_NOTIFICATIONS=false` · markup/handlers kept |
| Notifications | Same gate · chrome code kept |
| Locale · theme · account | Held |
| Soft OOS | Brand PNG (NS-14) · invent search API · invent notification center |

## Touchpoints

- `components/AppShell/Header.jsx` (`data-ns13=search-notifications-gated`)
- Tests: `Header.ns13.test.jsx` · soft ns02/ns07 · Path A `scripts/tmp-ns13-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent search API · no invent notification center.
