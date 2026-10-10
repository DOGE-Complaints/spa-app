# DOGEstonia — M158 Issue Modal, Mobile Sheet & `/issue/:id` Parity (THR-I v2) State-Sheet Specification v1.0

**Package:** M158, ninth in the approved M149–M160 sequence  
**Status:** **accepted** for handoff (revision 2); written implementation contract remains authoritative · residual → [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) · accepted 2026-10-08T12:23:48Z  

**Date:** 2026-10-08  
**Target:** current light desktop Issue modal, mobile full-screen Issue sheet, and existing `/issue/:id` detail route  
**Predecessors:** M152 rev4, M153 rev2, M154 rev2, M155 rev3 and M157 rev2 **accepted** (handoff 2026-10-08).  

**Artboard:** `generated_images/exec-dc8cdea3-d9e3-4249-8d44-938728af9be0.png`, revision 2.

**Visual audit, 2026-10-08:** Revision 1 incorrectly showed known Issue identity and actions in F1 civic loading and left an active composer in C2 thread unavailable. Revision 2 confines F1 to a generic Issue skeleton and loading label, and C2 to a scoped Discussion error/retry. A/B/D/E preserve the same Issue and literal comment bodies across modal, route and sheet. The repeated illustrated Issue media is a fixture pending public media resolution; tiny generated summary typography in the mobile crop does not supersede the exact fixture copy in §2. Product acceptance pending.

## 1. Purpose and scope

Prove that opening a board Issue in a desktop modal, mobile sheet or direct `/issue/:id` page changes the parent presentation, not the civic Issue or the discussion product. Use the same `IssueCardChrome` / `IssueThreadBlock` logical components, state copy, actions, reaction semantics, comment body and write gate across mounts. Add loading, empty, unavailable, not-found/error, focus/scroll restoration. This sheet does not redesign the board, Verify, reactor people surfaces or a new route.

Approved backlog M158, Unified State Inventory §12 and §§20–25, Component & Variants Specification §§17–28 and 39, Interaction & Behavior Specification §§7, 12–16, 20, 28 and 44, Data-to-UI Contract §§7, 11, 14–17, 24–27, historical M148 semantic scaffold and current light Issue modal images govern the result. M148's old dark skin and abstract loaded comment lines are superseded. Written state meanings override generated pixels.

## 2. Visual and data continuity

Current light references `exec-fe77a140-fddd-4f1c-a24a-adb6b648064f.png` (collapsed modal) and `exec-ac4e3f60-8c03-40f0-8896-b3776bd1d6b8.png` (expanded modal) establish a centered scrollable Issue overlay, fixed close/header region, continuous civic content/action strip/discussion and a composer near the bottom. They contain illustrative person names/portraits, timestamps, comment media and `Most relevant`; the reviewed thread read has **no author/time, attachment read or ordering contract**. M158 must use literal body text in populated comments without pretending these fields are available. The current civic media illustration is a visual reference only until a public media URL/alt contract is approved; the artboard can use a no-media Issue to keep states comparable.

Fixed illustrative Issue: `UV-024`, `OPEN`, `NEIGHBOURHOOD SUPPORT`, `Uus Veerenni`, title `A trusted neighbour network for pet care`, summary `Residents need a simple way to find trusted neighbours for dog sitting, cat visits and short-term pet care close to home.`, labels `Pets` and `Mutual help`. Same civic fixture in all successful panels. Populated comment bodies: `I can help coordinate a shared pet-care group for neighbours.` and `A simple sign-up list would make it easier to start.` They are labelled outside UI as illustrative fixture prose. In production render returned `comments[].body` literally and accessibly; gray skeletons only for pending loads. No believable author header, avatar circle, time, reaction person or invented count.

## 3. Component and route ownership

```text
Board feed wrapper → IssueModal (desktop) / IssueSheet (mobile)
Direct navigation → existing /issue/:id detail parent
Both parents → IssueCardChrome + the same IssueThreadBlock
```

The feed wrapper test id `board-issue-post` belongs only to feed. The shared thread test id `issue-thread-block` remains the same in modal, sheet and detail. The parent controls shell geometry, close/back, scroll containment and route history; the shared children own civic and thread display. Fetch civic Issue and thread independently; a social failure never replaces civic content. Direct route not found is an Issue-body state; thread retry cannot repair a missing Issue.

## 4. State matrix and artboard panels

