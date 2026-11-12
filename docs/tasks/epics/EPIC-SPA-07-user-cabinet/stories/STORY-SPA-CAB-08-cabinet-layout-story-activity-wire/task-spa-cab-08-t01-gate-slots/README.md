# SPA-CAB-08-T01 — Hide wallet + contribution slots

**Status:** Done  
**Story:** [`../STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
**Decision Ref:** [`../../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md`](../../../../../backlog-stories/cabinet/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md)  
**ui_scope:** `cabinet` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-23T14:39:13Z`  
**Package:** `pkg-000217`  
**Path A:** M170+M45 · Interview P5 · p13UxReady

## Purpose

FR-CAB-08.1: Wallet + Contribution Layer **not shown** (gate — keep components for later).

## Code Facts (verify)

- AS-IS: WalletStatusCard · ContributionLayer Present in cabinet layout  
- Target: feature gate / conditional hide · keep code

## Constraints

- Path A · NO BRIEF · Partial=**BLOCK**  
- no invent OP PASS · no invent contribution API · NS-14 OOS · invent GW-CAB-03 OOS

## AC / DoD

- [ ] Structure claims only after code verify  
- [ ] Visual Done not claimed without OP eye · gate held **PENDING**/BLOCK until OP

## Where changed

_(Await P3)_ `UserCabinetPage.jsx` · soft wallet/contrib components

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
rg -n "WalletStatus|ContributionLayer|CAB08|cab-08" spa-app/src/pages/UserCabinetPage.jsx spa-app/src/features/cabinet 2>/dev/null || true
```

## @mockup

```text
@mockup: spa-app/docs/UX/mockups/user profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md
```
