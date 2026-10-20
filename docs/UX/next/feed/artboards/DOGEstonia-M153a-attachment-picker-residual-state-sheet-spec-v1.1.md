# DOGEstonia — M153 Attachment Picker Residual State-Sheet Specification v1.1 — M153a rev3.1

**Date:** 2026-10-20  
**Surface:** SPA `#/lab/feed`, next-feed / lab thread-mount — `IssueThreadBlock` + `ThreadComposer`  
**Continuity:** M152 / M153; extends M153 `THR-T-D` and `THR-T-E`. No new M-number is assigned.  
**Status:** consolidated written specification for M153a artboard rev3.1, incorporating the operator-accepted M153b §7 token register. Artboard generation and this specification do not close unresolved product/API gates or imply production readiness.  
**Artboard:** `exec-1571912c-49de-426a-bc37-126b156f3b05.png` — title `M153 CONTINUITY · ATTACH PICKER RESIDUAL · rev 3.1`.  
**Story relationship:** tip allocation **CT-17** (picker path) · **CT-19** (Ready/Denied paint vs M153b §7). Filename on disk: `DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1` (renamed from mislabeled `M153b … rev 3.1`).

## 1. Purpose and scope

Document the missing attachment entry path after the lab audit: a clean composer without attachment chips → deliberate Attach activation → OS/native file picker → a selected item represented as a local Ready or Denied `AttachmentRef` chip. The existing M153 Ready/Denied states gain an explicit origin and operator-approved file-family scope.

This is a focused UI state-sheet extension. It does not regenerate M152 A–E, the M153 comment tree, reply spine, or comment reaction summaries. Comment-node reaction summary redesign remains **HOLD**. No product code, HTTP upload/bind design, media resolver, gallery, or published attachment read contract is introduced.

The current operator instruction authorizes this lab attachment path even though older Phase 1 decisions kept the resident composer text-only. That authorization does not, by itself, make attachment publication or production API integration available. This specification applies to the lab/residual UX and its explicit integration gates.

## 2. Authority and source boundaries

| Source | Use |
|---|---|
| Current operator attach lock, 2026-10-20 | Allowed families, interaction sequence, local-only intent, scope and TBD discipline |
| `mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md` | Civic Issue continuity, Discussion ownership and unchanged four-action strip |
| `mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md`, especially §§8–9 and 12 | Composer/draft behavior, Ready/Denied intent, existing denial and unavailable copy, accessibility |
| Corresponding accepted M152/M153 PNGs | Visual tone and continuity; written semantics override generated pixels |
| Residual artboard rev3.1 (M153a) | Panel composition A–F; preserves rev3 except D/E denied-chip fill and title revision |
| `DOGEstonia-M153-depth-2-thread-token-callouts-spec-v1.0.md`, §7 (M153b) | Operator-accepted Ready/Denied chip tokens, authoritative over raster pixels |
| Component-thread `PRODUCT-BRIEF` | Referenced by the operator, but not supplied or resolved in this dialogue; reconciliation is TBD |
| Present `attach.svg` / `send.svg` | Existing glyph reuse only; source bytes and exact existing asset paths were not available here |

Do not infer additional constraints from an unavailable PRODUCT-BRIEF. Do not invent its content, exact MIME strings, extensions, file-size limits, count limits, platform policy or gateway behavior. Names of existing icon files are known; their location and bytes must be taken from the actual existing catalog.

## 3. Locked invariants

1. A clean initial composer has **zero attachment chips**. Ready/Denied examples are reached only after Attach and a file selection.
2. Attach invokes a system-owned file picker. The app does not replace it with a custom file manager drawn from this sheet.
3. Allowed families are **images, PDF and Microsoft Office documents: Word / Excel / PowerPoint**. Exact MIME types and extensions are TBD.
4. A chip represents **local pending attachment intent**, including when its local readiness label is `Ready to post`. It is not proof of upload, bind, publication, persistence or a public media URL.
5. A rejected item remains visually distinct from Ready. The rejection does not clear the text draft.
6. No local Remove action implies a server-side delete/unbind operation.
7. Civic Issue content remains readable. The Issue-level strip stays exactly **React | Comment | Share | Reactions**; it is not repeated on composer/comment rows.
8. No author name/avatar, timestamp, Identity method, fake production filename, media URL, HTTP API or new `ic-*` asset is introduced.
9. Unsupported details are marked TBD. New denial wording outside the existing M153 copy and the operator allow-list requires operator clarification before use.

