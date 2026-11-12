# EPIC-SPA-23 — Component Reactions mount + `#/lab/reactions` (REQ-24)

> **ID:** `EPIC-SPA-23` · **Статус:** In Progress — tip **CR-28 P1.3** · `2026-10-24T10:39:23Z` · `pkg-000226` · gate PENDING · activation active · Await P2  




> **Тип:** Product / UX reactions component (lab-first · next/feed cutover docs)  
> **source:** [`../../backlog-stories/component-reactions/INDEX.md`](../../backlog-stories/component-reactions/INDEX.md)  
> **Parent REQ:** [`24-reactions-mount-lab.md`](../../../requirements/24-reactions-mount-lab.md) · parent epic [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.6 / FR-22.15  
> **Brief:** [`PRODUCT-BRIEF.md`](../../backlog-stories/component-reactions/PRODUCT-BRIEF.md)  
> **Tip mirror:** [`INTERVIEW-CT-28-plus…`](../../backlog-stories/component-thread/INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) · prior [`OP-UX-MIRROR-gap-v2…`](../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md)  
> **Architecture:** [`ARCHITECTURE.md`](../../backlog-stories/component-reactions/ARCHITECTURE.md) §1  
> **Gap:** [next/feed cutover](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)  
> **Admin:** ADMIN-CR-03…06 **4/4 Done** (Variant B · omit 01/02)  
> **Code home:** `src/features/reactions-mount/` · lab Present · CR-23 Live · tip **CR-28** P1.3 peer empty  


> **Route tip:** `#/lab/reactions` · cutover target `#/next/feed` (CR-23)  
> **Data plane:** reuse `ThreadsSocialClient` — [CR-api](../../backlog-stories/component-reactions/STORY-SPA-CR-api-requirements.md) · NF-api §2  

---

## Назначение

Greenfield **ReactionsMount** (strip + picker + **lab people M155**) + lab `#/lab/reactions` with FixtureAdapter (default) and thin LiveAdapter wrapping `ThreadsSocialClient`. Host-agnostic; Live people fail-closed; no second client.  
Waves: CR-08…22 lab · **CR-23** Live · **CR-24** M163/M164 P8 · **CR-25** hydrate P8 · **CR-26** M173 P8 · **CR-27** list hydrate P8 · **CR-28** peer empty P1.3 `pkg-000226` (Await P2).

## Prerequisites (verified `2026-10-14T09:58:29Z`)

| Prerequisite | Status |
|--------------|--------|
| `#/lab/feed` in shell Routes | Present — `App.jsx` `path="/lab/feed"` |
| `ThreadsSocialClient.react` / `getKnobs` | Present — L454 / L524 |
| ADMIN-CR-05 CR-01…04 backlog | Done-as-docs · Status Todo |
| CR-icon / CR-api | Done |
| PRODUCT-BRIEF data-plane lock | Unchanged |
| REQ-22 Phase 1 Done claim | **Not claimed** — this epic Todo |

## Состав

| Story | Тема | Wave | Status | Pipeline | Backlog |
|-------|------|------|--------|----------|---------|
| CR-01 | Reactions mount strip | 1 | P3 structure Done · gate BLOCK · Await P4 | [pipeline](stories/STORY-SPA-CR-01-reactions-mount-strip/STORY-SPA-CR-01-reactions-mount-strip.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-01-reactions-mount-strip.md) |
| CR-02 | Reaction picker | 2 | P3 structure Done · gate BLOCK · residual | [pipeline](stories/STORY-SPA-CR-02-reaction-picker/STORY-SPA-CR-02-reaction-picker.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-02-reaction-picker.md) |
| CR-03 | Lab reactions page + adapters | 3 | P3 structure Done · gate BLOCK · residual | [pipeline](stories/STORY-SPA-CR-03-lab-reactions-page/STORY-SPA-CR-03-lab-reactions-page.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-03-lab-reactions-page.md) |
| CR-04 | L10N + theme stress | 4 | P3 structure Done · gate BLOCK · residual | [pipeline](stories/STORY-SPA-CR-04-reactions-l10n-theme-stress/STORY-SPA-CR-04-reactions-l10n-theme-stress.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-04-reactions-l10n-theme-stress.md) |
| CR-05 | Strip open / dismiss | 5 | P8 Done · gate BLOCK · residual OP eye | [pipeline](stories/STORY-SPA-CR-05-strip-open-dismiss/STORY-SPA-CR-05-strip-open-dismiss.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md) |
| CR-06 | Picker chrome / layout | 6 | P8 Done · gate BLOCK · residual OP eye | [pipeline](stories/STORY-SPA-CR-06-picker-chrome-layout/STORY-SPA-CR-06-picker-chrome-layout.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md) |
| CR-07 | `#/lab/feed` cutover → ReactionsMount | 7 | P8 Done · gate BLOCK · residual OP eye | [pipeline](stories/STORY-SPA-CR-07-lab-feed-cutover/STORY-SPA-CR-07-lab-feed-cutover.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-07-lab-feed-cutover.md) |
| CR-08 | Lab feed theme + stress | 8 | P6 F2 CLOSED · gate BLOCK · residual OP eye | [pipeline](stories/STORY-SPA-CR-08-lab-feed-theme-stress/STORY-SPA-CR-08-lab-feed-theme-stress.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-08-lab-feed-theme-stress.md) |
| CR-09 | Strip slot composition A+C+B | 9 | P8 Done · gate BLOCK · residual OP eye | [pipeline](stories/STORY-SPA-CR-09-strip-slot-composition/STORY-SPA-CR-09-strip-slot-composition.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-09-strip-slot-composition.md) |
| CR-10 | Picker portal escape P1 | 10 | P5 TASKED=0 · gate BLOCK · Await P8 | [pipeline](stories/STORY-SPA-CR-10-picker-portal-escape/STORY-SPA-CR-10-picker-portal-escape.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-10-picker-portal-escape.md) |
| CR-11 | Strip four-zone chrome M154/M160 | 11 | P5 APPLY · TASKED=0 · gate BLOCK | [pipeline](stories/STORY-SPA-CR-11-strip-four-zone-chrome/STORY-SPA-CR-11-strip-four-zone-chrome.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md) |
| CR-12 | React-always + aggregate row | 12 | P5 APPLY · TASKED=0 · gate BLOCK | [pipeline](stories/STORY-SPA-CR-12-react-always-aggregate-row/STORY-SPA-CR-12-react-always-aggregate-row.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-12-react-always-aggregate-row.md) |
| CR-13 | Picker tile grid + footer | 13 | P5 APPLY · TASKED=0 · gate BLOCK | [pipeline](stories/STORY-SPA-CR-13-picker-tile-grid-chrome/STORY-SPA-CR-13-picker-tile-grid-chrome.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-13-picker-tile-grid-chrome.md) |
| CR-14 | Mark accent tokens (CSS) | 14 | P5 APPLY · TASKED=0 · gate BLOCK | [pipeline](stories/STORY-SPA-CR-14-mark-accent-tokens/STORY-SPA-CR-14-mark-accent-tokens.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-14-mark-accent-tokens.md) |
| CR-15 | Lab visual wire both labs | 15 | P8 Done · TASKED=0 · gate BLOCK | [pipeline](stories/STORY-SPA-CR-15-lab-visual-wire/STORY-SPA-CR-15-lab-visual-wire.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-15-lab-visual-wire.md) |
| CR-16 | Strip chip hover + media flush | 16 | P8 Done · TASKED=0 · gate BLOCK | [pipeline](stories/STORY-SPA-CR-16-strip-hover-media-flush/STORY-SPA-CR-16-strip-hover-media-flush.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-16-strip-hover-media-flush.md) |
| CR-17 | ReactorsPopover M155 A | 17 | P8 Done · structure Present · gate BLOCK · residual | [pipeline](stories/STORY-SPA-CR-17-reactors-popover/STORY-SPA-CR-17-reactors-popover.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-17-reactors-popover.md) |
| CR-18 | ReactionsDialog M155 B | 18 | P1.3 activated · gate PENDING · tip | [pipeline](stories/STORY-SPA-CR-18-reactions-dialog/STORY-SPA-CR-18-reactions-dialog.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-18-reactions-dialog.md) |
| CR-19 | People sheet + lab wire M155 C | 19 | P3 Done · gate BLOCK | [pipeline](stories/STORY-SPA-CR-19-people-sheet-lab-wire/STORY-SPA-CR-19-people-sheet-lab-wire.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-19-people-sheet-lab-wire.md) |
| CR-20 | Gap v2 icon generate + promote | 20 | P8 Done · gate BLOCK · Gap v2 Present | [pipeline](stories/STORY-SPA-CR-20-gap-v2-icon-generate/STORY-SPA-CR-20-gap-v2-icon-generate.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-20-gap-v2-icon-generate.md) |
| CR-21 | People affordance residual | 21 | P8 Done · gate BLOCK | [pipeline](stories/STORY-SPA-CR-21-people-affordance-residual/STORY-SPA-CR-21-people-affordance-residual.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-21-people-affordance-residual.md) |
| CR-22 | Media–strip flush residual | 22 | P3 Done · gate BLOCK | [pipeline](stories/STORY-SPA-CR-22-media-strip-flush-residual/STORY-SPA-CR-22-media-strip-flush-residual.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-22-media-strip-flush-residual.md) |
| CR-23 | `#/next/feed` ReactionsMount Live cutover | 23 | P5 APPLY · gate BLOCK · F1/F2 WAIVED · TASKED=0 · [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-23-2026-10-20.md) · `pkg-000187` | [pipeline](stories/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) |
| CR-24 | React wide underlay · own vs people M163/M164 | 24 | P8 Done · gate BLOCK · Story **BLOCKED** (OP eye) OK · [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-24-2026-10-22.md) · [arch](../../../architecture/component-reactions/24-react-underlay-own-vs-people.md) · `pkg-000208` closed | [pipeline](stories/STORY-SPA-CR-24-react-underlay-own-vs-people/STORY-SPA-CR-24-react-underlay-own-vs-people.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-24-react-underlay-own-vs-people.md) |
| CR-25 | Hydrate actor selected after reload | 25 | P8 Done · gate BLOCK · Story **BLOCKED** (OP eye) OK · [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-25-2026-10-22.md) · `pkg-000209` closed | [pipeline](stories/STORY-SPA-CR-25-reaction-selected-hydrate-persist/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-25-reaction-selected-hydrate-persist.md) |
| CR-26 | Own React empty/filled harmony M173 | 26 | P8 Done · gate BLOCK · Story **BLOCKED** (OP eye) OK · `pkg-000224` closed | [pipeline](stories/STORY-SPA-CR-26-own-react-empty-harmony/STORY-SPA-CR-26-own-react-empty-harmony.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-26-own-react-empty-harmony.md) |
| CR-27 | List own reactions hydrate | 27 | P1.3 activated · T01–T03 Todo · gate PENDING · `pkg-000225` · **tip** · Await P2 | [pipeline](stories/STORY-SPA-CR-27-list-own-reactions-hydrate/STORY-SPA-CR-27-list-own-reactions-hydrate.md) | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-27-list-own-reactions-hydrate.md) |
| CR-icon | Icon assets catalog | — | Gap-8 Done · Gap v2 closed (CR-20) · §Reuse | — | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-icon-assets.md) |
| CR-api | API reuse map | — | **Done** | — | [backlog](../../backlog-stories/component-reactions/STORY-SPA-CR-api-requirements.md) |

