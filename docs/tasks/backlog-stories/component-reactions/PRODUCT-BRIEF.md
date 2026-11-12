# Component Reactions — Product Brief (REQ-24 lock)

> **Дата:** 2026-10-13  
> **Статус:** locked for ADMIN-CR-03…06 (Variant B — UX assets provided at package start)  
> **Пакет:** [INDEX.md](INDEX.md)  
> **Parent REQ:** [24-reactions-mount-lab.md](../../../requirements/24-reactions-mount-lab.md)  
> **Parent epic:** [22-feed-visual-redesign-phase-1.md](../../../requirements/22-feed-visual-redesign-phase-1.md) · FR-22.6 / AC-SPA-REQ22-06 · **FR-22.15 one data plane**  
> **Siblings:** [17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md) · [19](../../../requirements/19-req10-threads-reaction-reload-honesty.md) · [next-feed](../next-feed/INDEX.md) NF-api §2 · [next-feed-lab](../next-feed-lab/INDEX.md)

## UX assets at package start (Variant B)

| Artboard | Spec | Role |
|----------|------|------|
| [`artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) | [`…md`](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) | Primary strip+picker |
| [`artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png`](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.png) | [`…md`](../../../UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md) | People surfaces — **lab fixtures in CR-17…19** · Live people API still DUI-gated |
| [`artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png`](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.png) | [`…md`](../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) | Theme/l10n/interaction stress |

Authority: REQ-22 → REQ-24 → **M154/M160** strip+picker · **M155** people (lab). Normative tip: [Gap+people+media residual](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) · prior [polish+M155](OP-UX-MIRROR-strip-polish-m155-people-2026-10-17.md) · [visual M154](OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md).  
Prior A+C+B 3-zone — **superseded** (CR-11…15). Theme (CR-08) · portal (CR-10) remain.

## Locked intent

1. Greenfield pluggable **ReactionsMount** = `ReactionSummaryStrip` + `ReactionPicker` + `ReactionOption` + props/adapter.
2. Shell lab **`#/lab/reactions`** (pattern `#/lab/feed`); fixtures; two hosts (post-root + comment).
3. Host-agnostic mount; comment = same package + variants (`target`, `density`, moderation eligibility).
4. Composition: media → **`PostActionStrip` 4 zones** (React \| Comment \| Share \| Reactions) → aggregate row under strip when populated → `IssueThreadBlock` → comment mounts — **no** free-floating fifth strip between media and actions; **no** dual React under strip.
5. Catalog `reactions.v1`; max 3; Agree/Disagree XOR; **React always** opens picker; **Reactions zone / aggregate open people** (M155 · lab FixtureAdapter) — **not** picker; empty = no fake zeros.
6. Picker: **horizontal tile grid** + Cancel/Add (Done mobile); portal+fixed (CR-10); theme stress (CR-08); mark color via CSS tokens (no multicolor SVG generate).
7. Visual wave CR-11…15 · polish CR-16 · people CR-17…19 (structure) · **residual CR-20…22** (Gap v2 **generate in-package** · people affordance · media flush OP eye).
8. People: lab fixtures only · Live fail-closed · Connect stub only · never fabricate people from aggregate counts.

## Data plane reuse (locked 2026-10-13)

| Layer | Reuse | Do not |
|-------|-------|--------|
| HTTP Closed social | [`ThreadsSocialClient.js`](../../../../src/repositories/ThreadsSocialClient.js) (`react`, `getKnobs`, tree) | Second HTTP client / invent paths |
| Knobs | [`threadsKnobsCache.js`](../../../../src/repositories/threadsKnobsCache.js) | Parallel knobs fetch |
| Catalog helpers | [`reactionsV1Catalog.js`](../../../../src/components/threads/reactionsV1Catalog.js) · feed [`semantics/reactionsV1.js`](../../../../src/features/feed/semantics/reactionsV1.js) | Fork catalog |
| Live `onReact` shape | [`LiveIssueThreadMount.jsx`](../../../../src/components/threads/LiveIssueThreadMount.jsx) · next-feed [`ReactionChrome.jsx`](../../../../src/features/feed/reactions/ReactionChrome.jsx) callback seam | Own mutate URL in UI |
| API docs SSOT | [STORY-SPA-NF-api-requirements.md](../next-feed/STORY-SPA-NF-api-requirements.md) §2 | Duplicate endpoint matrix as new truth |

**This package owns:** presentation (greenfield) + lab hosts + **thin** FixtureAdapter / optional LiveAdapter.  
**Lab default (REQ-24 L6):** FixtureAdapter with the same props/`onReact` contract; live wire later fail-closed.  
**Not presentation reuse mandate:** classic `ReactionControls` + CSS; copying next-feed `ReactionChrome` wholesale (greenfield UI per M154).

## Out of scope

- M155 **Live/production** people API + real Connect workflow (lab fixtures = CR-17…19 in scope)  
- Invent HTTP / fabricate people from counts / PNG as golden  
- Amend REQ-22 Phase 1 FR matrix / home/shelter  
- Classic `#/board` retire · Early Signal continuum  
- Production M157 verify-gate product surface (lab may stub writeCapability)  
- ADMIN-01 / ADMIN-02 (UX already provided)  
- New `*SocialClient` / duplicate Closed paths  

**In scope (docs Ready · Await Apply):** [CR-23](STORY-SPA-CR-23-next-feed-reactions-mount-live-cutover.md) `#/next/feed` ReactionsMount Live cutover — [interview CT-28+](../component-thread/INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md).

## Verified baseline (code claims)

| Fact | Evidence |
|------|----------|
| `#/lab/feed` under shell Routes | [`App.jsx:40`](../../../../src/App.jsx) |
| `#/lab/reactions` Absent | no route in `App.jsx` (acceptance target) |
| Closed react PUT | [`ThreadsSocialClient.js:454`](../../../../src/repositories/ThreadsSocialClient.js) |
| Prior reaction chrome exists (classic/lab) | out of UI reuse mandate — greenfield presentation |

## Target story keys (ADMIN-05)

| Key | Surface |
|-----|---------|
| CR-01 | Mount strip + props API (`onReact` seam) |
| CR-02 | Picker presentations + selection rules |
| CR-03 | Lab page + hosts + FixtureAdapter |
| CR-04 | L10n / theme stress (M160 slice) |
| CR-icon / CR-api | Catalog + API docs from ADMIN-03/04 |
