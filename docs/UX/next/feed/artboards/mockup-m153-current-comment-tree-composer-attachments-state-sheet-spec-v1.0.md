# DOGEstonia — M153 Current Comment Tree, Composer & Attachments (THR-T v2) State-Sheet Specification v1.0

**Package:** M153, fifth in the approved M149–M160 queue  
**Status:** **accepted** for handoff (revision 2); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** expanded `IssueThreadBlock` in the current light Issue modal/detail, plus 390 px keyboard-open mobile expectation  
**Predecessor:** M152 revision 4 **accepted** (handoff 2026-10-08); its literal comment-body rule is binding here.  

**Artboard:** `generated_images/exec-ddf1bdfc-0893-4ff0-a657-bd7fbf435382.png`, revision 2.

**Visual audit, 2026-10-08:** Revision 1 showed unsupported Share and Reactions controls on individual comments, used a fabricated filename and omitted the tombstone examples. Revision 2 removes those controls while retaining the Issue-level four-action row; A/B/C/G show literal body text; only A2 branch-loading inset uses gray bars; D/E/F preserve the draft and B shows future-contract tombstones. In B, tombstone descendants are suggested by connectors rather than a full branch, and A is cropped before the root composer because C/D–F show its active variants. These are accepted sheet-density limitations; the panel rules above govern implementation. Await product acceptance.

## 1. Purpose and scope

Translate historical M144's THR-T semantics into the accepted current light Issue discussion. The sheet must make nesting, configured reply limit, reply context, local branch states, composer draft survival, attachment reference states and a narrow keyboard-open layout unambiguous. Keep the discussion inside one civic Issue product, below the current `React | Comment | Share | Reactions` strip. M158 later checks modal, sheet and `/issue/:id` mount parity; M153 concentrates on the expanded discussion interior.

This is a visual/product contract, not an authorization to invent author data, upload APIs, attachment reads, edit/delete endpoints, comment ordering or moderation payloads. M157 owns the complete verification handoff; show only a short annotation where it touches the composer.

## 2. Authority and visual continuity

The approved current-design state-artboard backlog and current light mockups define the visual direction. Unified State Inventory §§13–15, Component & Variants Specification §§23–28, Interaction & Behavior Specification §§16–23, Data-to-UI Contract §§13–17 and 26–31, and Accessibility & Localization Pack define state behavior and implementation boundaries. Historical M144 is a semantic scaffold; its dark skin and abstract loaded-comment bars are superseded. M152 rev4 fixes the current continuous post/thread shell and requires literal readable `comments[].body` in populated states. Written specifications override incidental pixels.

The current expanded Issue modal reference (`exec-ac4e3f60-8c03-40f0-8896-b3776bd1d6b8.png`) establishes compact comment bubbles, subtle parent/child connectors, inline reaction/action rhythm and the bottom composer. Its believable author portraits/names, times, comment image and `Most relevant` label are illustrative, not fields supported by the reviewed thread read. Reproduce the hierarchy without implying those fields are live.

## 3. Data reality and deterministic fixture

The reviewed public tree supplies `comment_id`, `parent_id`, `depth`, `body`, comment reaction aggregates and authenticated `selected[]`. `GET /threads/knobs` supplies `max_depth` and `media_allowed_types`. The UI can reconstruct parent links and display actual body text. It can derive a reply count only from a complete set of returned child links. It has no documented order/pagination contract.

Use a deterministic **illustrative fixture**, labelled outside the functional UI, with these literal body strings in populated panels:

- Root A: `I can help coordinate a shared pet-care group for neighbours.`
- Reply A1: `A simple sign-up list would make it easier to start.`
- Reply A1a: `We could list short visits and longer stays separately.`
- Root B: `I would also like a way to check availability nearby.`
- Reply B1: `Keeping the first version small sounds sensible.`
- Root C: `What should happen when a neighbour is away for several days?`

Render each as real legible text in the comment bubble, not gray bars. They demonstrate layout, not factual residents or production data. Use anonymous textual node cues where relationships need naming, such as `Comment` and `Reply`, without suggesting author identity. No profile photograph, avatar silhouette, name, time, status, ranking or fabricated count. If a UI element lacks a source, annotate it as a future-contract example outside the UI rather than silently presenting it as current data. In production substitute returned bodies and confirmed reaction aggregates.

## 4. Ownership and state matrix

