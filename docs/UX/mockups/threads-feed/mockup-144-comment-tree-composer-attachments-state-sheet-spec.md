# M144 — THR-T Comment tree + composer + attachments

Status: Proposed — active semantic SSOT for this artboard  
Surface: `IssueThreadBlock` on public `/board` and `/issue/:id`  
Parent composition: M143 / THR-P `BoardIssuePost` revision 1.1  
Scope: visual/product specification only; no implementation contract  
Priority: MUST

## 1. Purpose

Define the internal discussion interaction chrome for an Issue: nested comment relationships, the configured maximum-depth boundary, reply composer context, attachment references, and visible soft-failure recovery.

M144 elaborates the `IssueThreadBlock` slots established by M143. It does not redesign the civic Issue card or create a separate social product.

## 2. Product and semantic locks

- The discussion remains subordinate to the civic Issue.
- The same `IssueThreadBlock` interaction language is used on `/board` and `/issue/:id`.
- Comment nesting is supported only up to the node-configured maximum depth. The artboard must not choose or imply a fixed numeric product limit.
- Reply relationships must be understandable through indentation, connector lines, explicit reply context, or a combination of these.
- Reaching the configured maximum is an intentional boundary, not an error.
- Attachments are references associated with the draft/comment. They are not a gallery, media library, or file-management product.
- The legal media safety floor is mandatory and cannot be disabled by a resident, moderator, administrator, node, or pack.
- Post and attachment failures are visible, preserve recoverable user input, and provide a clear next action.
- No fabricated people, believable comments, engagement counts, HTTP paths, request fields, or response JSON appear in the artboard.

## 3. Continuity with M143

The artboard must preserve M143 revision 1.1 visual anatomy:

1. one continuous dark post/thread shell;
2. compact civic Issue object header and Issue content above the thread crop;
3. internal hairline dividers rather than detached nested cards;
4. familiar social-feed rhythm using DOGEstonia semantics and tokens;
5. rounded composer anchored after the visible comments;
6. no human author header for the Issue itself.

M144 may crop most of the Issue body to give the comment tree enough space, but every panel must retain a small, unmistakable `IssueThreadBlock` context header such as `Discussion · Issue DE-042`.

## 4. State matrix

| ID | State | Required visual result |
|---|---|---|
| THR-T-A | Nested tree within max depth | Clear parent/child hierarchy below the configured boundary |
| THR-T-B | Max depth reached | Deepest visible comment has no deeper reply affordance and explains the limit |
| THR-T-C | Reply composer open | Composer identifies the parent comment and provides text, attach, cancel, and post affordances |
| THR-T-D | Attach allowed | Attachment reference is visible as a compact chip/row inside the composer |
| THR-T-E | Attach denied / floor soft-fail | Attach is unavailable or rejected with honest inline feedback and no safety bypass |
| THR-T-F | Post soft-fail | Failed post is visible; draft remains recoverable and retry is available |

## 5. Shared comment anatomy

Each illustrative comment row may contain:

- neutral circular identity placeholder or generic actor marker;
- non-believable placeholder label such as `Comment preview` or `Reply preview`;
- one or two abstract text lines rather than fabricated prose;
- optional neutral metadata placeholder;
- labelled actions `React` and `Reply` where allowed;
- a compact overflow control for future comment-level actions.

Do not use real-looking names, profile photographs, quotations, timestamps, reaction counts, popularity ranks, or moderation marks at the thread root.

## 6. Tree hierarchy

- Root comments align with the main thread content column.
- Each reply level adds a modest indentation and a thin vertical/curved connector.
- Indentation must remain readable without consuming most of the mobile width.
- Use explicit `Reply to …` context in the composer so relationship does not depend on geometry alone.
- Collapse or continuation affordances may be shown as neutral placeholders, but M144 must not invent pagination or retrieval behavior.
- The deepest configured level remains visually connected to its parent.

## 7. State specifications

### THR-T-A — Nested tree within configured maximum

Show a comment tree with at least three relational positions:

1. a root `Comment preview`;
2. a first-level `Reply preview`;
3. a deeper `Nested reply preview` that is still below the configured maximum.

Requirements:

- indentation and connector lines make the parent/child chain obvious;
- `Reply` remains available on nodes that may accept another child;
- `React` remains visually secondary;
- the bottom composer remains available for a new root comment;
- no numeric maximum is stated.

### THR-T-B — Configured maximum depth reached

Show the same hierarchy at its deepest permitted node. On the max-depth comment:

