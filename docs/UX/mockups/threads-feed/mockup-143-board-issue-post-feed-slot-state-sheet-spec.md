# M143 — THR-P BoardIssuePost (feed post slot)

Status: Proposed — active semantic SSOT for this artboard, visual revision 1.1  
Surface: public `/board` feed; continuity target `/issue/:id`  
Scope: visual/product specification only; no implementation contract  
Priority: MUST

## 1. Purpose

Define how an existing civic Issue card and its discussion shell appear as one feed-row composition without replacing or weakening the Issue identity.

`BoardIssuePost` is the composition wrapper. It contains:

1. the existing civic Issue card chrome;
2. one `IssueThreadBlock` directly beneath it.

The thread is subordinate to the Issue. The result should deliberately use the familiar anatomy and reading rhythm of a Facebook-style feed post—one continuous card, compact object header, content, engagement/action strip, comments, and composer—while remaining DOGEstonia civic-tech UI and without reproducing Facebook/Meta branding, assets, colors, reaction icons, or product copy.

### Visual revision 1.1

The first M143 draft separated the Issue card and discussion into two visibly boxed technical panels. Revision 1.1 removes that excessive separation. The civic Issue area and `IssueThreadBlock` remain distinct semantic regions, but they now read as one continuous post shell with internal dividers, matching the natural feed rhythm shown in the supplied desktop and mobile social-post references.

## 2. Product and semantic locks

- The Issue remains the root civic object. Its title, summary, type, labels, status, dates, and existing open affordance remain primary.
- `IssueThreadBlock` never replaces the Issue card and is not rendered as an independent competing social card.
- The thread attaches to an Issue, not to a Story, person, Early Signal, or Emerging Signal.
- Comments and reactions do not change Issue status, clustering, prioritization, or civic evidence.
- The primary placement is one row in the public `/board` feed.
- The same `IssueThreadBlock` language is reused on `/issue/:id`; there is no second detail-page social product.
- Public header, footer, navigation, search, and filters remain existing chrome. The artboard frames only the relevant feed row.
- Progressive shell is required: the civic Issue may render before, without, or after discussion data.
- Fail-soft is required: discussion failure cannot make the Issue unreadable or remove its existing actions.
- Empty, loading, and unavailable states contain no fabricated comments, profiles, reaction counts, or engagement metrics.

## 3. Composition anatomy

### 3.1 `BoardIssuePost`

- Outer feed-slot wrapper; projected test id annotation: `board-issue-post`.
- Keeps the existing Issue card width, feed alignment, border radius, and spacing rhythm.
- Uses one continuous outer card/shell. Civic content and thread are separated by internal hairline dividers, not independent rounded boxes with a large gap.
- Follows the familiar vertical rhythm: compact Issue identity row → title/summary/civic metadata → engagement summary/action row → comment summary/tree → composer.
- Must not wrap the Issue in a new author/avatar/date social header.

### 3.2 Existing civic Issue card

- Render unchanged from the current public board visual language.
- Preserve existing civic hierarchy and `Open issue` affordance.
- Its compact top row may resemble a social-post header structurally, but it represents the civic object: Issue icon/type, Issue id, location/date, status, and overflow control. It must never imply a human author profile.
- Title and summary occupy the post-content position. Type/labels/status/date remain visible civic identity, not hidden metadata.
- May use civic-only fields or the optional SSR-C schema overlay; SSR-C is not required to understand THR-P.
- Must remain fully legible in all five states.

### 3.3 `IssueThreadBlock`

- Directly follows the Issue content inside the same uninterrupted feed card; projected test id annotation: `issue-thread-block`.
- Uses the same base surface with internal spacing/dividers, rather than a second nested card. A slight tonal step is allowed only when needed for hierarchy.
- Contains only state-relevant discussion chrome.
- Detailed tree, reaction picker, composer, and escalation interactions belong to later THR-T / THR-R / THR-E specs. M143 shows their placement and hierarchy, not their full interaction model.