## 4. Component ownership

| Component / owner | Responsibility |
|---|---|
| Civic Issue parent / `IssueThreadBlock` | Existing Issue context, fixed post actions and Discussion placement; unaffected by local attachment state |
| `ThreadComposer` | Multiline draft, Attach entry, local attachment intents, submit affordance and scoped feedback |
| System file picker | Platform-owned file-selection interface and its return/cancellation; exact target platform UI is TBD |
| `AttachmentRef` presentation | One selected local item, type label where known, Ready or Denied state, Remove action and applicable feedback |
| Existing capability/safety integration | Supplies an actual availability or item decision; its mechanism and contract are not invented by this sheet |

Panel labels A–F and C1–C3 are artboard references, not new canonical runtime state IDs or backend fields. Ready/Denied retain M153 `THR-T-D/E` continuity.

## 5. Operator file-family allow-list

| Family | On this sheet | Exact acceptance detail |
|---|---|---|
| Images | C1 `Selected image` Ready alternative | MIME/extensions, subtypes and limits TBD |
| PDF | C2 `PDF document` Ready alternative | Exact MIME/extension matching TBD |
| Microsoft Word family | C3 `Word document` Ready alternative | Exact legacy/current formats, MIME/extensions TBD |
| Microsoft Excel family | Included in the operator allow-list; no separate Ready crop required | Exact legacy/current formats, MIME/extensions TBD |
| Microsoft PowerPoint family | Included in the operator allow-list; no separate Ready crop required | Exact legacy/current formats, MIME/extensions TBD |
| Outside those families | D, rejected item | Classification/validation contract TBD; do not invent an example blocked extension |

The Word crop is one representative Office-family example. It does not narrow the allow-list to Word. The sheet does not decide macro-enabled formats, archives, executable formats, file signatures, filename-only validation, empty MIME handling, or size limits. Do not broaden a family into an unreviewed exact filter expression.

## 6. State matrix and transitions

| Panel | Entry condition | Visible state | Exit / continuity |
|---|---|---|---|
| A | Clean composer, no file selected | Draft field, Attach and Post comment; zero chips | Attach invokes B |
| B | User activated Attach | External annotation of the system picker boundary | Cancel returns unchanged; selection leads to an actual local decision |
| C1 | Image selected and local readiness established | One image intent chip, `Ready to post`, Remove; draft intact | Remove removes that local intent; other actions follow their existing contracts |
| C2 | PDF selected and local readiness established | One PDF intent chip, `Ready to post`, Remove; draft intact | Same as C1 |
| C3 | Word-family document selected and local readiness established | One Word intent chip, `Ready to post`, Remove; draft intact | Same as C1 |
| D | Selected type is outside the allow-list | Denied chip, generic M153 rejection, allowed-family helper | Remove clears the affected local intent; draft remains |
| E | Selected item is denied by the applicable safety decision | Denied chip, existing M153 safety copy | No bypass; draft and unrelated valid local intents remain |
| F, optional | Attachments unavailable in this context before selection | Attach omitted, persistent unavailable copy, no fake denied chip | Text composer remains visible; its actual submit eligibility follows existing write rules |

C1/C2/C3 are **alternative snapshots**, not three attachments seeded simultaneously. A drawing of one chip sets no maximum attachment count. The selection-to-decision processing state, timing and indicator are TBD; no immediate acceptance or fake validation duration is promised.

## 7. A — initial desktop composer, zero chips

Show a compact existing civic Issue context above Discussion. Keep enough title/type/labels context to establish ownership without reproducing the entire board. Maintain the four Issue actions once, above Discussion.

Below Discussion, the multiline composer contains the illustrative draft:

> I can help draft the sign-up list this week.

“Empty” here means **empty of attachment chips**, not necessarily an empty text draft. There is no selected file, placeholder chip, Ready badge, Denied badge, document preview or pre-populated gallery. Attach is a secondary action; Post comment is the existing primary text-labelled action. Whether an entirely empty text body can be posted with an attachment is not decided here.

