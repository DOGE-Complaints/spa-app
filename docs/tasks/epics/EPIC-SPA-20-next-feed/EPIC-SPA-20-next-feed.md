# EPIC-SPA-20 — Next Feed (REQ-22 feed content slice)

> **ID:** `EPIC-SPA-20` · **Статус:** In Progress — tip **NF-26 P3** · `pkg-000233` · T01–T03 Done·BLOCK · gate **BLOCK** · activation **active** · Await **P4** · soft NF-25 P8 BLOCK · soft NF-24…13 · NF-01…12 Done · visual parity gate PASS (`2026-10-11T15:47:08Z`)  
> **Тип:** Product / UX feed content  
> **source:** [`../../backlog-stories/next-feed/INDEX.md`](../../backlog-stories/next-feed/INDEX.md)  
> **Parent REQ:** [`22-feed-visual-redesign-phase-1.md`](../../../requirements/22-feed-visual-redesign-phase-1.md) FR feed/Issue/reactions  
> **Architecture:** [`feed-visual-redesign-phase-1/`](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) ([00](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) · [01](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) · [02](../../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) · [03](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)) — **task READMEs cite these locks** · **Arch delta:** [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md)  
> **Prerequisite:** [EPIC-SPA-19-next-shell](../EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md) **Done** (host `#/next/feed*`) · ADMIN-NF-01…05 intake · NF-01…06 Done  
> **Admin:** ADMIN-NF-01…05 complete → backlog ready for P1.3/P3  
> **Sibling shell:** [next-shell](../../backlog-stories/next-shell/INDEX.md) — chrome OOS here  
> **Proposal (Materialized):** [`proposal-next-feed-visual-parity-stories-2026-10-10.md`](../../../analysis/proposal-next-feed-visual-parity-stories-2026-10-10.md)

---

## Назначение

Доставить **feed content** на `#/next/feed*`: list/toolbar, civic post, list|map, thread/composer, reactions + invite stub + write gate, mounts + verify — в `features/feed/`, один data plane (gateway issues + Closed threads + identity `/me`). Shell chrome **не** переписывать.

## Prerequisites (verified)