### 3.4 Facebook-like interaction anatomy, DOGEstonia semantics

- A slim engagement summary line may sit below Issue content when data exists.
- A full-width action row uses evenly distributed labelled actions such as `React`, `Discussion`, and `Invite organization`; DOGEstonia labels and icons must be used.
- `Open issue` remains a clear civic navigation affordance and cannot be replaced by the social action row.
- Comment previews use compact identity marker + content bubble/column geometry, reply indentation, and per-comment action placement familiar from contemporary social feeds.
- In the state sheet, comment bodies and people remain neutral placeholders to avoid fabricating content; later data-populated screens may render real public thread data.
- The composer is a rounded full-width input affordance at the bottom of the thread, visually anchored like a social-feed composer but labelled `Write a comment` and governed by the DOGEstonia write gate.

## 4. State matrix

| ID | State | Required visual result |
|---|---|---|
| THR-P-A | Loading | Complete readable Issue card with restrained discussion loading chrome beneath it |
| THR-P-B | Empty | Honest no-comments state and composer affordance; no fake activity |
| THR-P-C | Populated | Collapsed discussion summary, open-tree affordance, reaction-summary slot, composer slot, and soft escalation slot |
| THR-P-D | Error / unavailable | Complete readable Issue card plus compact `Discussion unavailable` fail-soft message |
| THR-P-E | Narrow / mobile | Vertical Issue → thread stack with the same hierarchy and no horizontal overflow |

## 5. State specifications

### THR-P-A — Loading thread chrome

Show the civic Issue card in its normal complete state. Directly below it, show a compact `IssueThreadBlock` with:

- section label `Discussion`;
- copy `Loading discussion…`;
- two or three neutral skeleton lines or a restrained activity indicator;
- stable minimum height to avoid a large layout jump when the state resolves.

Do not show comment totals, reaction totals, user names, avatars, comment text, or disabled controls that imply already-loaded data. Loading treatment applies only to the thread; the Issue card is not skeletonized.

### THR-P-B — Empty thread

Show the complete civic Issue card followed by:

- section label `Discussion`;
- primary empty copy `No comments yet`;
- supporting copy `Start a constructive discussion about this Issue.`;
- visible composer affordance labelled `Write a comment`.

No fake first comment, sample avatar, reaction total, social proof, or empty reaction strip. If the writer is not verified, activation of the composer is governed by the package write gate; the empty state itself must not contain an inline verification flow.

### THR-P-C — Populated thread, collapsed

Show the complete civic Issue card followed by a denser but subordinate thread block. It must reserve visible slots for:

1. **Collapsed tree summary** — a compact `Existing discussion` summary with neutral structural preview rows. The artboard must not invent people, quotations, or believable comment content.
2. **Open-tree affordance** — `Open discussion` with a directional chevron or equivalent. It expands/navigates into the tree interaction defined later by THR-T.
3. **Reaction summary slot** — clearly labelled `Reactions` or equivalent; detailed layer choices and picker behavior are deferred to THR-R. Do not put moderation marks on the thread root and do not fabricate reaction counts.
4. **Composer affordance** — `Write a comment`; detailed composer, attachment, and verification behavior is deferred to THR-T.
5. **Soft escalation control** — `Invite an organization`; visually secondary and clearly an invitation, not an administrative assignment. Detailed feedback is deferred to THR-E, but the control must not imply a new organization/admin API.

The Issue remains more prominent than the discussion summary. Arrange these slots in a Facebook-like sequence: engagement/reaction summary → evenly distributed action row → collapsed comment previews → rounded composer. Yellow marks active/primary emphasis only; secondary actions use neutral icon+text treatment.

### THR-P-D — Social unavailable / fail-soft

Show the complete civic Issue card unchanged. Replace only the thread content with:

- section label `Discussion`;
- primary message `Discussion unavailable`;
- supporting copy `The Issue is still available. Try again later.`;
- optional neutral `Try again` action.