- omit or disable the deeper `Reply` action;
- show concise boundary copy: `Maximum reply depth reached`;
- keep `React` and other permitted comment-level controls available;
- do not present the boundary as a server error;
- do not suggest changing the node limit from this screen.

If the UI offers a response alternative, it may invite a new root comment or a reply to an eligible ancestor, but it must not visually create another child beneath the maximum-depth node.

### THR-T-C — Reply-to-comment composer open

Show an expanded composer attached to or immediately following the selected parent comment:

- context bar `Replying to Comment preview`;
- clear close/cancel control that returns to the prior tree state;
- multiline text field with placeholder `Write a reply`;
- attach affordance with icon and localized text/accessible label;
- primary `Post reply` action;
- neutral `Cancel` action.

The selected parent is visually emphasized with a subtle outline or connector. Opening the reply composer does not duplicate the entire thread or open an unrelated modal.

Write gate annotation: an unverified writer is routed through existing `/verify` and returned to the originating comment context. Do not show an inline phone/eID flow.

### THR-T-D — Attachment allowed

Show the open composer after the floor permits an attachment:

- attach button remains available for another permissible reference if product limits allow;
- selected item appears as a compact attachment reference chip/row within the composer;
- chip may show a generic file/photo icon, non-specific label `Attached file`, and remove control;
- optional neutral readiness copy `Ready to post`;
- composer text and `Post reply` or `Post comment` remain the primary task.

Do not show a gallery grid, crop editor, asset browser, upload endpoint, storage provider, internal reference id, or raw file metadata.

### THR-T-E — Attachment denied / safety-floor soft-fail

Show the composer and preserve any typed text. Represent either of these valid patterns:

- attach affordance disabled/hidden for the current context with helper copy; or
- attempted attachment removed/rejected with an inline warning.

Preferred honest copy:

- `This attachment can’t be added.`
- `It does not meet the required media safety rules.`

Requirements:

- message appears next to the attachment area, not only in a transient toast;
- resident can continue editing or post text when permitted;
- rejected attachment does not appear as successfully attached;
- no control, link, role switch, checkbox, or administrator escape hatch can disable legal media or CSAM protection;
- do not expose sensitive detection categories, scores, vendor names, or internal policy payloads.

### THR-T-F — Comment post soft-fail

Show an attempted post that did not complete:

- prominent inline error inside the composer: `Comment wasn’t posted.`;
- recovery copy: `Your text is still here. Try again.`;
- original typed draft remains visibly present;
- permitted attachment reference remains visible if it is still valid;
- primary recovery action `Try again`;
- neutral option `Keep editing` or `Cancel`.

An optional toast may reinforce the error, but it cannot be the only feedback. Never clear the composer, silently drop the draft, insert a duplicate comment, or pretend success.

## 8. Composer behavior and hierarchy

- Root composer placeholder: `Write a comment`.
- Reply composer placeholder: `Write a reply`.
- Composer is compact when inactive and expands in place when active.
- Attach is secondary to text composition.
- Post action is the only yellow primary control inside the active composer.
- Cancel, remove attachment, retry context, and overflow actions use neutral treatment.
- Empty text and posting eligibility are expressed through normal disabled/active control states without invented validation fields.
- Posting state may show a small progress indicator while preserving the draft surface.

## 9. Attachment reference presentation

An attachment reference is represented by one compact inline object:

- generic file or photo symbol;
- generic human-readable label;
- optional allowed status;
- remove action before posting.

The mockup must not show:

- a full media gallery;
- drag-and-drop file manager;
- cloud provider branding;
- raw ids, hashes, storage keys, URLs, or upload endpoint names;
- a control to lower or bypass safety screening.

## 10. Failure and recovery principles

- Errors appear where the user can act on them.
- Draft text survives recoverable failures.
- Attachment failure and comment-post failure are distinct states.
- `Try again` retries the intended user action; it does not create a new visible duplicate.
- Error styling uses icon + text + restrained border/tint and never relies on color alone.
- Civic Issue content remains readable if comment functionality fails.

## 11. Visual system

- Canvas: `#141417` or token-close.
- Thread/post surface: `#1B1C1F` with thin cool-grey dividers.
- Primary text: `#F2F2F2`; muted text: `#9A9DA6`.
- Signal yellow: `#F5C542`, restricted to primary post/retry emphasis and active focus.
- Failure: restrained warm red/amber accent with explicit text; avoid alarming full-panel fills.
- Comment identity placeholders use neutral greys, not profile photography.
- Tree connectors remain subtle but visible at normal zoom.
- Use the social-feed density established in M143 revision 1.1; do not revert to detached technical cards.
- No Facebook blue, branded reactions, copied icons, or Meta language.

