# DOGEstonia — M150 Issue Post/Content Variants + SSR-C Schema Overlay State-Sheet Specification v1.0

**Package:** M150, second in the approved M149–M160 sequence  
**Status:** **accepted** for handoff (revision 3); written implementation contract remains authoritative · residual visual polish → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Target:** current light-first `BoardIssuePost`/`IssueCardChrome`, desktop feed and Issue detail plus narrow expectation  
**Artboard revision:** 3 — `generated_images/exec-53f34fad-1733-40da-aeea-417d6a3f3455.png`

**Visual audit, 2026-10-07:** A contracts naturally with no empty media/schema slot; D/E/G retain the same civic Issue identity and correctly place optional details; F shows only the three named example fields and abstract extra rows; future-contract annotations are visible. B presents a substantially taller single image but its generated crop is still wider than the preferred 16:9 implementation ratio. C retains excess blank space before `Open issue` in the generated composition. The written geometry and natural flow in §§4, 7–8 and 13 govern implementation; neither visual imperfection authorizes a fixed blank region or a panoramic-only media rule. Revision 1 and revision 2 are superseded visual attempts, not equal references. Await product acceptance or a targeted correction request.

## 1. Purpose

Lock the existing civic Issue-as-post component across no-media, single-media and long-content variants, then show where an optional `SchemaCardOverlay` belongs in that same Issue card. Make the absent-overlay behavior unambiguous and distinguish approved UX visuals from fields unavailable in today's API.

## 2. Scope and non-goals

Included: civic identity, title, summary, labels, optional media, `Open issue`, compact post action row, optional `Additional details` section, feed/detail density, many-row disclosure, narrow stacking. Each of the eight required M150 states appears in §5.

Excluded: new post identity, independent social card, redesign of header/rails, thread tree/composer (M152–M153), map (M151), picker/distribution (M154–M155), and authoring/admin schema form. No invented schema response shape, public media resolver or production data claim.

## 3. Authority and continuity

Current package instruction and *Current Design State-Artboard Coverage & Generation Backlog v1.0* outrank the *Unified State Inventory v1.0*, *Component & Variants Specification v1.0*, *Interaction & Behavior Specification v1.0*, *Data-to-UI Contract v1.0*, *Dashboard Layout Specification v1.0*, *Mobile Responsive Design Pack v1.0*, *Design Tokens Package v1.0*, *Accessibility & Localization Pack v1.0* and *Asset Manifest v1.0* in that order. Written specifications override generated pixels.

The accepted M149 revision 1 is the current light shell. `exec-26720537-2028-4b60-af0b-67df6f385bc3.png` establishes current Issue post styling and the compact `React`, `Comment`, `Share`, `Reactions` row. `exec-fe77a140-fddd-4f1c-a24a-adb6b648064f.png` establishes the light Issue modal/detail context. Historical M143–M148 dark sheets preserve state logic only. Brand assets are read-only; do not regenerate the logo.

## 4. Shared anatomy and invariants

```text
BoardIssuePost
├─ IssueCardChrome
│  ├─ IssueIdentityHeader (civic icon, id, status, type, location/date, overflow)
│  ├─ Title, summary, labels
│  ├─ SchemaCardOverlay? (Additional details)
│  ├─ Open issue
│  ├─ PostMedia?
│  └─ PostActionStrip (React · Comment · Share · Reactions)
└─ IssueThreadBlock (shown only as a mounting boundary on M150)
```

Issue is the post identity. The schema block enriches the civic content beneath labels and before `Open issue`/media; it does not produce a second title, user author, detached card or floating overlay on top of the image. No rows means no section heading, border, empty box or disclosure. Thread data remains independent, and thread failure never removes civic content.

Feed card spans the central column, with warm white surface, 1 px neutral border, 12 px desktop radius, 20 px content padding, 48 px identity icon and 14 px gap. Identity order: Issue id + status/type, location/date, title, summary, labels/optional details, `Open issue`, media if available, then 56 px four-zone action row. The lower `IssueThreadBlock` seam can be a restrained boundary only; M150 does not design discussion states.

## 5. State matrix

