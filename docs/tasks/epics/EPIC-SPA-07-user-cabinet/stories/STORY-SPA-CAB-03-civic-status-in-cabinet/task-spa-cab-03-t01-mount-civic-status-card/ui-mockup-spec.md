# UI mockup spec — SPA-CAB-03-T01 (anchor)

**Story:** STORY-SPA-CAB-03-civic-status-in-cabinet  
**Path A:** extends existing mockup SSOT (operator `@mockup:` M28 — human gate skip)  
**Viewport:** 1536×1024  
**Route:** `/#/profile`  
**ui_scope:** `mixed` · **ui_anchor:** `true`

## Extends mockup

- [mockup-28-civic-status-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) — states A–E
- [mockup-28-civic-status-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png)

Placement hierarchy (not state SSOT): CAB-01 M99 civic slot (largest / top-center).

## Component

```tsx
<CivicStatusCard
  phoneVerified={Boolean(profile?.phone_verified)}
  phoneDialPrefix={profile?.phone_dial_prefix ?? null}
  phoneVerifiedAt={profile?.phone_verified_at ?? null}
  flowPhase={CIVIC_FLOW_PHASES.IDLE}
  onVerify={() => navigate('/verify')}
/>
```

Mounted in `cabinet-slot-civic` on `UserCabinetPage`. **Reuse only** — no second civic component.

## Selectors

| Element | Selector |
|---------|----------|
| Cabinet page | `[data-testid="user-cabinet-page"]` |
| Civic slot | `[data-testid="cabinet-slot-civic"]` |
| Card root | `[data-civic-status-card]` |
| State | `[data-civic-status-state="unverified\|verification_available\|verification_in_progress\|verified\|verification_failed"]` |

## States (M28)

| Letter | State | Runtime trigger |
|--------|-------|-----------------|
| A | unverified | `phone_verified=false`, `flowPhase=idle` |
| B | verification_available | `verificationContext=protected_action` (DEV preview / protected flows) |
| C | verification_in_progress | `flowPhase` in requesting/code_entry/confirming |
| D | verified | `phone_verified=true` |
| E | verification_failed | `flowPhase=failed` or `errorCode` |

## Visual rules (delta for cabinet)

- Replace civic slot placeholder with `CivicStatusCard`
- Icons: `/icons/user-cabinet/ic-civic-*.png` (T03) instead of unicode
- L10N: only `civic.*` keys (no new `cabinet.*` civic body copy)
- CTA Verify → `/verify` (ID-04)

## Baseline

See [ui-baseline/README.md](./ui-baseline/README.md).

## Operator gate

Path A — accepted via P3 `@mockup:` M28 md+png (no Path B interview).
