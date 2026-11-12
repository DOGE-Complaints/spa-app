# next-shell — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) · shell slice only  
> **Arch:** [feed-visual-redesign-phase-1](../../../architecture/feed-visual-redesign-phase-1/00-overview.md)  
> **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)  
> **UX SSOT:** [feed INDEX](../../../UX/next/feed/INDEX.md) · artboards already present  
> **Icons SSOT:** [dogestonia-icon-system-v1.0](../../../UX/next/feed/dogestonia-icon-system-v1.0/) → runtime `public/icons/next-shell/`  
> **Режим:** tip wave6 **NS-19 P3** `pkg-000232` gate BLOCK · soft NS-18 P8 BLOCKED · soft NS-17 P8 BLOCKED · intake [M177–M179](../../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md) · soft wave5 **NS-16 P8** · `pkg-000221` · soft **NS-15 P8** · interview [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md)  


> **UX brief:** [UX-PROMPTS.md](UX-PROMPTS.md) (legacy name · implementer brief)  
> **Mockup register:** [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md)  
> **Icons catalog:** [STORY-SPA-NS-icon-assets.md](STORY-SPA-NS-icon-assets.md)  
> **API catalog:** [STORY-SPA-NS-api-requirements.md](STORY-SPA-NS-api-requirements.md)

## Admin queue

| Key | File | Status | Next |
|-----|------|--------|------|
| ADMIN-NS-01 | [ADMIN-NS-01-product-ux-prompts.md](ADMIN-NS-01-product-ux-prompts.md) | Done | [UX-PROMPTS.md](UX-PROMPTS.md) |
| ADMIN-NS-02 | [ADMIN-NS-02-ux-mockup-intake.md](ADMIN-NS-02-ux-mockup-intake.md) | Done | [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) |
| ADMIN-NS-03 | [ADMIN-NS-03-icon-assets-catalog.md](ADMIN-NS-03-icon-assets-catalog.md) | Done | [STORY-SPA-NS-icon-assets.md](STORY-SPA-NS-icon-assets.md) |
| ADMIN-NS-04 | [ADMIN-NS-04-api-requirements.md](ADMIN-NS-04-api-requirements.md) | Done | [STORY-SPA-NS-api-requirements.md](STORY-SPA-NS-api-requirements.md) |
| ADMIN-NS-05 | [ADMIN-NS-05-backlog-stories-l10n.md](ADMIN-NS-05-backlog-stories-l10n.md) | Done | STORY-SPA-NS-01…06 |
| ADMIN-NS-06 | [ADMIN-NS-06-tech-decomposition.md](ADMIN-NS-06-tech-decomposition.md) | Done | [EPIC-SPA-19](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md) |

**Progress (admin):** 6/6 Done  
**Execute order:** 01 → 02 → 03 ‖ 04 → 05 → 06  
**Next:** Wave3 soft NS-07…10 P8 BLOCKED · OP residual NF-21… / CT-33 / … on operator fence

## Product stories