| State | Condition | Exact visual requirement | Contract status | Panel |
|---|---|---|---|---|
| `ISSUE-CARD-NO-MEDIA` | No public media | Civic text closes naturally; no blank media frame | Supported | A |
| `ISSUE-CARD-MEDIA` | One valid public media object | One 16:9 image beneath content; no carousel controls | **Demo/future media resolution** | B |
| `ISSUE-CARD-LONG-CONTENT` | Long title, summary, labels | Honest wrapping; explicit path to full content if feed summary clamped | Civic fields supported | C |
| `SSR-C-civic` | `schema_card` absent or empty | Regular civic Issue, zero overlay chrome | **Only currently implementable SSR-C state** | A |
| `SSR-C-overlay-compact` | Nonempty approved card leaves in feed | Named compact section, no more than three default rows | **Future schema contract** | D |
| `SSR-C-overlay-detail` | Same Issue in modal or `/issue/:id` | Same block with all approved fields and roomier spacing | **Future schema contract** | E |
| `SSR-C-many` | More allowed leaves than compact default | Three visible feed rows and `Show more`; expanded state | **Future allowlist extension** | F |
| `SSR-C-narrow` | 390 px view | Stacked labels/values, no tiny fixed columns | **Future schema contract** | G |

`ISSUE-CARD-BASE` is the shared anatomy across A–G. A and `SSR-C-civic` are intentionally one panel because absent schema must leave the same card, without a ghost section. B and C are civic variants independent of schema. If future media and schema coexist, both follow the same order; no separate combination panel is needed here.

## 6. Panel A — no media; `SSR-C-civic`

Show a full feed Issue card at large legible size using the approved light visual language. Civic icon, Issue identifier, textual status and type, localized location/date when present, two-line title, summary, a few labels, `Open issue`, then the compact four-action strip. No picture and no whitespace reserved for one. There is **no** `Additional details` heading, border, placeholder, divider or empty disclosure. A short outside annotation points to where the optional section would be inserted if valid data existed.

Use a demo public Issue fixture; do not imply that the reference's visual status values `OPEN` or `IN REVIEW` are current Gateway wire statuses. The reviewed API exposes `DRAFT`/`PUBLISHED`; public Draft exposure remains an open decision. Demo title and labels communicate wrap only.

## 7. Panel B — single media

Reuse the same Issue anatomy and civic identity. One landscape illustrative image appears after `Open issue`, preferably 16:9, with 10 px radius and reserved image geometry; actions remain beneath it. No dots, previous/next arrows, gallery counter or duplicate media header for one image. If media fails later, civic text remains readable. Annotation outside the UI states **Demo image — public media URL, dimensions and alt contract pending**. Generated demo art is not a shippable Issue media asset.

## 8. Panel C — long title, summary and labels

Use an intentionally long but generic civic issue title over multiple lines and a summary long enough to test feed density. Title wraps fully with no ellipsis. Labels wrap as a group without shrinking type. If summary is visually clamped in feed, show explicit `Open issue`/expand access to its full text; detail content is never clamped. Location/status/type metadata wraps rather than overflows. Preserve post action row and card boundaries without overlapping media or controls.

## 9. Panel D — `SSR-C-overlay-compact` in feed

Use the same Issue card, but insert a subtle named `Additional details` section under labels and above `Open issue`. Show exactly three example rows, with human labels and illustrative values, corresponding only to approved example paths:

| Allowed path (outside-UI diagnostic annotation) | Human label inside UI | Example value, demo only |
|---|---|---|
| `signals.desired_outcome` | Desired outcome | Safer shared courtyard |
| `signals.affected_group` | Affected group | Residents and children |
| `signals.service_object` | Service or place | Courtyard play area |

No dotted paths are shown as citizen-facing labels. Values are demo copy, not production claims or a prescribed API payload. The section is visually subordinate to title/summary and remains inside the one civic Issue card. Add an external tag **Future contract: `schema_card` absent from current IssueProjection**.

## 10. Panel E — `SSR-C-overlay-detail`

Show the *same* Issue open in the approved light desktop Issue modal or `/issue/:id` detail context, with the fuller `Additional details` section and all three approved example rows. Spacing may increase and summary/description may run naturally; labels and values stay part of the civic detail body. The detail component must not create a new social identity or a second schema card floating over the media. The existing modal close/header and discussion mounting point may be visible for context, but do not design thread states here. Mark the section as the same future data contract as D.

