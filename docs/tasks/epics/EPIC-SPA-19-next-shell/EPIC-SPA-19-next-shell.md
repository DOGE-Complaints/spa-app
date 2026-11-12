# EPIC-SPA-19 — Next Shell (REQ-22 shell slice)

> **ID:** `EPIC-SPA-19` · **Статус:** In Progress — tip **NS-19 P3 Execute Done** · `2026-10-25T10:33:36Z` · `pkg-000232` · T01–T04 Done·BLOCK · gate **BLOCK** · activation **active** · Await P4 · soft NS-18 P8 BLOCK · soft NS-17 P8 BLOCK · soft NS-16…07 P8 BLOCKED OP eye · NS-01…06 Done (`pkg-000097`…`102`)  


> **Тип:** Product / UX shell  
> **source:** [`../../backlog-stories/next-shell/INDEX.md`](../../backlog-stories/next-shell/INDEX.md)  
> **Parent REQ:** [`22-feed-visual-redesign-phase-1.md`](../../../requirements/22-feed-visual-redesign-phase-1.md) §2a shell  
> **Architecture:** [`feed-visual-redesign-phase-1/00-overview.md`](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) · [01-routes-shell](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md)  
> **Prerequisite:** REQ-21 Phase 0 Done ([EPIC-SPA-18](../EPIC-SPA-18-ui-modularity-theme-redesign-prep/EPIC-SPA-18-ui-modularity-theme-redesign-prep.md)) · `AppShellLayout` sole chrome  
> **Admin:** ADMIN-NS-01…06 intake complete → backlog ready for P1.3/P3  
> **Sibling:** feed content → [next-feed](../../backlog-stories/next-feed/INDEX.md) (not this epic)

---

## Назначение

Доставить **полностью новый public shell** на `#/next/feed*` (D2.1), затем тот же состав на classic shelter (D2.3). Classic не дом. Feed body / threads / reactions — **out of epic**.

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| REQ-21 Phase 0 / AppShellLayout chrome owner | Done |
| ADMIN-NS-05 backlog stories NS-01…06 | **Done** (`pkg-000097`…`102`) |
| Icon catalog + promote plan | [STORY-SPA-NS-icon-assets.md](../../backlog-stories/next-shell/STORY-SPA-NS-icon-assets.md) |
| API: no new endpoints | [STORY-SPA-NS-api-requirements.md](../../backlog-stories/next-shell/STORY-SPA-NS-api-requirements.md) |
| Arch D2 order | next shell before classic; feed content excluded |

## Состав