```text
IssueThreadBlock (same shell as M152)
├─ CommentTree: structure, branch disclosure, local branch feedback
│  └─ CommentNode: body, confirmed reaction summary, Reply affordance, child slot
├─ ThreadComposer: reply target, draft, pending attachment intents, submit/retry
└─ AttachmentRef: one pending/accepted/denied item state
```

| State ID | Condition | Visible result | Owner / panel |
|---|---|---|---|
| `THR-T-A` | Populated nested tree | Literal body text, parent links, actions, root composer | `CommentTree`, primary A |
| `THR-T-B` | Configured `max_depth` reached | No deeper Reply; explicit limit, existing body still visible | `CommentNode`, B |
| `THR-T-C` | Reply selected | Parent context and multiline composer with retained draft | `ThreadComposer`, C |
| `COMMENT-COLLAPSED-REPLIES` | Branch deliberately collapsed | Derived count when complete, expand control | `CommentTree`, A inset |
| `COMMENT-EXPANDING` | Branch expansion pending | Local progress; rest of tree intact | A inset |
| `COMMENT-EXPAND-ERROR` | Branch expansion failed | Local `Couldn’t load replies` and `Try again`; rest intact | A inset |
| `COMMENT-DELETED` / `COMMENT-MODERATED` | Backend reports removed content | Neutral tombstone preserving children | B inset, future contract |
| `THR-T-D` | Allowed attachment ref ready | Compact reference chip and Remove, draft remains | `AttachmentRef`, D |
| `THR-T-E` | Capability or selected item denied | Honest persistent local warning, text draft intact | `AttachmentRef`, E |
| `THR-T-F` | Comment post failed | Inline error, original draft and reply target, safe recovery | `ThreadComposer`, F |
| `MOBILE-KEYBOARD-OPEN` | Composer focused at 390 px | Reply context and controls above keyboard | Mobile panel G |

Use 3–4 large primary panels (A/C/D–F may share one compound composer panel) with linked smaller insets for branch/tombstone and one 390 px mobile panel. IDs must be readable at normal zoom. A sheet can use multiple labelled subframes rather than nine tiny full Issue repetitions.

## 5. Shared expanded discussion anatomy

Show a compact civic context heading `Discussion · Issue UV-024` within the current Issue modal or detail crop. Keep enough Issue header/action-strip context visible in the main panel to prove the discussion belongs to an Issue; subsequent close crops may begin at `Discussion`. The modal scroll region owns content scroll; no second scroll per comment branch. Do not repeat `React | Comment | Share | Reactions` within each branch. Keep one composer anchored after visible comments on desktop; in mobile sheet it may be sticky above the keyboard. The composer is not a floating unrelated chat window.

A comment node displays actual body text, confirmed aggregate marks only where provided, `React`, `Reply` if eligible, and a child branch. Without author/time contracts, omit those slots rather than drawing gray circular portraits or metadata bars. Body text wraps in the available column and remains selectable and exposed to assistive technology. Reaction totals in the artboard can be omitted to avoid fixture counts. `React` opens the existing picker semantics of M154; it does not apply a default Like.

## 6. Panel A — nested tree and local branch states

Show Root A → Reply A1 → Reply A1a using thin connectors and modest indentation; Root B and Root C demonstrate multiple top-level siblings. Desktop indentation is about 44 px for each visual level; mobile about 24 px. **Visual indentation caps at three levels.** Deeper logical ancestry may continue at the capped column with explicit `Replying to this comment` or parent context; never create a fourth increasingly narrow column. The configurable permission to reply is determined separately by `depth` versus `knobs.max_depth`.

A collapsed branch displays `View replies` or `View 2 replies` only when the count is derivable from a complete response; do not imply server pagination. Branch progress replaces only its expand affordance and uses `Loading replies…`. On branch failure, retain parent and already loaded siblings, show `Couldn’t load replies` and scoped `Try again`. The present read contract returns a full comments array and documents no branch-fetch endpoint: these local-loading/error insets are **target interaction states pending branch retrieval strategy**. They must not be implemented as invented API calls. If the complete tree is already local, disclosure can be synchronous without a fake loader.

If parent links contain orphans/cycles/inconsistent depths, display readable bodies in a safe flat fallback and report diagnostics; do not fabricate ancestry. Ordering labels such as `Most relevant` or `Newest` are absent until an ordering contract is approved.

## 7. Panel B — maximum depth and tombstones