## Порядок волн

```
… → CR-15 → CR-16 → CR-17 → CR-18 → CR-19 → CR-20 → CR-21 → CR-22 → CR-23 → CR-24 → CR-25 → CR-26 → **CR-27**
```

**CR-22:** P3 structure Done · gate BLOCK.  
**CR-23:** P5 APPLY · `pkg-000187` · Await P8.  
**CR-24:** P8 Done · `pkg-000208` closed · Story **BLOCKED** (OP eye) OK.  
**CR-25:** P8 Done · `pkg-000209` closed · Story **BLOCKED** (OP eye) OK.  
**CR-26:** P8 Done · `pkg-000224` closed · Story **BLOCKED** (OP eye) OK.  
**CR-27:** P1.3 · `pkg-000225` · Await P2.

## Forbidden

- New SocialClient / invent `/threads/*` people endpoints
- Fabricate Live people from aggregate counts
- Real Connect workflow (stub only)
- Invent OP PASS / invent HTTP beyond Closed client
- DS amend / free-floating strip between media and actions
- Hopeful/amused as selectable
- Primary fix for picker clip = remove card `overflow: hidden` (CR-10 P2)
- Generate multicolor mark SVG set (use CSS accents · CR-14)

## Bullrun

Lab tip: [bullrun-launch-index.md](../../bullrun-launch-index.md) · **Tip CR-27 P1.3** · `pkg-000225` · gate PENDING · activation active · Await P2.

