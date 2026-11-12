# STORY-SPA-NS-11 — Profile route uses next shell

## Meta

- **Key:** `STORY-SPA-NS-11-profile-next-shell`
- **Package:** [next-shell](INDEX.md)
- **Status:** P8 local close · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000213` closed · `activation: none` · NO PUSH · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-11-profile-next-shell/STORY-SPA-NS-11-profile-next-shell.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-11-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/11-profile-next-shell.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **S3**
- **Evidence:** [03-profile-wrong-shell.png](../../../analysis/evidence/op-residual-wave4-2026-10-23/03-profile-wrong-shell.png)
- **Code home:** `AppShellLayout.jsx` · `ProtectedProfilePage` · soft `UserCabinetPage`

## L1 — FR

- **FR-NS-11.1** `/profile` renders next public shell: Header + ProfileRail (+ footer as next/feed pattern) — not classic Workspace/Board AppShell defaults.  
- **FR-NS-11.2** Cabinet page content held inside next shell main region.  
- **FR-NS-11.3** Soft: other protected routes OOS unless already next-shelled.  
- **FR-NS-11.4** Vitest · OP eye — no invent PASS.

## OOS

CAB-08 layout · invent CDN · My stories freeze (NS-12)

## AC

- [ ] Profile shows Header + ProfileRail  
- [ ] No Workspace/Board classic sidebar  
- [ ] Vitest · OP eye  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-11-t01-layout` | Done | AppShellLayout profile → next shell props | 11.1 |
| `task-spa-ns-11-t02-footer` | Done | PublicFooter on profile if next/feed parity | 11.1 · 11.2 |
| `task-spa-ns-11-t03-vitest` | Done | Route shell markers | 11.4 |

### Order

`t01` → `t02` → `t03` · skill `react-expert`