| Story | Тема | Wave | Status | Pipeline | Backlog |
|-------|------|------|--------|----------|---------|
| NS-01 | Next routes + shell host + WIP | A | **Done** `pkg-000097` | [pipeline](stories/STORY-SPA-NS-01-next-routes-shell-host/STORY-SPA-NS-01-next-routes-shell-host.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-01-next-routes-shell-host.md) |
| NS-02 | PublicHeader next chrome + icon promote | A | **Done** `pkg-000098` | [pipeline](stories/STORY-SPA-NS-02-public-header-next-chrome/STORY-SPA-NS-02-public-header-next-chrome.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-02-public-header-next-chrome.md) |
| NS-03 | ProfileRail + shelter nav (Q15) | A | **Done** `pkg-000099` | [pipeline](stories/STORY-SPA-NS-03-profile-rail-shelter-nav/STORY-SPA-NS-03-profile-rail-shelter-nav.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-03-profile-rail-shelter-nav.md) |
| NS-04 | Shell grid + empty right (Q16) + mobile | A | **Done** `pkg-000100` | [pipeline](stories/STORY-SPA-NS-04-shell-grid-mobile-chrome/STORY-SPA-NS-04-shell-grid-mobile-chrome.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-04-shell-grid-mobile-chrome.md) |
| NS-05 | Classic shell apply D2.3 | B | **Done** `pkg-000101` | [pipeline](stories/STORY-SPA-NS-05-classic-shell-apply/STORY-SPA-NS-05-classic-shell-apply.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-05-classic-shell-apply.md) |
| NS-06 | `/` flip + shell verify + page-map | C | **Done** `pkg-000102` | [pipeline](stories/STORY-SPA-NS-06-default-entry-shell-verify/STORY-SPA-NS-06-default-entry-shell-verify.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-06-default-entry-shell-verify.md) |
| NS-07 | Shell dark icon chrome (OP D5) | Markstack | P5/P8 · gate BLOCK · T01–T04 Done · `pkg-000199` · soft | [pipeline](stories/STORY-SPA-NS-07-shell-dark-icon-chrome/STORY-SPA-NS-07-shell-dark-icon-chrome.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-07-shell-dark-icon-chrome.md) |
| NS-08 | Locale chevron + ES frozen | Markstack | P8 closed · T01–T03 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000201` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-08-locale-chevron-es-frozen/STORY-SPA-NS-08-locale-chevron-es-frozen.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-08-locale-chevron-es-frozen.md) |
| NS-09 | ProfileRail Feed cleanup | Markstack | P8 closed · T01–T04 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000202` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-09-profile-rail-feed-cleanup/STORY-SPA-NS-09-profile-rail-feed-cleanup.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-09-profile-rail-feed-cleanup.md) |
| NS-10 | Header logo light + scale (vector) | Markstack | P8 closed · T01–T04 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000203` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-10-header-logo-light-scale/STORY-SPA-NS-10-header-logo-light-scale.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-10-header-logo-light-scale.md) |
| NS-11 | Profile route → next shell | Markstack wave4 | P8 closed · T01–T03 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000213` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-11-profile-next-shell/STORY-SPA-NS-11-profile-next-shell.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-11-profile-next-shell.md) |
| NS-12 | Freeze My stories in ProfileRail | Markstack wave4 | P8 closed · T01–T03 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000214` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-12-freeze-rail-my-stories/STORY-SPA-NS-12-freeze-rail-my-stories.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-12-freeze-rail-my-stories.md) |
| NS-13 | Hide header search + notifications | Markstack wave4 | P8 closed · T01–T03 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000215` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-13-hide-header-search-notifications/STORY-SPA-NS-13-hide-header-search-notifications.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-13-hide-header-search-notifications.md) |
| NS-14 | Brand PNG dual theme header+footer | Markstack wave4 | P8 closed · asset **MASTERS_ABSENT** · gate **BLOCK** · Story **BLOCKED** (asset + OP eye) OK · `pkg-000216` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-14-brand-png-dual-theme/STORY-SPA-NS-14-brand-png-dual-theme.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-14-brand-png-dual-theme.md) |
| NS-15 | OP light/dark PNG · footer dual · cleanup | Markstack wave5 | P8 closed · T01–T04 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000220` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-15-brand-op-light-png-footer-dual/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) |
| NS-16 | Default theme light when unset | Markstack wave5 | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000221` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-16-default-theme-light/STORY-SPA-NS-16-default-theme-light.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-16-default-theme-light.md) |
| NS-17 | Mobile AppBar brand + burger drawer | Markstack wave6 | P8 closed · T01–T05 Done·BLOCK · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000230` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-17-mobile-appbar-burger-drawer/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md) |
| NS-18 | Profile mobile layout | Markstack wave6 | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000231` · soft · `activation: none` | [pipeline](stories/STORY-SPA-NS-18-profile-mobile-layout/STORY-SPA-NS-18-profile-mobile-layout.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-18-profile-mobile-layout.md) |
| NS-19 | Mobile bottom nav + frozen Wallet | Markstack wave6 | P3 Done·BLOCK · gate **BLOCK** · T01–T04 Done·BLOCK · `pkg-000232` · **tip** · activation **active** · Await P4 | [pipeline](stories/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md) | [backlog](../../backlog-stories/next-shell/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md) |

## Порядок волн

```
Wave A: NS-01 → NS-02 → NS-03 → NS-04
Wave B: NS-05
Wave C: NS-06
Markstack: NS-07 → … → NS-15/16 (soft P8) → NS-17/18 (soft P8) → **NS-19** (bottom nav · tip · Await P4)
```

## Must-include (from ADMIN-NS-06)

1. Promote icons → `public/icons/next-shell/<group>/` (NS-02-T01; verify NS-06)
2. Wire Header/rail to `/icons/next-shell/…`
3. Logo reuse `/assets/DOGEstonia-logo-*`; brand → `#/next/feed`
4. Register `#/next/feed*` **above** catch-all `*`
5. D2.3 classic + shelter-list intact
6. `/` + `*` flip after working shell
7. Vitest + browser-smoke shell
8. Update `spa-url-page-map.md`

**Do not** task BoardFeed / threads / reactions (next-feed).

## Active tip

