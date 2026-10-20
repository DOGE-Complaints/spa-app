# DOGEstonia — M153c Composer AttachmentRef File-Name Chip Specification v1.0

**Date:** 2026-10-20  
**Surface:** SPA `#/lab/feed`, lab thread-mount: `IssueThreadBlock` / `ThreadComposer` / pending `AttachmentRef`  
**Continuity:** M153a attachment residual + M153b §7 token register · residual **M153c** · story **CT-25**.  
**Artboard:** [`DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.png`](DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.png) — `DOGEstonia · COMPOSER ATTACHMENT CHIP · FILE NAME`.  
**Status:** written tip SSOT · intake PASS · Apply-ready for CT-25. Soft TBD in §12 remain implementation gates (not tip blockers).

## 1. Purpose and scope

Replace family-only pending-chip placeholders with the selected local file's real `File.name`, a recognizable image/document cue, explicit local readiness and Remove. This specification covers the COMPOSER pending chip only, after an actual file selection.

Excluded: posted CommentNode preview (CT-22), Share (CT-27), full comment tree, bubble/spine/pill redesign, comment reaction summary (HOLD), author/avatar/time fields, upload/publish APIs, persisted-media URLs and new icon packs. No product code is supplied.

A selected local File is not proof of upload. The operator's phrase “uploaded File.name” is interpreted here as the name of the selected local file; neither filename nor thumbnail asserts server persistence.

## 2. Authority and accepted decisions

Precedence: current operator locks and accepted answers → M153b §7 exact chip tokens → M153a interaction semantics → raster tone. Written rules override imperfect generated pixels.

| Decision | Accepted rule |
|---|---|
| Image cue | Local thumbnail at exactly 48 × 48 CSS px; a clear image-type icon remains an allowed alternative, with actual asset mapping TBD |
| Non-image cue | Explicit document-type marker `MD`, `PDF` or `Word`; exact asset mapping TBD, no new branded icon package |
| Filename overflow | One filename line with middle ellipsis, preserving the beginning and extension |
| Full name access | Full unmodified name available on focus/hover and to screen readers; mobile full-name disclosure remains TBD |
| Family label | Separate secondary line above filename |
| Ready wording | `Ready to post` plus `Local intent · not published` and Remove |
| Denied | Existing M153b Denied paint and full rejection title; include filename when known |

The 48 × 48 value specifies the image thumbnail; it does not establish an exact document-marker size. No new gaps, font sizes, filename weights or thumbnail-fit/corner tokens are approved by apparent raster geometry.

## 3. Component responsibilities and content anatomy

| Element | Responsibility |
|---|---|
| ThreadComposer | Retain text draft and pending intents, host existing Attach/Post controls, preserve existing submit rules |
| Pending AttachmentRef chip | Present one actual selected item, type cue, filename, local status, honesty and Remove |
| Type cue | Local image thumbnail or recognizable document-type marker; not an empty `▣` box |
| Filename | Display the real `File.name`; never replace it with a generic family label |
| Family label | Image / Markdown / PDF / Word when known; supplementary to filename |
| Remove | Remove only the affected local intent without erasing text or other intents |

Ready anatomy: cue beside content; secondary family line → filename → `Ready to post` → honesty line. Remove remains clearly associated with the item. On narrow widths the chip may grow and Remove may flow to another row; no overlap or horizontal overflow.

These are documentation roles, not a new runtime schema or mandated component/file names. Unknown filenames, unknown family labels and unavailable image previews require the open decisions in §12; do not fabricate them.

## 4. Panel matrix

| Panel | Entry / contents | Required result |
|---|---|---|
| A — Ready image | Selected image; Image family; `courtyard-flowers.jpg`; local flower thumbnail | Real filename, 48 × 48 thumbnail, full Ready/honesty copy and Remove |
| B — Ready Markdown | Selected `.md`; MD document cue; Markdown; `pet-care-notes.md` | Filename remains primary identifying content; no family-only placeholder |
| C — Ready PDF | Selected PDF; PDF cue/family; `neighbourhood-plan.pdf` | Same Ready anatomy and tokens |
| D — Denied type | A known selected name, fixture `selected-file`; type decision is Denied | Filename + full generic rejection + honesty + Remove; no Ready or false safety verdict |
| E — Narrow 390 | Ready Markdown chip in a 390 CSS px viewport | Middle ellipsis, readable status/honesty, reachable Remove, composer controls retained |

