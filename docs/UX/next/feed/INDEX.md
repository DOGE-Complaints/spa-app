# UX/next/feed — index (редизайн ленты)

**Зона:** `spa-app/docs/UX/next/feed/`  
**Scope:** product home `#/next/feed`, Issue overlay/sheet, `#/next/feed/issue/:id`, shared thread / reactions / map / verify handoff (classic `#/board` = temporary shelter per REQ-22)  
**Out of scope:** редизайн **кабинета пользователя** (Profile / My stories / `GET /story-activity` = navigate-only chrome adjacency, не product redesign)  
**As-of:** 2026-10-08T14:39:11Z · packs + artboards accepted · **Phase 1 `DUI-Q01`–`Q18` locked** · tech-arch 2026-10-09  
**Analysis:** [`analysis-spa-ux-next-feed-redesign-readiness-for-tech-arch-2026-10-08.md`](../../analysis/analysis-spa-ux-next-feed-redesign-readiness-for-tech-arch-2026-10-08.md)  
**Phase 1 decisions:** [DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md](DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md)  
**Target tech-arch:** [`feed-visual-redesign-phase-1/00-overview.md`](../../architecture/feed-visual-redesign-phase-1/00-overview.md) · [interview](../../analysis/zeya888.target-tech-arch-interview-feed-visual-redesign-phase-1-2026-10-09.md)  
**UX remediation (visual polish):** [`ux-process-feed-artboard-remediation-2026-10-08.md`](ux-process-feed-artboard-remediation-2026-10-08.md)  
**Prep (not redesign):** [REQ-21](../../requirements/21-ui-modularity-theme-and-redesign-prep.md) Phase 0 Done  
**Parent REQ (visual Phase 1):** [22-feed-visual-redesign-phase-1.md](../../requirements/22-feed-visual-redesign-phase-1.md)

---

## 1) Reading order (SSOT)

| # | Pack | File | Role |
|---|------|------|------|
| 1 | Coverage & backlog | [DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md](DOGEstonia-current-design-state-artboard-coverage-and-generation-backlog-v1.0.md) | Artboard authority map M149–M160 |
| 1a | **Runtime catalog** | [DOGEstonia-next-feed-layouts-pages-components-catalog-v1.0.md](DOGEstonia-next-feed-layouts-pages-components-catalog-v1.0.md) | Route → layout → React component → artboard + function (NF-01…12 Done) |
| 1b | **Component DS (persistent)** | [DOGEstonia-next-feed-component-design-system-v1.0.md](DOGEstonia-next-feed-component-design-system-v1.0.md) | Named surfaces · anti-mixing dual plane · VL package SSOT |
| 2 | Layout | [DOGEstonia-dashboard-layout-spec-v1.0.md](DOGEstonia-dashboard-layout-spec-v1.0.md) | Geometry / columns / z-index |
| 3 | Mobile | [DOGEstonia-mobile-responsive-design-pack-v1.0.md](DOGEstonia-mobile-responsive-design-pack-v1.0.md) | Narrow / tablet shells |
| 4 | States | [DOGEstonia-unified-state-inventory-v1.0.md](DOGEstonia-unified-state-inventory-v1.0.md) | Canonical state IDs |
| 5 | Components | [DOGEstonia-component-and-variants-specification-v1.0.md](DOGEstonia-component-and-variants-specification-v1.0.md) | Composition / variants |
| 6 | Interaction | [DOGEstonia-interaction-and-behavior-specification-v1.0.md](DOGEstonia-interaction-and-behavior-specification-v1.0.md) | Behavior over time |
| 7 | Tokens | [DOGEstonia-design-tokens-package-v1.0.md](DOGEstonia-design-tokens-package-v1.0.md) | Light/Dark semantic tokens |
| 8 | Data↔UI | [DOGEstonia-data-to-ui-contract-v1.0.md](DOGEstonia-data-to-ui-contract-v1.0.md) | Confirmed API slice + gap register |
| 8a | Phase 1 locks | [DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md](DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md) | Product decisions for architecture Phase 1 |
| 9 | A11y / L10n | [DOGEstonia-accessibility-and-localization-pack-v1.0.md](DOGEstonia-accessibility-and-localization-pack-v1.0.md) | a11y + i18n |
| 10 | Assets | [DOGEstonia-asset-manifest-v1.0.md](DOGEstonia-asset-manifest-v1.0.md) | Asset identity / readiness |
| 11 | Icons | [dogestonia-icon-system-v1.0/](dogestonia-icon-system-v1.0/) | SVG + token map + QA |
| 12 | Design QA | [DOGEstonia-design-qa-and-visual-regression-pack-v1.0.md](DOGEstonia-design-qa-and-visual-regression-pack-v1.0.md) | Visual regression |