**P3 NS-19 Execute Done (`2026-10-25T10:33:36Z` · tip):** [`pkg-000232`](../../spa-active-packages/pkg-000232-20261025-epic-spa-19-ns-19-mobile-bottom-nav-wallet-frozen.yaml) · T01–T04 Done·BLOCK · structure Pass · CAPTURE-META `fails: []` · ns19 **4/4** · gate **BLOCK** · activation **active** · Await **P4**. Wave `OP-spa nf26-wave6-20261025`. No invent OP PASS · no CAB-08 unfreeze · glyph soft.

**P1.3 NS-19 activated (`2026-10-25T10:28:33Z` · soft · superseded tip by P3):** [`pkg-000232`](../../spa-active-packages/pkg-000232-20261025-epic-spa-19-ns-19-mobile-bottom-nav-wallet-frozen.yaml) · T01 Done · T02–T04 Todo · Path A M179 intake PASS · Interview M4 · glyph soft · Partial visual=**BLOCK** · NO BRIEF · no invent PNG beyond tip · Skill `react-expert` · gate was **PENDING** · activation **active** · Await **P2**. Tip after pkg-000231. Wave `OP-spa nf26-wave6-20261025`. No invent OP PASS · no CAB-08 unfreeze. Do not git push unless operator asks.

**P8 NS-18 local close (`2026-10-25` · soft · superseded tip by NS-19):** [`pkg-000231`](../../spa-active-packages/pkg-000231-20261025-epic-spa-19-ns-18-profile-mobile-layout.yaml) closed · SHAs feat `517f1dc` · test `0e55901` · docs `32025f4` · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-18-2026-10-25.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-18-p7-2026-10-25.md) · [arch](../../../architecture/next-feed-vl/18-profile-mobile-layout.md) · `activation: none` · NO PUSH · wave `OP-spa nf26-wave6-20261025`.

**P1.3 NS-18 activated (`2026-10-25T10:16:00Z` · soft · superseded):** [`pkg-000231`](../../spa-active-packages/pkg-000231-20261025-epic-spa-19-ns-18-profile-mobile-layout.yaml) · T01 Done · T02–T04 Todo · Path A M178 intake PASS · Interview M3 · Partial visual=**BLOCK** · NO BRIEF · no invent PNG · Skill `react-expert` · gate was **PENDING** · activation was **active** · Await **P2**. Tip after pkg-000230. Wave `OP-spa nf26-wave6-20261025`.

**P8 NS-17 local close (`2026-10-25` · soft · superseded tip by NS-18):** [`pkg-000230`](../../spa-active-packages/pkg-000230-20261025-epic-spa-19-ns-17-mobile-appbar-burger-drawer.yaml) closed · SHAs feat `a8812f3` · test `f064714` · docs `f516d48` · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-17-2026-10-25.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-17-p7-2026-10-25.md) · [arch](../../../architecture/next-feed-vl/17-mobile-appbar-burger-drawer.md) · `activation: none` · NO PUSH · wave `OP-spa nf26-wave6-20261025`.

**P5 NS-17 APPLY (`2026-10-25T10:10:49Z` · superseded tip by P8):** [`pkg-000230`](../../spa-active-packages/pkg-000230-20261025-epic-spa-19-ns-17-mobile-appbar-burger-drawer.yaml) · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-17-2026-10-25.md) · F1/F2 **WAIVED** · TASKED=**0** · `activation: none` · P6 skipped · Await P8.

**P1.3 NS-17 activated (`2026-10-25T10:00:29Z` · superseded):** [`pkg-000230`](../../spa-active-packages/pkg-000230-20261025-epic-spa-19-ns-17-mobile-appbar-burger-drawer.yaml) · T01 Done · T02–T05 Todo · Path A M177 · gate was PENDING · activation was **active**.

**P8 NS-16 local close (`2026-10-24T09:56:30Z` · soft):** [`pkg-000221`](../../spa-active-packages/pkg-000221-20261024-epic-spa-19-ns-16-default-theme-light.yaml) closed · SHAs feat `ede3abc` · test `a93c6f5` · docs `df46fb9` · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-16-2026-10-24.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-16-p7-2026-10-24.md) · [arch](../../../architecture/next-feed-vl/16-default-theme-light.md) · `activation: none` · NO PUSH · superseded tip by NS-17 above.