| Prerequisite | Status |
|--------------|--------|
| next-shell host `#/next/feed*` | Done (EPIC-19) |
| ADMIN-NF-04 backlog stories NF-01…06 | Done (Todo implement) |
| Icons on disk `public/icons/next-feed/` (24 SVG) | Done ADMIN-NF-02 · [catalog](../../backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md) |
| API contracts (no invent) | [STORY-SPA-NF-api-requirements.md](../../backlog-stories/next-feed/STORY-SPA-NF-api-requirements.md) |
| UX register M149–M160 | [NF-feed-mockup-intake-register.md](../../backlog-stories/next-feed/NF-feed-mockup-intake-register.md) |
| Live server text search (FE enable = NF-12) | Gateway [REQ-56](../../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready** (param **`search`**) · DUI-Q12 lift AD-VP-03/06 · **NF-12 Done** — `buildIssuesQuery` / `serializeServerBoardQuery` pass `search` |
| Runtime for visual Done | `./scripts/shell/local-five-serve-and-health.sh` · live↔artboard AD-VP-04 |

## Состав

### Wave 1–6 (Done)

| Story | Тема | Wave | Status | Pipeline | Backlog |
|-------|------|------|--------|----------|---------|
| NF-01 | Feed list + toolbar + query | 1 | Done · P3 `pkg-000103` | [pipeline](stories/STORY-SPA-NF-01-feed-list-toolbar-query/STORY-SPA-NF-01-feed-list-toolbar-query.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-01-feed-list-toolbar-query.md) |
| NF-02 | Civic issue-as-post | 2 | Done · P3 `pkg-000104` | [pipeline](stories/STORY-SPA-NF-02-civic-issue-post/STORY-SPA-NF-02-civic-issue-post.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-02-civic-issue-post.md) |
| NF-03 | List \| Map toggle | 3 | Done · P3 `pkg-000105` | [pipeline](stories/STORY-SPA-NF-03-list-map-toggle/STORY-SPA-NF-03-list-map-toggle.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-03-list-map-toggle.md) |
| NF-04 | Thread tree + composer | 4 | Done · P3 `pkg-000106` | [pipeline](stories/STORY-SPA-NF-04-thread-tree-composer/STORY-SPA-NF-04-thread-tree-composer.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-04-thread-tree-composer.md) |
| NF-05 | Reactions + invite stub + write gate | 5 | Done · P3 `pkg-000107` | [pipeline](stories/STORY-SPA-NF-05-reactions-invite-write-gate/STORY-SPA-NF-05-reactions-invite-write-gate.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-05-reactions-invite-write-gate.md) |
| NF-06 | Mounts + responsive + feed verify | 6 | Done · P3 `pkg-000108` | [pipeline](stories/STORY-SPA-NF-06-mounts-responsive-verify/STORY-SPA-NF-06-mounts-responsive-verify.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-06-mounts-responsive-verify.md) |

### Sub-wave: visual parity (Done)

| Story | Тема | Tip order | Status | Pipeline | Backlog |
|-------|------|-----------|--------|----------|---------|
| NF-07 | Civic post visual parity (M150 4-zone) | 1 | Done · P3 `pkg-000109` | [pipeline](stories/STORY-SPA-NF-07-civic-post-visual-parity/STORY-SPA-NF-07-civic-post-visual-parity.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-07-civic-post-visual-parity.md) |
| NF-08 | Discussion collapsed + oval composer reskin | 2 | Done · P3 `pkg-000110` | [pipeline](stories/STORY-SPA-NF-08-discussion-collapsed-composer-reskin/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-08-discussion-collapsed-composer-reskin.md) |
| NF-09 | Reactions strip + picker chrome | 3 | Done · P3 `pkg-000111` | [pipeline](stories/STORY-SPA-NF-09-reactions-strip-picker-chrome/STORY-SPA-NF-09-reactions-strip-picker-chrome.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-09-reactions-strip-picker-chrome.md) |
| NF-10 | Feed light theme + list composure | 4 | Done · P3 `pkg-000112` | [pipeline](stories/STORY-SPA-NF-10-feed-light-theme-list-composure/STORY-SPA-NF-10-feed-light-theme-list-composure.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-10-feed-light-theme-list-composure.md) |
| NF-12 | Text search FE enable (DUI-Q12 lift) | 5 | Done · P3 `pkg-000114` | [pipeline](stories/STORY-SPA-NF-12-text-search-fe-enable/STORY-SPA-NF-12-text-search-fe-enable.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-12-text-search-fe-enable.md) |
| NF-11 | Live artboard parity verify (gate) | 6 | Done · gate PASS (`2026-10-11T15:47:08Z`) | [pipeline](stories/STORY-SPA-NF-11-live-artboard-parity-verify/STORY-SPA-NF-11-live-artboard-parity-verify.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-11-live-artboard-parity-verify.md) |

### Live civic residual wave (2026-10-21 · tip)

| Story | Тема | Status | Pipeline | Backlog |
|-------|------|--------|----------|---------|
| NF-13 | Issue-type identity icon (M161) | P5 APPLY · gate BLOCK · T01–T04 Done · `pkg-000189` · Await P8 | [pipeline](stories/STORY-SPA-NF-13-issue-type-identity-icon/STORY-SPA-NF-13-issue-type-identity-icon.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md) |
| NF-14 | Civic card hit-target (retire Open issue) | P5 APPLY · gate BLOCK · T01–T04 Done · `pkg-000190` · Await P8 | [pipeline](stories/STORY-SPA-NF-14-civic-card-hit-target/STORY-SPA-NF-14-civic-card-hit-target.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-14-civic-card-hit-target.md) |
| NF-15 | Action strip density · React unframe (M162) | P5 APPLY · gate BLOCK · T01–T04 Done · `pkg-000191` · Await P8 | [pipeline](stories/STORY-SPA-NF-15-action-strip-density-unframe/STORY-SPA-NF-15-action-strip-density-unframe.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-15-action-strip-density-unframe.md) |
| NF-16 | More (⋮) menu deferred | P5 APPLY · gate BLOCK · T01–T03 Done · `pkg-000192` · Await P8 | [pipeline](stories/STORY-SPA-NF-16-more-menu-deferred/STORY-SPA-NF-16-more-menu-deferred.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-16-more-menu-deferred.md) |
| NF-17 | Civic chrome residual (OP C1–C3 · C5) | P5 APPLY · gate BLOCK · T01–T05 Done · `pkg-000194` · soft Await P8 | [pipeline](stories/STORY-SPA-NF-17-civic-chrome-residual/STORY-SPA-NF-17-civic-chrome-residual.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-17-civic-chrome-residual.md) |
| NF-18 | Strip React density residual (OP R1 · R2) | P5 APPLY · gate BLOCK · T01–T04 Done · `pkg-000196` · soft Await P8 | [pipeline](stories/STORY-SPA-NF-18-strip-react-density-residual/STORY-SPA-NF-18-strip-react-density-residual.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-18-strip-react-density-residual.md) |
| NF-19 | Map basemap follows theme (OP M3) | P5 APPLY · gate BLOCK · T01–T04 Done · `pkg-000197` · soft Await P8 | [pipeline](stories/STORY-SPA-NF-19-map-basemap-follows-theme/STORY-SPA-NF-19-map-basemap-follows-theme.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-19-map-basemap-follows-theme.md) |
| NF-20 | Map cluster leaves reachable (OP M4) | P5 APPLY · gate BLOCK · T01–T04 Done · `pkg-000198` · soft Await P8 · P6 not needed | [pipeline](stories/STORY-SPA-NF-20-map-cluster-leaves-reachable/STORY-SPA-NF-20-map-cluster-leaves-reachable.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-20-map-cluster-leaves-reachable.md) |
| NF-21 | Filter date color-scheme follows theme (OP F3) | P8 closed · gate BLOCK · Story BLOCKED (OP eye) OK · `pkg-000204` · `activation: none` | [pipeline](stories/STORY-SPA-NF-21-filter-date-color-scheme/STORY-SPA-NF-21-filter-date-color-scheme.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-21-filter-date-color-scheme.md) |
| NF-22 | Reset Filters actionable + cursor (OP F4) | P8 closed · gate BLOCK · Story BLOCKED (OP eye) OK · `pkg-000205` · `activation: none` | [pipeline](stories/STORY-SPA-NF-22-reset-filters-actionable/STORY-SPA-NF-22-reset-filters-actionable.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-22-reset-filters-actionable.md) |
| NF-23 | Board deprecate → next/feed (OP B11) | P1.3 APPLY · T01–T04 Todo · gate PENDING · `pkg-000206` · tip · activation **active** · Await P2 | [pipeline](stories/STORY-SPA-NF-23-board-deprecate-redirect/STORY-SPA-NF-23-board-deprecate-redirect.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-23-board-deprecate-redirect.md) |
| NF-24 | Map leaves sheet / pin popup theme (OP M1) | P8 local close · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000212` closed · `activation: none` | [pipeline](stories/STORY-SPA-NF-24-map-leaves-sheet-theme/STORY-SPA-NF-24-map-leaves-sheet-theme.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-24-map-leaves-sheet-theme.md) |
| NF-25 | Filters popover UX redesign (M175 · M13) | P8 local close · gate **BLOCK** · Story **BLOCKED** · `pkg-000229` · soft · SHAs `bf0b74f`/`b0a06f3`/`83d45e8` | [pipeline](stories/STORY-SPA-NF-25-filters-popover-ux-redesign/STORY-SPA-NF-25-filters-popover-ux-redesign.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-25-filters-popover-ux-redesign.md) |
| NF-26 | Filters mobile scroll + body lock (M2 · CSS) | P3 Execute Done · T01–T03 Done·BLOCK · gate **BLOCK** · `pkg-000233` · **tip** · activation **active** · Await **P4** | [pipeline](stories/STORY-SPA-NF-26-filters-mobile-scroll-lock/STORY-SPA-NF-26-filters-mobile-scroll-lock.md) | [backlog](../../backlog-stories/next-feed/STORY-SPA-NF-26-filters-mobile-scroll-lock.md) |

## Порядок волн

```
NF-01 → NF-02 → NF-03 → NF-04 → NF-05 → NF-06   (Done)
NF-07 → NF-08 → NF-09 → NF-10 → **NF-12** → NF-11   (visual parity tip · OP reorder · Done)
NF-13 → … → NF-23 · NF-24 (wave4) · NF-25 (wave5) · **NF-26** (wave6 · tip)
```




## Must-include (from ADMIN-NF-05)

1. **Verify** feed icon URLs 404-free under `/icons/next-feed/…` (promote already Done — do **not** re-copy unless gap) — NF-06-T04  
2. Scaffold `features/feed/` composing existing services / `components/threads` — NF-01-T01…  
3. Wire NF-01…06 AC; fail-soft; mounts on `#/next/feed*`  
4. Vitest + browser-smoke feed critical states — NF-01-T05 · NF-06-T05  
5. Do **not** re-own AppShell / Header / ProfileRail (next-shell)

Task READMEs include **Arch anchors / context / implement notes** citing [00–03](../../../architecture/feed-visual-redesign-phase-1/00-overview.md) (D2.2, Q4 one data plane, mounts, Q6 verify).

**Do not** invent gateway/threads endpoints; M155 people; real invite send; schema/media production.

## Active tip

**P3 NF-26 Execute Done (`2026-10-25T10:46:31Z`):** [`pkg-000233`](../../spa-active-packages/pkg-000233-20261025-epic-spa-20-nf-26-filters-mobile-scroll-lock.yaml) · T01–T03 Done·BLOCK · CAPTURE-META `fails: []` · nf26 **4/4** · gate **BLOCK** · activation **active** · Await **P4**. Wave `OP-spa nf26-wave6-20261025`.

**P1.3 NF-26 activated (`2026-10-25T10:41:41Z` · superseded by P3):** [`pkg-000233`](../../spa-active-packages/pkg-000233-20261025-epic-spa-20-nf-26-filters-mobile-scroll-lock.yaml) · REUSE EPIC-SPA-20 · T01–T03 Todo · clean P1.3 (no UX tip · NO BRIEF) · evidence PNG Present · NF-25 M175 held · gate was PENDING · activation **active** · Partial visual=**BLOCK** · Skill `react-expert` · Await **P2**. Wave `OP-spa nf26-wave6-20261025`. No invent filter keys / OP PASS.

**P8 NF-25 local close (soft):** [`pkg-000229`](../../spa-active-packages/pkg-000229-20261024-epic-spa-20-nf-25-filters-popover-ux-redesign.yaml) · gate **BLOCK** · Story **BLOCKED** (OP eye) · SHAs feat `bf0b74f` · test `b0a06f3` · docs `83d45e8` · NO PUSH. Wave `OP-spa nf25-wave5-20261024`. No invent filter API / OP PASS.

**P5 NF-25 APPLY (`2026-10-24T11:26:45Z` · superseded by P8):** [`pkg-000229`](../../spa-active-packages/pkg-000229-20261024-epic-spa-20-nf-25-filters-popover-ux-redesign.yaml) · F1/F2 WAIVED · TASKED=0 · activation **none** · P6 skipped · gate **BLOCK**.

**P3 NF-25 Execute Done (`2026-10-24T11:24:31Z` · superseded by P5):** [`pkg-000229`](../../spa-active-packages/pkg-000229-20261024-epic-spa-20-nf-25-filters-popover-ux-redesign.yaml) · T01–T04 Done · Path A M175 · CAPTURE-META `fails: []` · nf25 **6/6** · gate **BLOCK** · activation was **active**.

**P1.3 NF-25 activated (`2026-10-24T11:13:33Z` · superseded by P3):** [`pkg-000229`](../../spa-active-packages/pkg-000229-20261024-epic-spa-20-nf-25-filters-popover-ux-redesign.yaml) · Path A M175 · gate was PENDING · activation **active**.

**P8 NF-24 local close (`2026-10-23T13:41:03Z` · soft):** [`pkg-000212`](../../spa-active-packages/pkg-000212-20261023-epic-spa-20-nf-24-map-leaves-sheet-theme.yaml) closed · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../run-reports/p5-disposition-STORY-SPA-NF-24-2026-10-23.md) · [p7](../../../analysis/reaudit-STORY-SPA-NF-24-p7-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/24-map-leaves-sheet-theme.md) · `activation: none` · NO PUSH · Wave `OP-spa nf24-wave4-20261023` complete · superseded tip by NF-25 above.

