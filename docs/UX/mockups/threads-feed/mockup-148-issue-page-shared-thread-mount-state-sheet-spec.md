# M148 — THR-I Issue page mount

Status: Proposed — active semantic SSOT for this artboard  
Host: existing `/issue/:id`  
Shared component: `IssueThreadBlock`  
Parent specifications: M143 / THR-P revision 1.1; M144 / THR-T; M145 / THR-R; M146 / THR-E; M147 / THR-V  
Scope: visual/product specification only; no implementation contract  
Priority: MUST

## 1. Purpose

Define how the existing civic Issue detail page and the shared discussion component coexist on `/issue/:id`. The detail page remains the authoritative civic surface; `IssueThreadBlock` extends it with the same thread semantics and visual language already used in the `/board` feed.

M148 is a mount and composition specification. It does not create a detail-only comments system or redefine thread interactions.

## 2. Core composition lock

- Do not delete, replace, simplify away, or convert the existing Issue detail page into a social post.
- Preserve the civic Issue body, title, summary, type, labels, status, dates, and existing detail-page information hierarchy.
- Mount the same `IssueThreadBlock` used in `BoardIssuePost` below or alongside the civic detail content according to available width.
- Component states, copy, reactions, composer, attachments, verification gate, escalation stub, and fail-soft behavior remain semantically identical across feed and detail mounts.
- Do not build a second comment card, detail-only thread header, separate reaction catalog, or alternate composer language.
- Public shell header, navigation, footer, and existing detail chrome remain unchanged.
- The artboard focuses on the detail column and mounted thread rather than redesigning the whole page.

## 3. One component, two mounts

| Concern | `/board` feed mount | `/issue/:id` detail mount |
|---|---|---|
| Civic parent | Compact Issue card inside `BoardIssuePost` | Existing full civic Issue detail body |
| Thread component | `IssueThreadBlock` directly below compact card | Same `IssueThreadBlock` after or beside detail content |
| Thread state semantics | THR-P loading/empty/populated/unavailable | Identical semantics and copy |
| Comment tree/composer | THR-T | Same THR-T component and states |
| Reactions | THR-R / `reactions.v1` | Same strip, picker, scope, and exclusions |
| Collaboration stub | THR-E | Same secondary invitation stub |
| Verify gate | THR-V | Same `/verify` handoff and return to detail context |
| Visual language | Continuous dark post/thread shell | Same internal thread shell integrated into civic detail |

The parent page differs; the thread product does not.

## 4. State matrix

| ID | State | Required visual result |
|---|---|---|
| THR-I-A | Detail + thread coexistence | Full civic detail remains primary; shared populated `IssueThreadBlock` mounts without replacing it |
| THR-I-B | State parity | Empty, populated, and unavailable thread states use the same semantics as the feed |
| THR-I-C | Narrow / mobile | Detail body and shared thread stack in one readable column |

## 5. Civic Issue detail baseline

For the illustrative Issue DE-042, show only known civic fields:

- id: `Issue · DE-042`;
- status: `OPEN`;
- title: `Public waste bins need more frequent service`;
- summary: `Residents report recurring overflow near shared public spaces.`;
- type/label examples: `PUBLIC SPACE`, `SERVICE`;
- location: `Tallinn`;
- date/update: `Updated today`.

The detail body may use existing section chrome such as `Issue details` and structured field rows, but must not invent new domain fields, metrics, decision status, owners, budgets, votes, or workflow stages.

Optional SSR-C `Additional details` may exist when `schema_card` is non-empty, but M148 must not depend on it.

## 6. Mount position and hierarchy

Preferred default:

- civic Issue header and detail body first;
- a clear section transition;
- `Discussion` / `IssueThreadBlock` mounted below the main detail content in the same primary column.

On a wide desktop layout with an existing detail/sidebar composition, the thread may align alongside a compact non-thread detail rail only if:

- the civic Issue body still reads first;
- thread width remains sufficient for nested comments and composer;
- the thread is not mistaken for a second Issue card;
- no new permanent social sidebar is invented.

The artboard should use the below-detail mount as the canonical example because it preserves the same vertical reading order as the feed.