## 8. B — picker invocation boundary

The annotation sequence is: Attach activated → OS/native file picker → selection produces Ready/Denied after the applicable local decision, or cancellation returns the composer unchanged.

The diagram is **documentation outside functional app UI**. It does not prescribe a browser, OS, custom modal, sidebar, directory list, system button appearance or platform-specific picker. Its arrows and colored explanatory boxes are not new product components or theme tokens.

Cancel must not create a chip or erase existing draft/selection intent. Returning a file choice must not submit the comment automatically. Selection is not a claim that any network operation has completed. The exact picker API, number of files per invocation and permission-error behavior are TBD.

## 9. C — Ready alternatives after selection

Each crop preserves the same literal draft and displays exactly one compact local chip:

- C1: `Image` type cue + `Selected image` + `Ready to post` + `Remove`.
- C2: `PDF` type cue + `PDF document` + `Ready to post` + `Remove`.
- C3: `Word` type cue + `Word document` + `Ready to post` + `Remove`.

Small Image/PDF/Word type badges are illustrative text cues, not newly commissioned file icons. There is no actual filename, extension, byte size, upload percentage, hosted preview, public URL or document content.

Ready means only that the current local intent has reached the applicable readiness state. The validation/readiness source remains an integration gate. The screenshot must not authorize an implementation to accept all selections merely because a family label matches.

Remove clears the selected local intent and does not clear the draft. The remaining attachment set, if any, stays intact. Exact persistence across remount/refresh is TBD; this sheet does not authorize restoring fixture chips on first paint.

## 10. D — selected type outside the allow-list

After an actual selection is rejected for type, show one local `Selected file` chip in the Denied state with the full rejection title and `Remove` (no separate short Denied badge is required). Keep the draft unchanged. Use the existing generic M153 sentence:

> This attachment can’t be added.

Adjacent helper, directly derived from the operator lock:

> Allowed: images · PDF · Microsoft Office

The external panel caption identifies the cause as a type outside the operator allow-list. Do **not** reuse safety-specific copy for a simple type mismatch. Do not invent a blocked extension, classifier verdict, accusation, role bypass or unsupported remediation message. Additional resident-facing type-specific denial copy is TBD and requires operator input.

## 11. E — safety denied, with capability distinction

For a selected item actually denied by the applicable media safety decision, show a Denied chip with Remove and exactly the existing M153 E copy:

> This attachment can’t be added.

> It does not meet the required media safety rules.

The draft remains unchanged. Preserve other valid local intents, if present. Do not show the rejected item as Ready, uploaded or published. No classifier detail, score, operator override, safety toggle or retry that bypasses the decision.

**Capability denial is not automatically a safety verdict.** If the entire attachment capability is unavailable before selection, use F. If capability changes after a selection, preserve local text/intent honestly; the exact item-level result and explanatory copy are TBD. Do not use the safety sentence unless that is the known reason.

## 12. F — optional attachments-unavailable inset

Omit Attach and show the existing M153 helper:

> Attachments are unavailable here.

Keep the text draft and the existing text-submit affordance. No item was selected in this example, so do not create a Denied chip. Unavailability of attachment capability alone is not evidence that text posting is forbidden or permitted; existing write capability still governs submit.

The optional `maxAttachments` inset is intentionally not drawn. No maximum value, counting policy, replacement behavior, disabled-state helper or recovery copy has been supplied. These remain TBD before a max-reached state can be specified.

## 13. Copy contract

| Purpose | Exact English fixture | Provenance |
|---|---|---|
| Entry | `Attach` | Existing composer / operator lock |
| Submit | `Post comment` | Existing M153 root composer |
| Local removal | `Remove` | Existing M153 attachment intent |
| Ready status | `Ready to post` | M153b §7 / operator rev3–3.1 lock; never abbreviate to `Ready` |
| Denied state | Full generic rejection title below; no new short status badge | M153b §7 / operator rev3–3.1 lock |
| Item type | `Selected image`, `PDF document`, `Word document`, `Selected file` | Operator examples / neutral M153 intent labels |
| Generic rejection | `This attachment can’t be added.` | M153 E |
| Safety rejection detail | `It does not meet the required media safety rules.` | M153 E |
| Capability unavailable | `Attachments are unavailable here.` | M153 E |
| Allowed-family helper | `Allowed: images · PDF · Microsoft Office` | Current operator lock |