**P1.3 NF-24 activated (`2026-10-23T13:29:56Z`):** [`pkg-000212`](../../spa-active-packages/pkg-000212-20261023-epic-spa-20-nf-24-map-leaves-sheet-theme.yaml) · T01–T04 Todo · Path A p13UxReady Interview M1 · ARCH-DELTA §12 · evidence 01 · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate **PENDING** · activation **active** · Await **P2**. Tip after pkg-000211 PH-11 P8. Wave `OP-spa nf24-wave4-20261023`. No invent basemap/OP PASS. Do not own shell. Do not git push unless operator asks.

**P1.3 NF-23 activated (`2026-10-22T14:23:16Z`):** [`pkg-000206`](../../spa-active-packages/pkg-000206-20261022-epic-spa-20-nf-23-board-deprecate-redirect.yaml) · T01–T04 Todo · Path A p13UxReady Interview B11 · ARCH-DELTA §11 · `#/board`→`#/next/feed` · inventory before purge · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate **PENDING** · activation **active** · Await **P2**. Tip after pkg-000205 NF-22 P8. Wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`. No invent CDN/OP PASS. Do not own shell. Do not git push unless operator asks.

**P8 NF-22 local close (`2026-10-22T14:20:42Z`):** [`pkg-000205`](../../spa-active-packages/pkg-000205-20261022-epic-spa-20-nf-22-reset-filters-actionable.yaml) closed · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-22-2026-10-22.md) · [p7](../../../analysis/reaudit-STORY-SPA-NF-22-p7-2026-10-22.md) · [arch](../../../architecture/next-feed-vl/22-reset-filters-actionable.md) · `activation: none` · NO PUSH · Superseded tip by P1.3 NF-23 above.

**P5 NF-22 APPLY (`2026-10-22T14:18:23Z`):** [`pkg-000205`](../../spa-active-packages/pkg-000205-20261022-epic-spa-20-nf-22-reset-filters-actionable.yaml) unchanged · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-22-2026-10-22.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 not needed · Await **P8**. Superseded tip by P8 above.

**P3 NF-22 Execute Done (`2026-10-22T14:14:35Z`):** [`pkg-000205`](../../spa-active-packages/pkg-000205-20261022-epic-spa-20-nf-22-reset-filters-actionable.yaml) · T01–T03 Done · dirty∨active Reset · pointer when actionable · Path A shots Present · Filters **29/29** · nf22 **2/2** · CAPTURE-META `fails: []` · gate **BLOCK** (OP eye Absent) · activation was active · Await **P4/P5**. Superseded tip by P5 above.

**P1.3 NF-22 activated (`2026-10-22T14:08:08Z`):** [`pkg-000205`](../../spa-active-packages/pkg-000205-20261022-epic-spa-20-nf-22-reset-filters-actionable.yaml) · T01–T03 Todo · Path A p13UxReady Interview F4 · ARCH-DELTA §10 · dirty∨active enablement · pointer when actionable · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Tip after pkg-000204 NF-21 P8. Wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`. Superseded tip by P3 above.

