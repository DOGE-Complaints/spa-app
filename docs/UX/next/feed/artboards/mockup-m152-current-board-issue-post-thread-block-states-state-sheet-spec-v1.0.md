# DOGEstonia — M152 Current BoardIssuePost / IssueThreadBlock States (THR-P v2) State-Sheet Specification v1.0

**Package:** M152, fourth in the approved M149–M160 sequence  
**Status:** **accepted** for handoff (revision 4); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-07  
**Target:** current light-first `/board` Issue post, shared `IssueThreadBlock`, 390 px narrow expectation  
**Artboard:** `generated_images/exec-e288fd49-e4e3-450e-ae6e-613c55775026.png`, revision 4

**Visual audit, 2026-10-08:** Revision 3 incorrectly represented populated comment bodies in C/E as gray skeleton rectangles. These belong only to A loading. C/E must display literal, legible body text. A–D retain civic Issue identity, `Open issue`, and the four-action row; D's scoped error stays below that row. Earlier image revisions are superseded. Revision 4 displays the two literal sample comment bodies in both C and E, with gray skeleton bars confined to A. D retains scoped error and `Open issue`. Await product acceptance.

## 1. Purpose

Re-skin the five semantic THR-P states from historical M143 into the accepted current DOGEstonia light Issue-as-post language. Show that the civic Issue is complete and useful while social data loads, is empty, is populated but collapsed, or fails. Make the thread a subordinate region directly beneath the existing post action strip, inside one continuous Issue product.

## 2. Scope and non-goals

Included: `BoardIssuePost` wrapper, existing `IssueCardChrome`, current `PostActionStrip`, `IssueThreadBlock` loading/empty/populated-collapsed/unavailable states and mobile stack. Show the thread's summary, open affordance, composer entry and optional secondary invitation slot at placement level only.

Excluded: detailed nested comment tree and composer/attachments (M153), reaction picker/catalog (M154), reaction people surfaces (M155), full escalation feedback (M156), verification handoff (M157), and modal/page parity detail (M158). No new social author identity, fabricated people/counts, new thread API or inline verification form.

## 3. Authority and continuity

The current active package instruction and *Current Design State-Artboard Coverage & Generation Backlog v1.0* outrank *Unified State Inventory v1.0* §11, *Component & Variants Specification v1.0* §§17 and 22–24, *Interaction & Behavior Specification v1.0* §§12–16, *Data-to-UI Contract v1.0* §§14–15 and 24/28, *Dashboard Layout Specification v1.0*, *Mobile Responsive Design Pack v1.0*, *Design Tokens Package v1.0*, *Accessibility & Localization Pack v1.0*, and *Asset Manifest v1.0*. The historical `mockup-143-board-issue-post-feed-slot-state-sheet-spec.md` is a **semantic scaffold only**.

Accepted M149 revision 1 fixes the current light dashboard shell; M150 revision 3 fixes current Issue content anatomy; M151 revision 2 fixes list/map board context. Current light feed reference `exec-26720537-2028-4b60-af0b-67df6f385bc3.png` and current Issue modal references `exec-fe77a140-fddd-4f1c-a24a-adb6b648064f.png` / `exec-ac4e3f60-8c03-40f0-8896-b3776bd1d6b8.png` establish the visual rhythm. M143–M148 dark sheets are previous visual skin, state logic only. Written specifications override generated pixels.

Historical M143's action examples (`Discussion`, `Invite organization`) are **superseded** in the post action strip. The current fixed row is exactly `React`, `Comment`, `Share`, `Reactions`. The invitation may remain a secondary thread affordance only if enabled by its own future stub state; it never replaces Share.

## 4. Composition and state ownership

```text
BoardIssuePost (one continuous feed card)
├─ IssueCardChrome (civic icon/identity, title, summary, labels, optional media)
│  └─ PostActionStrip: React | Comment | Share | Reactions
└─ IssueThreadBlock (directly attached below the strip)
   ├─ state feedback or ThreadSummary
   ├─ collapsed/open discussion affordance
   ├─ optional reaction summary when confirmed
   ├─ composer entry, if allowed to present
   └─ secondary EscalationStub slot, if enabled
```

`BoardIssuePost` owns the combined visual shell and keeps the current Issue card width, border, radius and alignment. `IssueThreadBlock` owns only discussion presentation beneath an internal divider; it does not fetch civic Issue data or form a second rounded competing card. Feed, modal/sheet and `/issue/:id` mount the same logical block; M152 illustrates feed density only, while M158 proves mount parity.

All five panels use the same fixed civic Issue fixture and the same post action row. Only the discussion region changes. In an image with illustrative Issue media, that image is demo content pending the public media URL/alt contract; the state distinction must not depend on it. The Issue's `Open issue` affordance and non-social civic content remain visible and readable in all states.