Longer Office-family wording may name Word / Excel / PowerPoint as stated in the operator lock. Flow labels, TBDs and source notes are developer annotations outside UI. Fixture copy is not approval of new ET/RU translations; production localization follows the existing localization process.

## 14. Interaction and submit boundaries

- Attach requires explicit activation; it does not open on mount, hover, typing or a background refresh.
- Picker cancellation leaves the composer unchanged.
- Ready/Denied belongs to the affected selected item, not the whole civic Issue or thread.
- Remove must be available to keyboard and touch and must not silently clear text or other items.
- Do not automatically post, upload or bind as an implication of a Ready chip. This document defines no gateway HTTP operation.
- Existing M153 draft-preservation and unknown-write-outcome rules continue to apply to comment submission.
- The enabled yellow Post comment button in D/E is **illustrative, not a resolved attachment-submit policy**. Whether a denied item blocks submission, requires removal, or allows an explicitly acknowledged text-only action is TBD. Do not silently discard a denied intent or claim a combined text+attachment success.
- Similarly, C does not settle atomic versus sequential comment/bind behavior. Ready does not prove server persistence.

## 15. Visual, responsive and accessibility treatment

Use the current light feed/thread ground: page `#F7F6F2`, warm surface `#FFFDF8`, primary text `#101828`, secondary `#667085`, border `#E7E4DC`, primary/selected accent `#F5C542`. Maintain the M152/M153 civic hierarchy and composer shape. A warning or Denied state needs words as well as color.

### 15.1 Exact chip paint — M153b §7

| Property | C1/C2/C3 Ready | D/E Denied |
|---|---|---|
| Fill | `#FFFDF8` | `#F7F6F2`, flat solid warm page |
| Border | 1 px solid `#E7E4DC` | 1 px solid `#B54708` |
| Corner radius | 12 px | 12 px |
| Padding | 12 px on all sides | 12 px on all sides |
| Status/title | `Ready to post` | `This attachment can’t be added.` |
| Status/title color | `#101828` | `#B54708` |
| Status/title weight | 600 | 600 |
| Explanatory body | Existing primary text `#101828` | `#101828`; E safety sentence remains unchanged |
| Remove action | `#B54708` | `#B54708` |

No green Ready fill/badge, pink/red/rose Denied wash, gradient, violet status palette or chip separator. Denied meaning stays in the full rejection words and orange border/title. The D allow-list helper remains adjacent to the chip as drawn; it does not add another status color. The optional honesty line `Local intent · not published` is permitted by the prior lock but is not required or newly inserted in rev3.1.

These values are CSS px on this SPA lab surface. Do not assume a 16 px root or infer a React Native unit conversion. This residual does not change bubble, spine or React/Reply pill tokens.

### 15.2 Responsive and accessible behavior

The selected artboard is desktop-focused. Narrow presentation inherits M153: multiline text wraps, type/state/Remove remain readable, controls stack if necessary, composer and feedback remain above keyboard/safe area, with no horizontal page overflow. Do not reduce font size to force a chip into one line. Touch targets are at least 44 logical pixels; keyboard focus must remain visible. Use the existing accessible light focus token `#B54708` where relevant.

Attach and Remove have accessible names identifying their action and item context. Ready/Denied changes and refusal text are announced within composer scope without repeatedly reading all chips. Returning from the picker restores a usable focus location in the composer; removing an item does not strand focus. Exact platform accessibility integration is verified in implementation, not inferred from the image.

Present `attach.svg` and `send.svg` are reused from their actual existing catalog paths when shown. The residual image uses **text-only controls** because those source glyphs were not supplied. No new filenames, replacement paperclip/send glyphs or `ic-*` assets are authorized. No new file pictograms or icon package is commissioned by this sheet.

## 16. Revision record and precedence