## 7. State specifications

### THR-I-A — Civic detail + populated thread

Show a desktop crop of the existing `/issue/:id` page:

1. compact public shell context;
2. full civic Issue header and detail body using the known fields above;
3. internal divider/section boundary;
4. the shared populated `IssueThreadBlock` directly below.

The populated thread must visibly reuse the established component anatomy:

- compact reaction summary/action row;
- collapsed comment previews with neutral placeholders;
- `Open discussion` or equivalent tree affordance;
- rounded `Write a comment` composer;
- secondary `Invite organization` stub;
- no fabricated people, comments, reaction counts, or engagement metrics unless explicitly labelled as illustrative UI values.

Required annotation: `Same IssueThreadBlock as /board — different parent mount only`.

### THR-I-B — Empty / populated / unavailable parity

Show three compact sub-states attached to the same minimal Issue detail context.

#### Empty

- label `Discussion`;
- `No comments yet`;
- supporting copy `Start a constructive discussion about this Issue.`;
- composer affordance `Write a comment`;
- no fake comments, reactions, or totals.

#### Populated

- same summary strip, comment-preview geometry, composer, and controls as THR-P/THR-T/R;
- no detail-only reaction or comment terminology;
- moderation remains comment-only and unavailable on thread root.

#### Unavailable / fail-soft

- `Discussion unavailable`;
- `The Issue is still available. Try again later.`;
- optional neutral `Try again`;
- civic Issue detail remains fully readable and usable;
- thread failure does not collapse, dim, or replace the detail body.

Required annotation: `Copy and behavior parity with /board`.

### THR-I-C — Narrow / mobile coexistence

Show one realistic narrow `/issue/:id` layout:

- public header remains recognizable without redesign;
- civic Issue header, title, summary, chips, status, and detail rows stack first;
- `IssueThreadBlock` follows as a full-width section below the detail body;
- action row, comment preview, reply indentation, and composer use the same mobile behavior as M143–M145;
- no fixed sidebar, horizontal split, or nested scroll region;
- no horizontal overflow;
- Issue content and thread controls maintain practical touch targets.

The mobile thread must not jump above or obscure the civic detail content.

## 8. Shared-state parity requirements

The detail mount inherits without variation:

- THR-P loading, empty, populated, unavailable, and narrow semantics;
- THR-T bounded nesting, max-depth treatment, reply composer, attachment references, and visible soft failures;
- THR-R `reactions.v1`, labelled layers, comment-only moderation, enabled catalog, accessibility, and `agree ⟂ disagree`;
- THR-E honest collaboration invitation stub;
- THR-V opaque `identity_verified` gate, existing `/verify`, return to originating detail/thread context, method-private `Verified` result.

M148 does not need to redraw every child state. Its role is to prove mount compatibility and semantic parity.

## 9. Loading and progressive shell

Although loading is not a dedicated M148 panel:

- civic Issue detail may render before thread data;
- thread loading chrome affects only `IssueThreadBlock`;
- Issue detail is never skeletonized because social data is loading;
- no fabricated comments, reactions, or counts fill the loading gap.

## 10. Visual system

- Continue the existing public Issue detail visual language and M143–M147 dark thread system.
- Canvas: approximately `#141417`.
- Civic detail and thread surfaces: graphite steps around `#1B1C1F` with cool-grey dividers.
- Primary text: `#F2F2F2`; muted: `#9A9DA6`.
- Signal yellow `#F5C542` remains restricted to primary actions, selection, and focus.
- The detail body may have a stronger civic header; the thread section remains subordinate.
- Use spacing and section dividers to distinguish civic details from discussion without turning them into unrelated products.
- No Facebook blue, Meta assets, marketing hero, generic SaaS dashboard, or new detail-only social styling.

## 11. Responsive behavior

- Wide desktop: centered detail column; optional existing supporting rail remains secondary.
- Standard desktop/tablet: thread sits below the civic detail body at the same content width.
- Mobile: one column in strict order — Issue identity → detail body → discussion → composer.
- Nested replies use reduced indentation and connectors according to M144.
- Reaction picker uses the M145 bounded mobile popover behavior.
- Verification and escalation feedback remain anchored to their originating thread controls.
- Footer follows content naturally; do not pin thread controls over civic details.

