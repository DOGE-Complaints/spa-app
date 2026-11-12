# STORY-SPA-NS-17 — Mobile AppBar brand + burger drawer + viewport chrome

## Meta

- **Key:** `STORY-SPA-NS-17-mobile-appbar-burger-drawer`
- **Package:** [next-shell](INDEX.md)
- **Status:** P8 local close · T01–T05 **Done·BLOCK** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000230` · activation **none** · Partial visual=**BLOCK** · intake **PASS** · no invent PASS · no invent Wallet · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-17-2026-10-25.md) · [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-17-mobile-appbar-burger-drawer/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md) · NO PUSH
- **Interview:** [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md) **M1**
- **UX tip:** [M177](../../../UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md) · [intake](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave6-mobile-burger-drawer-2026-10-25.md)
- **Depends on:** NS-15 brand PNG tip · soft Header drawer pattern · PH static routes Present
- **Code home:** `MobileAppBar.jsx` · `AppShellLayout.jsx` · soft `Header.jsx` drawer · `ProfileRail` soft
- **L1.5:** [arch](../../../architecture/next-feed-vl/17-mobile-appbar-burger-drawer.md)
- **Soft:** NS-15 cleanup — drop residual `DOGEstonia-logo-big.png` from `AppShell` / `EmergingSignalsBlock`

## L1 — FR

- **FR-NS-17.1** Mobile AppBar shows **brand** PNG (theme dual) — not `nextShell.wip.title` / «Feed coming soon».  
- **FR-NS-17.2** Burger opens a working drawer: Account · Feed · My stories · static pages block (How it works · About · Privacy · Contact) · Submit story CTA (`VITE_STORY_GPT_URL` helper).  
- **FR-NS-17.3** Mobile chrome / main content usable full width within safe-area (no dead WIP letterbox).  
- **FR-NS-17.4** Soft: residual `logo-big` cleanup outside Header/Footer.  
- **FR-NS-17.5** Vitest · OP eye — no invent PASS · no invent routes · no invent Wallet in drawer.

## OOS

Filters scroll · profile card UX · bottom Wallet · invent OP PASS

## AC

- [x] UX tip cited / intake PASS (M177)  
- [x] Brand AppBar · working drawer IA (structure; visual **BLOCK**)  
- [x] Viewport chrome structure (structure; visual **BLOCK**)  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ns-17-t01-ux` | **Done** | Intake M177 PASS | 17.1 |
| `task-spa-ns-17-t02-appbar` | **Done·BLOCK** | Brand title · wire burger | 17.1 · 17.2 |
| `task-spa-ns-17-t03-drawer` | **Done·BLOCK** | Drawer sections + CTA | 17.2 |
| `task-spa-ns-17-t04-viewport` | **Done·BLOCK** | Full-bleed chrome | 17.3 |
| `task-spa-ns-17-t05-cleanup-vitest` | **Done·BLOCK** | logo-big residual · markers | 17.4 · 17.5 |

### Order

UX intake **Done** → `t02` → `t03` → `t04` → `t05` · skill `react-expert`
