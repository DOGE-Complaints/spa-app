# NS-11 — Profile route uses next shell (structure Present · visual BLOCKED)

> **UTC:** 2026-10-23T13:56:51Z (P8 local close)  
> **Package:** `pkg-000213` · EPIC-SPA-19  
> **Code home:** `AppShellLayout.jsx` · `ProtectedProfilePage` · soft `UserCabinetPage`  
> **Normative:** Interview **S3** · [evidence 03](../../analysis/evidence/op-residual-wave4-2026-10-23/03-profile-wrong-shell.png) · next/feed chrome parity · Path A **p13UxReady**  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Surface

| Piece | Rule |
|-------|------|
| `/profile` | `next-shell-route next-shell-profile` · Header + ProfileRail + PublicFooter |
| Classic | No WORKSPACE / Board sidebar defaults on `/profile` |
| Cabinet | Content in next-shell main region |
| Soft OOS | Other protected routes stay workspace unless already next-shelled |
| Soft OOS | CAB-08 · invent CDN · NS-12 My stories freeze |

## Touchpoints

- `layout/AppShellLayout.jsx` (`isProfileNextShell`)
- Tests: `AppShellLayout.ns11Profile.test.jsx` · `UserCabinetPage.test.jsx` · Path A `scripts/tmp-ns11-capture.mjs`

## Honesty

Partial visual=**BLOCK** until OP eye · no invent PASS · no invent CDN · no invent CAB-08 · no invent NS-12.
