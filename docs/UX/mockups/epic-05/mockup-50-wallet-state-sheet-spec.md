# Mockup 50 Spec — Wallet State Sheet

**Mockup source:** `docs/UX/mockups/DOGEstonia-Mockup-Wallet-state-sheet.png`
**Version:** v1.0
**Status:** active SSOT for Wallet component states
**Related docs:** `docs/UX/design-system.md`, `docs/UX/identity-frontend-ux-requirements.md`, `docs/UX/reusable-ui-components-architecture.md`

---

## 1) Purpose

This mockup defines the Wallet component inside the DOGEstonia user cabinet.

The wallet is a future trust/authorship layer.

It must not be presented as:

* trading;
* speculation;
* DeFi;
* investment;
* financial reward.

Its purpose is to prepare for cryptographic authorship and contribution proofs.

---

## 2) Component Type

Recommended component:

```tsx
<WalletStatusCard />
```

Used in:

```text
User Cabinet
Future Story Receipts
Future Contribution Layer
Future Reputation Views
```

---

## 3) State Sheet Structure

Single artboard.

Three states displayed together.

Only one state is rendered at runtime.

---

## State A — Wallet Not Linked

### Purpose

Default MVP state.

Wallet functionality is visible but not required.

### Title

```text
Wallet not linked
```

### Description

```text
Wallet signatures will be available later for proving authorship.
```

### Action

```text
Coming Later
```

Button state:

```text
disabled
```

---

## State B — Wallet Linked

### Purpose

Future state where user has connected a DOGE-compatible address.

### Title

```text
Wallet linked
```

### Displayed Data

```text
Address
D8fz...91kQ
```

### Metadata

```text
Linked on
Jun 14, 2026
```

### Action

```text
Manage Wallet
```

---

## State C — Wallet Connection Available

### Purpose

Future state when connection flow becomes available.

### Title

```text
Connect wallet
```

### Description

```text
Connect a Dogecoin address to prepare for future authorship proofs.
```

### Primary Action

```text
Connect Wallet
```

### Secondary Text

```text
Wallet connection is optional.
```

---

## 4) Visual Rules

Use:

```text
dark DOGEstonia surface
glassmorphism card
thin border
white text
muted gray metadata
yellow accent for available action
```

Avoid:

```text
coin graphics
market charts
token price visuals
trading language
investment language
DeFi language
```

---

## 5) Privacy Rules

Do not show:

```text
private keys
seed phrases
full wallet addresses by default
transaction history
balances
financial value
```

Allowed:

```text
truncated public address
connection status
connection date
authorship-related explanation
```

---

## 6) Data Contract

Possible backend states:

```text
wallet_not_linked
wallet_linked
wallet_connection_available
```

Example:

```json
{
  "wallet_status": "wallet_not_linked",
  "wallet_address": null,
  "wallet_linked_at": null
}
```

---

## 7) State Mapping

```text
wallet_not_linked
→ State A

wallet_linked
→ State B

wallet_connection_available
→ State C
```

---

## 8) Traceability

Primary story:

```text
S04-7 — Wallet Placeholder
```

Mockup:

```text
M50 — Wallet State Sheet
```

Component:

```tsx
<WalletStatusCard />
```

---

## 9) Design Goal

The component should communicate:

```text
Wallet is a future authorship layer.
It is optional.
It is not financial speculation.
It does not block MVP participation.
```

The wallet block should feel like infrastructure reserved for future trust proofs, not like a crypto feature.