Do not remove, dim, skeletonize, or disable the civic Issue card. Do not create fallback comments or cached-looking reaction values.

### THR-P-E — Narrow / mobile

Show one mobile-width feed row with:

- existing compact public-board Issue card first;
- `IssueThreadBlock` directly beneath it at the same width;
- a continuous edge-to-edge post rhythm inside the mobile feed: compact civic object header, content, action strip, comments, and composer;
- vertical stacking for summary, `Open discussion`, composer, and escalation controls where necessary;
- touch targets at least 44 px high;
- wrapping labels and civic metadata without horizontal scrolling;
- no persistent side rail and no filter drawer redesign.

The mobile example should demonstrate a usable populated or collapsed-summary state. It is not a different product mode.

## 6. Write gate and return behavior

- Read access to the Issue and thread shell is public according to the existing board rules.
- Any write action consumes only the opaque `identity_verified` result.
- If unverified, write activation routes to the existing `/verify` surface and returns the person to the originating feed/post context.
- Do not show phone, eID, or another verification method in the gate-result chrome.
- Do not create inline verification fields inside `IssueThreadBlock`.

M143 may annotate this behavior near the composer slot but must not visualize a second verification product.

## 7. Reactions, attachments, and escalation boundaries

- Reaction behavior is `reactions.v1` only.
- Detailed reactions retain three labelled layers: emotional, epistemic, and moderation. Localized text is authoritative; icons or emoji are visual aids only.
- `agree` and `disagree` are mutually exclusive.
- Moderation marks are not placed on the thread root.
- M143 shows only the reaction-summary slot; it does not design the picker.
- Attachments are refs/ids and respect the legal media safety floor. No control may disable that floor.
- Attachment denial resolves with a soft failure message inside the future composer flow; M143 does not invent attachment UI.
- Escalation is a soft invitation stub with visible acknowledgement, not assignment, enforcement, organization administration, or a new API surface.

## 8. Visual system

- Background: dark board continuum, approximately `#141417`.
- Primary civic card: graphite surface around `#1B1C1F`, with thin cool-grey border.
- Thread surface: close tonal step below the card, separated by a hairline divider or connected inset.
- Primary text: `#F2F2F2`; secondary text: `#9A9DA6`.
- Signal yellow: `#F5C542` or token-close, used sparingly for one primary action or active focus.
- Corners, shadows, spacing, typography, status chips, and metadata follow the existing public board Issue card.
- Use social-feed density and spacing as a layout reference: compact header, generous readable content, thin dividers, low-height action row, indented replies, and composer anchored after comments.
- Estonian cultural texture may appear only as quiet shell decoration; it never encodes thread state, reaction meaning, priority, or verification.
- No gradients, neon glows, oversized hero typography, creator profiles, follower counts, or marketing treatment.
- Do not reproduce Facebook blue, its reaction artwork, trademarked icons, names, or exact control copy.

## 9. Responsive behavior

- Desktop: feed-row crop, approximately 760–880 px content width; Issue and thread share aligned edges.
- Tablet: preserve the same vertical order; controls may wrap into two rows.
- Mobile: one column, 16 px outer gutter, no lateral scroll; secondary controls may become full-width only when needed for clear touch targets.
- Long Issue titles and localized thread labels wrap; they do not truncate critical state messages.

## 10. Accessibility and localization

- Text labels remain present for all state and action meanings; icons are never the only carrier.
- Loading status is announced without repeatedly stealing focus.
- Error copy is explicit and does not rely on red alone.
- Focus order follows Issue content and actions first, then thread summary, open-tree action, composer, and escalation.
- Keyboard focus is visible against dark surfaces.
- All interactive targets meet the existing board contrast and target-size floor.
- Copy containers allow approximately 30–40% expansion for localization.

## 11. Data and privacy boundaries

The artboard may name component slots and projected test ids, but it must not show or invent:

