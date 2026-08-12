# SPA-ID-03-T03 — Civic states Unverified, Available, Verified (A, B, D)

**Story:** [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)  
**Decision Ref:** [mockup-28 States A, B, D](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md); backlog FR-03.3, FR-03.5  
**Depends on:** T01, T02  
**ui_scope:** `visual` · **extends:** T02 ui_anchor  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T09:45:56Z

## Purpose
Implement panels **A Unverified**, **B Verification Available**, **D Verified** inside `CivicStatusCard` with canonical labels and verified-state wallet future-info block (FR-03.5).

## Risk
Paraphrased labels or missing wallet placeholder break story AC #3 and #5.

## Code Facts (re-verify at execute)
- M28 State D — wallet info block is future-only; `wallet_linked` not in `/me` (backlog API-интеграция).
- Canonical labels in [identity-frontend §9](../../../../../../../docs/Identity/identity-frontend.md) — grep in component must match exactly.

## AC / DoD
- [ ] (P0) State A when `phone_verified=false` + idle phase (story AC #1, #2).
- [ ] (P0) State B when protected-action / verification-available signal (flow phase from props).
- [ ] (P0) State D when `phone_verified=true` with `Verified civic participant` label (FR-03.3).
- [ ] (P0) Wallet info placeholder block visible in D — `Wallet not linked` copy, non-blocking (FR-03.5; story AC #5).
- [ ] (P0) `data-civic-status-state="unverified|verification_available|verified"` on panel root.
- [ ] (P1) No trophy/green-badge gamification (story AC #4).

## Where to change
- `spa-app/src/components/CivicStatus/CivicStatusCard.jsx` (panels A, B, D)
- `spa-app/src/components/CivicStatus/civicStatusLabels.js` (canonical strings SSOT)

## Out of scope
- States C, E (T04). OTP flow (ID-04). Dashboard route (T05).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/CivicStatus
cd spa-app && npm run dev
# dev props / mock profile → states A, B, D
```