At an actual node-configured `max_depth`, show the deepest comment body, no child `Reply` action and explanatory `Maximum reply depth reached`. Do not hard-code the numeric limit or confuse the visual three-level indentation cap with the configured reply limit. A visually capped comment with remaining logical depth can still offer Reply and display explicit parent context at the same indentation.

Show small, clearly **future-contract** tombstone insets: `Comment removed` and `Comment unavailable`, with connecting line and visible descendants preserved. The current read payload has no deleted/moderated state, so the production client cannot infer tombstones from empty body or missing parent. No raw moderation reason, accusation, author identity or fake deletion button. Tombstones are only rendered once backend supplies a stable public state contract.

## 8. Panel C — reply composer and draft

A selected parent is highlighted subtly. Directly beneath it or at the anchored composer, show `Replying to this comment` plus a short excerpt of the actual parent body, a `Cancel reply` control, multiline text field containing a deterministic illustrative draft, `Attach`, and one yellow `Post reply` primary control. Do not invent a name in `Replying to …`. Example draft: `I can help draft the sign-up list this week.`

Root mode says `Write a comment` / `Post comment`. Reply mode preserves target identity and remains attached to that parent. Switching target with a dirty draft asks for a decision if the text could be misattributed; cancelling reply does not silently destroy the draft. Empty/invalid submission is unavailable with accessible explanation. Submission locks duplicate presses and keeps recoverable text. Success resets only after a confirmed success envelope and reconciles the tree. No permanent-looking optimistic comment before confirmation. Unknown outcome must be reconciled before a manual repeat; no automatic retry that risks duplicates.

A write gate is a short external annotation: `Unverified write → existing /verify → return with draft and target`. Do not draw a duplicate verification form. A generic `403` alone is not a safe verify redirect discriminator under the reviewed contract.

## 9. Panel D — attachment permitted; Panel E — denied

D: show a composer containing literal draft text and one compact `Attached file` or `Selected image` reference chip with file/photo icon, `Remove` and `Ready to post` only when that item is genuinely ready. Attach remains a secondary control. A chip can represent a **local/pending intent** before posting, not a confirmed published attachment. Keep image preview optional and illustrative outside production read. No gallery, crop editor, storage provider, raw ref id, metadata or file manager.

E: show `This attachment can’t be added.` and `It does not meet the required media safety rules.` near the affected item. The rejected item is not styled as ready or published. Keep the exact draft text visible; preserve any other ready item. `Remove` may clear the rejected intent; item retry only for technical failures where safe. If node capability is unavailable, disable or omit Attach and explain `Attachments are unavailable here.` No toggle or role bypass for the legal media floor; no classifier detail.

**Implementation boundary:** current API accepts a ref only after a `comment_id` exists; it has no documented ref-creation/upload endpoint, no read/list refs, no preview URL and no atomic comment-plus-attachment write. D's pre-submit chip is a target UI state contingent on a media integration; it cannot be claimed as already persistent. A text-only post can succeed while later bind fails; the UI must report that partial result honestly, keep the failed attachment intent local and never show the file as published. `attach-denied` may be in an error envelope even with HTTP 200; body status governs. `DUI-Q05`, `DUI-Q06` and `DUI-Q24` remain open.

## 10. Panel F — post soft failure

Show the same illustrative draft still in the multiline field and the same reply target. Error copy: `Comment wasn’t posted.` / `Your text is still here. Try again.` Place `Try again` and `Keep editing` inside the composer; toast may supplement but cannot replace this feedback. A known rejected write may permit manual retry after correction. For an ambiguous outcome, label uncertainty, reconcile first and prevent blind repeat. The civic Issue and other comments remain readable. Do not insert a duplicate or clear the draft.

## 11. Mobile keyboard-open panel G

At 390 × 844, full-screen Issue sheet uses one body scroll. Expanded comments use 24 px indentation with capped visual level and adequate text width. The active reply composer rises above the software keyboard; hide global bottom navigation while typing, retain sheet close/back and reply context, make draft and `Post reply` visible without horizontal scrolling. On 320 px, use the same three visual levels with explicit parent context rather than tiny text or greater indentation. Closing the keyboard does not submit or discard. Safe-area padding and keyboard avoidance belong to sheet layout; M159 later stress-tests responsive geometry.

## 12. Visual tokens and interaction/accessibility