| Key | File | Pipeline | Surface | Status |
|-----|------|----------|---------|--------|
| NS-01 | [STORY-SPA-NS-01-next-routes-shell-host.md](STORY-SPA-NS-01-next-routes-shell-host.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-01-next-routes-shell-host/STORY-SPA-NS-01-next-routes-shell-host.md) | `#/next/feed*` host + placeholder | Done · `pkg-000097` |
| NS-02 | [STORY-SPA-NS-02-public-header-next-chrome.md](STORY-SPA-NS-02-public-header-next-chrome.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-02-public-header-next-chrome/STORY-SPA-NS-02-public-header-next-chrome.md) | PublicHeader next chrome | Done · P3 `pkg-000098` |
| NS-03 | [STORY-SPA-NS-03-profile-rail-shelter-nav.md](STORY-SPA-NS-03-profile-rail-shelter-nav.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-03-profile-rail-shelter-nav/STORY-SPA-NS-03-profile-rail-shelter-nav.md) | ProfileRail + shelter nav (Q15) | Done · P3 `pkg-000099` |
| NS-04 | [STORY-SPA-NS-04-shell-grid-mobile-chrome.md](STORY-SPA-NS-04-shell-grid-mobile-chrome.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-04-shell-grid-mobile-chrome/STORY-SPA-NS-04-shell-grid-mobile-chrome.md) | Grid + empty right (Q16) + mobile chrome | Done · P3 `pkg-000100` |
| NS-05 | [STORY-SPA-NS-05-classic-shell-apply.md](STORY-SPA-NS-05-classic-shell-apply.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-05-classic-shell-apply/STORY-SPA-NS-05-classic-shell-apply.md) | D2.3 same shell on classic | Done · P3 `pkg-000101` |
| NS-06 | [STORY-SPA-NS-06-default-entry-shell-verify.md](STORY-SPA-NS-06-default-entry-shell-verify.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-06-default-entry-shell-verify/STORY-SPA-NS-06-default-entry-shell-verify.md) | `/` flip + shell verify + icons | Done · P3+P6 `pkg-000102` · OPEN empty |
| NS-07 | [STORY-SPA-NS-07-shell-dark-icon-chrome.md](STORY-SPA-NS-07-shell-dark-icon-chrome.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-07-shell-dark-icon-chrome/STORY-SPA-NS-07-shell-dark-icon-chrome.md) | dark mode shell icons readable | P5/P8 · T01–T04 Done · gate **BLOCK** · `pkg-000199` · soft |
| NS-08 | [STORY-SPA-NS-08-locale-chevron-es-frozen.md](STORY-SPA-NS-08-locale-chevron-es-frozen.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-08-locale-chevron-es-frozen/STORY-SPA-NS-08-locale-chevron-es-frozen.md) | locale chevron · ES frozen tooltip | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000201` · soft · `activation: none` |
| NS-09 | [STORY-SPA-NS-09-profile-rail-feed-cleanup.md](STORY-SPA-NS-09-profile-rail-feed-cleanup.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-09-profile-rail-feed-cleanup/STORY-SPA-NS-09-profile-rail-feed-cleanup.md) | rail Feed label · drop summary Profile | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000202` · soft · `activation: none` |
| NS-10 | [STORY-SPA-NS-10-header-logo-light-scale.md](STORY-SPA-NS-10-header-logo-light-scale.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-10-header-logo-light-scale/STORY-SPA-NS-10-header-logo-light-scale.md) | header logo light · **SVG vector** | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000203` · tip · `activation: none` |

**Progress (stories):** 6/6 Done · **NS-07…10** soft P8 BLOCKED (OP eye)

### OP residual wave 3 (Markstack · 2026-10-22 · NS-10 P8 tip)

| Key | File | Pipeline | Surface | Status |
|-----|------|----------|---------|--------|
| NS-08 | [STORY-SPA-NS-08-locale-chevron-es-frozen.md](STORY-SPA-NS-08-locale-chevron-es-frozen.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-08-locale-chevron-es-frozen/STORY-SPA-NS-08-locale-chevron-es-frozen.md) | locale chevron · ES frozen tooltip | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000201` · soft |
| NS-09 | [STORY-SPA-NS-09-profile-rail-feed-cleanup.md](STORY-SPA-NS-09-profile-rail-feed-cleanup.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-09-profile-rail-feed-cleanup/STORY-SPA-NS-09-profile-rail-feed-cleanup.md) | rail Feed label · drop summary Profile | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000202` · soft |
| NS-10 | [STORY-SPA-NS-10-header-logo-light-scale.md](STORY-SPA-NS-10-header-logo-light-scale.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-10-header-logo-light-scale/STORY-SPA-NS-10-header-logo-light-scale.md) | header logo light · **SVG vector** | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000203` · tip · [M165](../../../UX/mockups/home/DOGEstonia-M165-header-brand-logo-light-spec-v1.0.md) |

**Order (wave3):** NS-08 ‖ NS-09 ‖ **NS-10** P8 closed (structure Present · visual BLOCK).

### OP residual wave 4 (Markstack · 2026-10-23 · tip NS-14 P5)