## 5. State matrix

| State | Thread condition | Required region beneath Issue | Civic Issue behavior | Panel |
|---|---|---|---|---|
| `THR-P-A` | Thread request pending | Stable compact `Discussion` loading chrome with neutral skeleton lines/status; no fake data | Complete and interactive | A |
| `THR-P-B` | Success, zero comments/reactions | `No comments yet`, constructive invitation and composer entry where capability permits | Complete and interactive | B |
| `THR-P-C` | Successful populated tree/aggregate | Collapsed discussion summary, `View discussion`, confirmed reaction slot and composer entry | Complete and interactive | C |
| `THR-P-D` | Thread unavailable/error | `Discussion unavailable`, scoped `Try again`; no fake content | Complete and interactive | D |
| `THR-P-E` | Narrow/mobile presentation | Same populated/collapsed semantics stacked at 390 px, no horizontal overflow | Complete and interactive | E |

THR-P-C requires at least one comment or an authoritative aggregate; it does not authorize invented count/author imagery. A successful response with comment previews renders each available `comments[].body` as literal selectable text. The artboard example bodies are labelled as illustrative content outside the UI; production renders the response bodies.

## 6. Shared post anatomy in every panel

- Current civic Issue icon, Issue id, textual status/type, public location/date only if source-provided, title, summary, labels and explicit `Open issue`. No user avatar or creator profile substitutes for Issue identity.
- Optional schema overlay from M150 is omitted in this sheet to keep THR-P comparison clear; absence creates no ghost `Additional details` chrome. A single demo image may be used for visual continuity, but identical across A–D and not required for the component.
- Post action strip is one visual row of four equal zones: `React`, `Comment`, `Share`, `Reactions`. Desktop height 56 px; mobile 52 px. Each target at least 44 px, labels visible at 360/390. `React` opens a picker; it does not apply a default Like. `Comment` opens/focuses discussion; `Share` shares the public Issue link; reaction aggregate opens people surfaces only when data exists.
- Thread region begins immediately after this strip with an internal hairline divider or connected tonal step, not an external card gap. It uses 20 px desktop/16 px mobile horizontal padding and at least 72 px for loading, empty and unavailable, 96–144 px for a collapsed populated preview when practical.

## 7. Panel A — `THR-P-A` loading

Render the full civic Issue normally. Under the action strip, show a compact `Discussion` heading, one `Loading discussion…` status and two or three neutral placeholder lines with stable geometry. The thread region only is pending. No comment names, avatars, text, reaction marks, count or disabled input that implies a known empty/populated state. Avoid an animated spinner on every line. If load resolves quickly, implementation need not flash a loader, but the artboard illustrates the sustained pending state.

## 8. Panel B — `THR-P-B` empty

Keep the same complete Issue. Below the strip show `Discussion`, `No comments yet`, and concise supporting copy such as `Start a constructive discussion about this Issue.` Present `Write a comment` as an entry affordance only when the current capability can be established; its activation is governed by verification and permission, not by an inline form in this panel. No fake first commenter, optimistic sample, engagement total or moderation mark. Empty means a successful read of a zero-comment thread, not a failure.

## 9. Panel C — `THR-P-C` populated/collapsed

Keep the same Issue. Show a subordinate `Discussion` section with a compact summary and a clear `View discussion`/`Open discussion` action. Show two preview comment bodies as **readable literal text**, using these illustrative fixture strings in the artboard: `I can help coordinate a shared pet-care group for neighbours.` and `A simple sign-up list would make it easier to start.` The same strings appear in E. In production each row renders the returned `comments[].body`; clamp/wrap in the collapsed view with an explicit continuation if needed, never replace body text with gray bars after a successful read. Do not add believable names, timestamps, avatar circles or unsupported author images. Label the artboard fixture outside UI as `Illustrative comment bodies · author/time not in current API`. If an authoritative `comments.length` from a complete response is used in an annotation, label it as derived from the current response, not a global engagement metric. Reaction summary displays only confirmed aggregate data; otherwise omit its counts/chrome rather than fabricating them. A rounded `Write a comment` entry follows the summary when capability permits. A very secondary `Invite an organization` stub may appear outside the four-action strip if enabled; it does not create ticket/admin workflow and may be omitted from the artboard to keep THR-P focus.

The main Issue title/status remains more prominent than thread summary. Do not expand the full comment tree here; M153 owns nesting, composer detail and attachments. Clicking `View discussion` reveals that same block in place or opens the Issue context according to the approved interaction, preserving feed scroll.

