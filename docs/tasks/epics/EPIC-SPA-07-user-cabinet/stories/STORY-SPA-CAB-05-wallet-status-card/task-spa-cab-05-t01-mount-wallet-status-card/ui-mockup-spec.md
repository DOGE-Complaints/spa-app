# UI mockup spec — SPA-CAB-05-T01 (anchor)

**Story:** STORY-SPA-CAB-05-wallet-status-card  
**Path A:** extends existing mockup SSOT (operator `@mockup:` M50 — human gate skip)  
**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**ui_scope:** `mixed` · **ui_anchor:** `true`

## Extends mockup

- [mockup-50-wallet-state-sheet-spec.md](../../../../../../UX/mockups/user%20profile/mockup-50-wallet-state-sheet-spec.md) — states A–C SSOT
- [mockup-50-wallet-state-sheet-spec.png](../../../../../../UX/mockups/user%20profile/mockup-50-wallet-state-sheet-spec.png)

Placement: M99 wallet slot top-right (CAB-01), не доминирует.

## Component

```tsx
<WalletStatusCard
  state={/* unlinked|linked|connect */}
  previewFlag={/* DEV doge.wallet-preview */}
/>
```

Mounted in `cabinet-slot-wallet` on `UserCabinetPage`. **New** component.

## MVP product deltas vs M50 artboard

| Topic | M50 artboard | MVP AC (backlog) |
|-------|--------------|------------------|
| Default state | A / B / C shown on sheet | **State A stub** only as live default |
| Coming Later (A) | disabled CTA | reuse `cabinet.common.comingLater` (disabled) |
| Manage Wallet (B) | manage flow | → `cabinet.common.comingSoon` |
| Connect Wallet (C) | connect flow | → `cabinet.common.comingSoon` |
| HTTP / wallet-API | future | **none** in MVP |
| B/C live backend | linked/connect | **Post-MVP** (UI preview via DEV hook only) |

## Selectors

| Element | Selector |
|---------|----------|
| Cabinet page | `[data-testid="user-cabinet-page"]` |
| Wallet slot | `[data-testid="cabinet-slot-wallet"]` |
| Card root | `[data-wallet-status-card]` |
| State | `[data-wallet-status-state="unlinked\|linked\|connect"]` |

## States (M50 letters)

| Letter | State key | Runtime trigger (DEV) |
|--------|-----------|------------------------|
| A | `unlinked` | default MVP / `sessionStorage['doge.wallet-preview']=unlinked` |
| B | `linked` | `preview=linked` |
| C | `connect` | `preview=connect` |

## Visual rules

- Card owns title (no duplicate `user-cabinet-page__slot-title` in wallet slot)
- Icons: `/icons/user-cabinet/ic-wallet-{unlinked,linked,connect}.png` — **no** coin/DeFi art
- L10N: `cabinet.wallet.*` + reuse `cabinet.common.comingLater` / `comingSoon`
- Authorship language only (M50 §1/§4); privacy: no keys/seed/full address by default/balances

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md).

## Operator gate

Path A — accepted via P3 `@mockup:` M50 md+png (no Path B interview).