| Revision | Change / authority |
|---|---|
| rev2 | System-owned picker annotation; no custom app file manager; A–F composition established |
| rev3 | Ready/Denied crops aligned to M153b §7; exact `Ready to post` and orange Remove actions |
| rev3.1 | D/E chip fill explicitly corrected to solid `#F7F6F2`; title updated to rev3.1. No behavioral change |

Rev3.1 supersedes earlier attachment residual rasters. A, B, C1–C3 and F retain rev3 composition and copy. D/E retain all copy, draft text, Remove and illustrative Post comment; their fill is the only requested chip-paint delta.

Written M153a semantics and M153b §7 tokens override imperfect raster pixels. In particular, do not sample antialiasing, image shading or generated warm tints as new hex values. B's colored explanatory diagram is documentation, not an application palette or custom picker component. Ready labels must remain the full `Ready to post` even if an earlier spec or raster abbreviated them.

Footer honesty remains: `AttachmentRef = local pending intent, never published media`. Preserve CT-05 / CT-11 follow-on mapping and no-new-icon boundary. Artboard map is **M153a rev3.1**; this does not assign a new M-number or story ID. Copy/localization and real submit eligibility remain governed by §§13–14, not the appearance of a yellow button.

## 17. Acceptance / review checklist

- [ ] A has no seeded attachment chip; Attach is reachable under Discussion.
- [ ] The picker is invoked only after Attach, and cancellation leaves draft/selection unchanged.
- [ ] B is labelled system-owned, with platform UI TBD; no custom app file manager is implied.
- [ ] Allowed families include images, PDF and Word/Excel/PowerPoint; exact MIME/extensions remain TBD.
- [ ] C1/C2/C3 are separate alternatives after selection, each with exact `Ready to post` and Remove.
- [ ] Ready chips have `#FFFDF8` fill, neutral border and no green status badge.
- [ ] D/E have solid `#F7F6F2` fill, orange border/title/Remove, and no rose wash.
- [ ] Chip radius/padding are 12 px and title/status weight is 600.
- [ ] D uses generic rejection plus allowed-family helper; it does not claim a safety failure.
- [ ] E uses the existing safety copy only for a known safety decision; draft is retained.
- [ ] F omits Attach and does not seed a Denied chip.
- [ ] No maximum attachment count, actual extension, file size or exact MIME is invented.
- [ ] AttachmentRef is never presented as uploaded, bound, persisted or publicly readable media.
- [ ] Denied-item submit policy is resolved before enabling that integrated behavior; no silent intent loss.
- [ ] Four post actions remain at Issue level; no new reaction summary, author/time or Identity UI appears.
- [ ] Existing icon assets are reused when supplied; no product code or new icon package is generated here.
- [ ] Keyboard, screen-reader, narrow layout and draft-preservation checks are applied to the real implementation.

## 18. Open decisions / integration gates

| Item | Current handling | Needed before closure |
|---|---|---|
| PRODUCT-BRIEF alignment | Source unavailable; operator lock and M152/M153 used | Supply the component-thread brief and reconcile any explicit differences |
| Exact MIME/extensions | Family-level allow-list only | Approved image/PDF/Office format list and matching rules |
| Picker platforms | System-owned annotation | Target platforms and platform-specific integration behavior |
| Selection count / maxAttachments | No value or max-reached inset | Single/multi-select policy, maximum and handling at capacity |
| Local readiness decision | Ready illustrated after a real local decision | Actual validation/readiness source and any processing state |
| Capability change after selection | No invented safety attribution | Scoped result and approved copy |
| Submit with denied or pending items | Image is not authoritative for eligibility | Product policy for blocking/removal/text-only continuation and copy |
| Attachment publication / read / transaction | Outside this residual sheet | Separately approved integration; no endpoint or atomicity invented |
| Attachment-only comment | Undecided | Whether empty body plus attachment is allowed |
| Restore/remount retention | No fixture chips on clean initial mount | Explicit draft/attachment retention and session policy if needed |
| Icon reuse | Known existing names only | Actual Present asset paths/bytes from the catalog |
| Story allocation | CT-05 / CT-11 follow-on | Existing-story assignment or new story ID, if required |

Open items do not prevent reviewing this local residual UX sheet. They prevent claiming unspecified integrated behavior as production truth.