## 10. Panel D — `THR-P-D` unavailable/fail-soft

Use the identical complete civic Issue and four-action strip. Replace only the thread presentation with `Discussion unavailable`, supporting copy `The Issue is still available. Try again later.`, and scoped `Try again`. Do not gray out the Issue title, media, `Open issue`, Share or unrelated civic actions. Do not show cached-looking comments/reaction counts unless an actual confirmed cache is retained and explicitly marked stale; this baseline panel has no cache. A retry returns only the discussion region to loading. A thread failure cannot be mislabeled as `No comments yet`.

## 11. Panel E — `THR-P-E` narrow/mobile

At 390 × 844 show a current light mobile board crop: 56 px app bar, 16 px page gutter, a full-width Issue post (viewport minus 32 px), 10 px radius, 16 px content padding, 40 px civic icon, 18/24 title and 14/20 summary. The same four labelled actions remain in one 52 px strip. Directly beneath, show the collapsed populated discussion state from C with the same two readable literal comment bodies, `View discussion`, composer entry if permitted and no separate boxed social card. Bottom navigation/safe area does not cover the thread controls. At 320 px use 12 px outer gutter and short approved localized action labels if needed, not an icon-only default. No gray skeleton bars or avatar circles in this successful state. The narrow presentation changes layout, not thread meaning.

## 12. Light/dark treatment and responsive geometry

Use current light tokens: page `#F7F6F2`, Issue warm surface `#FFFDF8`, primary `#101828`, secondary `#667085`, border `#E7E4DC`, action yellow `#F5C542` with navy text, accessible orange text link `#B54708`. No old all-dark sheet as default. Dark theme uses the same geometry with semantic dark page `#141417`, surface `#1B1C1F`, primary text `#F2F2F2`; M160 handles full parity comparison.

At 1440 × 1024, central feed is about 824 px in the three-column board and each post fills it. Use one large canonical panel to anchor the card; other state panels may crop the same post at readable size, showing enough Issue context to prove it survives. At 1024–1199 right modules relocate; 768–1023 uses centered feed; 320–767 uses one-column mobile. Rails are not independently scrollable. Long ET/RU/EN copy wraps without horizontal document overflow or tiny type.

## 13. Interactions, focus and return behavior

- Title/`Open issue` opens the existing Issue overlay/page. The action strip controls and overflow do not bubble into Issue open.
- `Comment` from collapsed feed opens/focuses the discussion context; if detail is required, use the same Issue overlay and preserve feed scroll/query. `View discussion` announces expanded state and preserves confirmed data. Collapse does not silently discard a draft.
- `React` opens the versioned reaction picker; reaction aggregate is read-only navigation to people surfaces; `Share` shares/copies the canonical public Issue link with feedback. None silently applies a reaction or invents a relationship.
- Composer activation by an unverified writer uses the existing `/verify` handoff with origin/draft preservation, not a duplicate inline identity form. Verification result is opaque. M152 may annotate this rather than showing the full gate.
- Thread `Try again` is scoped to the thread request. Focus remains on the trigger or moves predictably to a requested composer target; background refresh does not steal focus. The civic Issue stays usable.

## 14. Data dependencies and unavailable fields

| UI item | Current reviewed source | Honest boundary |
|---|---|---|
| Civic Issue | Gateway Issue projection | Independent from Threads; public Draft exposure still needs `DUI-Q01`. |
| Thread state | Public `GET /threads/issues/{issue_id}` | Loading, zero comments, populated and unavailable can be distinguished. |
| Comment count | `comments.length` | Derived only when full response is complete; API ordering/pagination absent. |
| Comment body | `comments[].body` | Render as actual text in populated previews; skeletons are exclusive to pending loads. |
| Root reaction aggregate | `thread_root_reactions.summary_marks[]` / `aggregate_count` | Show only confirmed values, no moderation reactions on root. |
| Actor selected reactions | `selected[]` with authenticated GET | Anonymous state must not pretend to have selections. |
| Comment author/avatar/time/media | Not present on thread read | Believable populated people and media are future-contract/demo visuals only (`DUI-Q04`, `DUI-Q05`). |
| Composer capability | Thread knobs and verification/write policy | Missing knobs do not imply permissive defaults; activation may gate or disable with explanation. |
| Feed social summary | No batch aggregate on Issue list | Progressive/lazy trees risk N+1 (`DUI-Q11`); do not invent embedded Issue counts. |

The 2026 current light modal mockups display illustrative people and content; they are visual density references, not evidence that the reviewed API supplies those public fields.

## 15. Accessibility and localization

