# STORY-SPA-NS-18 — Profile mobile layout UX

## Meta

- **Key:** `STORY-SPA-NS-18-profile-mobile-layout`
- **Package:** [next-shell](INDEX.md) · soft [cabinet](../cabinet/INDEX.md)
- **Status:** P8 local close · T01–T04 **Done·BLOCK** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000231` · activation **none** · Partial visual=**BLOCK** · intake **PASS** · no invent PASS · CAB-08 gates held · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-18-2026-10-25.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-18-p7-2026-10-25.md) · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-18-profile-mobile-layout/STORY-SPA-NS-18-profile-mobile-layout.md) · NO PUSH
- **Interview:** [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M3**
- **UX tip:** [M178](../../../UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md) · [intake](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave6-profile-mobile-2026-10-25.md)
- **Depends on:** NS-11 profile shell · CAB-08 gates held  
- **Code home:** `UserCabinetPage` · `AccountSummary` · `AppShellLayout` profile route · ProfileRail soft
- **L1.5:** [arch](../../../architecture/next-feed-vl/18-profile-mobile-layout.md)

## L1 — FR

- **FR-NS-18.1** `/profile` on mobile: Account (email · created) readable as normal rows — no vertical character column.  
- **FR-NS-18.2** Shell main uses full usable width on phone (no empty right-rail crush).  
- **FR-NS-18.3** Cite M178 after intake · CAB-08 wallet/contrib stay gated.  
- **FR-NS-18.4** Vitest · OP eye — no invent PASS · no invent APIs.

## OOS

Burger drawer · unfreeze Wallet · invent OP PASS

## AC

- [x] UX tip cited / intake PASS (M178)  
- [x] Account card + shell width structure (structure; visual **BLOCK**)  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-18-t01-ux` | **Done** | Intake M178 PASS | 18.3 |
| `task-spa-ns-18-t02-account` | **Done·BLOCK** | AccountSummary mobile rows | 18.1 |
| `task-spa-ns-18-t03-shell` | **Done·BLOCK** | Profile route width / grid | 18.2 |
| `task-spa-ns-18-t04-vitest` | **Done·BLOCK** | Markers | 18.4 |

### Order

UX intake **Done** → `t02` → `t03` → `t04` · skill `react-expert`