A–E are separate snapshots after selection, not seeded simultaneous items and not new canonical state IDs. D's fixture deliberately assigns no blocked extension or validation algorithm. It does not mean missing extensions are forbidden.

The shared draft fixture is literal text:

> I can help draft the sign-up list this week.

Draft remains intact in all panels. Visible Post comment is contextual and illustrative, not evidence of attachment-submit eligibility.

## 5. Real filename and honest truncation

1. Source identifying text from the selected local file's actual `File.name`; no invented production file data.
2. Family text such as “Selected image”, “Markdown file” or “PDF document” cannot replace the filename.
3. Display a complete filename when it fits. If it does not, keep one line and insert a middle ellipsis while preserving beginning and extension.
4. The narrow fixture is `neighbourhood-pet…notes.md`. Its full source fixture for implementation review is `neighbourhood-pet-care-notes.md`. Both are documentation fixtures, not uploaded project assets.
5. Visual truncation must not mutate the underlying name or accessible full-name value. Do not truncate the screen-reader name to match the visible string.
6. Full-name access is available via focus/hover and screen-reader output. Do not create a new modal, tap action or tooltip timing policy for mobile; that remains TBD.
7. Exact character budget is responsive, not a fixed count inferred from this raster. Do not shrink text to fit.

Edge handling for extensionless names, dotfiles, compound extensions, unusually long extensions, bidirectional names and a width too narrow to preserve both beginning and extension is TBD. No filename transformation or extension parsing algorithm is invented here.

## 6. Local image thumbnail and document cues

A uses a 48 × 48 CSS px thumbnail of the actual selected local image. It is a local preview, not a public asset or posted gallery. The flowers in the artwork are illustrative fixture content. No URL is prescribed.

A clear image-type icon is an allowed alternative. Exact Present asset availability, preview decoding/failure fallback, fitting/cropping, loading behavior and preview lifecycle are TBD. Do not implement an arbitrary `▣` placeholder as the final image cue.

Non-image Ready chips use a document-type marker plus filename. MD / PDF / Word text makes the cue recognizable. The artwork's document silhouettes are semantic illustrations, not approved new SVG assets or `ic-*` filenames. Reuse actual existing assets when identified; mapping remains TBD. This sheet does not require a fourth Office panel; the same anatomy applies to an Office example when eligibility is established.

Present attach/send glyphs may be reused only from their existing catalog if shown elsewhere. The crops use text controls and commission no additional icon pack.

## 7. Exact chip tokens — M153b §7

| Property | Ready A/B/C/E | Denied D |
|---|---|---|
| Fill | `#FFFDF8` | `#F7F6F2` |
| Border | 1 px solid `#E7E4DC` | 1 px solid `#B54708` |
| Corner radius | 12 px | 12 px |
| Padding | 12 px on every side | 12 px on every side |
| Status/title | `Ready to post` | `This attachment can’t be added.` |
| Status/title color | `#101828` | `#B54708` |
| Status/title weight | 600 | 600 |
| Filename / body | `#101828` | `#101828` |
| Family / honesty | `#667085` | Honesty `#667085`; family only when known |
| Remove | `#B54708` | `#B54708` |

Remaining palette: page `#F7F6F2`, surface `#FFFDF8`, action yellow `#F5C542`. No green Ready badge, pink/red/rose Denied wash, blue/violet product palette, chip divider or new status colors. Meaning stays in words plus border/title emphasis.

All dimensions are CSS px for this SPA lab surface. No 16 px root-font assumption or React Native unit conversion is established. Do not measure thumbnail size, padding, colors or target dimensions from the PNG.

## 8. Copy contract

| Purpose | Exact English fixture |
|---|---|
| Ready | `Ready to post` |
| Local honesty | `Local intent · not published` |
| Denied title | `This attachment can’t be added.` |
| Local removal | `Remove` |
| Existing entry / submit | `Attach` / `Post comment` |
| Families shown | `Image`, `Markdown`, `PDF` |

Family labels are secondary descriptive text; filenames remain real local data. No separate short Ready or Denied badge is added. D is a type-denial example and must not display the safety sentence. Existing M153a safety copy remains available only for an actual known safety denial; no new safety panel is specified here. Translation follows existing localization practice; this document does not invent ET/RU strings.

## 9. Interaction and integration boundaries

