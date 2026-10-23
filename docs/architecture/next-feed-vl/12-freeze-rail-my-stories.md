# NS-12 — Freeze My stories in ProfileRail (structure Present · visual BLOCKED)

> **UTC:** 2026-10-23T14:08:51Z (P8 local close)  
> **Package:** `pkg-000214` · EPIC-SPA-19  
> **Code home:** `ProfileRail.jsx` · soft `MobileBottomNav.jsx`  
> **Normative:** Interview **R4** · Path A code lock · keep gated code for later unfreeze  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| My stories | Absent from rail UI · `NS12_SHOW_MY_STORIES=false` · NavLink code kept |
| Feed · Profile | Held |
| Soft mobile | No My stories affordance (`data-ns12=no-my-stories`) |
| Soft OOS | CAB-08 story HTTP · invent activity API in rail |

## Touchpoints

- `components/AppShell/ProfileRail.jsx` (`data-ns12=my-stories-gated`)
- `components/AppShell/MobileBottomNav.jsx`
- Tests: `ProfileRail.ns12.test.jsx` · ns03 updated · Path A `scripts/tmp-ns12-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent story list in rail · no invent CAB-08.