| State | Trigger | Required visual result | Panel |
|---|---|---|---|
| `OVERLAY-ISSUE-DESKTOP` collapsed | Open Issue from board | Full civic Issue + current four actions + collapsed Discussion | A |
| `OVERLAY-ISSUE-DESKTOP` expanded | Open Discussion | Same modal, literal comments/tree and composer | B |
| `THR-I-B-empty` | Successful thread with zero comments | Same Issue, `No comments yet`, write entry if allowed | C1 |
| `THR-I-B-unavailable` | Thread read fails | Same Issue intact, Discussion unavailable and scoped Try again | C2 |
| `THR-I-A` | Direct `/issue/:id` populated | Full civic detail first, same `IssueThreadBlock` below | D |
| `THR-I-C` | Mobile opened from feed | 100vw × 100dvh full-screen Issue sheet, one body scroll | E |
| `ISSUE-DETAIL-LOADING` | Civic detail pending | Stable modal/page shell and Issue skeleton; no fake content | F1 |
| `ISSUE-DETAIL-NOT-FOUND` | Authoritative 404 | `Issue not found`, return to board | F2 |
| `ISSUE-DETAIL-ERROR` | Civic detail error | `Couldn’t load this Issue`, Retry and board return | F3 |

Use 2–5 large primary panels (A, B, D, E) and small legible C/F insets. All panels clearly identify surface and state. The written spec covers panel interactions when sheet pixels cannot show every focus state.

## 5. A — desktop modal, collapsed Discussion

From `/board`, title/Open issue opens a centered viewport-safe modal about 960–1040 px wide over a dimmed board, preserving the feed's query, filters, list/map mode and scroll. The modal has an accessible `Issue UV-024` title, close, one internal body scroll, civic identity/status/title/summary/labels, optional genuine media slot only if renderable, and fixed current action row exactly `React | Comment | Share | Reactions`. Beneath its internal divider, `Discussion` shows the collapsed populated preview with **actual readable body text**, `View discussion` and `Write a comment` entry. No `Most relevant` until ordering contract exists. Reaction aggregate only if confirmed; do not synthesize counts from people.

Composer may be docked within the modal, but it cannot cover comment controls or trap content behind a second scroll. Public civic Issue is primary, Discussion subordinate. Clicking an action-strip control does not bubble into a second Issue open.

## 6. B — desktop modal, expanded Discussion

Same Issue shell and modal identity; the body scroll position can bring Discussion into view while header/close remain stable. `View discussion` expands the same `IssueThreadBlock` with two literal comment bodies, `React`/`Reply` at eligible nodes, modest connectors and composer. No separate comment modal or new route. The visual tree cap is three indentation levels, while reply permission respects node-configured `max_depth`. If a draft exists, collapsing or closing cannot silently discard it. The returned thread data is shared/cached coherently with other mounts, not duplicated as an unrelated data model.

## 7. C — empty and unavailable thread parity

C1 success zero: `Discussion`, `No comments yet`, `Start a constructive discussion about this Issue.`, `Write a comment` when capability is known. No fake preview, reaction count or error styling. C2 failure: `Discussion unavailable`, `The Issue is still available. Try again later.`, scoped `Try again`. Civic Issue title/content/actions and modal close remain usable. Thread retry affects the thread only and returns that region to loading. Confirmed cached comments may remain with explicit stale state if product data really supports it; baseline C2 has no cache. Both states use identical copy/meaning on detail page and mobile sheet.

## 8. D — direct `/issue/:id` detail with same thread

Direct route keeps the existing public shell and fuller civic detail composition. Civic Issue identity/title/status/summary/labels and approved detail fields read first; optional schema overlay appears only when nonempty and supported. Below a section divider, mount exactly the same `IssueThreadBlock` with the same populated body text, action names, tree/composer, reactions and gate. It can use full density and more vertical space, but not a detail-only comments vocabulary, extra social sidebar or second reaction catalog. Existing route only `/issue/:id`; do not invent `/issue/:id/comments` or thread-specific page. On refresh/deep link, route can load independently of prior board context; back returns according to normal history, with a visible `Back to board` path.

## 9. E — mobile full-screen sheet

At 390 × 844, an Issue opened from board uses a full-screen sheet with a recognizable app bar/close-back, one scrollable body, civic identity and content first, four labelled actions, then Discussion and composer. No desktop scrim mini-modal, fixed sidebar or horizontal split. The composer may stick above software keyboard when active; bottom navigation hides while sheet/keyboard owns focus. Reply indentation uses 24 px and caps visually at three levels without shrinking text. Sheet close/back restores originating feed position and focus; on direct `/issue/:id` mobile navigation, the same content stacks in a route page with history back. M159 later tests 360/320 and keyboard pressure in detail.

## 10. F — civic Issue loading, not found and error

F1 Issue query pending: stable overlay/page header and civic skeleton only, with explicit `Loading Issue…`; do not show known-populated thread or fake comments while Issue identity is unknown. Thread can load independently after Issue identity exists. F2 authoritative HTTP 404: `Issue not found` and `Back to board`, without stale Issue details or comment composer. The reviewed Gateway may put a generic body code on 404, so HTTP status governs. F3 transport/invalid body/other server failure: `Couldn’t load this Issue`, `Try again`, `Back to board`. Shell remains navigable; this is different from C2, where Issue is loaded and only Discussion failed. Do not treat failure as zero results.

## 11. Focus, scroll, history and draft behavior

