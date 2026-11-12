# component-reactions — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) · epic [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.6 / FR-22.15  
> **Режим:** ADMIN Variant B (UX-ready) · **omit ADMIN-01/02**  
> **Admin:** **4/4 Done** · backlog **ready for P1.3**  
> **Epic:** [EPIC-SPA-23-component-reactions](../../epics/EPIC-SPA-23-component-reactions/EPIC-SPA-23-component-reactions.md) · tip **CR-28 P8** `pkg-000226` · soft **CR-27 P8** · soft **CR-26 P8** · [intake M173/M176](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) **PASS** · soft **CR-25 P8** `pkg-000209` · soft CR-24 P8 · interview [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md)



> **OP UX mirrors:** [interview NF-21+ wave3](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) · [interview CT-28+ cutover](../component-thread/INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) · [Gap+people+media residual 10-18](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · [polish+M155 10-17](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md)  
> **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md) §1–3  
> **Gap:** [next/feed cutover](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · [wave3 evidence](../../../analysis/evidence/op-residual-wave3-2026-10-22/)  

> **Data plane:** reuse `ThreadsSocialClient` + knobs + catalog — see BRIEF  
> **Code home:** `src/features/reactions-mount/` · lab Present · CR-23 P5 tip (next/feed Live)

## Admin queue

| Key | File | Status | Next |
|-----|------|--------|------|
| ADMIN-CR-01 | — | **Omitted** | why: UX prompts not needed — M154/M155/M160 already input |
| ADMIN-CR-02 | — | **Omitted** | why: mockup intake not a separate layer — assets already input |
| ADMIN-CR-03 | [ADMIN-CR-03-icon-assets-catalog.md](ADMIN-CR-03-icon-assets-catalog.md) | **Done** | [STORY-SPA-CR-icon-assets.md](STORY-SPA-CR-icon-assets.md) · ICON #10 |
| ADMIN-CR-04 | [ADMIN-CR-04-api-requirements.md](ADMIN-CR-04-api-requirements.md) | **Done** | [STORY-SPA-CR-api-requirements.md](STORY-SPA-CR-api-requirements.md) |
| ADMIN-CR-05 | [ADMIN-CR-05-backlog-stories-l10n.md](ADMIN-CR-05-backlog-stories-l10n.md) | **Done** | CR-01…04 Todo |
| ADMIN-CR-06 | [ADMIN-CR-06-tech-decomposition.md](ADMIN-CR-06-tech-decomposition.md) | **Done** | [EPIC-23](../../epics/EPIC-SPA-23-component-reactions/EPIC-SPA-23-component-reactions.md) · 18 tasks |

## Product stories

| Key | Backlog | Status | Depends | Pipeline |
|-----|---------|--------|---------|----------|
| CR-01 | [STORY-SPA-CR-01-reactions-mount-strip.md](STORY-SPA-CR-01-reactions-mount-strip.md) | P3 structure Done · gate **BLOCK** · Await P4 | CR-icon · CR-api | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-01-reactions-mount-strip/STORY-SPA-CR-01-reactions-mount-strip.md) |
| CR-02 | [STORY-SPA-CR-02-reaction-picker.md](STORY-SPA-CR-02-reaction-picker.md) | P3 structure Done · gate **BLOCK** · Await P4 | CR-01 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-02-reaction-picker/STORY-SPA-CR-02-reaction-picker.md) |
| CR-03 | [STORY-SPA-CR-03-lab-reactions-page.md](STORY-SPA-CR-03-lab-reactions-page.md) | P3 structure Done · gate **BLOCK** · Await P4 | CR-01 · CR-02 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-03-lab-reactions-page/STORY-SPA-CR-03-lab-reactions-page.md) |
| CR-04 | [STORY-SPA-CR-04-reactions-l10n-theme-stress.md](STORY-SPA-CR-04-reactions-l10n-theme-stress.md) | P3 structure Done · gate BLOCK · Await P4 | CR-03 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-04-reactions-l10n-theme-stress/STORY-SPA-CR-04-reactions-l10n-theme-stress.md) |
| CR-05 | [STORY-SPA-CR-05-strip-open-dismiss.md](STORY-SPA-CR-05-strip-open-dismiss.md) | **BLOCKED** (OP eye) · structure Present · P5 TASKED=0 · P8 Done | CR-01 · CR-02 · CR-icon | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-05-strip-open-dismiss/STORY-SPA-CR-05-strip-open-dismiss.md) |
| CR-06 | [STORY-SPA-CR-06-picker-chrome-layout.md](STORY-SPA-CR-06-picker-chrome-layout.md) | **BLOCKED** (OP eye) · structure Present · P5 TASKED=0 · P8 Done | CR-05 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-06-picker-chrome-layout/STORY-SPA-CR-06-picker-chrome-layout.md) |
| CR-07 | [STORY-SPA-CR-07-lab-feed-cutover.md](STORY-SPA-CR-07-lab-feed-cutover.md) | **BLOCKED** (OP eye) · structure Present · P5 TASKED=0 · P8 Done | CR-05 · CR-06 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-07-lab-feed-cutover/STORY-SPA-CR-07-lab-feed-cutover.md) |
| CR-08 | [STORY-SPA-CR-08-lab-feed-theme-stress.md](STORY-SPA-CR-08-lab-feed-theme-stress.md) | P6 F2 CLOSED · gate BLOCK · residual OP eye · `pkg-000144` | CR-07 · CR-04 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-08-lab-feed-theme-stress/STORY-SPA-CR-08-lab-feed-theme-stress.md) |
| CR-09 | [STORY-SPA-CR-09-strip-slot-composition.md](STORY-SPA-CR-09-strip-slot-composition.md) | P8 Done · gate BLOCK · residual OP eye · `pkg-000145` | CR-07 · CR-05 · CR-08 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-09-strip-slot-composition/STORY-SPA-CR-09-strip-slot-composition.md) |
| CR-10 | [STORY-SPA-CR-10-picker-portal-escape.md](STORY-SPA-CR-10-picker-portal-escape.md) | P5 TASKED=0 · gate BLOCK · `pkg-000146` · Await P8 / OP eye | CR-09 · CR-05 · CR-06 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-10-picker-portal-escape/STORY-SPA-CR-10-picker-portal-escape.md) |
| CR-11 | [STORY-SPA-CR-11-strip-four-zone-chrome.md](STORY-SPA-CR-11-strip-four-zone-chrome.md) | P5 APPLY · TASKED=0 · gate **BLOCK** · `pkg-000147` | CR-icon Gap v2 · CR-08 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-11-strip-four-zone-chrome/STORY-SPA-CR-11-strip-four-zone-chrome.md) |
| CR-12 | [STORY-SPA-CR-12-react-always-aggregate-row.md](STORY-SPA-CR-12-react-always-aggregate-row.md) | P5 APPLY · TASKED=0 · gate **BLOCK** · `pkg-000148` | CR-11 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-12-react-always-aggregate-row/STORY-SPA-CR-12-react-always-aggregate-row.md) |
| CR-13 | [STORY-SPA-CR-13-picker-tile-grid-chrome.md](STORY-SPA-CR-13-picker-tile-grid-chrome.md) | P5 APPLY · TASKED=0 · gate **BLOCK** · `pkg-000149` | CR-12 · CR-10 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-13-picker-tile-grid-chrome/STORY-SPA-CR-13-picker-tile-grid-chrome.md) |
| CR-14 | [STORY-SPA-CR-14-mark-accent-tokens.md](STORY-SPA-CR-14-mark-accent-tokens.md) | P5 APPLY · TASKED=0 · gate **BLOCK** · `pkg-000150` | CR-13 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-14-mark-accent-tokens/STORY-SPA-CR-14-mark-accent-tokens.md) |
| CR-15 | [STORY-SPA-CR-15-lab-visual-wire.md](STORY-SPA-CR-15-lab-visual-wire.md) | P8 Done · TASKED=0 · gate **BLOCK** · `pkg-000151` | CR-11…14 · Gap v2 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-15-lab-visual-wire/STORY-SPA-CR-15-lab-visual-wire.md) |
| CR-16 | [STORY-SPA-CR-16-strip-hover-media-flush.md](STORY-SPA-CR-16-strip-hover-media-flush.md) | P8 Done · TASKED=0 · gate **BLOCK** · `pkg-000152` · SHAs `e74f131`/`8c865ee`/`429798f` | CR-11…15 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-16-strip-hover-media-flush/STORY-SPA-CR-16-strip-hover-media-flush.md) |
| CR-17 | [STORY-SPA-CR-17-reactors-popover.md](STORY-SPA-CR-17-reactors-popover.md) | P8 Done · structure Present · gate **BLOCK** · `pkg-000153` · M155 A | CR-16 · Gap v2 `reactions` | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-17-reactors-popover/STORY-SPA-CR-17-reactors-popover.md) |
| CR-18 | [STORY-SPA-CR-18-reactions-dialog.md](STORY-SPA-CR-18-reactions-dialog.md) | P8 Done · structure Present · gate BLOCK · `pkg-000154` · M155 B | CR-17 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-18-reactions-dialog/STORY-SPA-CR-18-reactions-dialog.md) |
| CR-19 | [STORY-SPA-CR-19-people-sheet-lab-wire.md](STORY-SPA-CR-19-people-sheet-lab-wire.md) | P3 Done · structure Present · gate **BLOCK** · `pkg-000155` · M155 C | CR-17 · CR-18 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-19-people-sheet-lab-wire/STORY-SPA-CR-19-people-sheet-lab-wire.md) |
| CR-20 | [STORY-SPA-CR-20-gap-v2-icon-generate.md](STORY-SPA-CR-20-gap-v2-icon-generate.md) | P8 Done · structure Present · gate **BLOCK** · `pkg-000156` · Gap v2 Present | CR-icon · CR-11 wire | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-20-gap-v2-icon-generate/STORY-SPA-CR-20-gap-v2-icon-generate.md) |
| CR-21 | [STORY-SPA-CR-21-people-affordance-residual.md](STORY-SPA-CR-21-people-affordance-residual.md) | P8 Done · structure Present · gate **BLOCK** · `pkg-000157` · people anchor/chip | CR-17…19 · CR-20 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-21-people-affordance-residual/STORY-SPA-CR-21-people-affordance-residual.md) |
| CR-22 | [STORY-SPA-CR-22-media-strip-flush-residual.md](STORY-SPA-CR-22-media-strip-flush-residual.md) | P3 Done · structure Present · gate **BLOCK** · `pkg-000158` · media flush | CR-16 · soft CR-20/21 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-22-media-strip-flush-residual/STORY-SPA-CR-22-media-strip-flush-residual.md) |
| CR-23 | [STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md](STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · [disposition](../../analysis/p5-disposition-STORY-SPA-CR-23-2026-10-20.md) · `pkg-000187` · Await P8 | CR-07 · soft CT-28 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) |
| CR-24 | [STORY-SPA-CR-24-react-underlay-own-vs-people.md](STORY-SPA-CR-24-react-underlay-own-vs-people.md) | P8 Done · gate BLOCK · Story **BLOCKED** (OP eye) OK · [disposition](../../analysis/p5-disposition-STORY-SPA-CR-24-2026-10-22.md) · [arch](../../../architecture/component-reactions/24-react-underlay-own-vs-people.md) · `pkg-000208` closed | soft CR-23 · soft NF-18 · soft CR-25 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-24-react-underlay-own-vs-people/STORY-SPA-CR-24-react-underlay-own-vs-people.md) · [M163](../../../UX/next/feed/artboards/DOGEstonia-M163-feed-civic-react-underlay-spec-v1.0.md) · [M164](../../../UX/next/feed/artboards/DOGEstonia-M164-stable-react-own-vs-people-spec-v1.0.md) |
| CR-25 | [STORY-SPA-CR-25-reaction-selected-hydrate-persist.md](STORY-SPA-CR-25-reaction-selected-hydrate-persist.md) | P8 Done · gate BLOCK · Story **BLOCKED** (OP eye) OK · [disposition](../../analysis/p5-disposition-STORY-SPA-CR-25-2026-10-22.md) · [arch](../../../architecture/component-reactions/25-reaction-selected-hydrate-persist.md) · `pkg-000209` closed | CR-23 · soft CR-24 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-25-reaction-selected-hydrate-persist/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md) · [persist analysis](../../../analysis/analysis-reaction-persist-reload-gap-2026-10-22.md) |
| CR-26 | [STORY-SPA-CR-26-own-react-empty-harmony.md](STORY-SPA-CR-26-own-react-empty-harmony.md) | P8 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000224` closed · SHAs `4469a57`/`f15f3e0`/`54eb9a0` · [disposition](../../run-reports/p5-disposition-STORY-SPA-CR-26-2026-10-24.md) · [M173](../../../UX/next/feed/artboards/DOGEstonia-M173-own-react-empty-filled-harmony-spec-v1.0.md) PASS · [arch](../../../architecture/component-reactions/26-own-react-empty-harmony.md) | soft CR-24/25 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-26-own-react-empty-harmony/STORY-SPA-CR-26-own-react-empty-harmony.md) · Interview **M9** |
| CR-27 | [STORY-SPA-CR-27-list-own-reactions-hydrate.md](STORY-SPA-CR-27-list-own-reactions-hydrate.md) | P8 local close · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000225` · [arch](../../../architecture/component-reactions/27-list-own-reactions-hydrate.md) | CR-25 · soft FeedListArea | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-27-list-own-reactions-hydrate/STORY-SPA-CR-27-list-own-reactions-hydrate.md) · Interview **M10** |
| CR-28 | [STORY-SPA-CR-28-peer-reactions-empty-affordance.md](STORY-SPA-CR-28-peer-reactions-empty-affordance.md) | P8 local close · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000226` · [M176](../../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) PASS · [arch](../../../architecture/component-reactions/28-peer-reactions-empty-affordance.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-CR-28-2026-10-24.md) | soft CR-12/21/24 | [pipeline](../../epics/EPIC-SPA-23-component-reactions/stories/STORY-SPA-CR-28-peer-reactions-empty-affordance/STORY-SPA-CR-28-peer-reactions-empty-affordance.md) · Interview **M14** |
| CR-icon | [STORY-SPA-CR-icon-assets.md](STORY-SPA-CR-icon-assets.md) | Gap-8 **Done** · **Gap v2 closed (CR-20)** · §Reuse | — | — |
| CR-api | [STORY-SPA-CR-api-requirements.md](STORY-SPA-CR-api-requirements.md) | **Done** · reuse map · NF-api §2 | — | — |

**Order:** CR-11…15 → CR-16…19 → CR-20 → CR-21 → CR-22 → **CR-23** → **CR-24** (M163/M164) ‖ **CR-25** (hydrate). Analysis: [cutover](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md).  
**Order (wave5):** **CR-26** P8 · **CR-27** P8 · **CR-28** P8 · [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md).

## UX input (package start)

- M154 md+png · M155 md+png · M160 md+png — full table in [ADMIN-CR-03 Вход](ADMIN-CR-03-icon-assets-catalog.md)  
- Wave3: M163/M164 artboards · [UX-PROMPTS…](UX-PROMPTS-wave3-react-residual-2026-10-22.md) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md)  
- Wave5: [M173](../../../UX/next/feed/artboards/DOGEstonia-M173-own-react-empty-filled-harmony-spec-v1.0.md) · [M176](../../../UX/next/feed/artboards/DOGEstonia-M176-peer-reactions-layout-spec-v1.0.md) · [intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md) **PASS**

## Cross-links

- Sibling API SSOT: [next-feed STORY-SPA-NF-api-requirements §2](../next-feed/STORY-SPA-NF-api-requirements.md)  
- Lab pattern: [next-feed-lab](../next-feed-lab/INDEX.md) · `#/lab/feed`  
- Dashboard: [spa-mvp-dashboard.md](../../spa-mvp-dashboard.md)
