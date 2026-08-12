# UI mockup spec — SPA-PH-02 AccountControl (Path A)

**UTC drafted:** 2026-08-04T09:47:51Z  
**ui_gate:** Path A (`@mockup` refs — human gate not required for UI-2)  
**Anchor task:** `task-spa-ph-02-t01-account-control-guest-auth`  
**Host chrome context:** M129 public header (brand | nav | session & locale)

## Source mockups (SSOT)

| Ref | Path |
|-----|------|
| M130 md | `spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.md` |
| M130 png | `spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec.png` |
| M130 estonia | `spa-app/docs/UX/mockups/home/mockup-130-public-header-account-control-state-sheet-spec-estonia.png` |
| M129 host md | `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec.md` |
| M129 host png | `spa-app/docs/UX/mockups/home/mockup-129-public-header-chrome-state-sheet-spec-estonia.png` |

## States to implement / capture (M130)

| ID | State | Behaviour |
|----|-------|-----------|
| A | Guest idle | Outline profile icon + optional «Sign in» → `/login`; **no** dropdown |
| B | Authenticated idle | Avatar/`ic-field-role` + optional `display_name` + chevron; click opens menu |
| C | Authenticated menu open | Exactly **Profile** → `/profile` · **Log out** → client `signOut` → `/board`; Escape / outside dismiss |

## Icons (catalog reuse)

| Element | Path |
|---------|------|
| Account / profile | `/icons/user-cabinet/ic-field-role.png` |
| Chevron | `/icons/identity/ic-chevron-down.png` |

## L10N (EN canon M130)

- `publicHome.account.signIn` — Sign in
- `publicHome.account.profile` — Profile
- `publicHome.account.logOut` — Log out
- `publicHome.account.openMenu` — Open account menu

## Out of scope (backlog)

Backend `/logout`, confirmation modal, Settings/wallet menu items, PH-01 brand/nav changes.

## Viewport

1536×1024 (desktop account chrome); mobile edge optional 390×844.
