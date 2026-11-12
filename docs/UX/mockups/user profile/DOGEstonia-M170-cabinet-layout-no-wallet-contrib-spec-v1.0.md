# DOGEstonia — M170 Cabinet Layout Without Wallet and Contribution Specification v1.0

**Date:** 2026-10-23  
**Artboard ID:** `M170-cabinet-layout-no-wallet-contrib-v1`  
**PNG:** `DOGEstonia-M170-cabinet-layout-no-wallet-contrib-spec-v1.0.png` (promoted from raw `exec-eae416dc-c972-4dd1-8a1f-d9b7f933b57c.png`)  
**Surface:** User Cabinet `/profile` inside next shell, light theme.  
**Status:** operator layout requirements and empty-state visual proposal. No data integration, real identity assertion or OP PASS is claimed.

## 1. Purpose and scope

Place account summary at the top, keep Verified Civic compact and in normal flow, and give Story Activity the full content width when Wallet and Contribution Layer are hidden for this wave. Remove the previous overlap/floating-plate relationship.

The operator explicitly authorizes this `/profile` layout task. That does not expand it into a general cabinet redesign, wallet implementation, contribution metrics, identity redesign or new story backend behavior.

## 2. Reference boundaries

| Reference | Intended authority | Availability in this task |
|---|---|---|
| M45 | Existing Story Activity table and state behavior | Unavailable; exact reconciliation TBD |
| M28 | Civic badge meaning and state contract | Unavailable; exact reconciliation TBD |
| M99 | Cabinet assembly hierarchy | Unavailable; exact reconciliation TBD |
| M169 | Light shell brand and no-tagline footer continuity | Used as visual context; clean production assets remain pending |
| Current operator request | Gating, full-width activity, compact badge and feed CTA | Authoritative for this residual |

No exact M45 columns/metrics, M28 verification semantics or M99 tokens are invented. The sheet cites lineage; it does not claim those packs were fully reviewed. Resolve them in the IDE before asserting exact compliance.

## 3. Page composition

1. Existing next-shell public/header chrome.
2. Page title, fixture `My account`.
3. Account summary in its own normal-flow region.
4. Compact civic badge inside/adjacent to that summary content, never a separate floating plate.
5. Story Activity card immediately below, spanning full available content width.
6. Existing shell footer without brand tagline, per M169.

Account summary and Story Activity align to common left/right content edges on desktop. No unused wallet column, blank grid cell or hidden module still reserving width. No absolute/floating badge may overlap either region.

The artboard's line reading “Full content width when gated modules are hidden” is documentation, not a product separator label. The label's placement in the crop does not authorize rendering implementation explanations in the cabinet.

## 4. Wallet and Contribution Layer gate

Hide both modules from this wave's rendered layout while retaining their code. Do not delete packages, schema or implementation, and do not replace them with disabled cards, empty placeholders, totals or a “coming soon” upsell.

Gating must also release layout space: Story Activity spans the content area rather than remaining in the former column width. This does not specify a new feature-flag name, remote configuration service or future rollout policy. Existing gating mechanisms govern implementation; details are TBD if none exists.

## 5. Account summary and compact civic badge

Reuse actual account-summary fields and Identity-backed data. `Account summary` / `Your account` in the illustration are generic labels; they are not a new schema, display name or personal record. No fake username, email, avatar, DID, wallet address or balance is supplied.

The illustrative badge consists of a small shield and short `Verified Civic` status. It sits within the summary layout, with restrained visual weight and no large independent card/plate. On narrow widths it may wrap within the summary, increasing normal-flow height without overlay.

**Render Verified Civic only when the existing authoritative status confirms it.** The mockup is not evidence that the current actor is verified. Missing, unknown, pending or failed status reads must follow existing M28/Identity rules; no new fallback label or verification transition is invented here.

Shield geometry, exact badge color/size, status vocabulary and accessible semantics must be reconciled with M28. The generated shield is illustrative, not a newly commissioned asset or a new verification method.

## 6. Story Activity width and states

Story Activity occupies full available content width below account summary when both gated modules are absent. Its content height is natural, not fixed by the image. Keep existing card hierarchy and M45 data/state behavior.

The current sheet deliberately chooses the permitted **empty-state alternative**, not an active table. It therefore introduces no metric value, zero total, table column, story ID, date, row action or sample story.

| State | Required handling |
|---|---|
| Confirmed empty | Show existing approved empty state; M170 short copy below is a proposal |
| Confirmed populated | Reuse M45 metrics/table/story rows at full width using actual supported data |
| Loading | Existing scoped loading state; not confirmed empty |
| Failed / unavailable read | Existing honest scoped failure state; do not replace with an empty claim |
| Not wired | Do not claim a successful read or completed integration from the design fixture |

M45 must settle exact state strings, columns, ordering, pagination and metrics. M170 changes layout rather than their semantics. Never invent these details from the empty crop.