Light-first: warm page `#F7F6F2`, surface `#FFFDF8`, text `#101828`, secondary `#667085`, border `#E7E4DC`, restrained yellow `#F5C542` for one primary submit. The older dark M144 sheet is not the current default; M160 handles full theme parity. Use subtle warm-gray bubbles/lines, 40 px root/32 px nested identity spacing only if actual identity data becomes available. For now, body text aligns without fake avatar circles. Error uses icon plus readable text, not color alone.

Semantic tree/group relationships and accessible `Reply to comment` context supplement indentation. Each expand button exposes expanded state and derived child count if known. Branch loading/error is politely announced only within its scope. Focus moves to composer when Reply is activated; Cancel returns to source control; post success announcement does not steal focus. Attachment Remove/Retry and all controls have accessible names and at least 44 px touch targets. Long ET/RU/EN bodies and messages wrap under 200% zoom and 320 px. Skeletons exist only for genuinely pending comment content/branch; **never draw gray bars for a successfully loaded `body`**.

## 13. Artboard composition instructions

Title: `M153 · COMMENT TREE / COMPOSER / ATTACHMENTS · THR-T v2 · rev 1`. One consolidated sharp light landscape sheet. Use A as the largest expanded Issue-discussion crop; C with reply composer as second focal panel; B max-depth plus tombstone future-contract insets; D/E/F as legible composer state crops; G as a visible 390 px mobile keyboard-open panel. Preserve M152's four-action row where full Issue context appears. If space is tight, use labelled detail crops rather than shrinking text. Every populated comment row must contain the fixture's readable literal body. Only a true branch load may use local skeletons. Put `Illustrative comment bodies; author/time/media read unavailable` in an external sheet annotation, not inside the functional UI. Distinguish D target media-integration state and tombstones pending backend contract with small external notes. No generated logo approximation; use approved logo asset only if a logo is shown.

## 14. Forbidden representations

- Gray comment-body rectangles in loaded A/B/C/G, fake author circles/names/times or production counts.
- `Most relevant`/`Newest` sorting claim without ordering data; unsupported endpoint or fabricated reply pagination.
- A fourth visual indentation level, or removal of Reply solely because the visual cap is reached.
- Tombstones inferred from missing data; a removed parent erasing descendants.
- Persistent attached media claimed from a composer chip without read/preview and bind confirmation.
- Safety bypass, upload administration, gallery, raw reference ids, private media, classifier scores or sensitive denial details.
- Toast-only post failure; cleared draft; duplicate blind retry; fake confirmed comment.
- Separate comments product replacing Issue identity, or verification form embedded in the thread.

## 15. Acceptance checklist

- [ ] A shows a readable literal body at root and two reply levels, with explicit connectors; B distinguishes configured reply limit from visual cap.
- [ ] C shows actual parent text and recoverable draft with Attach, Cancel and Post reply.
- [ ] Collapsed/expanding/error branch insets preserve the existing tree and mark unsupported branch fetching as a target state.
- [ ] Deleted/moderated tombstones are visibly labelled future-contract examples; no production inference is implied.
- [ ] D/E distinguish ready reference intent from denied item; text draft survives; no legal-floor bypass.
- [ ] F keeps the exact draft and reply target, inline failure and safe retry; no duplicate success claim.
- [ ] G shows a keyboard-safe composer and readable three-level visual tree at 390 px.
- [ ] No loaded comment is drawn as a skeleton; author/time/media/sort boundaries are stated outside functional UI.
- [ ] One Issue/thread component language and current light tokens persist; controls are keyboard and touch accessible.
- [ ] Audit generated pixels against this spec and regenerate only implementation-relevant semantic errors.

## 16. Open decisions

| ID | Needed decision | M153 treatment |
|---|---|---|
| `DUI-Q04` | Public comment author/name/avatar/time fields | Omit identity/time; show available body text. |
| `DUI-Q05` | Attachment refs and previews on read | D is a target composer state; do not show published media. |
| `DUI-Q06` | Sequential vs atomic comment/attachment flow | Explicit partial success and local failed-intent handling. |
| `DUI-Q10` | Tree ordering/pagination and branch retrieval | No sort label, pagination claim or invented branch endpoint. |
| `DUI-Q21` | Write idempotency | Unknown outcome reconciled before retry. |
| `DUI-Q22` | Body and attachment validation limits | No invented character/file maximum. |
| `DUI-Q24` | Trusted media floor-class ownership | No browser-controlled safety override. |
| Tombstone public state | Deleted/moderated read model | Future-contract visual only until stable field exists. |