**P5 NS-16 APPLY (`2026-10-24T09:54:48Z`; superseded as tip by P8):** [`pkg-000221`](../../spa-active-packages/pkg-000221-20261024-epic-spa-19-ns-16-default-theme-light.yaml) unchanged · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-16-2026-10-24.md) · [audit](../../../analysis/audit-STORY-SPA-NS-16-execution-2026-10-24.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 skipped · Await **P8**. No invent PASS.

**P3 NS-16 Execute Done (`2026-10-24T09:52:23Z`; superseded as tip by P5):** [`pkg-000221`](../../spa-active-packages/pkg-000221-20261024-epic-spa-19-ns-16-default-theme-light.yaml) · T01–T02 **Done** · unset→light · stored dark held · bootTheme **7/7** · Path A shots Present · CAPTURE-META `fails: []` · gate **BLOCK** (OP eye Absent · Partial visual) · no invent OP PASS · activation was active · Await **P4/P5**. [run-summary](../../run-reports/run-summary-20261024-0952-spa-ns-16-p3.md). Superseded by P5 above.

**P1.3 NS-16 activated (`2026-10-24T09:48:12Z`; superseded as tip by P3):** [`pkg-000221`](../../spa-active-packages/pkg-000221-20261024-epic-spa-19-ns-16-default-theme-light.yaml) · REUSE EPIC-SPA-19 · CREATE T01–T02 Todo · ui_scope next-shell/theme · Path A arch Present · Interview **M8** · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation **active** · unset→light · stored wins · no invent OP PASS / OS theme. Wave `OP-spa nf25-wave5-20261024`. Tip after pkg-000220. Superseded by P3 above.

**P8 NS-15 local close (`2026-10-24T09:47:00Z`; superseded as tip by P1.3 NS-16):** [`pkg-000220`](../../spa-active-packages/pkg-000220-20261024-epic-spa-19-ns-15-brand-op-light-png-footer-dual.yaml) closed · SHAs feat `b2b1938` · test `89d2749` · docs `c9705f9` · structure Present · masters **PRESENT** · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-15-2026-10-24.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-15-p7-2026-10-24.md) · [arch](../../../architecture/next-feed-vl/15-brand-op-light-png-footer-dual.md) · `activation: none` · NO PUSH. No invent PASS / PNG.

**P5 NS-15 APPLY (`2026-10-24T09:44:53Z`; superseded as tip by P8):** [`pkg-000220`](../../spa-active-packages/pkg-000220-20261024-epic-spa-19-ns-15-brand-op-light-png-footer-dual.yaml) unchanged · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-15-2026-10-24.md) · [audit](../../../analysis/audit-STORY-SPA-NS-15-execution-2026-10-24.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · masters **PRESENT** · gate **BLOCK** · P6 skipped · Await **P8**. No invent PASS / PNG.

**P3 NS-15 Execute Done (`2026-10-24T09:40:52Z`; superseded as tip by P5):** [`pkg-000220`](../../spa-active-packages/pkg-000220-20261024-epic-spa-19-ns-15-brand-op-light-png-footer-dual.yaml) · T01–T04 **Done** · tip masters copy → `public/assets/` · Header+Footer dual PNG · footer no adjacent text · not logo-big · Path A shots 01–04 md5 `e36db35aaf10` · `ecd1f926c69f` · `9133aec027b2` · `e793d2f3acad` · ns15 Vitest · CAPTURE-META `fails: []` · gate **BLOCK** (OP eye Absent · Partial visual) · no invent OP PASS / PNG · activation was active · Await **P4/P5**. [run-summary](../../run-reports/run-summary-20261024-0940-spa-ns-15-p3.md). Superseded by P5 above.

**P1.3 NS-15 activated (`2026-10-24T09:00:58Z`; superseded as tip by P3):** [`pkg-000220`](../../spa-active-packages/pkg-000220-20261024-epic-spa-19-ns-15-brand-op-light-png-footer-dual.yaml) · REUSE EPIC-SPA-19 · CREATE T01–T04 Todo · ui_scope next-shell/brand · Path A tip masters Present ([m169-brand-source](../../../UX/mockups/home/m169-brand-source/)) · copy only · Interview M1·M4·M5 · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation **active** · no invent PNG · no invent OP PASS / mascot. Wave `OP-spa nf25-wave5-20261024`. Tip after pkg-000219. Superseded by P3 above.

**P8 NS-14 local close (`2026-10-23T14:37:26Z`; superseded as tip by P1.3 NS-15):** [`pkg-000216`](../../spa-active-packages/pkg-000216-20261023-epic-spa-19-ns-14-brand-png-dual-theme.yaml) closed · structure tagline Present · asset **MASTERS_ABSENT** · gate **BLOCK** · Story **BLOCKED** (asset + OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-14-2026-10-23.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-14-p7-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/14-brand-png-dual-theme.md) · `activation: none` · NO PUSH. No invent PNG / OP PASS.

**P5 NS-14 APPLY (`2026-10-23T14:34:34Z`; superseded tip):** [`pkg-000216`](../../spa-active-packages/pkg-000216-20261023-epic-spa-19-ns-14-brand-png-dual-theme.yaml) unchanged · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-14-2026-10-23.md) · F1 **WAIVED** asset-blocker · F2 **WAIVED** operator · F3 **WAIVED** info · TASKED=**0** · `activation: none` · asset MASTERS_ABSENT · gate **BLOCK** · P6 skipped · Await **P8**. Superseded by P8 above.