Opening from feed stores trigger and scroll/query context; background scroll locks, focus moves to overlay heading or close. One modal body scroll contains civic and thread. Tab stays inside the active modal, Escape closes topmost dismissible overlay, mobile Back closes the topmost sheet first. Close unlocks board scroll, restores exact feed anchor and focus to originating Open issue/title control; filters/view mode persist. A dirty composer remains recoverable in session or requires explicit discard confirmation before destructive close. Opening a nested reaction picker/people dialog then pressing Escape dismisses only that top layer.

Direct route has normal page focus and history, no invented feed scroll to restore when none exists. Thread expansion announces state and preserves visible content; error retry is scoped. Verification `/verify` return restores modal/sheet/page origin and draft per M157, without auto-submit. No double opening from action-strip controls.

## 12. Data and implementation boundaries

| Surface/data | Confirmed source | Boundary |
|---|---|---|
| Civic Issue | Gateway detail projection | Independent from thread; public status exposure still `DUI-Q01`. |
| Thread | `GET /threads/issues/{issue_id}` | Same tree model across mounts, literal `body`, parent/depth. |
| Count | Complete `comments.length` | Do not claim pagination/total beyond known response. |
| Reaction aggregate | Confirmed marks/count | No reactor identities from aggregate; M155 target visual is API-blocked. |
| Author/time/media | No thread read fields | Omit live-looking rows and comment media until `DUI-Q04/Q05`. |
| Sorting | No ordering contract | No `Most relevant`/`Newest` label without `DUI-Q10`. |
| Issue media | Public render URL/alt absent in reviewed contract | Fixture image illustrative; no required image in state sheet (`DUI-Q03`). |
| Route | Existing `/issue/:id` | No additional comments route or endpoint. |

## 13. Light style, localization and accessibility

Current light tokens: page `#F7F6F2`, surface `#FFFDF8`, text `#101828`, secondary `#667085`, border `#E7E4DC`, yellow `#F5C542`. Modal radius/shadow and warm white card rhythm follow current references. Dark parity is M160; no dark historical M148 default. At 200% zoom/320 px, reflow to one column and avoid clipped controls. ET/RU/EN copy may expand 30–40%. Headings preserve hierarchy: Issue title is page/dialog heading, Discussion subordinate. Civic and social statuses have distinct accessible names; skeleton lines are not individually announced. Close/Back, Retry, View discussion and composer controls have ≥44 px touch targets and visible focus rings.

## 14. Artboard instructions and forbidden representations

Title `M158 · ISSUE MODAL / SHEET / PAGE PARITY · THR-I v2 · rev 1`. One consolidated sharp landscape state sheet. Use A and B as substantial modal crops at readable UI scale; D is a page detail crop; E a 390 px sheet; C and F compact but legible state tiles. If full Issue media crowds the comparison, use the same no-media civic fixture throughout. External annotation `Same IssueThreadBlock · three parent mounts`, `Thread failure leaves Issue intact`, `Close restores board scroll/focus`, `Literal comment body; author/time/media/sort pending contract`. Avoid generated text smaller than functional UI. Preserve current four-action strip wherever post actions are shown.

Forbidden: social card replacing civic Issue, different comments component/copy on `/issue/:id`, generic avatar skeletons in loaded comments, root author identity, unsupported sort label, fabricated people or production counts, full-page failure for thread-only error, Issue details underneath an authoritative 404, new route/API, desktop mini-modal on mobile, nested body scrolls, silent draft loss or focus/scroll reset.

## 15. Acceptance checklist

- [ ] A collapsed and B expanded show the same desktop Issue modal and same discussion component, with readable comment body text.
- [ ] C empty and unavailable preserve civic Issue and use M152 copy/behavior.
- [ ] D keeps full civic detail primary and mounts shared `IssueThreadBlock` below, on existing `/issue/:id`.
- [ ] E orders Issue → actions → Discussion in one mobile sheet scroll with accessible close.
- [ ] F distinguishes Issue loading, authoritative 404 and Issue load error from thread-only failure.
- [ ] Close/back/focus/scroll restoration and dirty draft rules are annotated without inventing a second route.
- [ ] Four-action strip remains React, Comment, Share, Reactions; loaded comments are literal text, no author/time/media/sort claims.
- [ ] Artwork is audited against this specification; implementation-relevant semantic errors are corrected.

## 16. Open decisions

| ID | Decision | M158 handling |
|---|---|---|
| `DUI-Q03` | Public Issue media resolution/alt | No-media state sheet or externally labelled illustrative media. |
| `DUI-Q04/Q05` | Comment author/time and attachment read | Literal body only; no invented production people/media. |
| `DUI-Q10` | Comment order/pagination | No unsupported sort label or fake total. |
| `DUI-Q19` | Stable 404 body code | Use authoritative HTTP 404 for not found. |
| Modal history policy | Close vs browser Back in nested overlay stack | Preserve board route/query/scroll and restore focus; implementation chooses safe history mechanics. |