- Existing sequence remains clean composer without chips → explicit Attach → OS/native picker → selection → actual Ready/Denied decision. Cancel leaves existing draft and intents unchanged.
- Readiness cannot be inferred solely from a filename or extension. The readiness/validation source remains an integration gate.
- Remove clears the affected pending intent; it does not imply server delete/unbind, erase draft or discard other files.
- No automatic posting, upload, bind or publication follows selection, preview generation or Ready.
- Attachment-only comments, denied-item submission, pending processing, atomicity and unknown submission outcomes retain their existing separate contracts/TBDs. The visible Post comment does not resolve them.
- The `.md` Ready panel is explicitly requested lab scope. Earlier family-level images/PDF/Office allow-list is not silently rewritten into a global or production Markdown policy. Reconcile the lab allow-list before claiming that integration.
- No exact MIME, maximum count/size, extension allow-list, endpoint, upload URL or published read contract is introduced.

## 10. Narrow layout and accessibility

At 390 CSS px, allow content and chip height to grow. Filename remains one line with middle ellipsis; family/status/honesty may wrap as needed. Preserve readable text and a visible Remove control without overlap. Do not hide the extension or honesty to save width.

Interactive targets retain the existing minimum 44 CSS px and visible keyboard focus; chip radius/padding do not define target size. Focus/hover disclosure must expose the full filename without changing it. Remove has an accessible name identifying the affected file; do not rely on icon-only actions. Readiness/denial feedback remains scoped to the composer. Existing draft and keyboard/safe-area behavior applies.

Mobile full-name disclosure is not resolved. This is an implementation gate for complete filename-access UX, not permission to invent a tap-to-open document action. No posted-content preview is created by this chip.

## 11. Raster audit and precedence

The artboard illustrates five pending chip states and their relative hierarchy. It is not a pixel source. Thumbnail appears magnified in the sheet: implementation is exactly 48 × 48 CSS px. The document marker geometry, display font metrics, shadows and apparent tinted borders are not extra approved tokens.

Use a true middle ellipsis rule rather than copying a fixed number of visible characters from E. Written `#F7F6F2` governs D fill even if the raster appears tinted. Blue-tinted crop outlines or extra colors in the image are not additional brand tokens. A's `.jpg` / `.png` caption is illustrative and does not establish exact accepted formats.

This specification adds filename/cue presentation only; earlier M153a/M153b contracts continue except where explicitly extended above. CT-22 posted preview and CT-27 Share remain excluded. Story owner: **CT-25**.

## 12. Remaining decisions

| Item | Current boundary |
|---|---|
| Lab `.md` eligibility versus prior allow-list | Requested Ready illustration; exact validation/allow-list reconciliation needed |
| Document / image fallback assets | Recognizable type cues required; actual existing asset mapping TBD |
| Thumbnail fit, radius, decode failure and lifecycle | 48 × 48 size locked; remaining behavior TBD |
| Mobile full-name reveal | TBD; no new interaction invented |
| Filename edge cases and overflow algorithm | Beginning + extension retained; uncommon-name rules TBD |
| Unknown/missing filename or family | Include actual name when known; fallback copy/handling TBD |
| Additional spacing and typography tokens | Inherit approved system; do not derive new px/weights from raster |
| Upload/publication and submit eligibility | Outside this presentation residual; existing gates remain |
| Story assignment | **CT-25** · residual **M153c** |

## 13. Implementation review checklist

- [ ] Clean mount has zero fixture chips; snapshots follow real selection.
- [ ] Real `File.name` appears; family text never substitutes for it.
- [ ] Image has a local 48 × 48 thumbnail or approved clear image cue, never only `▣`.
- [ ] Non-images have an explicit document type cue plus filename.
- [ ] Family is above filename; exact Ready/honesty/Remove copy is retained.
- [ ] Ready and Denied match §7, with no colored status wash or abbreviated Ready badge.
- [ ] Denied includes known name, preserves draft and does not misstate a safety cause.
- [ ] At 390 px the filename has honest middle ellipsis, extension remains and controls do not overlap.
- [ ] Full-name keyboard/hover/screen-reader access is verified; mobile gap remains explicitly tracked.
- [ ] Fixture names are not mistaken for real uploads or API evidence.
- [ ] No new asset filenames, HTTP APIs, public URLs or publication claims are inferred.
- [ ] CT-22, Share CT-27 and comment reaction summary HOLD remain untouched.