## 12. Accessibility and localization

- Page heading remains the civic Issue title.
- `Discussion` is a subordinate section heading, not a competing page heading.
- Landmark/reading order follows civic detail before discussion.
- Keyboard focus flows through existing Issue actions, then thread summary, comments, composer, and secondary controls.
- Thread errors do not steal focus from the detail body on initial render.
- Mobile and localized layouts allow approximately 30–40% label expansion.
- Same accessible names and state announcements from THR-P/T/R/E/V apply in both mounts.

## 13. Route and data boundaries

The only detail route represented is existing `/issue/:id`.

Do not show or invent:

- `/issue/:id/comments`, `/issue/:id/thread`, or another detail-only social route;
- a second comment data model or detail-only thread id;
- new HTTP endpoints, JSON, payload fields, or test data;
- owner, assignee, SLA, ticket, queue, budget, vote, or status fields not already part of the civic detail contract;
- fabricated user identities, comments, reactions, or production-looking engagement metrics.

## 14. Component and test continuity

- Shared component name: `IssueThreadBlock`.
- Existing projected test id remains `issue-thread-block` in both mounts.
- `board-issue-post` belongs to the feed wrapper and is not duplicated as the detail-page wrapper.
- Detail page may have its existing page-level selector/test id; M148 does not invent one.
- Styling variants may respond to container width, but semantics, copy, action names, and state meanings remain shared.

## 15. Artboard composition

Produce one consolidated landscape state sheet titled:

`DOGEstonia — Issue Page Shared Thread Mount — M148 / THR-I`

Recommended hierarchy:

- dominant large left panel: THR-I-A desktop Issue detail with populated shared thread mounted below;
- upper/right panel: THR-I-C narrow/mobile full vertical coexistence;
- lower strip or center panel: THR-I-B three parity mini-states — Empty, Populated, Unavailable;
- narrow annotation rail: one component/two mounts, detail preservation, inherited child specs, route lock, and fail-soft.

Show only enough public shell chrome to establish `/issue/:id`. Do not redesign header, navigation, filters, or footer.

## 16. Required annotations

- `Existing Issue detail remains primary`
- `Same IssueThreadBlock as /board`
- `One component · two mounts`
- `Detail mount changes layout, not semantics`
- `Empty / populated / unavailable copy parity`
- `Thread failure never hides civic detail`
- `Mobile order: Issue → details → discussion`
- `Projected testid remains issue-thread-block`
- `Existing route only: /issue/:id`
- `No second comments product`

## 17. Anti-patterns

- Replacing the Issue detail page with a feed post.
- Removing civic fields to make room for comments.
- New detail-only comment card or composer component.
- Different reaction ids, labels, moderation scope, or verify behavior on detail.
- Social sidebar that visually outranks the Issue body.
- Thread rendered above the Issue identity on mobile.
- Thread error blanking or dimming the entire detail page.
- Duplicate discussion blocks on the same detail page.
- New thread route, endpoint, JSON contract, or data field.
- Fake comments, people, reactions, counts, or production metrics.

## 18. Acceptance checklist

- [ ] THR-I-A, THR-I-B, and THR-I-C appear on one consolidated sheet.
- [ ] Existing civic Issue detail remains visible and primary.
- [ ] Shared `IssueThreadBlock` is mounted rather than re-created.
- [ ] Empty, populated, and unavailable states match feed semantics and copy.
- [ ] Unavailable discussion leaves the detail page fully readable.
- [ ] Mobile order is Issue identity → details → discussion.
- [ ] Thread interactions visually match THR-P/T/R/E/V.
- [ ] `issue-thread-block` continuity is annotated.
- [ ] No second comment language, route, model, or component is introduced.
- [ ] No route beyond existing `/issue/:id` appears.

## 19. Design goal

The resident should experience the Issue detail page as the same civic object with a richer reading context—not as a different social product. Developers should see that only the parent mount changes: `IssueThreadBlock` itself, its states, and its interaction contracts remain shared with the board feed.