## Tip

**Tip CR-27 P1.3 activated `2026-10-24T10:29:17Z`** — [`pkg-000225`](../../spa-active-packages/pkg-000225-20261024-epic-spa-23-cr-27-list-own-reactions-hydrate.yaml) · REUSE EPIC-SPA-23 · T01–T03 Todo · Path A M10 · Partial=**BLOCK** · NO BRIEF · activation **active** · Await **P2**. Do not invent OP PASS / gateway schema.

**Prior tip CR-26 P8** — superseded by CR-27 tip above.

**Prior tip CR-23 P5 APPLY `2026-10-20T21:21:04Z`** — [disposition](../../../analysis/p5-disposition-STORY-SPA-CR-23-2026-10-20.md) · F1 WAIVED operator · F2 WAIVED info · TASKED=0 · superseded by CR-24 tip above.

**P8 CR-21 Done `2026-10-18T12:19:14Z`.** SHAs `9a699de`/`638f39a`/`0eb1108` · [`pkg-000157`](../../spa-active-packages/pkg-000157-20261018-epic-spa-23-cr-21-people-affordance-residual.yaml) · structure Present · gate BLOCK · tip residual OP eye · superseded by CR-22 tip.

**P3 CR-21 structure Done `2026-10-18T12:15:16Z`.** [`pkg-000157`](../../spa-active-packages/pkg-000157-20261018-epic-spa-23-cr-21-people-affordance-residual.yaml) · T01–T04 Done · peopleAnchor=trigger · chip · Reactions≠picker · aggregate→people · Gap v2 nw=24 · Path A shots 01–05 · vitest **140**/140 · gate **BLOCK** (OP eye) · superseded tip by P8/CR-22.