- gateway or threads HTTP paths;
- request/response JSON;
- internal identifiers, hashes, bind fields, or moderation payloads;
- private identity attributes or verification method;
- fabricated comments, people, timestamps, reaction totals, or engagement metrics.

## 12. Continuity and regression locks

- Keep the existing Issue card recognizable and unchanged across A–E.
- Preserve `Open issue` as the civic navigation affordance.
- Thread chrome begins only after the Issue card boundary.
- The discussion never visually outranks the Issue title or status.
- `/issue/:id` reuses the same `IssueThreadBlock` language; do not design a parallel detail-page thread.
- Do not include Early Signal, Emerging Signal, Story clustering, pack administration, form builder, or map tooling.
- Do not redesign PH-01…06, board filters, header, navigation, or footer.

## 13. Artboard composition

Produce one consolidated landscape state sheet titled:

`DOGEstonia — BoardIssuePost / Feed Post Slot — M143 / THR-P`

Recommended arrangement:

- dominant large panel: THR-P-C Populated / collapsed, large enough to communicate the Facebook-like post anatomy;
- tall phone panel: THR-P-E Narrow / mobile;
- compact supporting panels: THR-P-A Loading, THR-P-B Empty, and THR-P-D Discussion unavailable;
- annotation rail: continuous-shell anatomy, fail-soft lock, deferred ownership, write gate, and prohibited patterns.

Show only enough surrounding `/board` chrome to establish feed context. The focus is one reusable row, not a new page design.

## 14. Required annotations

- `Issue identity remains primary`
- `IssueThreadBlock attaches directly beneath existing Issue card`
- `One continuous post shell; semantic regions separated by internal dividers`
- `Flow: civic object header → Issue content → actions → comments → composer`
- `Loading affects thread only`
- `No empty thread chrome outside the defined thread states`
- `No fake comments, people, reactions, or metrics`
- `Unverified write → existing /verify → return to originating post`
- `THR-T: tree/composer detail`
- `THR-R: reactions detail`
- `THR-E: escalation detail`
- `Projected testid: board-issue-post`
- `Projected testid: issue-thread-block`

## 15. Anti-patterns

- A new social post card that duplicates or replaces the civic Issue card.
- Avatar/author header added above the Issue.
- Two detached rounded cards for Issue and discussion, or a large empty gutter between them.
- Facebook/Meta trademarks, icons, blue palette, or copied assets.
- Fake comment text, names, avatars, timestamps, reaction counts, or popularity rankings.
- Discussion error swallowing the Issue card.
- Inline phone/eID verification form.
- Moderation reaction at the thread root.
- Organization assignment/admin controls disguised as escalation.
- Yellow applied to every control or used as status decoration.
- A separate visual language for `/issue/:id`.

## 16. Acceptance checklist

- [ ] All five labelled states THR-P-A…E appear on one sheet.
- [ ] Every state preserves a readable existing civic Issue card.
- [ ] `IssueThreadBlock` sits directly beneath the Issue card.
- [ ] Issue content and thread read as one continuous feed post shell.
- [ ] Populated and mobile states use the familiar header → content → actions → comments → composer rhythm.
- [ ] Loading, empty, populated, unavailable, and narrow states are visually distinct.
- [ ] Populated state visibly reserves tree summary, reaction, composer, open-tree, and escalation slots.
- [ ] No fabricated social content or metrics appear.
- [ ] Error is fail-soft and Issue actions remain intact.
- [ ] Narrow state is a genuine mobile stack, not a scaled desktop screenshot.
- [ ] Yellow is limited to primary emphasis.
- [ ] Projected test ids are annotations, not implementation code.
- [ ] No API URLs, JSON, or new data fields appear.
- [ ] Deferred THR-T/R/E ownership is explicit.

## 17. Design goal

At a glance, a developer must understand that DOGEstonia has added a resilient discussion layer beneath an existing civic Issue—not transformed the board into a generic social network. The Issue remains useful in every thread state, and the five panels together define the shell that later thread, reaction, composer, and escalation artboards will elaborate.