**P3 NS-14 Execute partial (`2026-10-23T14:30:20Z`; superseded tip):** [`pkg-000216`](../../spa-active-packages/pkg-000216-20261023-epic-spa-19-ns-14-brand-png-dual-theme.yaml) · asset **MASTERS_ABSENT** · T01/T02 soft BLOCK · T03 tagline drop Done · T04 Done · Header SVG held · Path A shots Present · CAPTURE-META `fails: []` · ns14 **3/3** · gate **BLOCK** · activation was active · Await **P4/P5**. [run-summary](../../run-reports/run-summary-20261023-1430-spa-ns-14-p3.md). Superseded by P5 above.

**P1.3 NS-14 activated (`2026-10-23T14:25:07Z`; superseded tip):** [`pkg-000216`](../../spa-active-packages/pkg-000216-20261023-epic-spa-19-ns-14-brand-png-dual-theme.yaml) · T01 **BLOCK** soft (M169 brand PNG masters Absent) · T02–T04 Todo · Path A M169 · Interview L2 · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Tip after pkg-000215. Wave `OP-spa nf24-wave4-20261023`. Superseded by P3 above.

**P8 NS-13 local close (`2026-10-23T14:22:30Z`; superseded tip):** [`pkg-000215`](../../spa-active-packages/pkg-000215-20261023-epic-spa-19-ns-13-hide-header-search-notifications.yaml) closed · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-13-2026-10-23.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-13-p7-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/13-hide-header-search-notifications.md) · `activation: none` · NO PUSH. Superseded by P1.3 NS-14 above.

**P5 NS-13 APPLY (`2026-10-23T14:19:28Z`; superseded tip):** [`pkg-000215`](../../spa-active-packages/pkg-000215-20261023-epic-spa-19-ns-13-hide-header-search-notifications.yaml) unchanged · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-13-2026-10-23.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 skipped · Await **P8**. Superseded by P8 above.

**P3 NS-13 Execute Done (`2026-10-23T14:15:41Z`; superseded tip):** [`pkg-000215`](../../spa-active-packages/pkg-000215-20261023-epic-spa-19-ns-13-hide-header-search-notifications.yaml) · T01–T03 Done · search+notif gated · peers held · Path A shots Present · CAPTURE-META `fails: []` · ns13 **2/2** · gate **BLOCK** · activation was active · Await **P4/P5**. [run-summary](../../run-reports/run-summary-20261023-1415-spa-ns-13-p3.md). Superseded by P5 above.

**P1.3 NS-13 activated (`2026-10-23T14:10:21Z`; superseded tip):** [`pkg-000215`](../../spa-active-packages/pkg-000215-20261023-epic-spa-19-ns-13-hide-header-search-notifications.yaml) · T01–T03 Todo · Path A evidence 07 · Interview H7 · gate/hide keep code · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Tip after pkg-000214. Wave `OP-spa nf24-wave4-20261023`. Superseded by P3 above.

**P8 NS-12 local close (`2026-10-23T14:08:51Z`; superseded tip):** [`pkg-000214`](../../spa-active-packages/pkg-000214-20261023-epic-spa-19-ns-12-freeze-rail-my-stories.yaml) closed · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-12-2026-10-23.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-12-p7-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/12-freeze-rail-my-stories.md) · `activation: none` · NO PUSH. Superseded by P1.3 NS-13 above.

**P5 NS-12 APPLY (`2026-10-23T14:06:29Z`; superseded tip):** [`pkg-000214`](../../spa-active-packages/pkg-000214-20261023-epic-spa-19-ns-12-freeze-rail-my-stories.yaml) unchanged · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-12-2026-10-23.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 skipped · Await **P8**. Superseded by P8 above.