| Key | File | Pipeline | Surface | Status |
|-----|------|----------|---------|--------|
| NS-11 | [STORY-SPA-NS-11-profile-next-shell.md](STORY-SPA-NS-11-profile-next-shell.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-11-profile-next-shell/STORY-SPA-NS-11-profile-next-shell.md) | `/profile` → Header + ProfileRail | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000213` · soft · `activation: none` |
| NS-12 | [STORY-SPA-NS-12-freeze-rail-my-stories.md](STORY-SPA-NS-12-freeze-rail-my-stories.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-12-freeze-rail-my-stories/STORY-SPA-NS-12-freeze-rail-my-stories.md) | gate My stories out of rail | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000214` · soft · `activation: none` |
| NS-13 | [STORY-SPA-NS-13-hide-header-search-notifications.md](STORY-SPA-NS-13-hide-header-search-notifications.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-13-hide-header-search-notifications/STORY-SPA-NS-13-hide-header-search-notifications.md) | hide search + notifications (keep code) | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000215` · soft · `activation: none` |
| NS-14 | [STORY-SPA-NS-14-brand-png-dual-theme.md](STORY-SPA-NS-14-brand-png-dual-theme.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-14-brand-png-dual-theme/STORY-SPA-NS-14-brand-png-dual-theme.md) | dual transparent PNG · footer no tagline | P8 closed · asset **MASTERS_ABSENT** · gate **BLOCK** · Story **BLOCKED** (asset + OP eye) OK · `pkg-000216` · soft · `activation: none` · [M169](../../../UX/mockups/home/DOGEstonia-M169-brand-png-dual-header-footer-spec-v1.0.md) |

**Order (wave4):** NS-11 ‖ NS-12 ‖ NS-13 soft P8 · **NS-14** soft P8 · dual PNG wire after clean masters (soft T01 BLOCK held; soft supersede by NS-15).

### OP residual wave 5 (Markstack · 2026-10-24 · tip NS-16 P1.3)

| Key | File | Pipeline | Surface | Status |
|-----|------|----------|---------|--------|
| NS-15 | [STORY-SPA-NS-15-brand-op-light-png-footer-dual.md](STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-15-brand-op-light-png-footer-dual/STORY-SPA-NS-15-brand-op-light-png-footer-dual.md) | OP light+dark tip masters · footer dual · cleanup | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000220` · soft · `activation: none` · tip masters Present · [brand-source](../../../UX/mockups/home/m169-brand-source/) |
| NS-16 | [STORY-SPA-NS-16-default-theme-light.md](STORY-SPA-NS-16-default-theme-light.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-16-default-theme-light/STORY-SPA-NS-16-default-theme-light.md) | default theme **light** when unset | P5 APPLY · T01–T02 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000221` · **tip** · `activation: none` · Await P8 |

**Order (wave5):** **NS-15** soft P8 · **NS-16** tip P5 · siblings PH-16/17 · CR-26…28 · CT-34/35 · NF-25 · **Await P8**.

### OP residual wave 6 mobile (Markstack docs Ready · 2026-10-25 · Await UX + Apply)

| Key | File | Pipeline | Surface | Status |
|-----|------|----------|---------|--------|
| NS-17 | [STORY-SPA-NS-17-mobile-appbar-burger-drawer.md](STORY-SPA-NS-17-mobile-appbar-burger-drawer.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-17-mobile-appbar-burger-drawer/STORY-SPA-NS-17-mobile-appbar-burger-drawer.md) | AppBar brand · burger drawer · viewport | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000230` · soft · `activation: none` · [M177](../../../UX/next/feed/artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md) |
| NS-18 | [STORY-SPA-NS-18-profile-mobile-layout.md](STORY-SPA-NS-18-profile-mobile-layout.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-18-profile-mobile-layout/STORY-SPA-NS-18-profile-mobile-layout.md) | Profile mobile Account/shell UX | P8 closed · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000231` · soft · `activation: none` · [M178](../../../UX/next/feed/artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md) |
| NS-19 | [STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md](STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md) | [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen/STORY-SPA-NS-19-mobile-bottom-nav-wallet-frozen.md) | Bottom nav density · frozen Wallet + doge | P3 Done·BLOCK · gate **BLOCK** · `pkg-000232` · **tip** · Await **P4** · [M179](../../../UX/next/feed/artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md) · glyph soft |

**Order (wave6):** soft **NS-17** P8 · soft **NS-18** P8 BLOCKED · **NS-19** tip P3 · sibling **NF-26** · Await **P4**.

## Cross-links

- Feed content: [next-feed](../next-feed/INDEX.md) · siblings NF-18…24 · [CT-32](../component-thread/STORY-SPA-CT-32-thread-dark-chrome.md) · [CT-33](../component-thread/STORY-SPA-CT-33-composer-dark-residual.md)  
- Prep Done: [ui-modularity-theme-redesign-prep](../ui-modularity-theme-redesign-prep/INDEX.md)  
- Prior shell etalon: [public-home](../public-home/INDEX.md) · wave3 PH-11/PH-13 · wave4 PH-14/15  
- Cabinet: [cabinet](../cabinet/INDEX.md) · CAB-08  
- Parent backlog: [../INDEX.md](../INDEX.md)  
- Wave2 evidence: [op-residual-wave2](../../../analysis/evidence/op-residual-wave2-2026-10-21/)  
- Wave3 evidence: [op-residual-wave3](../../../analysis/evidence/op-residual-wave3-2026-10-22/) · [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) · [validation](../../../analysis/analysis-markstack-wave3-code-validation-2026-10-23.md)  
- Wave4 evidence: [op-residual-wave4](../../../analysis/evidence/op-residual-wave4-2026-10-23/) · [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) · [UX intake M169–M172](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) · [wave4 validation](../../../analysis/analysis-markstack-wave4-code-validation-2026-10-24.md)  
- Wave5 evidence: [op-residual-wave5](../../../analysis/evidence/op-residual-wave5-2026-10-24/) · [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) · [UX intake M173–M176](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) · [wave5 validation](../../../analysis/analysis-markstack-wave5-code-validation-2026-10-25.md)  
- Wave6 mobile: [op-residual-wave6-mobile](../../../analysis/evidence/op-residual-wave6-mobile-2026-10-25/) · [INTERVIEW-NF-26-plus…](../next-feed/INTERVIEW-NF-26-plus-op-residual-wave6-mobile-2026-10-25.md)