## 11. Panel F — `SSR-C-many` disclosure

Show compact feed state with at most three visible rows and a real `Show more` action, plus a linked expanded crop in which further approved rows stack vertically. Because the current allowlisted examples name only three paths and the API has no `schema_card`, **do not name or fabricate a fourth dotted path**. In the expanded crop, use neutral abstract row geometry with an outside annotation `Additional rows only after allowlist/contract extension`; the artwork demonstrates spacing, wrapping and disclosure behavior rather than new fields. No horizontal scroll, raw JSON or silent ellipsis. If the future contract never adds further allowed leaves, this state remains a design fixture, not a runtime branch.

## 12. Panel G — `SSR-C-narrow` at 390 px

Show a 390 × 844 phone crop using the same civic Issue card with 16 px page gutters, 16 px card padding, 10 px radius, 40 px icon, 18/24 title and 14/20 summary. The named details section stacks each label above its value and may use `Show more` after three rows. Preserve `Open issue` and four action labels (`React`, `Comment`, `Share`, `Reactions`) in one 52 px row; touch targets at least 44 px. If a media crop is also shown as a small linked variant, use safe editorial cropping; do not squeeze detail rows into fixed columns. Mobile layout changes presentation, not data meaning.

## 13. Responsive, themes and visual treatment

M150's primary artboard is light-first and tightly focused on large, readable Issue cards, not on repeating the whole three-column board in every panel. Use the accepted M149 shell as a small contextual anchor only. Semantic page `#F7F6F2`, warm surface `#FFFDF8`, primary text `#101828`, secondary `#667085`, border `#E7E4DC`, primary accent `#F5C542` with navy text, accessible orange text link `#B54708`. The dark theme uses the same geometry and semantic mappings (`#141417` page, `#1B1C1F` surface, `#F2F2F2` primary text); this sheet need not duplicate every variant in dark, since M160 tests that parity.

At desktop card width follows the center feed. Media prefers 16:9 and 320–440 px visible height at canonical 1440 when space permits. At 360/390, card width is viewport minus 32 px and media may use 4:3 if safe. At 320, gutters 12 px and card padding 12 px; labels remain readable and controls do not become icon-only by default. At 200% text zoom, labels/values wrap into natural vertical flow.

## 14. Interaction, focus and return behavior

- Title/`Open issue` uses a genuine link or button to open the existing Issue modal or route. Feed summary clamp always has an explicit full-content path.
- `Show more` is a labelled disclosure control with expanded state; activation reveals only approved rows in place, preserves reading order and does not open a second Issue. Focus remains on the control or moves predictably according to the approved disclosure pattern; collapse does not strand focus.
- Opened Issue detail reuses civic content and the same optional overlay rows; closing the modal restores focus to the feed trigger and feed scroll position. Direct `/issue/:id` has the same data meaning.
- Overflow action and four post actions retain independent keyboard targets. No overlay block intercepts the action strip or covers media. Missing optional data removes only its region.

## 15. Data dependencies and unavailable fields

| Feature | Reviewed source | Honest rendering boundary |
|---|---|---|
| Title/summary/description | `issue.title[locale]`, `issue.summary[locale]`, `issue.description[locale]` | Existing i18n civic content; no client-invented translations. |
| Status/type/labels | `issue.status`, `issue.type`, `issue.labels[]` | Localize/humanize; do not expose wire identifiers as citizen copy. Reference statuses are demo treatment. |
| Date and location | `created_at` optional; public `geo` snapshot optional | Omit absent values; do not fabricate `updated_at` or raw `admin_*` labels. |
| Schema overlay | `issue.schema_card` **absent** in reviewed projection | Only `SSR-C-civic` is implementable today. D–G are explicit future-contract fixtures; never scrape `structured_payload`. |
| Schema label lookup | Proposed `schemaRuntime.cardField.<path>` | Needed after agreed field/leaf/label contract; only three approved example paths on this sheet. |
| Issue image | `image_txid`/`image_hash` only | No renderable URL, aspect/dimensions, alt, rights or safety status; B is demo-only pending `DUI-Q03`. |
| Discussion and reaction summaries | Independent Threads source | Do not fabricate counts, people or comments in M150. |