Issue post is an article/region with civic heading. Thread has a distinct named `Discussion` region nested beneath it; the action row's four real buttons have visible labels and accessible names. Empty/error/loading use explicit copy and stable polite status updates; skeleton lines are not individually announced. Retry remains a keyboard-operable button and persistent until resolved. Expanded state is programmatically exposed; focus order follows Issue content/actions, then discussion summary, open action, composer entry and secondary invitation if present.

ET/RU/EN copy may expand 30–40%. State messages and populated comment bodies wrap, Issue title remains a full heading, and 200% zoom/320 px reflow stays one column. No meaning rests on yellow/red alone. Focus ring uses semantic token; touch targets are at least 44 px. Production comment bodies remain selectable and available to assistive technology. The artboard alone identifies its sample strings as fixtures outside the UI.

## 16. Forbidden representations

- Parallel social card, human author header or creator avatar replacing the civic Issue icon.
- Old dark M143 skin as current default; M143's `Invite organization` in place of current `Share`.
- Thread loading/error skeletonizing, dimming or removing civic Issue content.
- Empty state containing fake comments/reactions; error state presented as empty.
- Fabricated names, timestamps, author avatars, reaction totals, production metrics or preloaded results in loading/error panels.
- Gray skeleton rectangles or simulated avatar placeholders in populated C/E comment rows; these are reserved for A loading.
- Full reaction catalog inside four-action strip; moderation mark on thread root; inline phone/eID verification product.
- Escalation ticket/assignment workflow, new endpoint, marketing hero, Meta branding or regenerated DOGEstonia logo.

## 17. Artboard layout instructions

One consolidated sharp light state sheet titled `M152 · BOARD ISSUE POST / THREAD BLOCK · THR-P v2 · rev 4`. Use 2–5 large primary panels: A/B/C/D as readable desktop feed-post crops, with E as a linked 390 px mobile panel. Keep the same civic Issue block and action row in A–D, changing only the attached discussion region. If a repeated full-height media image would crowd the sheet, use the same no-media Issue fixture or a controlled crop of civic content; the comparison must still visibly prove civic persistence. Label state IDs outside functional UI and add one small ownership annotation `BoardIssuePost → IssueCardChrome + IssueThreadBlock`. No dense code diagrams, fake API fields or minute UI text. The old dark M143 sheet informs semantics but is not reproduced.

Emphasize the visual contrast: A neutral loading; B honest empty; C collapsed population with two legible sample comment bodies; D localized fail-soft; E narrow stack with the same legible bodies. All panels preserve current `React`, `Comment`, `Share`, `Reactions` row. Outside UI annotate the illustrative text and missing author/time contract. No gray comment rows in C/E.

## 18. Implementation handoff notes

Keep one component state model across feed/modal/detail with mount-specific density. Query Issue and thread independently; never route a thread error through the civic Issue error boundary. Validate thread payload before deriving counts; do not treat missing social fields as zero when the request failed. Load social summaries progressively or lazily until `DUI-Q11` resolves batching. Reconcile confirmed cache during refresh and mark stale data if failure follows it. Empty requires a successful response. `Share` remains fixed in the post row regardless of escalation-stub availability.

## 19. Acceptance checklist

- [ ] All five THR-P IDs A–E have readable labelled panels.
- [ ] A–D use the same civic Issue identity, `Open issue` and four-action strip.
- [ ] Thread begins directly under the action strip inside one continuous post shell.
- [ ] A has no fake people/counts; B is a true success/zero state; C is visibly collapsed; D fails only in the discussion region.
- [ ] C and E show both sample comment bodies as readable text; gray loading bars appear only in A.
- [ ] D retains civic title, content and unrelated actions as usable.
- [ ] E keeps the same hierarchy and all four labels at 390 px without horizontal overflow.
- [ ] No historical `Invite organization` replaces Share or creates an admin/ticket flow.
- [ ] Demo social details are not presented as current production fields.
- [ ] Light tokens, focus, localization and state announcements remain legible.
- [ ] Generated pixels are audited against this spec; only implementation-relevant semantic errors demand regeneration.

## 20. Open decisions requiring product/API answer

| ID | Question | M152 handling |
|---|---|---|
| `DUI-Q11` | Batch, embedded or lazy feed social summary strategy? | Illustrate progressive region; do not invent Issue-embedded counts. |
| `DUI-Q04`/`DUI-Q05` | Public author/time and attachment read contracts? | Render available `body` text; omit unsupported identity/time/media. |
| `DUI-Q10` | Comment ordering/pagination contract? | No “newest”/“relevant” promise in feed summary. |
| `DUI-Q01` | Public Draft exposure? | Demo Issue does not settle publication rule. |
| Invitation visibility | When should secondary `EscalationStub` appear? | Optional placement only; M156 governs states/feedback. |