**P1.3 CR-21 activated `2026-10-18T12:11:38Z`.** [`pkg-000157`](../../spa-active-packages/pkg-000157-20261018-epic-spa-23-cr-21-people-affordance-residual.yaml) · T01–T04 · superseded tip by P3.

**P8 CR-20 Done `2026-10-18T12:09:58Z`.** SHAs `ed7c21a`/`a672d9f`/`9c16a20` · [`pkg-000156`](../../spa-active-packages/pkg-000156-20261018-epic-spa-23-cr-20-gap-v2-icon-generate.yaml) · Gap v2 Present · gate BLOCK · tip residual OP eye · superseded by CR-21 tip.

**P3 CR-20 structure Done `2026-10-18T12:07:24Z`.** [`pkg-000156`](../../spa-active-packages/pkg-000156-20261018-epic-spa-23-cr-20-gap-v2-icon-generate.yaml) · T01–T05 Done · Gap v2 Present · Path A shots 01–05 · vitest **136**/136 · gate **BLOCK** (OP eye) · superseded tip by P8/CR-21.

**P1.3 CR-20 activated `2026-10-18T12:04:08Z`.** [`pkg-000156`](../../spa-active-packages/pkg-000156-20261018-epic-spa-23-cr-20-gap-v2-icon-generate.yaml) · T01–T05 · superseded tip by P3.