**P8 NF-21 local close (`2026-10-22T14:04:42Z`):** [`pkg-000204`](../../spa-active-packages/pkg-000204-20261022-epic-spa-20-nf-21-filter-date-color-scheme.yaml) closed · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-21-2026-10-22.md) · [p7](../../../analysis/reaudit-STORY-SPA-NF-21-p7-2026-10-22.md) · [arch](../../../architecture/next-feed-vl/21-filter-date-color-scheme.md) · `activation: none` · NO PUSH · Superseded tip by P1.3 NF-22 above.

**P1.3 NF-21 activated (`2026-10-22T13:43:45Z`):** [`pkg-000204`](../../spa-active-packages/pkg-000204-20261022-epic-spa-20-nf-21-filter-date-color-scheme.yaml) · T01–T02 Todo · Path A p13UxReady Interview F3 · ARCH-DELTA §9 · theme-bound `color-scheme` · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Tip after pkg-000203 NS-10. Wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`. No invent custom calendar/OP PASS. Do not own shell. Do not git push unless operator asks. Superseded tip by P8 / NF-22 above.

**P5 NF-20 APPLY (`2026-10-21T20:00:40Z`):** [`pkg-000198`](../../spa-active-packages/pkg-000198-20261021-epic-spa-20-nf-20-map-cluster-leaves-reachable.yaml) unchanged · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-20-2026-10-21.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · `activation: none` · structure Pass held · gate **BLOCK** · P6 not needed · Await **P8**. No invent spiderfy vendor/OP PASS. Do not own shell. Do not git push unless operator asks. Superseded tip by NF-21 above.

**P3 NF-20 Execute Done (`2026-10-21T19:56:45Z`):** [`pkg-000198`](../../spa-active-packages/pkg-000198-20261021-epic-spa-20-nf-20-map-cluster-leaves-reachable.yaml) · T01–T04 Done · getClusterLeaves → leaves sheet · circle+count · co-located N>1 · Path A shots Present · probe N=12 · BoardIssuesMap.nf20 **6/6** · map **16/16** · gate **BLOCK** · activation was active · Await **P4/P5**. Superseded by P5 above.

**P1.3 NF-20 activated (`2026-10-21T19:49:59Z`):** [`pkg-000198`](../../spa-active-packages/pkg-000198-20261021-epic-spa-20-nf-20-map-cluster-leaves-reachable.yaml) · T01–T04 Todo · Path A code lock · ARCH-DELTA §8 · getClusterLeaves → list/sheet · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Soft after NF-19. Wave `OP-spa nf18-20-ns07-ct32-20261021`. Prior pkg-000197 tip superseded. Superseded by P3 above.

**P5 NF-19 APPLY (`2026-10-21T19:45:42Z`):** [`pkg-000197`](../../spa-active-packages/pkg-000197-20261021-epic-spa-20-nf-19-map-basemap-follows-theme.yaml) unchanged · [disposition](../../../analysis/p5-disposition-STORY-SPA-NF-19-2026-10-21.md) · F1 **WAIVED** operator · F2 **WAIVED** info · TASKED=**0** · activation was none · structure Pass held · gate **BLOCK** · P6 not needed · Await **P8**. Superseded tip by NF-20 above.

**P3 NF-19 Execute Done (`2026-10-21T19:39:51Z`):** [`pkg-000197`](../../spa-active-packages/pkg-000197-20261021-epic-spa-20-nf-19-map-basemap-follows-theme.yaml) · T01–T04 Done · basemap follows `data-theme` · positron light · dark-matter dark · remount on theme · Path A shots Present · MapLibreMap.nf19 **5/5** · gate **BLOCK** · activation was active · Await **P4/P5**. Superseded by P5 above.

**P1.3 NF-19 activated (`2026-10-21T19:27:26Z`):** [`pkg-000197`](../../spa-active-packages/pkg-000197-20261021-epic-spa-20-nf-19-map-basemap-follows-theme.yaml) · T01–T04 Todo · Path A code lock · ARCH-DELTA §7 · tip Carto positron light · dark-matter dark · Partial visual=**BLOCK** · NO BRIEF · Skill `react-expert` · gate was PENDING · activation was active · Await **P2**. Wave `OP-spa nf18-20-ns07-ct32-20261021`. Prior pkg-000196 tip superseded. Superseded by P3 above.

**P3 NF-13 Execute Done (`2026-10-21T11:33:57Z`):** [`pkg-000189`](../../spa-active-packages/pkg-000189-20261021-epic-spa-20-nf-13-issue-type-identity-icon.yaml) · T01–T04 Done · exact map · glyph 24 · Path A shots Present · vitest **451/451** · gate **BLOCK** · activation **active** · Await **P4/P5**. No invent aliases/HTTP/OP PASS. Do not own shell. Do not git push unless operator asks.

**Visual parity gate CLOSED (historical):** NF-11 Done · gate PASS `2026-10-11T15:47:08Z` · evidence [parity-report](../../../analysis/evidence/next-feed-live-artboard-parity-2026-10-11-nf11/parity-report-STORY-SPA-NF-11-2026-10-11.md). Superseded tip by NF-13 above.

**P6 NF-12 gap CLOSED (historical):** `spa_nf_12_audit_2026_10_11` · T05 Done · OPEN empty · [run-summary](../../run-reports/run-summary-20261011-1516-spa-nf-12-p6.md) `2026-10-11T15:16:17Z`.

**P3 NF-12 Done:** [`pkg-000114`](../../spa-active-packages/pkg-000114-20261011-epic-spa-20-nf-12-text-search-fe-enable.yaml) · T01–T04 Done · gate PASS `2026-10-11T15:10:00Z` · full-cycle `01`…`04` · AD-VP-03/06 · REQ-56 `search` only. Next OP: P2/P3 on **NF-11** (unblocked). Do not invent endpoint. Do not own shell. Do not git push unless operator asks.

**P1.3 NF-12 activated:** [`pkg-000114`](../../spa-active-packages/pkg-000114-20261011-epic-spa-20-nf-12-text-search-fe-enable.yaml) · T01–T04 Todo · UX ready M149 search · ui_anchor T02 · local-five + gateway `search` · AD-VP-03/06. OP reorder: tip before NF-11 gate. No invent search endpoint. pkg-000113 NF-11 **parked**. Next OP: P2/P3. Do not own shell. Do not git push unless operator asks.

**P1.3 NF-11 parked (OP reorder `2026-10-11T15:05:17Z`):** pkg-000113 · resume after NF-12 Done.

**P1.3 NF-11 activated:** [`pkg-000113`](../../spa-active-packages/pkg-000113-20261011-epic-spa-20-nf-11-live-artboard-parity-verify.yaml) · T01–T03 Todo · UX ready M149–M160 · ui_anchor T01+T03 · local-five mandatory · AD-VP-04. Verify-only. Search may NR until NF-12. Next OP: P2/P3. Do not invent product/M155. Do not own shell. Do not git push unless operator asks.

**P6 NF-10 gap CLOSED:** `spa_nf_10_audit_2026_10_11` · T04–T05 Done · OPEN empty · [run-summary](../../run-reports/run-summary-20261011-1458-spa-nf-10-p6.md) `2026-10-11T14:58:29Z`. Next OP: P7/P8 optional · tip NF-11. Do not invent batch/M155. Do not own shell. Do not git push.

**P3 NF-10 Done:** [`pkg-000112`](../../spa-active-packages/pkg-000112-20261011-epic-spa-20-nf-10-feed-light-theme-list-composure.yaml) · T01–T03 Done · gate PASS `2026-10-11T14:44:52Z` · full-cycle `01`…`06` · AD-VP-01/04 · Path A M149/M160. Next OP: P2/P3 on **NF-11**. Do not invent batch social API/M155. Do not own shell chrome. Do not git push unless operator asks.

**P1.3 NF-10 activated:** [`pkg-000112`](../../spa-active-packages/pkg-000112-20261011-epic-spa-20-nf-10-feed-light-theme-list-composure.yaml) · T01–T03 Todo · UX ready M149/M160 · ui_anchor T01+T03 · local-five · AD-VP-01/04. Next OP: P2/P3. Do not invent batch social API/M155. Do not own shell chrome. Do not git push unless operator asks.

**P3 NF-09 Done:** [`pkg-000111`](../../spa-active-packages/pkg-000111-20261011-epic-spa-20-nf-09-reactions-strip-picker-chrome.yaml) · T01–T04 Done · gate PASS · story-root screenshots/full-cycle · DEMO-NF09 · Path A M154 · AD-VP-01/02/04 · [run-summary](../../run-reports/run-summary-20261011-1404-spa-nf-09-p3.md) (`2026-10-11T14:04:38Z`). Await OP P4/P5/P8 · tip **NF-10**. Do not invent M155. Do not own shell chrome. Do not git push unless operator asks.

**P1.3 NF-09 activated:** [`pkg-000111`](../../spa-active-packages/pkg-000111-20261011-epic-spa-20-nf-09-reactions-strip-picker-chrome.yaml) · T01–T04 Todo · UX ready M154 · ui_anchor T01+T02 · local-five · AD-VP-01/02. Next OP: P2/P3. Do not invent reaction ids/M155. Do not own shell chrome. Do not git push unless operator asks.

**P3 NF-08 Done:** [`pkg-000110`](../../spa-active-packages/pkg-000110-20261011-epic-spa-20-nf-08-discussion-collapsed-composer-reskin.yaml) · T01–T05 Done · gate PASS · story-root screenshots/full-cycle · DEMO-NF08 · Path A M152/M153 · AD-VP-01/02/04 · [run-summary](../../run-reports/run-summary-20261011-1341-spa-nf-08-p3.md) (`2026-10-11T13:41:25Z`). Await OP P4/P5/P8 · tip **NF-09**. Do not invent M155. Do not own shell chrome. Do not git push unless operator asks.

**P1.3 NF-08 activated:** [`pkg-000110`](../../spa-active-packages/pkg-000110-20261011-epic-spa-20-nf-08-discussion-collapsed-composer-reskin.yaml) · T01–T05 Todo · UX ready M152/M153 · ui_anchor T01+T03 · local-five · AD-VP-01/02. Next OP: P2/P3. Do not invent threads URLs. Do not own shell chrome. Do not git push unless operator asks.

**P3 NF-07 Done:** [`pkg-000109`](../../spa-active-packages/pkg-000109-20261011-epic-spa-20-nf-07-civic-post-visual-parity.yaml) · T01–T05 Done · gate acceptance-verification-spa-nf-07.md PASS · story-root screenshots/full-cycle · DEMO-NF07 · Path A M150 · AD-VP-01/04 · [run-summary](../../run-reports/run-summary-20261011-1318-spa-nf-07-p3.md) (`2026-10-11T13:18:27Z`). Await OP P4/P5/P8 · tip **NF-08**. Do not invent M155/orb. Do not own shell chrome. Do not git push unless operator asks.

**P1.3 NF-07 activated:** [`pkg-000109`](../../spa-active-packages/pkg-000109-20261011-epic-spa-20-nf-07-civic-post-visual-parity.yaml) · T01–T05 Todo · UX ready M150 · ui_anchor T01 · local-five. **superseded** by P3 Done above.

**Visual parity tip (2026-10-11):** NF-07 Done · tip order `10→12→11` · [ARCH-DELTA](../../backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) · Runtime `local-five-serve-and-health.sh` · Next OP: P2/P3 on **NF-11**. Do not invent gateway/threads. Do not own shell chrome. Do not reopen NF-01…07 bodies. Do not git push unless operator asks.

**P6 NF-06 gap CLOSED (historical):** `spa_nf_06_audit_2026_10_10` · F1/F2 CLOSED T07–T08 · F3–F4 WAIVED · OPEN empty · [run-summary](../../run-reports/run-summary-20261010-1945-spa-nf-06-p6.md) (`2026-10-10T19:45:00Z`).

**P3 NF-06 Done:** [`pkg-000108`](../../spa-active-packages/pkg-000108-20261010-epic-spa-20-nf-06-mounts-responsive-verify.yaml) · T01–T06 Done · gate acceptance-verification-spa-nf-06.md PASS · story-root screenshots/full-cycle · DEMO-NF06 · Path A M158–M160. Await OP P4/P5/P8. Do not invent mounts APIs. Do not own shell chrome. Do not git push unless operator asks.

**P1.3 NF-06 activated:** [`pkg-000108`](../../spa-active-packages/pkg-000108-20261010-epic-spa-20-nf-06-mounts-responsive-verify.yaml) · T01–T06 Todo · UX ready M158/M159/M160 · ui_anchor T01. Next OP: P2/P3. Do not invent mounts APIs. Do not own shell chrome. Do not git push unless operator asks.

**P8 NF-05 product (spa-app):** `febd04e` feat · `fbdcc47` test · `aa286ba` docs · no `docs/tasks/**` · no push.

**P3 NF-05 Done:** [`pkg-000107`](../../spa-active-packages/pkg-000107-20261010-epic-spa-20-nf-05-reactions-invite-write-gate.yaml) · T01–T04 Done · gate PASS · [run-summary](../../run-reports/run-summary-20261010-1927-spa-nf-05-p3.md) (`2026-10-10T19:27:30Z`). Next OP: P4/P5/P8. Do not invent M155 people. Do not own shell chrome. Do not git push unless operator asks.

**P1.3 NF-05 activated:** [`pkg-000107`](../../spa-active-packages/pkg-000107-20261010-epic-spa-20-nf-05-reactions-invite-write-gate.yaml) · T01–T04 Todo · UX ready M154/M156/M157 · M155 OOS · ui_anchor T01. Next OP: P2/P3. Do not invent reaction/invite HTTP. Do not own shell chrome. Do not git push unless operator asks.

**P8 NF-04 product (spa-app):** `aea8f6e` feat · `556e062` test · `6e1a392` docs · no `docs/tasks/**` · no push.

**P6 NF-04 gap CLOSED:** `spa_nf_04_audit_2026_10_10` · T05 Done · F1 CLOSED · F2–F5 WAIVED · OPEN empty · [run-summary](../../run-reports/run-summary-20261010-1920-spa-nf-04-p6.md) (`2026-10-10T19:20:16Z`). Next OP: **P7 VAL** then P8. Do not invent threads URLs. Do not own shell chrome. Do not git push unless operator asks.

**P3 NF-04 Done:** [`pkg-000106`](../../spa-active-packages/pkg-000106-20261010-epic-spa-20-nf-04-thread-tree-composer.yaml) · T01–T04 Done · gate PASS · [run-summary](../../run-reports/run-summary-20261010-1913-spa-nf-04-p3.md) (`2026-10-10T19:13:32Z`) · historical tip.

**P6 NF-03 gap CLOSED:** `spa_nf_03_audit_2026_10_10` · T04/T05 Done · F1/F2 CLOSED · [run-summary](../../run-reports/run-summary-20261010-1903-spa-nf-03-p6.md) · historical tip · product shas in spa-app `7be7093`/`bedeaba`/`4e64532`.

**P3 NF-02 Done:** [`pkg-000104`](../../spa-active-packages/pkg-000104-20261010-epic-spa-20-nf-02-civic-issue-post.yaml) · T01–T03 Done · gate PASS · `FeedCivicPost` · [run-summary](../../run-reports/run-summary-20261010-1841-spa-nf-02-p3.md) · historical tip.