**Authority when sources disagree:** product/architecture REQ → **Phase 1 decision record** → Coverage backlog → State Inventory → Component → Interaction → Tokens → Layout/Mobile → Data-to-UI (API truth) → generated PNG (tone only).

---

## 2) Artboards M149–M160

| ID | Spec | PNG | Handoff status |
|----|------|-----|----------------|
| M149 | [spec](artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | colocated | **accepted** |
| M150 | [spec](artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M151 | [spec](artboards/mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M152 | [spec](artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M153 | [spec](artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M154 | [spec](artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M155 | [spec](artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M156 | [spec](artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md) | colocated | **accepted** (stub honesty OK) |
| M157 | [spec](artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M158 | [spec](artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M159 | [spec](artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M160 | [spec](artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) | colocated | **accepted** (residual → remediation) |
| M161 | [spec](artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) | colocated | **accepted** · NF-13 |
| M162 | [spec](artboards/DOGEstonia-M162-feed-civic-post-action-strip-density-spec-v1.0.md) | colocated | **accepted** · NF-15/17 |
| M163 | [spec](artboards/DOGEstonia-M163-feed-civic-react-underlay-spec-v1.0.md) | PNG **Absent** | wave3 intake **PASS** written · CR-24 |
| M164 | [spec](artboards/DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.md) | colocated | wave3 intake **PASS** · OP visual accept · CR-24 |
| M173 | [spec](artboards/DOGEstonia-M173-own-react-empty-filled-harmony-spec-v1.0.md) | colocated | wave5 intake **PASS** · CR-26 |
| M174 | [spec](artboards/DOGEstonia-M174-comment-react-reply-harmony-spec-v1.0.md) | colocated | wave5 intake **PASS** · CT-35 |
| M175 | [spec](artboards/DOGEstonia-M175-filters-popover-spec-v1.0.md) | colocated | wave5 intake **PASS** · NF-25 |
| M176 | [spec](artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) | colocated | wave5 intake **PASS** · CR-28 (rev2) |
| M177 | [spec](artboards/DOGEstonia-M177-mobile-appbar-burger-drawer-spec-v1.0.md) | colocated | wave6 intake **PASS** · NS-17 |
| M178 | [spec](artboards/DOGEstonia-M178-profile-mobile-layout-spec-v1.0.md) | colocated | wave6 intake **PASS** · NS-18 |
| M179 | [spec](artboards/DOGEstonia-M179-mobile-bottom-nav-wallet-frozen-spec-v1.0.md) | colocated | wave6 intake **PASS** · NS-19 · dogecoin glyph Apply handoff |

Written specification overrides imperfect generated pixels. Shipping features blocked by Data-to-UI §30 remain **gated**, not “invented as done”. Wave3 intake: [analysis-wave3-ux-intake…](../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md). Wave5: [analysis-wave5-ux-intake…](../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md). Wave6: [analysis-wave6-ux-intake…](../../analysis/analysis-wave6-ux-intake-m177-m179-2026-10-25.md).

---

## 3) Confirmed vs gated (for tech-arch) — after Phase 1 locks

| Slice | Source | Tech-arch Phase 1 |
|-------|--------|-------------------|
| Civic shell + list + structural filters + load/error | M149 + DUI §29 + Q01/Q12/Q13 | **In scope** |
| Issue post civic identity (no schema/media) | M150 + Q02/Q03 | **In scope** |
| List/map eligible pins | M151 + Q14 | **In scope** (public pin **release** waits Gateway/Privacy) |
| Thread text + replies + aggregates + local `reactions.v1` | M152–154 + Q04–Q06/Q08–Q11 | **In scope** (lazy trees) |
| Draft preserve + honest 403 | M157 + Q07 | **In scope** (auto-verify **out** until discriminator) |
| Invitation stub | M156 + Q18 | **In scope** as local stub |
| Schema / media / authors-times / attachments / people-Connect / search / right rail / real invite | decision record | **Out** until API wave |
| Theme / reflow | M160 + tokens + REQ-21 | **In scope** |

---

## 4) Non-authoritative

- [`../references/`](../references/) — Facebook / starting point study only  
- Historical M143–M148 under `docs/UX/mockups/threads-feed/` — semantic scaffold; dark skin superseded  

---

## 5) Pack validation snapshot (2026-10-08)

| Pack | Verdict |
|------|---------|
| Interaction & Behavior | **Partial** — strong behavior SSOT; add Date + Related links |
| Asset Manifest | **Partial** — baseline OK; sync icon-system; square logo missing on disk |
| Coverage & backlog | **Materialized** this wave (inventory from disk; not inventing new artboards) |
| Layout / States / Components / Mobile | Ready |
| Tokens / Data-to-UI / A11y / Design QA | Partial (known opens documented in packs) |
