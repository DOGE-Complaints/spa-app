# UI mockup spec — SPA-CAB-01-T02 (anchor)

**Story:** STORY-SPA-CAB-01-profile-cabinet-shell-assembly  
**Path A:** extends existing mockup SSOT (operator `@mockup:` in P1/P3 — human interview skip)  
**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**ui_anchor:** true

## Extends mockup

- [mockup-21-user-cabinet-overview-default-spec.md](../../../../../../UX/mockups/user%20profile/mockup-21-user-cabinet-overview-default-spec.md) + `.png` — overview / default
- [mockup-99-user-cabinet-final-assembly-spec.md](../../../../../../UX/mockups/user%20profile/mockup-99-user-cabinet-final-assembly-spec.md) + `.png` — final assembly / section slots
- Loading (T04): [mockup-22-user-cabinet-loading-spec.png](../../../../../../UX/mockups/user%20profile/mockup-22-user-cabinet-loading-spec.png) (image-only)

## Screen

`UserCabinetPage` inside AppShell on `/#/profile`.

## Layout (M99)

Desktop **12-column** grid. Section slots (hierarchy Civic > Story > Contribution > Account > Wallet):

| Slot | testid | Grid role (desktop) |
|------|--------|---------------------|
| Civic Status | `cabinet-slot-civic` | Primary / largest (top center span) |
| Story Activity | `cabinet-slot-story` | Below civic |
| Contribution | `cabinet-slot-contribution` | Bottom full-width band |
| Account | `cabinet-slot-account` | Top-left; **keeps** `AccountSummary` (CAB-02) |
| Wallet | `cabinet-slot-wallet` | Top-right |

Empty slots (CAB-03…06): labelled section shell only — no block content.

## Shell chrome (FR-CAB-01.2)

- AppShell reuse
- Sidebar: `Profile` active (`[data-testid="app-shell-nav-profile"]` + `board-nav-item-active`)
- Page title: `cabinet.page.title` → Profile

## Selectors

| Element | Selector |
|---------|----------|
| Cabinet page | `[data-testid="user-cabinet-page"]` |
| Grid | `[data-testid="cabinet-grid"]` |
| Account slot | `[data-testid="cabinet-slot-account"]` |
| Civic slot | `[data-testid="cabinet-slot-civic"]` |
| Story slot | `[data-testid="cabinet-slot-story"]` |
| Wallet slot | `[data-testid="cabinet-slot-wallet"]` |
| Contribution slot | `[data-testid="cabinet-slot-contribution"]` |
| AccountSummary | `[data-testid="account-summary"]` |
| Shell loading / skeleton | `[data-testid="cabinet-shell-skeleton"]` |
| Profile nav | `[data-testid="app-shell-nav-profile"]` |

## States

| State | Trigger | Capture slug |
|-------|---------|--------------|
| default | authenticated + profile loaded | `default-cabinet-shell` |
| loading | `SESSION_SHELL_STATES.RESTORING` | `loading-cabinet-shell` |

## Visual rules (M21 §3 / M99 §7)

- Not social-profile aesthetic
- Civic primary; Account/Wallet secondary
- Dark civic-tech / glass panels; yellow accents sparingly
- No giant spinner on loading — skeleton mirroring slot structure

## AC traceability

- AC #1: `/profile` = cabinet (not placeholder) + slots
- AC #2: M99 section slots + hierarchy
- AC #5: shell strings via `cabinet.*` / `appShell.nav.profile`
