# STORY-SPA-CR-28 — Peer Reactions empty affordance

## Meta

- **Key:** `STORY-SPA-CR-28-peer-reactions-empty-affordance`
- **Package:** [component-reactions](INDEX.md)
- **Status:** P8 local close · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000226` · `activation: none` · TASKED=**0** · Partial visual=**BLOCK** · intake **PASS** · no invent OP PASS / people HTTP · soft [wave5 intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-CR-28-2026-10-24.md) · [p7](../../../analysis/reaudit-STORY-SPA-CR-28-p7-2026-10-24.md)
- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M14**
- **UX tip:** [M176](../../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) (rev2) · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave5-peer-reactions-empty-2026-10-24.md)
- **Depends on:** CR-12/21/24 Present  
- **Code home:** peer Reactions zone in `FeedCivicPost` / reactions-mount  
- **L1.5:** [arch](../../../architecture/component-reactions/28-peer-reactions-empty-affordance.md)

## L1 — FR

- **FR-CR-28.1** When peer aggregate empty, show people/group icon **above** Reactions label (M176 rev2) — not blank gap.  
- **FR-CR-28.2** Filled chips continuity · stable footprint · neighbors unmoved.  
- **FR-CR-28.3** Vitest · OP eye — no invent PASS · no invent people HTTP.

## OOS

Own strip UX (CR-26) · invent CDN

## AC

- [x] UX tip cited / intake PASS (M176 rev2)  
- [x] Empty affordance structure (Apply) — structure Present · OP Absent  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-cr-28-t01-ux` | **Done** | Intake M176 PASS | 28.2 |
| `task-spa-cr-28-t02-empty` | **Done** | Empty icon wire | 28.1 · 28.2 |
| `task-spa-cr-28-t03-vitest` | **Done** | Markers | 28.3 |

### Order

UX intake **Done** → `t02` → `t03` · skill `react-expert`