**Backlog tip CR-20…22 residual docs `2026-10-18T11:41:29Z`.** Mirror [gap-v2-people-media residual](../../backlog-stories/component-reactions/OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · superseded tip by P1.3 CR-20 above.

**P3 CR-19 structure Done `2026-10-18T10:55:57Z`.** [`pkg-000155`](../../spa-active-packages/pkg-000155-20261018-epic-spa-23-cr-19-people-sheet-lab-wire.yaml) · T01–T04 Done · Path A shots 01–05 · vitest **132**/132 · gate **BLOCK** (OP eye · Gap v2) · sheet ≤88dvh · both labs · Reactions≠picker · FixtureAdapter · Live fail-closed · no invent people HTTP/OP PASS/SVG. Do not invent OP PASS. Do not git push. Await **P4** (or residual CR-20 first).

**P1.3 CR-19 activated `2026-10-18T10:51:53Z`.** [`pkg-000155`](../../spa-active-packages/pkg-000155-20261018-epic-spa-23-cr-19-people-sheet-lab-wire.yaml) · T01–T04 · Path A M155 C · superseded tip by P3.

**P1.3 CR-18 activated `2026-10-18T10:44:10Z`.** [`pkg-000154`](../../spa-active-packages/pkg-000154-20261018-epic-spa-23-cr-18-reactions-dialog.yaml) · T01–T05 · Path A M155 B · superseded tip by CR-19.

**P8 CR-17 Done `2026-10-18T10:42:46Z`.** SHAs `35f0b4e`/`14f0882`/`2791c0d` · feat→test→docs · no `docs/tasks/**` · no push · story **BLOCKED** (OP eye · Gap v2) · structure Present.

**P1.3 CR-17 activated `2026-10-17T14:01:53Z`.** [`pkg-000153`](../../spa-active-packages/pkg-000153-20261017-epic-spa-23-cr-17-reactors-popover.yaml) · T01–T05 · Path A M155 A · superseded tip by CR-18.

**P8 CR-16 Done `2026-10-17T14:00:48Z`.** SHAs `e74f131`/`8c865ee`/`429798f` · feat→test→docs · no `docs/tasks/**` · no push · story **BLOCKED** (OP eye) · structure Present.

**P5 CR-16 APPLY `2026-10-17T14:00:48Z`.** TASKED=0 · F1 WAIVED operator · F2–F4 WAIVED info · activation **none** · disposition Present · no invent OP PASS/SVG. Await **P8**.

**P3 CR-16 Execute Done `2026-10-17T13:58:39Z`.** Structure Present · Path A shots 01–05 · vitest feed-lab **59**/59 · gate **BLOCK** (OP eye Absent) · chip hover not full-cell · media-strip flush · no invent OP PASS/HTTP/M155/SVG. Do not git push. Await **P4**.

**P1.3 CR-16 activated `2026-10-17T13:55:57Z`.** [`pkg-000152`](../../spa-active-packages/pkg-000152-20261017-epic-spa-23-cr-16-strip-hover-media-flush.yaml) · T01–T03 Todo · Path A OP-UX-MIRROR-strip-polish §3 · Partial=**BLOCK** · gate **PENDING** · OP go · chip hover not full-cell · media-strip flush · no invent HTTP/M155/SVG. Do not invent OP PASS. Do not git push. Await **P2** · **STOP** before P3.

**Backlog tip CR-16.** Docs: [polish+M155 mirror](../../backlog-stories/component-reactions/OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · CR-16…19 handoff-ready. Last pkg: [`pkg-000151`](../../spa-active-packages/pkg-000151-20261016-epic-spa-23-cr-15-lab-visual-wire.yaml) (CR-15). Scaffold Await P1.3 · runtime Await «делай». Do not invent OP PASS / people HTTP. Do not git push unless operator asks.

**P8 CR-15 Done `2026-10-16T11:17:35Z`.** SHAs `c1d7cd3`/`95a1dff`/`66926b3` · feat→test→docs · no `docs/tasks/**` · no push · story **BLOCKED** (OP eye · Gap v2) · structure Present.

**P5 CR-15 APPLY `2026-10-16T11:17:35Z`.** TASKED=0 · F1 WAIVED operator (OP eye+Gap v2) · F2–F4 WAIVED info · activation **none** · disposition Present · no invent OP PASS/SVG. Await **P8**.

**P3 CR-15 Execute Done `2026-10-16T11:13:45Z`.** Structure Present · Path A shots 01–05 · vitest **108**/108 · gate **BLOCK** (OP eye Absent · Gap v2 residual) · no invent OP PASS · no invent HTTP/M155/#/next/feed. Do not git push. Await **P4**.

**P1.3 CR-15 activated `2026-10-16T11:09:16Z`.** [`pkg-000151`](../../spa-active-packages/pkg-000151-20261016-epic-spa-23-cr-15-lab-visual-wire.yaml) · T01–T04 Todo · Path A OP-UX-MIRROR-m154 · Partial=**BLOCK** · gate **PENDING** · OP go · Gap v2 residual BLOCK fact · wire CR-11…14 both labs · no invent HTTP/M155/#/next/feed. Do not invent OP PASS. Do not git push. Await **P2** · **STOP** before P3.

**P1.3 CR-14 activated `2026-10-16T11:00:46Z`.** [`pkg-000150`](../../spa-active-packages/pkg-000150-20261016-epic-spa-23-cr-14-mark-accent-tokens.yaml) · T01–T04 Todo · Path A OP-UX-MIRROR-m154 §4.5 + icon-token-map · Partial=**BLOCK** · gate **PENDING** · CSS currentColor accents · no multicolor SVG · no invent HTTP/M155. Do not invent OP PASS. Do not git push. Await **P2** · **STOP** before P3.

**P1.3 CR-13 activated `2026-10-16T10:47:24Z`.** [`pkg-000149`](../../spa-active-packages/pkg-000149-20261016-epic-spa-23-cr-13-picker-tile-grid-chrome.yaml) · T01–T04 Todo · Path A M154 + OP-UX-MIRROR-m154 §4 · Partial=**BLOCK** · gate **PENDING** · tile grid · Cancel/Add/Done · keep CR-10 portal · no invent HTTP/M155/Lucide. Do not invent OP PASS. Do not git push. Await **P2** · **STOP** before P3.