## 12. Responsive behavior

- Desktop: comment content remains readable at the existing feed width; indentation increments are modest.
- Mobile: reduce indentation per level, preserve connector lines, and keep at least a practical text column width.
- If the configured depth would make content too narrow, use stronger connectors/context labels rather than ever-smaller text.
- Composer controls wrap predictably; `Post reply` remains easy to reach.
- Attachment chip wraps or truncates its generic label without hiding remove/error state.
- No horizontal scrolling.

## 13. Accessibility and localization

- `Reply`, `React`, `Attach`, `Remove attachment`, `Post reply`, `Try again`, and `Cancel` retain visible or accessible text labels.
- Parent/reply relationship is not conveyed by indentation alone.
- Maximum-depth state is announced as a boundary, not as a disabled mystery control.
- Attachment rejection and post failure are announced and remain visible until resolved or dismissed.
- Focus moves into the opened reply composer without losing the selected parent context.
- After successful or cancelled reply, focus returns to a sensible comment-level control.
- All interactive targets meet the existing minimum touch target.
- Copy containers allow approximately 30–40% localization expansion.

## 14. Data, privacy, and security boundaries

- No HTTP routes or endpoint names.
- No JSON, schema fields, internal attachment refs, hashes, storage keys, or moderation payloads.
- No verification method details.
- No safety classifier category, score, provider, or bypass mechanism.
- No fabricated public identities or personal data.
- Attachment previews must not expose unsafe or denied media.

## 15. Artboard composition

Produce one consolidated landscape state sheet titled:

`DOGEstonia — Comment Tree + Composer + Attachments — M144 / THR-T`

Recommended hierarchy:

- large left panel: THR-T-A nested tree;
- large center panel: THR-T-C reply composer open;
- right or lower large panel: THR-T-B maximum-depth boundary;
- three compact lower panels: THR-T-D attach allowed, THR-T-E attach denied, THR-T-F post soft-fail;
- narrow annotation rail: hierarchy, floor, draft preservation, write gate, and prohibited patterns.

Each panel shows a cropped `Discussion · Issue DE-042` context rather than repeating a full Issue card. The sheet must remain visibly continuous with M143.

## 16. Required annotations

- `Configured max depth — no fixed number in UI contract`
- `Parent/child relationship uses indentation + connector + reply context`
- `Max-depth node has no deeper Reply affordance`
- `Attachment = reference chip, not gallery`
- `Safety floor cannot be disabled`
- `Denied attachment does not erase draft text`
- `Post soft-fail preserves draft and exposes retry`
- `Unverified write → existing /verify → return to comment context`
- `No endpoint names or JSON`

## 17. Anti-patterns

- Unlimited nesting or a visually created child below the configured maximum.
- Tiny unreadable comments caused by excessive mobile indentation.
- A disabled `Reply` icon with no explanation at maximum depth.
- Modal composer detached from the selected parent.
- Attachment gallery, file manager, or upload administration UI.
- Safety bypass, `disable protection`, or role-based override.
- Showing rejected/unsafe media as a preview.
- Toast-only failure that disappears without preserving the draft.
- Silent post drop, cleared composer, optimistic fake success, or duplicate comment.
- Fake names, avatars, comment prose, counts, endpoints, ids, or JSON.
- Facebook assets, reaction artwork, or blue product styling.

## 18. Acceptance checklist

- [ ] All six labelled states THR-T-A…F appear on one sheet.
- [ ] Nested parent/child hierarchy is immediately understandable.
- [ ] No fixed numeric maximum depth is invented.
- [ ] Max-depth node does not offer a deeper reply and explains why.
- [ ] Reply composer clearly names its parent context.
- [ ] Composer includes text, attach, cancel, and post affordances.
- [ ] Allowed attachment is a compact reference chip, not a gallery.
- [ ] Denied attachment produces persistent honest feedback with no bypass.
- [ ] Post failure is visible and preserves the draft.
- [ ] Mobile-aware indentation and composer behavior are annotated.
- [ ] DOGEstonia tokens and M143 continuous-shell language are preserved.
- [ ] No fabricated people, comments, metrics, API routes, fields, or JSON appear.

## 19. Design goal

A developer should be able to implement a familiar, resilient threaded-comment experience without guessing how replies relate, what happens at the configured depth boundary, how attachments appear, or how failures recover. The result feels socially intuitive while remaining a controlled civic discussion layer attached to an Issue.