## 16. Accessibility and localization

Issue title is a semantic heading with a real open target. Status/type have text, labels are a group, date uses semantic time only when available, and location has a localized name. `Additional details` is a named section; its rows are readable key/value pairs, and `Show more` announces expanded state and additional content. Dotted identifiers belong in external developer annotations only. Full values are not hidden solely in tooltips.

Test ET/RU/EN with 30–40% string expansion: title, summary, field labels and values wrap. Text and controls survive 320 px and 200% zoom. Functional icons have accessible names; demo media alt must be an explicitly authored fixture, never guessed from hash/filename. Decorative imagery is hidden from assistive technology. Focus ring uses semantic focus token, not color alone.

## 17. Forbidden representations

- Empty `Additional details` chrome when schema is absent.
- Raw JSON, `structured_payload`, hashes, archive/bind IDs, street-level private geo, or invented dotted paths in citizen UI.
- A parallel social post or author avatar replacing Issue civic identity.
- Overlay drawn across image or as a second independent card; mobile two-column microtext.
- Fake carousel controls for a single image; media failure removing civic text.
- Detailed rows presented as production API data; fake social counts or comments; shippable claims for demo illustration.
- All-dark default skin, Meta assets, regenerated DOGEstonia logo or unrelated form-builder/admin UI.

## 18. Artboard layout instructions

One consolidated labelled sheet `M150 · ISSUE CONTENT + SSR-C · rev 1`, with 2–5 large primary panels and linked detail crops. Proposed hierarchy: top A/B/C as three legible feed-card variants; lower D compact overlay beside E detail overlay; F disclosure comparison and G 390 px narrow card as side/bottom detail panels. If density would make UI unreadable, use larger crops and clear leader lines rather than miniaturizing full dashboards. State IDs and data-status tags sit outside the functional card. Highlight optional region insertion and the absent-chrome contrast A↔D. A small reference thumbnail can show where the post sits in accepted M149 shell. Do not print backend JSON in the artboard.

Artboard quality is judged by component boundaries, content order, line wrapping, media placement and disclosure semantics. Minor generated typography defects are tolerable only when they cannot mislead implementation.

## 19. Implementation handoff notes

Normalize civic Issue content independently from optional schema and media. Render no schema component for absent/empty rows; validate approved paths and localized labels before rendering any row. Preserve one `IssueCardChrome` across feed, modal and route. The data/API team must define delivery of `schema_card` and public media before D–G or B can ship from live data. The card can ship in its civic no-media form today, subject to the public-status exposure decision.

## 20. Acceptance checklist

- [ ] A has no image and no schema chrome; card height contracts naturally.
- [ ] B shows one media item with no false gallery control and a demo-data annotation.
- [ ] C wraps long title/labels and provides a full-content path for a clamped summary.
- [ ] D places `Additional details` under civic fields inside the same Issue, with three human-labelled approved examples.
- [ ] E shows the same block in modal/detail with roomier spacing, not a separate identity.
- [ ] F shows at most three default feed rows plus disclosure, without inventing a fourth path.
- [ ] G stacks key/value pairs at 390 and retains the four action labels.
- [ ] All future-contract panels are unmistakably distinguished from currently implementable `SSR-C-civic`.
- [ ] Civic Issue remains readable if optional media or social data is absent or unavailable.
- [ ] Labels and annotations are legible; no forbidden representation in §17 appears.

## 21. Open decisions requiring product/API answer

| ID | Decision needed | M150 handling |
|---|---|---|
| `DUI-Q02` | Where and in what approved leaf/value shape will `schema_card` be delivered? | D–G remain future-contract visuals. |
| Schema label/allowlist extension | Which localized labels and additional paths can appear in `SSR-C-many`? | Show only the three named approved examples; any extra rows remain abstract. |
| `DUI-Q03` | How do image refs resolve to public URL, dimensions, alt and rights/safety data? | B remains demo illustration. |
| `DUI-Q01` | How is public exposure of Draft Issues prevented? | Civic fixture does not imply that API default is safe. |
| Source of visible updated date | Reviewed projection has optional `created_at` but no confirmed `updated_at` in the mapping. | Do not invent freshness; omit date or use a source-confirmed date. |
