# STORY-SPA-CAB-08 — Cabinet layout · hide wallet/contrib · story-activity wire

## Meta

- **Key:** `STORY-SPA-CAB-08-cabinet-layout-story-activity-wire`
- **Package:** [cabinet](INDEX.md)
- **Status:** P5 APPLY · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-23T14:53:38Z` · `pkg-000217` · `activation: none` · Await P8 · [pipeline](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire/STORY-SPA-CAB-08-cabinet-layout-story-activity-wire.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-CAB-08-2026-10-23.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **P5**
- **UX tip:** [M170](../../../UX/mockups/user%20profile/DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.md) · [intake](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave4-cabinet-layout-2026-10-23.md) · cite [M45](../../../UX/mockups/user%20profile/mockup-45-story-activity-state-sheet-spec.md) · [M28](../../../UX/epic-04/mockup-28-civic-status-state-sheet-spec.md) · [M99](../../../UX/mockups/user%20profile/mockup-99-user-cabinet-final-assembly-spec.md)
- **API:** [STORY-SPA-CAB-api-requirements.md](STORY-SPA-CAB-api-requirements.md) — `GET /story-activity` BE Present · SPA wire this story
- **Depends on:** soft NS-11 (next shell on profile) · CAB-04 UI Present
- **Code home:** `UserCabinetPage.jsx` · `StoryActivityCard.jsx` · `CivicStatusCard.jsx` · `WalletStatusCard` · `ContributionLayer`

## L1 — FR

- **FR-CAB-08.1** Wallet + Contribution Layer **not shown** (gate — keep components for later).  
- **FR-CAB-08.2** Verified Civic presentation **compact** (badge/slim card) — not oversized overlapping plate.  
- **FR-CAB-08.3** Story Activity **full-width** in main column when wallet/contrib hidden.  
- **FR-CAB-08.4** Wire SPA client to `GET /story-activity` with authenticated session · map to M45 active/empty states (no invent rows).  
- **FR-CAB-08.5** Empty CTA → `/next/feed` (label Go to Feed) — not `/board`.  
- **FR-CAB-08.6** Layout no float/overlap · Vitest · OP eye — no invent PASS · no invent contribution API.

## OOS

NS-14 brand · invent GW-CAB-03 · invent legal pages

## AC

- [x] UX tip / M170 + M45·M28·M99 cited · intake PASS  
- [x] Wallet/contrib hidden (structure)  
- [x] Compact verified · full-width Story Activity (structure)  
- [x] Live story-activity when USER logged in (structure)  
- [x] Vitest · OP eye (structure Present · visual **BLOCK**)  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-cab-08-t01-gate-slots` | Done | Hide wallet + contribution slots | 08.1 |
| `task-spa-cab-08-t02-layout` | Done | Compact civic · full-width activity · fix overlap | 08.2 · 08.3 · 08.6 |
| `task-spa-cab-08-t03-http` | Done | Client GET /story-activity + map states | 08.4 |
| `task-spa-cab-08-t04-cta` | Done | Go to Feed → /next/feed | 08.5 |
| `task-spa-cab-08-t05-vitest` | Done | Markers · soft auth fixture | 08.6 |

### Order

UX intake → `t01` → `t02` → `t03` → `t04` → `t05` · skill `react-expert`