### Empty-state copy proposal

- Card heading: `Story Activity`.
- Main line: `No story activity yet.`
- Helper: `Your stories will appear here.`
- Primary CTA: `Go to Feed`.

The document outline icon is illustrative. Reuse an existing asset when supplied; no new filename or icon pack is authorized. Copy is pending reconciliation with M45 and localization, not a new backend guarantee.

## 7. Data boundary

`GET /story-activity` is the operator-named source **when wired**. This document does not add endpoints, query fields, response schemas, auth behavior, cache rules or availability claims.

A generated empty fixture is not the result of a real request and must not be recorded as Done, successful integration or OP PASS. The badge and story data may have independent sources/availability; a story-activity response does not prove civic verification.

Use actual supported fields when implementing the populated table. Missing metadata, metrics or story IDs must not be synthesized to satisfy a mockup. Resolve API/schema gaps through the existing contract process.

## 8. CTA and navigation

`Go to Feed` navigates internally to **`/next/feed`** under existing router conventions. Do not keep a legacy board destination or add a resident-facing route/code hint.

The artboard's source/route arrows and gating notes are developer annotations only. Existing About / Privacy / Contact footer routes and brand-home rules continue; no new page or flow is introduced.

## 9. Narrow ~390 CSS px

Use a single stacked content column: title → account summary (with compact badge in flow) → full-width Story Activity. Maintain consistent content edges, wrapping labels and usable CTA without horizontal overflow.

The badge can wrap but cannot become an oversized independent plate. Story Activity remains full available width; no hidden grid column remains reserved. Responsive heights grow naturally and do not clip content.

The 390 px example does not define a breakpoint or new fixed padding. Existing shell rules apply. Real long profile fields, localization and large text must be checked in implementation rather than substituted with tiny text or overlap.

## 10. Visual and accessibility continuity

Light civic reference: page `#F7F6F2`, surface `#FFFDF8`, text `#101828`, secondary `#667085`, border `#E7E4DC`, primary action `#F5C542`, existing link/focus accent `#B54708` where applicable. No additional numeric badge or card tokens are established by the PNG.

Use existing typography, brand assets, card styles and accessible target rules. The artboard's simplified header controls or gold shield are contextual, not approval to alter unrelated controls/status tokens. M169 no-tagline footer remains the current brand direction; generated logo images are not approved production masters.

Keep semantic headings, meaningful civic status text, visible focus and keyboard activation. Existing minimum 44 CSS px interactive targets apply. A status badge is not assigned a new button action by this sheet. Do not rely on shield color alone to express verification.

## 11. Panel and annotation mapping

| Area | Meaning |
|---|---|
| Desktop cabinet | Account summary above full-width empty Story Activity |
| Narrow cabinet | Same hierarchy with compact in-flow badge |
| Structure notes | M99 lineage, hidden modules and full-width requirement |
| States notes | M45 lineage, empty fixture and data-source honesty |
| Badge notes | M28 lineage, confirmed-status condition and missing-reference caveat |

All source names, API notes, “gated/later”, “not Done”, reference caveats and width explanations are documentation outside resident-facing UI. They must not be copied into the product page.

## 12. Remaining decisions and verification gates

| Item | Handling |
|---|---|
| M45 exact states/table/metrics | Obtain and reconcile reference before implementation claims |
| M28 exact badge/status | Obtain and reuse; confirmed status required |
| M99 assembly details | Obtain and reconcile; operator hierarchy governs current residual |
| Final empty copy / localization | Proposed; existing pack/OP review needed |
| Gating mechanism and identifiers | Existing code; no new flag invented |
| Exact spacing, dimensions and shield asset | Existing confirmed system or TBD |
| Story-activity schema/wiring | Existing contract; no fake successful response |
| Production brand PNG | M169 asset QA remains open |
| Runtime layout/keyboard/OP verification | Not performed or claimed by this sheet |

## 13. Review checklist

- [ ] Wallet and Contribution Layer are absent from UI but their code remains gated.
- [ ] No blank column or placeholder reserves their layout space.
- [ ] Account summary precedes Story Activity; no overlap or floating plate.
- [ ] Civic badge is compact and shown as Verified only on confirmed authoritative status.
- [ ] Story Activity spans full content width on desktop and narrow layout.
- [ ] Empty fixture is not mistaken for loading, error or an API result.
- [ ] Populated metrics/rows reuse M45 and actual data; no IDs or totals fabricated.
- [ ] Go to Feed uses `/next/feed`.
- [ ] M45/M28/M99 gaps remain explicit until resolved.
- [ ] Existing accessibility, responsive shell and no-tagline footer rules are preserved.
- [ ] Documentation annotations are absent from resident UI.
- [ ] No product code, new HTTP contract, Done integration or OP PASS is inferred.