**P3 NS-12 Execute Done (`2026-10-23T14:03:21Z`; superseded tip):** [`pkg-000214`](../../spa-active-packages/pkg-000214-20261023-epic-spa-19-ns-12-freeze-rail-my-stories.yaml) · T01–T03 Done · My stories gated · Feed+Profile held · Path A shots Present · CAPTURE-META `fails: []` · ns12 **2/2** · gate **BLOCK** · activation was active · Await **P4/P5**. Superseded by P5 above.

**P1.3 NS-12 activated (`2026-10-23T13:59:33Z`; superseded tip):** [`pkg-000214`](../../spa-active-packages/pkg-000214-20261023-epic-spa-19-ns-12-freeze-rail-my-stories.yaml) · T01–T03 Todo · Path A Interview R4 code lock · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Tip after pkg-000213. Wave `OP-spa nf24-wave4-20261023`. Superseded by P3 above.

**P8 NS-11 local close (`2026-10-23T13:56:51Z`; superseded tip):** [`pkg-000213`](../../spa-active-packages/pkg-000213-20261023-epic-spa-19-ns-11-profile-next-shell.yaml) closed · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-11-2026-10-23.md) · [p7](../../../analysis/reaudit-STORY-SPA-NS-11-p7-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/11-profile-next-shell.md) · `activation: none` · NO PUSH. Superseded by P1.3 NS-12 above.

**P5 NS-11 APPLY (`2026-10-23T13:54:17Z`; superseded tip):** [`pkg-000213`](../../spa-active-packages/pkg-000213-20261023-epic-spa-19-ns-11-profile-next-shell.yaml) unchanged · [disposition](../../run-reports/p5-disposition-STORY-SPA-NS-11-2026-10-23.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 skipped · Await **P8**. Superseded by P8 above.

**P3 NS-11 Execute Done (`2026-10-23T13:49:54Z`; superseded tip):** [`pkg-000213`](../../spa-active-packages/pkg-000213-20261023-epic-spa-19-ns-11-profile-next-shell.yaml) · T01–T03 Done · `/profile` Header + ProfileRail + PublicFooter · no WORKSPACE · Path A shots Present · CAPTURE-META `fails: []` · ns11 **4/4** · gate **BLOCK** · activation was active · Await **P4/P5**. Superseded by P5 above.

**P1.3 NS-11 activated (`2026-10-23T13:44:49Z`; superseded tip):** [`pkg-000213`](../../spa-active-packages/pkg-000213-20261023-epic-spa-19-ns-11-profile-next-shell.yaml) · T01–T03 Todo · Path A evidence 03 + next/feed chrome parity · Interview S3 · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Tip after pkg-000212 NF-24 P8. Wave `OP-spa nf24-wave4-20261023`. Superseded by P3 above.

**P5 NS-07 APPLY (`2026-10-21T20:14:40Z`; superseded tip):** [`pkg-000199`](../../spa-active-packages/pkg-000199-20261021-epic-spa-19-ns-07-shell-dark-icon-chrome.yaml) unchanged · [disposition](../../../analysis/p5-disposition-STORY-SPA-NS-07-2026-10-21.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 not needed · Await **P8**. No invent OP PASS · CT-32/NF-18/map OOS. Do not git push unless operator asks.

**P3 NS-07 Execute Done (`2026-10-21T20:10:51Z`):** [`pkg-000199`](../../spa-active-packages/pkg-000199-20261021-epic-spa-19-ns-07-shell-dark-icon-chrome.yaml) · T01–T04 Done · ShellChromeIcon mask/currentColor · Path A shots Present · probe maskCount 15 · ns07 **4/4** · AppShell **30/30** · gate **BLOCK** · activation was active · Await **P4/P5**. Superseded by P5 above.

**P1.3 NS-07 activated (`2026-10-21T20:05:02Z`):** [`pkg-000199`](../../spa-active-packages/pkg-000199-20261021-epic-spa-19-ns-07-shell-dark-icon-chrome.yaml) · T01–T04 Todo · Path A code lock · mask/currentColor · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Soft after NF-20 P5. Wave `OP-spa nf18-20-ns07-ct32-20261021`. Superseded by P3 above.

**P3 NS-06 Done:** [`pkg-000102`](../../spa-active-packages/pkg-000102-20261009-epic-spa-19-ns-06-default-entry-shell-verify.yaml) · T01–T05 Done · gate PASS · `/`+`*`→`#/next/feed` · shell wave complete. Superseded tip by NS-07 above.
